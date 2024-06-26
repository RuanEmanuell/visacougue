import { Text, View, SafeAreaView, Dimensions, ScrollView } from 'react-native';
import React, { useState } from 'react';
import UserData from '../utils/interfaces/userdata';
import { Appbar } from 'react-native-paper';
import { homeStyle } from '../styles/home';
import { MaterialIcons } from '@expo/vector-icons';
import HomeOption from '../components/option';
import CustomDrawer from '../components/drawer';
import DrawerOption from '../components/draweroption';

export default function HomeScreen({ route, navigation }) {
  const user: UserData = route.params['userData'];

  const windowHeight = Dimensions.get('window').height;

  const [drawerVisible, setDrawerVisible] = useState(false);

  function switchDrawerVisibility(){
    setDrawerVisible(prev => !prev);
  }

  function logoutUser(){
    switchDrawerVisibility();
    navigation.push('login');
  }

  return (
    <ScrollView contentContainerStyle={{ backgroundColor: '#fff', flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: '#fff' }}>
        <Appbar.Action icon='menu' onPress={switchDrawerVisibility} />
      </Appbar.Header>
      <CustomDrawer visible={drawerVisible}>
        <DrawerOption label='Informativo' icon='book' onPress={() => navigation.navigate('informative', { userData: user })} />
        <DrawerOption label='Simulador' icon='computer' onPress={() => { navigation.navigate('simulator', { userData: user }) }} />
        <DrawerOption label='Configurações' icon='settings' onPress={() => {}} />
        <DrawerOption label='Sair' icon= 'logout' onPress={logoutUser} />
      </CustomDrawer>
      <SafeAreaView style={homeStyle.container}>
        <View style={{ margin: 'auto', alignItems: 'center', display: 'flex' }}>
          <View style={homeStyle.userCircle}>
            <MaterialIcons name='person' size={96} color='black'></MaterialIcons>
          </View>
          <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>{user.displayName}</Text>
          <Text style={{ fontSize: 32, fontWeight: 'bold', textAlign: 'center', margin: 10 }}>O que você quer fazer hoje?</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'space-evenly', display: 'flex', paddingVertical: windowHeight / 20 }}>
          <HomeOption onPress={() => { navigation.navigate('informative', { userData: user }) }} label="Informativo" color="#0066FF" icon="book" />
          <HomeOption onPress={() => { navigation.navigate('simulator', { userData: user }) }} label="Simulador" color="#CA0000" icon="computer" />
          <HomeOption onPress={() => { }} label="Configurações" color="#9E9FA0" icon="settings" />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
