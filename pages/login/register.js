import { loginStyleheet, Text, View, SafeAreaView, TextInput, Pressable } from 'react-native';
import { useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { loginStyle } from '../../styles/login';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../utils/firebaseconfig';

export default function RegisterScreen({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function registerUser(email, password){
    try {
      await createUserWithEmailAndPassword(auth, email, password); 
    } catch (error) {
      console.log(error);
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
        <TextInput
          placeholder='Digite seu email...'
          onChangeText={text => setEmail(text)}
          style={loginStyle.customInput}></TextInput>
        <TextInput
          placeholder='Digite sua senha...'
          onChangeText={text => setPassword(text)}
          style={loginStyle.customInput}></TextInput>
        <TextInput
          placeholder='Confirme sua senha...'
          onChangeText={text => setConfirmPassword(text)}
          style={loginStyle.customInput}></TextInput>
        <Pressable style={loginStyle.standartButton}>
          <Text style={{ color: 'white', fontWeight: 'bold' }} onPress={() => registerUser(email, password)}>Criar conta</Text>
        </Pressable>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: '40%', backgroundColor: 'gray', height: 2 }}></View>
          <Text style={{ paddingHorizontal: '5%', color: 'gray' }}>ou</Text>
          <View style={{ width: '40%', backgroundColor: 'gray', height: 2 }}></View>
        </View>
        <View style={{ margin: 16 }}>
          <FontAwesome.Button name='google' style={{ paddingVertical: 16 }}>Criar com Google</FontAwesome.Button>
        </View>
        <Pressable onPress={() => { navigation.navigate('login'); }}>
          <Text style={{ color: 'blue', fontWeight: 'bold' }}>Já tem uma conta? Fazer login</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
