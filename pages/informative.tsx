import { Text, View, SafeAreaView, Pressable, Dimensions, FlatList, Image, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
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
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  let originalBlockList : Block[];

  async function fetchData() {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'blocks'));
      const blockList = querySnapshot.docs.map(block => ({ id: block.id, ...block.data() })) as Block[];
      blockList.sort((a, b) => a.index - b.index );
      setBlocks(blockList);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  function searchBlock(){
    setBlocks(prev => prev.filter(block => block.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())));
  }

  useEffect(() => {
    setBlocks([]);
    fetchData();
  }, []);

  return (
    <View style={{ backgroundColor: '#fff', flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: '#fff' }}>
      <Appbar.Action icon='arrow-left' onPress={() => { navigation.navigate('home', { userData: user }) }} />
      <Appbar.Content title='Informativo - Blocos' titleStyle={{ textAlign: 'center', fontWeight: 'bold' }} />
      </Appbar.Header>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          {!loading ?
            <FlatList
              style={{ flex: 1, width: '100%' }}
              data={blocks}
              keyExtractor={(item) => item.id}
              ListHeaderComponent={
                <View style={{ width: '100%', alignItems: 'center' }}>
                  <DSGovInput
                    onChangeText={(text) => {setSearchValue(text); searchBlock()}}
                    value = {searchValue}
                    secureTextEntry={false}
                    placeholder='Buscar um bloco...'
                  />
                </View>
              }
              renderItem={({ item }) => (
                <View style={{ borderColor: 'black', borderWidth: 2, height: windowHeight / 3, width: '85%', alignSelf: 'center', marginVertical: windowHeight / 30 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: 'center', marginVertical: 10 }}>{item.name}</Text>
                  <Text style={{ color: 'grey', fontWeight: 'bold', fontSize: 16, position: 'absolute', bottom: 0, left: 5, marginBottom: 5 }}>Bloco {item.index}</Text>
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '85%', width: '100%' }}>
                    <Image source={{ uri: item.image }} style={{ width: '66%', height: '66%', resizeMode: 'contain' }} />
                    <DSGovButton
                      primary
                      label='Acessar'
                      onPress={() => {navigation.navigate('block', {userData: user, blockData: item})}}
                    />
                  </View>
                  <Pressable onPress={() => { navigation.push('addblock', { blockData: item, userData: user}) }} style={{ position: 'absolute', bottom: 0, right: 5, marginBottom: 5 }}>
                    <Icon source='circle-edit-outline' size={36} />
                  </Pressable>
                </View>
              )}
              ListEmptyComponent={
                <Text style={{ marginTop: 20, textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Ainda não há nenhum bloco...</Text>
              }
            /> : <LoadingCircle />}
          <View style={{ paddingBottom: windowHeight / 30 }}>
            <FAB
              style={{ backgroundColor: '#1351B4', position: 'absolute', bottom: 5, alignSelf: 'center' }}
              color='white'
              icon='plus'
              onPress={() => { navigation.navigate('addblock', { userData: user }) }}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
