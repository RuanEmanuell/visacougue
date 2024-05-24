import { Text, View, SafeAreaView, TextInput, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import UserData from '../utils/userdata';
import { Appbar } from 'react-native-paper';
import { homeStyle } from '../styles/home';

export default function HomeScreen({ route }) {
  const user: UserData = route.params['user'];

  return (
    <SafeAreaView style = {{flex: 1}}>
          <Appbar.Header>
        <Appbar.Action icon={require('../assets/icons/menu.png')} onPress={() => { }} />
      </Appbar.Header>
      <View style = {homeStyle.container}>
        <Text>AAAA</Text>
      </View>
    </SafeAreaView>
  );
}
