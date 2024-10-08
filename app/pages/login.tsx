import { Text, View, SafeAreaView, TextInput, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { loginStyle } from '../styles/login';
import { User, UserCredential, signInWithEmailAndPassword, signInWithRedirect } from 'firebase/auth';
import { auth, db, googleProvider } from '../utils/config/firebaseconfig';
import { Snackbar } from 'react-native-paper';
import DSGovButton from '../components/button';
import DSGovInput from '../components/input';
import LoginData from '../utils/interfaces/logindata';
import FontAwesome from '@expo/vector-icons/build/FontAwesome';
import LoadingCircle from '../components/loading';
import { collection, getDocs, query, where } from 'firebase/firestore';
import UserData from '../utils/interfaces/userdata';
import fetchUserData from '../utils/functions/fetchuser';
import { createTables, getUserSettings, insertUserData, recoverUserData } from '../utils/functions/dbservice';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState({ errorMessage: "", errorVisible: false })
  const [loading, setLoading] = useState(false);


  async function loginUser() {
    setLoading(true);
    if (verifyPasswordAndEmail()) {
      try {
        const userCredentials: UserCredential = await signInWithEmailAndPassword(auth, email, password);
        const user: User = userCredentials.user;
        const loginData: LoginData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName
        };
        const userData: UserData | null = await fetchUserData(loginData);
        if (userData) {
          if (await getUserSettings() == true) {
            await insertUserData(userData);
          }
          navigation.navigate('home', { userData });
        }
      } catch (error : any) {
        console.log(error);
        if (error.code === 'auth/invalid-credential') {
          setErrorMessage({ errorMessage: 'Credenciais do usuário inválidas!', errorVisible: true });
        } else {
          setErrorMessage({ errorMessage: `Ocorreu um erro: ${error}`, errorVisible: true });
        }
      }
    }
    setLoading(false);
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
    } else {
      setErrorMessage({ errorMessage: "", errorVisible: false });
      return true;
    }
  }

  async function getPreviousUserData() {
    setLoading(true);
    await createTables();
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
          <Text style={{ fontWeight: 'bold', fontSize: 36 }}>Login</Text>
          <DSGovInput
            placeholder='Digite seu email'
            value={email}
            onChangeText={(text : string) => setEmail(text)}>
          </DSGovInput>
          <DSGovInput
            placeholder='Digite sua senha'
            value={password}
            onChangeText={(text : string) => setPassword(text)}
            secureTextEntry={!passwordVisible}>
          </DSGovInput>
          <DSGovButton onPress={loginUser} label='Fazer login' primary></DSGovButton>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: '40%', backgroundColor: 'gray', height: 2 }}></View>
            <Text style={{ paddingHorizontal: '5%', color: 'gray' }}>ou</Text>
            <View style={{ width: '40%', backgroundColor: 'gray', height: 2 }}></View>
          </View>
          <Text style={{ color: '#1351B4', fontWeight: 'bold', margin: 16 }}>Ainda não tem uma conta?</Text>
          <FontAwesome.Button name='sign-in' style={{ paddingVertical: 16 }} onPress={() => { navigation.navigate('register'); }}>Criar uma conta</FontAwesome.Button>
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
