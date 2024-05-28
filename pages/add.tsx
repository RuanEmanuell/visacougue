import { Text, View, SafeAreaView, TextInput, Pressable, Dimensions, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import UserData from '../utils/userdata';
import { Appbar } from 'react-native-paper';
import { homeStyle } from '../styles/home';
import { MaterialIcons } from '@expo/vector-icons';
import HomeOption from '../components/option';

export default function AddScreen({ route, navigation }) {
  const user: UserData = route.params;
  
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  return (
    <ScrollView contentContainerStyle={{ backgroundColor: '#fff', flex: 1 }}>
      <Appbar.Header style = {{backgroundColor: '#fff'}}>
        <Appbar.Action icon='menu' onPress={() => { }} />
      </Appbar.Header>
      <SafeAreaView style={homeStyle.container}>
        <View style={{ margin: 'auto', alignItems: 'center', display: 'flex' }}>
          <View style={homeStyle.userCircle}>
            <MaterialIcons name='person' size={96} color='black'></MaterialIcons>
          </View>
          <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>{user.email}</Text>
          <Text style={{ fontSize: 32, fontWeight: 'bold', textAlign: 'center', margin: 10 }}>O que você quer fazer hoje?</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'space-evenly', display: 'flex', paddingVertical: windowHeight/20}}>
          <HomeOption onPress={() => {navigation.navigate('informative', {user: user})}} label="Informativo" color="#0066FF" icon="book" />
          <HomeOption onPress={() => { }} label="Simulador" color="#CA0000" icon="computer" />
          <HomeOption onPress={() => { }} label="Configurações" color="#9E9FA0" icon="settings" />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
