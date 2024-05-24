import { Text, View, SafeAreaView, TextInput, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { homeStyle } from '../styles/home';
import UserData from '../utils/userdata';

export default function HomeScreen({ route }) {
  const user : UserData = route.params['user'];

  return (
    <SafeAreaView style={homeStyle.container}>
        <Text>{user.email}</Text>
    </SafeAreaView>
  );
}
