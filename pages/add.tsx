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
      <Appbar.Header style={{ backgroundColor: '#fff' }}>
        <Appbar.Action icon='arrow-left' onPress={() => { navigation.navigate('info', { userData: user }) }} />
        <Appbar.Content title='Adicionar informação' titleStyle={{ textAlign: 'center', fontWeight: 'bold' }} />
      </Appbar.Header>
      <SafeAreaView style={homeStyle.container}>

      </SafeAreaView>
    </ScrollView>
  );
}
