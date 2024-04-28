import { Text, View, SafeAreaView, TextInput, Pressable } from 'react-native';
import { useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { loginStyle } from '../../styles/login';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <SafeAreaView style={loginStyle.container}>
      <View style={loginStyle.logoBox}>
        <Text style={{ color: 'blue', fontWeight: 'bold', fontSize: 48 }}>Vis</Text>
        <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 48 }}>Açougue</Text>
      </View>
      <View style={loginStyle.loginBox}>
        <Text style={{ fontWeight: 'bold', fontSize: 36 }}>Login</Text>
        <TextInput
          placeholder='Digite seu email...'
          onChangeText={text => setEmail(text)}
          style={loginStyle.customInput}></TextInput>
        <TextInput
          placeholder='Digite sua senha...'
          onChangeText={text => setPassword(text)}
          style={loginStyle.customInput}></TextInput>
        <Pressable style={loginStyle.standartButton}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Fazer login</Text>
        </Pressable>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: '40%', backgroundColor: 'gray', height: 2 }}></View>
          <Text style={{ paddingHorizontal: '5%', color: 'gray' }}>ou</Text>
          <View style={{ width: '40%', backgroundColor: 'gray', height: 2 }}></View>
        </View>
        <View style={{ margin: 16 }}>
          <FontAwesome.Button name='google' style={{ paddingVertical: 16 }}>Entrar com Google</FontAwesome.Button>
        </View>
        <Pressable onPress={() => { navigation.navigate('register'); }}>
          <Text style={{ color: 'blue', fontWeight: 'bold' }}>Não tem uma conta? Criar uma conta</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
