import { SafeAreaView, Dimensions, ScrollView, View, Text, Image } from 'react-native';
import React, { useState } from 'react';
import UserData from '../utils/userdata';
import { Appbar } from 'react-native-paper';
import { homeStyle } from '../styles/home';
import DSGovInput from '../components/input';
import DSGovButton from '../components/button';
import { MaterialIcons } from '@expo/vector-icons';

export default function AddScreen({ route, navigation }) {
  const user: UserData = route.params;

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const [blockName, setBlockName] = useState('');
  const [blockImage, setBlockImage] = useState(null);

  return (
    <ScrollView contentContainerStyle={{ backgroundColor: '#fff', flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: '#fff' }}>
        <Appbar.Action icon='arrow-left' onPress={() => { navigation.navigate('info', { userData: user }) }} />
        <Appbar.Content title='Adicionar informação' titleStyle={{ textAlign: 'center', fontWeight: 'bold' }} />
      </Appbar.Header>
      <SafeAreaView style={homeStyle.container}>
        <View style={{ borderColor: 'black', borderWidth: 3, width: windowWidth / 1.2, height: windowHeight / 2.5, display: 'flex', alignItems: 'center', paddingTop: 10 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Nome do bloco:</Text>
          <DSGovInput
            placeholder='Digite o nome do bloco...'
            onChangeText={(text) => { setBlockName(text) }}
          />
          {blockImage ? <Image /> :
            <View style={{ marginTop: windowHeight/50, backgroundColor: 'lightgray', width: '66%', height: '50%', justifyContent: 'center', alignItems: 'center' }}>
              <MaterialIcons name={'photo'} color='black' size={96} style={{ marginRight: 12 }}></MaterialIcons>
            </View>}
          <DSGovButton primary label='Adicionar imagem' onPress={() => { }} />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
