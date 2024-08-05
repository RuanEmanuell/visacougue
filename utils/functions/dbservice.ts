import * as SQLite from 'expo-sqlite';
import UserData from '../interfaces/userdata';
import LoginData from '../interfaces/logindata';
import fetchUserData from './fetchuser';

export async function createTable() {
    const userInfoDB = await SQLite.openDatabaseAsync('userdata.db', {
        useNewConnection: true
    });

    try {
        await userInfoDB.execAsync(
            'CREATE TABLE IF NOT EXISTS userData (uid VARCHAR(128) PRIMARY KEY NOT NULL, email VARCHAR(320) NOT NULL, displayName VARCHAR(20) NOT NULL);'
        );
    } catch (error) {
        console.log('Error creating table: ' + error);
    }
}

export async function removeUserInfo() {
    const userInfoDB = await SQLite.openDatabaseAsync('userdata.db', {
        useNewConnection: true
    });

    try {
        await userInfoDB.execAsync('DELETE FROM userData');
        console.log('Dados do usuário deletados com sucesso.');
    } catch (error) {
        console.log('Erro ao excluir os dados: ' + error);
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
                uid: result.uid,
                email: result.email,
                displayName: result.displayName
            };
            const userData: UserData | null = await fetchUserData(loginData);
            return userData;
        } else {
            return null;
        }
    } catch (error) {
        console.log('Error recovering user data: ' + error);
    }
}

export async function insertUserData(userData: UserData) {
    const userInfoDB = await SQLite.openDatabaseAsync('userdata.db');
    const statement = await userInfoDB.prepareAsync(
        'INSERT INTO userData (uid, email, displayName) VALUES ($uidValue, $emailValue, $displayNameValue);'
    );
    
    try {
        console.log('Inserting user data:', userData);

        await statement.executeAsync({
            $uidValue: userData.uid,
            $emailValue: userData.email,
            $displayNameValue: userData.displayName
        });
    } catch (error) {
        console.log('Error inserting user data: ' + error);
    } finally {
        await statement.finalizeAsync();
    }
}
