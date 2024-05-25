import { Text, View, SafeAreaView, TextInput, Pressable, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import UserData from '../utils/userdata';
import { Appbar } from 'react-native-paper';
import { homeStyle } from '../styles/home';
import { MaterialIcons } from '@expo/vector-icons';
import HomeOption from '../components/option';

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

        <HomeOption onPress = {() => {}} label="Informativo" color="#0066FF" icon="book" />
        <HomeOption onPress = {() => {}} label="Simulador" color="#CA0000" icon="computer" />
        <HomeOption onPress = {() => {}} label="Configurações" color="#9E9FA0" icon="settings" />
      </View>
    </SafeAreaView>
  );
}
