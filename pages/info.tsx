import { Text, View, SafeAreaView, Pressable, Dimensions, FlatList, Image, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Appbar, FAB, Icon } from 'react-native-paper';
import DSGovInput from '../components/input';
import { db } from '../utils/firebaseconfig';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import LoadingCircle from '../components/loading';
import DSGovButton from '../components/button';
import Block from '../utils/block';
import UserData from '../utils/userdata';

export default function InfoScreen({ route, navigation }) {
  const user: UserData = route.params['userData'];

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const [blocks, setBlocks] = useState<Block[]>([]);

  async function fetchData() {
    try {
      const queryBlocks = await getDocs(collection(db, 'blocks'));
      const blockList = queryBlocks.docs.map(block => ({ id: block.id, ...block.data() }));
      setBlocks(blockList as Block[]);
    } catch (error) {
      console.error(error);
    }
  }

  async function addBlock() {
    try {
      await addDoc(collection(db, 'blocks'), {
        name: 'Equipamentos, Móveis e Utensílios',
        index: 2,
        image: 'https://cdn-icons-png.flaticon.com/512/3095/3095286.png'
      });
      fetchData();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    setBlocks([]);
    fetchData();
  }, []);

  return (
    <View style={{ backgroundColor: '#fff', flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: '#fff' }}>
        <Appbar.Action icon='arrow-left' onPress={() => { navigation.navigate('home', { userData: user }) }} />
        <Appbar.Content title='Informativo' titleStyle={{ textAlign: 'center', fontWeight: 'bold' }} />
      </Appbar.Header>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <FlatList
            style={{ flex: 1, width: '100%' }}
            data={blocks}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={
              <View style = {{width: '100%', alignItems: 'center'}}>
              <DSGovInput
                onChangeText={() => { }}
                secureTextEntry={false}
                placeholder='Buscar uma informação...'
              />
              </View>
            }
            renderItem={({ item }) => (
              <View style={{ borderColor: 'black', borderWidth: 2, height: windowHeight / 4, width: '85%', alignSelf: 'center', marginVertical: windowHeight / 30 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: 'center', marginTop: 5 }}>{item.name}</Text>
                <Text style={{ color: 'grey', fontWeight: 'bold', fontSize: 16, position: 'absolute', bottom: 0, left: 5, marginBottom: 5 }}>Bloco {item.index}</Text>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '85%', width: '100%' }}>
                  <Image source={{ uri: item.image }} style={{ width: '66%', height: '66%', resizeMode: 'contain' }} />
                  <DSGovButton
                    primary
                    label='Acessar'
                    onPress={() => { }}
                  />
                </View>
                <Pressable onPress={() => { }} style={{ position: 'absolute', bottom: 0, right: 5, marginBottom: 5 }}>
                  <Icon source='circle-edit-outline' size={36} />
                </Pressable>
              </View>
            )}
            ListEmptyComponent={<LoadingCircle/>}
          />
            <View style = {{paddingBottom: windowHeight/30}}>
              <FAB
                style={{ backgroundColor: '#1351B4', position: 'absolute', bottom: 0, alignSelf: 'center' }}
                color='white'
                icon='plus'
                onPress={() => { navigation.navigate('add', { userData: user }) }}
              />
              </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
