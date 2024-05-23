import { Text, View, SafeAreaView, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { loginStyle } from '../styles/login';
import { User, UserCredential, createUserWithEmailAndPassword, signInWithRedirect } from 'firebase/auth';
import { auth, googleProvider } from '../utils/firebaseconfig';
import { Snackbar } from 'react-native-paper';
import DSGovButton from '../components/button';
import DSGovInput from '../components/input';

export default function RegisterScreen({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState({ errorMessage: "", errorVisible: false })

  async function registerUser() {
    if (verifyPasswordAndEmail()) {
      try {
        const UserCredentials : UserCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user : User = UserCredentials.user;
        navigation.navigate('home', {user});
      } catch (error) {
        if (error.code == 'auth/email-already-in-use') {
          setErrorMessage({ errorMessage: 'Email já está em uso!', errorVisible: true });
        } else {
          setErrorMessage({ errorMessage: `Ocorreu um erro: ${error}`, errorVisible: true });
        }
      }
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
    } else {
      setErrorMessage({ errorMessage: "", errorVisible: false });
      return true;
    }
  }
  return (
    <SafeAreaView style={loginStyle.container}>
      <View style={loginStyle.logoBox}>
        <Text style={{ color: 'blue', fontWeight: 'bold', fontSize: 48 }}>Vis</Text>
        <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 48 }}>Açougue</Text>
      </View>
      <View style={loginStyle.loginBox}>
        <Text style={{ fontWeight: 'bold', fontSize: 36 }}>Criar sua conta</Text>
        <DSGovInput
          placeholder='Digite seu email'
          onChangeText={text => setEmail(text)}>
        </DSGovInput>
        <DSGovInput
          placeholder='Digite sua senha'
          onChangeText={text => setPassword(text)}
          secureTextEntry={!passwordVisible}>
        </DSGovInput>
        <DSGovInput
          placeholder='Confirme sua senha'
          onChangeText={text => setConfirmPassword(text)}
          secureTextEntry={!passwordVisible}>
        </DSGovInput>
        <DSGovButton onPress={registerUser} label='Criar conta' primary></DSGovButton>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: '40%', backgroundColor: 'gray', height: 2 }}></View>
          <Text style={{ paddingHorizontal: '5%', color: 'gray' }}>ou</Text>
          <View style={{ width: '40%', backgroundColor: 'gray', height: 2 }}></View>
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
      </View>
    </SafeAreaView>
  );
}