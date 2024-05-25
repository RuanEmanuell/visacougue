import { Text, View, SafeAreaView, TextInput, Pressable, Dimensions, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import UserData from '../utils/userdata';
import { Appbar } from 'react-native-paper';
import { homeStyle } from '../styles/home';
import DSGovInput from '../components/input';

export default function InfoScreen({ route, navigation }) {
  const user: UserData = route.params['user'];

  return (
    <ScrollView contentContainerStyle={{ backgroundColor: '#fff', flex: 1 }}>
      <Appbar.Header style = {{backgroundColor: '#fff'}}>
        <Appbar.Action icon='arrow-left' onPress={() => {navigation.navigate('home', {user: user})}} />
        <Appbar.Content title = 'Informativo' titleStyle = {{textAlign: 'center', fontWeight: 'bold'}}></Appbar.Content>
      </Appbar.Header>
      <SafeAreaView style={homeStyle.container}>
        <DSGovInput onChangeText={() => {}} secureTextEntry = {false} placeholder='Buscar uma informação...'></DSGovInput>
      </SafeAreaView>
    </ScrollView>
  );
}
