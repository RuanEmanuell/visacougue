import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Button } from 'react-native';
import { useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoBox}>
        <Text style={{ color: 'blue', fontWeight: 'bold', fontSize: 48 }}>Vis</Text>
        <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 48 }}>Açougue</Text>
      </View>
      <View style={styles.loginBox}>
        <Text style={{ fontWeight: 'bold', fontSize: 36 }}>Login</Text>
        <TextInput
          placeholder='Digite seu email...'
          onChangeText={text => setEmail(text)}
          style={styles.customInput}></TextInput>
        <TextInput
          placeholder='Digite sua senha...'
          onChangeText={text => setPassword(text)}
          style={styles.customInput}></TextInput>
        <View style={{ margin: 16 }}>
          <FontAwesome.Button name='google' style={{ paddingVertical: 16 }}>Entrar com Google</FontAwesome.Button>
        </View>
        <Text style = {{color: 'blue', fontWeight: 'bold'}}>Não tem uma conta? Criar uma conta</Text>
      </View>
      <View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  logoBox: {
    flexDirection: 'row',
    marginTop: '10%'
  },
  loginBox: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  customInput: {
    backgroundColor: 'lightgray',
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    width: '75%',
    height: 32,
    marginTop: 16,
    paddingLeft: 5
  }
});
