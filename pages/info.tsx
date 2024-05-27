import { Text, View, SafeAreaView, TextInput, Pressable, Dimensions, ScrollView, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import UserData from '../utils/userdata';
import { Appbar } from 'react-native-paper';
import { homeStyle } from '../styles/home';
import DSGovInput from '../components/input';
import { db } from '../utils/firebaseconfig';
import { collection, getDocs } from 'firebase/firestore';

export default function InfoScreen({ route, navigation }) {
  const user: UserData = route.params['user'];

  const [blocks, setBlocks] : any = useState([]);

  async function fetchData(){
    try {
      const queryBlocks = await getDocs(collection(db, 'blocks'));
      const blockList = queryBlocks.docs.map(block => ({id: block.id, ...block.data()}));
      setBlocks(blockList);
    } catch (error) {
      console.error(error); 
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={{ backgroundColor: '#fff', flex: 1 }}>
      <Appbar.Header style = {{backgroundColor: '#fff'}}>
        <Appbar.Action icon='arrow-left' onPress={() => {navigation.navigate('home', {user: user})}} />
        <Appbar.Content title = 'Informativo' titleStyle = {{textAlign: 'center', fontWeight: 'bold'}}></Appbar.Content>
      </Appbar.Header>
      <SafeAreaView style={homeStyle.container}>
        <DSGovInput onChangeText={() => {}} secureTextEntry = {false} placeholder='Buscar uma informação...'></DSGovInput>
      </SafeAreaView>
      <FlatList
      data={blocks}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => (
        <View style = {{borderColor: 'black', borderWidth: 2}}>
          <Text>Bloco {item.blockIndex}</Text>
          <Text>{item.name}</Text>
        </View>
      )}
      >

      </FlatList>
    </View>
  );
}
