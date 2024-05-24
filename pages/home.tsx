import { Text, View, SafeAreaView, TextInput, Pressable, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import UserData from '../utils/userdata';
import { Appbar } from 'react-native-paper';
import { homeStyle } from '../styles/home';
import { MaterialIcons } from '@expo/vector-icons';


export default function HomeScreen({ route }) {
  const user: UserData = route.params['user'];

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Action icon='menu' onPress={() => { }} />
      </Appbar.Header>
      <View style={homeStyle.container}>
        <View style={homeStyle.userCircle}>
          <MaterialIcons name='person' size={96} color='black'></MaterialIcons>
        </View>
        <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>{user.email}</Text>
        <Text style={{ fontSize: 32, fontWeight: 'bold', textAlign: 'center' }}>O que você quer fazer hoje?</Text>

        <View style={{ backgroundColor: '#0066FF', width: windowWidth / 1.25, height: 72, margin: 18, display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{ color: 'white', marginLeft: 12, fontWeight: 'bold', fontSize: 24}}>Informativo</Text>
          <MaterialIcons name = "book" color='white' size={32} style = {{marginRight: 12}}></MaterialIcons>
        </View>
        <View style={{ backgroundColor: '#CA0000', width: windowWidth / 1.25, height: 72, margin: 18, display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{ color: 'white', marginLeft: 12, fontWeight: 'bold', fontSize: 24}}>Simulador</Text>
          <MaterialIcons name = "computer" color='white' size={32} style = {{marginRight: 12}}></MaterialIcons>
        </View>
        <View style={{ backgroundColor: '#9E9FA0', width: windowWidth / 1.25, height: 72, margin: 18, display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{ color: 'white', marginLeft: 12, fontWeight: 'bold', fontSize: 24}}>Configurações</Text>
          <MaterialIcons name = "settings" color='white' size={32} style = {{marginRight: 12}}></MaterialIcons>
        </View>
      </View>
    </SafeAreaView>
  );
}
