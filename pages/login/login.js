import { loginStyleheet, Text, View, SafeAreaView, TextInput, Pressable } from 'react-native';
import { useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { loginStyle } from '../../styles/login';
import { signInWithEmailAndPassword, signInWithRedirect } from 'firebase/auth';
import { auth, googleProvider } from '../../utils/firebaseconfig';
import { Snackbar } from 'react-native-paper';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState({ errorMessage: "", errorVisible: false })

  async function loginUser() {
    if (verifyPasswordAndEmail()) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        console.log(error);
        if(error.code == 'auth/invalid-credential'){
          setErrorMessage({ errorMessage: 'Credenciais do usuário inválidas!', errorVisible: true });
        }else {
          setErrorMessage({ errorMessage: `Ocorreu um erro: ${error}`, errorVisible: true });
        }
      }
    }
  }

  async function loginGoogle(){
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (error) {
      console.log(error);
      setErrorMessage({ errorMessage: `Ocorreu um erro: ${error}`, errorVisible: true });
    }
  }

  function verifyPasswordAndEmail() {
    if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
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
  return (
    <SafeAreaView style={loginStyle.container}>
      <View style={loginStyle.logoBox}>
        <Text style={{ color: 'blue', fontWeight: 'bold', fontSize: 48 }}>Vis</Text>
        <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 48 }}>Açougue</Text>
      </View>
      <View style={loginStyle.loginBox}>
        <Text style={{ fontWeight: 'bold', fontSize: 36 }}>Login</Text>
        <TextInput
          placeholder='Digite seu email'
          onChangeText={text => setEmail(text)}
          style={loginStyle.customInput}></TextInput>
        <TextInput
          placeholder='Digite sua senha'
          onChangeText={text => setPassword(text)}
          secureTextEntry={!passwordVisible}
          style={loginStyle.customInput}></TextInput>
        <Pressable style={loginStyle.standartButton}>
          <Text style={{ color: 'white', fontWeight: 'bold' }} onPress={loginUser}>Fazer login</Text>
        </Pressable>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: '40%', backgroundColor: 'gray', height: 2 }}></View>
          <Text style={{ paddingHorizontal: '5%', color: 'gray' }}>ou</Text>
          <View style={{ width: '40%', backgroundColor: 'gray', height: 2 }}></View>
        </View>
        <View style={{ margin: 16 }}>
          <FontAwesome.Button name='google' style={{ paddingVertical: 16 }} onPress={loginGoogle}>Criar com Google</FontAwesome.Button>
        </View>
        <Pressable onPress={() => { navigation.navigate('login'); }}>
          <Text style={{ color: '#1351B4', fontWeight: 'bold' }}>Ainda não tem uma conta? Criar uma conta</Text>
        </Pressable>
        <Snackbar 
        visible = {errorMessage.errorVisible}
        onDismiss={() => setErrorMessage({errorMessage:"", errorVisible: false})}
        duration={5000}
        style = {{backgroundColor: 'red'}}
        >{errorMessage.errorMessage}</Snackbar>
      </View>
    </SafeAreaView>
  );
}
