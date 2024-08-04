import { Text, View, SafeAreaView, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { loginStyle } from '../styles/login';
import { User, UserCredential, createUserWithEmailAndPassword, signInWithRedirect } from 'firebase/auth';
import { db, auth, googleProvider } from '../utils/config/firebaseconfig';
import { Snackbar } from 'react-native-paper';
import DSGovButton from '../components/button';
import DSGovInput from '../components/input';
import LoginData from '../utils/interfaces/logindata';
import FontAwesome from '@expo/vector-icons/build/FontAwesome';
import { doc, setDoc } from 'firebase/firestore';
import LoadingCircle from '../components/loading';
import getCurrentTime from '../utils/functions/gettime';
import UserData from '../utils/interfaces/userdata';
import fetchUserData from '../utils/functions/fetchuser';
import { createTable, insertUserData, recoverUserData } from '../utils/functions/dbservice';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState({ errorMessage: "", errorVisible: false });
  const [loading, setLoading] = useState(false);

  async function registerUser() {
    setLoading(true);
    if (verifyPasswordAndEmail()) {
      try {
        const UserCredentials: UserCredential = await createUserWithEmailAndPassword(auth, email, password);

        const user: User = UserCredentials.user;

        const loginData: LoginData = {
          uid: user.uid,
          email: user.email,
          displayName: name
        };

        await addUserToDB(loginData);

        const userData: UserData | null = await fetchUserData(loginData);

        if (userData) {
          await insertUserData(userData);
          navigation.navigate('home', { userData });
        }
      } catch (error) {
        if (error.code == 'auth/email-already-in-use') {
          setErrorMessage({ errorMessage: 'Email já está em uso!', errorVisible: true });
        } else {
          setErrorMessage({ errorMessage: `Ocorreu um erro: ${error}`, errorVisible: true });
        }
      }
    }
    setLoading(false);
  }

  async function addUserToDB(loginData: LoginData) {
    try {
      const userId = loginData.uid;

      const userRef = doc(db, 'users', userId);

      await setDoc(userRef, {
        uid: loginData.uid,
        displayName: loginData.displayName,
        email: loginData.email,
        type: 'user',
        creationDate: getCurrentTime(),
        modificationDate: getCurrentTime()
      });

    } catch (error) {
      console.error(error);
    }
  }

  async function loginGoogle() {
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (error) {
      console.log(error);
      setErrorMessage({ errorMessage: `Ocorreu um erro: ${error}`, errorVisible: true });
    }
  }

  function verifyPasswordAndEmail() {
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setErrorMessage({ errorMessage: "Email inválido!", errorVisible: true });
      return false;
    } else if (password.length < 6) {
      setErrorMessage({ errorMessage: "Senha deve conter pelo menos 6 caracteres!", errorVisible: true });
      return false;
    } else if (password != confirmPassword) {
      setErrorMessage({ errorMessage: "Senha e confirmação de senha devem ser iguais!", errorVisible: true });
      return false;
    } else if (name.length < 5) {
      setErrorMessage({ errorMessage: "Nome de usuário deve conter pelo menos 5 caracteres!", errorVisible: true });
      return false;
    } else {
      setErrorMessage({ errorMessage: "", errorVisible: false });
      return true;
    }
  }


  async function getPreviousUserData() {
    setLoading(true);
    await createTable();
    const userData = await recoverUserData();
    if (userData) {
      navigation.navigate('home', { userData });
    }
    setLoading(false);
  }

  useEffect(() => {
    getPreviousUserData();
  }, [])

  return (
    <SafeAreaView style={loginStyle.container}>
      <View style={loginStyle.logoBox}>
        <Text style={{ color: 'blue', fontWeight: 'bold', fontSize: 48 }}>Vis</Text>
        <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 48 }}>Açougue</Text>
      </View>
      {!loading ?
        <View style={loginStyle.loginBox}>
          <Text style={{ fontWeight: 'bold', fontSize: 36 }}>Criar sua conta</Text>
          <DSGovInput
            placeholder='Digite seu email'
            value={email}
            onChangeText={text => setEmail(text)}>
          </DSGovInput>
          <DSGovInput
            placeholder='Digite seu nome de usuário'
            value={name}
            maxLength={20}
            onChangeText={text => setName(text)}>
          </DSGovInput>
          <DSGovInput
            placeholder='Digite sua senha'
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={!passwordVisible}>
          </DSGovInput>
          <DSGovInput
            placeholder='Confirme sua senha'
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
            secureTextEntry={!passwordVisible}>
          </DSGovInput>
          <DSGovButton onPress={registerUser} label='Criar conta' primary></DSGovButton>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: '40%', backgroundColor: 'gray', height: 2 }}></View>
            <Text style={{ paddingHorizontal: '5%', color: 'gray' }}>ou</Text>
            <View style={{ width: '40%', backgroundColor: 'gray', height: 2 }}></View>
          </View>
          <View style={{ margin: 16 }}>
            <FontAwesome.Button name='google' style={{ paddingVertical: 16 }} onPress={loginGoogle}>Criar com Google</FontAwesome.Button>
          </View>
          <Pressable onPress={() => { navigation.navigate('login'); }}>
            <Text style={{ color: '#1351B4', fontWeight: 'bold' }}>Já tem uma conta? Fazer login</Text>
          </Pressable>
          <Snackbar
            visible={errorMessage.errorVisible}
            onDismiss={() => setErrorMessage({ errorMessage: "", errorVisible: false })}
            duration={5000}
            style={{ backgroundColor: 'red' }}
          >{errorMessage.errorMessage}</Snackbar>
        </View> : <LoadingCircle />}
    </SafeAreaView>
  );
}
