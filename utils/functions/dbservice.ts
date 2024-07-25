import * as SQLite from 'expo-sqlite';
import UserData from '../interfaces/userdata';
import LoginData from '../interfaces/logindata';
import fetchUserData from './fetchuser';

export async function createTables() {
    const userInfoDB = await SQLite.openDatabaseAsync('userdata.db');
    try {
        await userInfoDB.execAsync(
            'CREATE TABLE IF NOT EXISTS userData (uid INTEGER PRIMARY KEY NOT NULL, email VARCHAR(320) NOT NULL, displayName varchar(100) NOT NULL);'
        );
    } catch (error) {
        console.log('Error: ' + error);
    }
}

export async function recoverUserData() {
    const userInfoDB = await SQLite.openDatabaseAsync('userdata.db');
    try {
        const result: LoginData | null = await userInfoDB.getFirstAsync(
            'SELECT * FROM userData'
        );
        if (result) {
            const loginData: LoginData = {
                uid: result!.uid,
                email: result!.email,
                displayName: result!.displayName
            };
            const userData: UserData | null = await fetchUserData(loginData);
            return userData;
        } else {
            return null;
        }
    } catch (error) {
        console.log('Error: ' + error);
    }
}

export async function insertUserData(userData: UserData) {
    const userInfoDB = await SQLite.openDatabaseAsync('userdata.db');
    const statement = await userInfoDB.prepareAsync(
        'INSERT INTO userData VALUES ($uidValue, $emailValue, $displayNameValue);'
    );
    try {
        await statement.executeAsync({ $uidValue: userData.uid, $emailValue: userData.email, $displayNameValue: userData.displayName });
    } catch (error) {
        console.log('Error: ' + error);
    } finally {
        await statement.finalizeAsync();
    }
}
