import { SafeAreaView, Dimensions, ScrollView, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import UserData from '../utils/interfaces/userdata';
import { Appbar } from 'react-native-paper';
import { homeStyle } from '../styles/home';
import { MaterialIcons } from '@expo/vector-icons';
import HomeOption from '../components/option';
import CustomDrawer from '../components/drawer';
import DrawerOption from '../components/draweroption';
import { removeUserInfo } from '../utils/functions/dbservice';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes, getStorage } from 'firebase/storage';
import { db } from '../utils/config/firebaseconfig';

export default function HomeScreen({ route, navigation }) {
  const user = route.params['userData'];
  const windowHeight = Dimensions.get('window').height;

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function switchDrawerVisibility(){
    setDrawerVisible(prev => !prev);
  }

  function logoutUser(){
    switchDrawerVisibility();
    removeUserInfo();
    navigation.push('login');
  }

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      await uploadImage(result.assets[0].uri);
    }
  }

  async function uploadImage(uri) {
    setLoading(true);
    try {
      const storageRef = ref(getStorage(), `users/${user.uid}/profile.jpg`);
      const response = await fetch(uri);
      const blob = await response.blob();
      await uploadBytes(storageRef, blob);

      const downloadURL = await getDownloadURL(storageRef);
      console.log('File available at', downloadURL);
      setImage(downloadURL);
    } catch (error : any) {
      console.error('Ocorreu um erro:', error);
      alert('Ocorreu um erro: ' + error.message);
    }
    setLoading(false);
  }

  async function fetchProfileImage() {
    try {
      const storageRef = ref(getStorage(), `users/${user.uid}/profile.jpg`);
      const imageUrl = await getDownloadURL(storageRef);
      setImage(imageUrl);
    } catch (error) {
      console.log("No profile image found.");
    }
  }

  useEffect(() => {
    fetchProfileImage();
  }, []);

  return (
    <ScrollView contentContainerStyle={{ backgroundColor: '#fff', flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: '#fff' }}>
        <Appbar.Action icon='menu' onPress={switchDrawerVisibility} />
      </Appbar.Header>
      <CustomDrawer visible={drawerVisible}>
        <DrawerOption label='Informativo' icon='book' onPress={() => navigation.navigate('informative', { userData: user })} />
        <DrawerOption label='Simulador' icon='computer' onPress={() => { navigation.navigate('simulator', { userData: user }) }} />
        <DrawerOption label='Configurações' icon='settings' onPress={() => { navigation.navigate('settings', { userData: user }) }} />
        <DrawerOption label='Sair' icon='logout' onPress={logoutUser} />
      </CustomDrawer>
      <SafeAreaView style={homeStyle.container}>
        <View style={{ margin: 'auto', alignItems: 'center', display: 'flex' }}>
          <TouchableOpacity onPress={pickImage}>
            {image ? (
              <Image source={{ uri: image }} style={[homeStyle.userCircle, {height: 96, width: 96}]} />
            ) : (
              <View style={homeStyle.userCircle}>
                <MaterialIcons name='person' size={96} color='black' />
              </View>
            )}
          </TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>{user.displayName}</Text>
          <Text style={{ fontSize: 32, fontWeight: 'bold', textAlign: 'center', margin: 10 }}>O que você quer fazer hoje?</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'space-evenly', display: 'flex', paddingVertical: windowHeight / 20 }}>
          <HomeOption onPress={() => { navigation.navigate('informative', { userData: user }) }} label="Informativo" color="#0066FF" icon="book" />
          <HomeOption onPress={() => { navigation.navigate('simulator', { userData: user }) }} label="Simulador" color="#CA0000" icon="computer" />
          <HomeOption onPress={() => { navigation.navigate('settings', { userData: user }) }} label="Configurações" color="#9E9FA0" icon="settings" />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
