import { Text, View, SafeAreaView, TextInput, Pressable, Dimensions, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import UserData from '../utils/userdata';
import { Appbar, FAB, Icon } from 'react-native-paper';
import { homeStyle } from '../styles/home';
import DSGovInput from '../components/input';
import { db } from '../utils/firebaseconfig';
import { addDoc, collection, getDocs } from 'firebase/firestore';

export default function InfoScreen({ route, navigation }) {
  const user: UserData = route.params['userData'];

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const [blocks, setBlocks]: any = useState([]);

  async function fetchData() {
    try {
      const queryBlocks = await getDocs(collection(db, 'blocks'));
      const blockList = queryBlocks.docs.map(block => ({ id: block.id, ...block.data() }));
      setBlocks(blockList);
    } catch (error) {
      console.error(error);
    }
  }

  async function addBlock() {
    try {
      await addDoc(collection(db, 'blocks'), {
        blockIndex: 2,
        name: 'Equipamentos, Móveis e Utensílios'
      })
      fetchData();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={{ backgroundColor: '#fff', flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: '#fff' }}>
        <Appbar.Action icon='arrow-left' onPress={() => { navigation.navigate('home', { user: user }) }} />
        <Appbar.Content title='Informativo' titleStyle={{ textAlign: 'center', fontWeight: 'bold' }}></Appbar.Content>
      </Appbar.Header>
      <SafeAreaView style={homeStyle.container}>
        <DSGovInput onChangeText={() => { }} secureTextEntry={false} placeholder='Buscar uma informação...'></DSGovInput>
        {blocks ?
        <FlatList
        style = {{width: '100%', marginTop: 20}}
          data={blocks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ borderColor: 'black', borderWidth: 2, height: windowHeight/3.5, width: '85%', alignSelf: 'center', marginVertical: windowHeight/30 }}>
              <Text style = {{fontWeight: 'bold', fontSize: 16, textAlign: 'center'}}>{item.name}</Text>
              <Text style = {{color: 'grey', fontWeight: 'bold', fontSize: 16, position: 'absolute', bottom: 0, left: 5}}>Bloco {item.blockIndex}</Text>
              <Pressable onPress={() => {}} style = {{position : 'absolute', bottom: 0, right: 5}}>
                <Icon source = 'circle-edit-outline' size = {36}></Icon>
              </Pressable>
            </View>
          )}
        /> : <ActivityIndicator size='large' color='#1351B4' />}
      <FAB
        style={{ backgroundColor: '#1351B4', position: 'absolute', bottom: 2}}
        color='white'
        icon='plus'
        onPress={addBlock}
      />
      </SafeAreaView>
    </View>
  );
}
