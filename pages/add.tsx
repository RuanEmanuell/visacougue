import { SafeAreaView, Dimensions, ScrollView, View, Text, Image } from 'react-native';
import React, { useState } from 'react';
import UserData from '../utils/userdata';
import { Appbar, FAB } from 'react-native-paper';
import { homeStyle } from '../styles/home';
import DSGovInput from '../components/input';
import DSGovButton from '../components/button';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db, storage } from '../utils/firebaseconfig';
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';


export default function AddScreen({ route, navigation }) {
  const user: UserData = route.params['userData'];

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const [blockName, setBlockName] = useState('');
  const [blockImage, setBlockImage] = useState<null | string>(null);

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    setBlockImage(result.assets![0].uri);
  }

  async function uploadImage(uri:string, blockNumber: number) {
    let downloadURL : string | null = null;
    try {
      const storageRef = ref(getStorage(), `blockImages/${blockNumber}`);
      const response = await fetch(uri);
      const blob = await response.blob();
      await uploadBytes(storageRef, blob);

      downloadURL = await getDownloadURL(storageRef);
    } catch (error) {
      console.error('Ocorreu um erro:', error);
      alert('Ocorreu um erro: ' + error.message);
    }
    return downloadURL;
  }

  async function addBlock() {
    try {
      const queryBlocks = await getDocs(collection(db, 'blocks'));
      const blockNumber = queryBlocks.docs.length + 1;
      const image = await uploadImage(blockImage!, blockNumber);
      await addDoc(collection(db, 'blocks'), {
        name: blockName,
        index: blockNumber,
        image: image
      });
      navigation.navigate('info', { userData: user })
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ScrollView contentContainerStyle={{ backgroundColor: '#fff', flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: '#fff' }}>
        <Appbar.Action icon='arrow-left' onPress={() => { navigation.navigate('info', { userData: user }) }} />
        <Appbar.Content title='Adicionar bloco' titleStyle={{ textAlign: 'center', fontWeight: 'bold' }} />
      </Appbar.Header>
      <SafeAreaView style={homeStyle.container}>
        <View style={{ borderColor: 'black', borderWidth: 3, width: windowWidth / 1.2, height: windowHeight / 2.5, display: 'flex', alignItems: 'center', paddingTop: 10 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Nome do bloco:</Text>
          <DSGovInput
            placeholder='Digite o nome do bloco...'
            onChangeText={(text) => { setBlockName(text) }}
          />
          {blockImage ? <Image source={{ uri: blockImage }} style={{ marginTop: windowHeight / 50, width: '66%', height: '50%', resizeMode: 'contain' }} /> :
            <View style={{ marginTop: windowHeight / 50, backgroundColor: 'lightgray', width: '66%', height: '50%', justifyContent: 'center', alignItems: 'center' }}>
              <MaterialIcons name={'photo'} color='black' size={96} style={{ marginRight: 12 }}></MaterialIcons>
            </View>}
          <DSGovButton primary label='Adicionar imagem' onPress={pickImage} />
        </View>
        <FAB
          style={{ backgroundColor: '#1351B4', position: 'absolute', bottom: 0, alignSelf: 'center', marginBottom: 20 }}
          color='white'
          icon='content-save'
          onPress={addBlock}
        />
      </SafeAreaView>
    </ScrollView>
  );
}
