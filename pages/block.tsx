import { Text, View, SafeAreaView, Pressable, Dimensions, FlatList, Image, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Appbar, FAB, Icon } from 'react-native-paper';
import DSGovInput from '../components/input';
import { db } from '../utils/firebaseconfig';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import LoadingCircle from '../components/loading';
import DSGovButton from '../components/button';
import Block from '../utils/block';
import UserData from '../utils/userdata';
import Info from '../utils/info';

export default function BlockScreen({ route, navigation }) {
  const user: UserData = route.params['userData'];
  const blockData: Block = route.params['blockData'];

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const [searchValue, setSearchValue] = useState('');
  const [blockInfos, setBlockInfos] = useState<Info[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    setLoading(true);
    try {
      const queryBlocks = query(collection(db, 'infos'), where('blockId', '==', blockData.id));
      const querySnapshot = await getDocs(queryBlocks);
      const infoList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Info[];
      infoList.sort((a, b) => a.index - b.index);
      setBlockInfos(infoList);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }
  

  useEffect(() => {
    setBlockInfos([]);
    fetchData();
  }, []);

  return (
    <View style={{ backgroundColor: '#fff', flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: '#fff' }}>
        <Appbar.Action icon='arrow-left' onPress={() => { navigation.navigate('info', { userData: user }) }} />
        <Appbar.Content title={`Bloco ${blockData.index} - ${blockData.name}`} titleStyle={{ textAlign: 'center', fontWeight: 'bold' }} />
      </Appbar.Header>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          {!loading ?
            <FlatList
              style={{ flex: 1, width: '100%' }}
              data={blockInfos}
              keyExtractor={(item) => item.id}
              ListHeaderComponent={
                <View style={{ width: '100%', alignItems: 'center' }}>
                  <DSGovInput
                    onChangeText={(text) => {setSearchValue(text)}}
                    value = {searchValue}
                    secureTextEntry={false}
                    placeholder='Buscar uma informação...'
                  />
                </View>
              }
              renderItem={({ item }) => (
                <View style={{ borderColor: 'black', borderWidth: 2, height: windowHeight / 3, width: '85%', alignSelf: 'center', marginVertical: windowHeight / 30 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: 'center', marginVertical: 10 }}>{item.name}</Text>
                  <Text style={{ color: 'grey', fontWeight: 'bold', fontSize: 16, position: 'absolute', bottom: 0, left: 5, marginBottom: 5 }}>Informação {item.index}</Text>
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '85%', width: '100%' }}>
                    <Image source={{ uri: item.image }} style={{ width: '66%', height: '66%', resizeMode: 'contain' }} />
                    <DSGovButton
                      primary
                      label='Acessar'
                      onPress={() => { }}
                    />
                  </View>
                  <Pressable onPress={() => { navigation.push('addinfo', { blockData: item, userData: user, infoData: item}) }} style={{ position: 'absolute', bottom: 0, right: 5, marginBottom: 5 }}>
                    <Icon source='circle-edit-outline' size={36} />
                  </Pressable>
                </View>
              )}
              ListEmptyComponent={
                <Text style={{ marginTop: 20, textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Ainda não há nenhuma informação nesse bloco...</Text>
              }
            /> : <LoadingCircle />}
          <View style={{ paddingBottom: windowHeight / 30 }}>
            <FAB
              style={{ backgroundColor: '#1351B4', position: 'absolute', bottom: 5, alignSelf: 'center' }}
              color='white'
              icon='plus'
              onPress={() => { navigation.navigate('addinfo', { userData: user, blockData: blockData }) }}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
