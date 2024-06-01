import { SafeAreaView, Dimensions, ScrollView, View, Text, Image, Pressable, Modal, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import UserData from '../utils/userdata';
import { Appbar, FAB } from 'react-native-paper';
import { homeStyle } from '../styles/home';
import DSGovInput from '../components/input';
import DSGovButton from '../components/button';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db, storage } from '../utils/firebaseconfig';
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import Block from '../utils/block';
import LoadingCircle from '../components/loading';
import getCurrentTime from '../utils/gettime';


export default function AddBlockScreen({ route, navigation }) {
  const user: UserData = route.params['userData'];
  let blockToEdit: Block | null = route.params['blockData'];

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const [mode, setMode] = useState('add');
  const [blockName, setBlockName] = useState('');
  const [blockImage, setBlockImage] = useState<null | string>(null);
  const [blockIndex, setBlockIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [deleteBlockModalVisible, setDeleteBlockModalVisible] = useState(false);

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    setBlockImage(result.assets![0].uri);
  }

  async function uploadImage(uri: string, blockNumber: number) {
    let downloadURL: string | null = null;
    try {
      const storageRef = ref(getStorage(), `blockImages/${blockNumber}/blockMainImage`);
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
    if (blockName == '') {
      Alert.alert(
        'Aviso',
        'Digite um nome para o bloco!'
      );
    } else if (!blockImage) {
      Alert.alert(
        'Aviso',
        'Digite uma imagem para o bloco!'
      );
    } else {
      setLoading(true);
      try {
        const queryBlocks = await getDocs(collection(db, 'blocks'));
        const blockNumber = queryBlocks.docs.length + 1;
        const image = await uploadImage(blockImage!, blockNumber);
        await addDoc(collection(db, 'blocks'), {
          name: blockName,
          index: blockIndex,
          image: image,
          creationUser: user.uid,
          modificationUser: user.uid,
          creationDate: getCurrentTime(),
          modificationDate: getCurrentTime()
        });
      } catch (error) {
        console.error('Ocorreu um erro ao adicionar o bloco:', error);
        alert('Ocorreu um erro ao adicionar o bloco: ' + error.message);
      }
      setLoading(false);
      returnToBlocksScreen();
    }
  }

  async function editBlock() {
    const currentDate = new Date();
    setLoading(true);
    try {
      const blockRef = doc(db, 'blocks', blockToEdit!.id);
      const image = blockImage !== blockToEdit!.image ? await uploadImage(blockImage!, blockToEdit!.index) : blockToEdit!.image;
      await updateDoc(blockRef, {
        name: blockName,
        index: blockIndex,
        image: image,
        modificationUser: user.uid,
        modificationDate: getCurrentTime()
      });
    } catch (error) {
      console.error('Ocorreu um erro ao editar o bloco:', error);
      alert('Ocorreu um erro ao editar o bloco: ' + error.message);
    }
    setLoading(false);
    returnToBlocksScreen();
  }

  async function deleteBlock() {
    setLoading(true);
    switchModalVisibility();
    try {
      const blockRef = doc(db, 'blocks', blockToEdit!.id);
      await deleteDoc(blockRef);
    } catch (error) {
      console.error('Ocorreu um erro ao editar o bloco:', error);
      alert('Ocorreu um erro ao editar o bloco: ' + error.message);
    }
    setLoading(false);
    returnToBlocksScreen();
  }

  function switchModalVisibility() {
    setDeleteBlockModalVisible(prev => !prev);
  }

  async function getNewBlockIndex() {
    const queryBlocks = await getDocs(collection(db, 'blocks'));
    const blockNumber : number = queryBlocks.docs.length + 1;
    return blockNumber;
  }

  function resetBlockData() {
    blockToEdit = null;
    setMode('add');
    setBlockImage(null);
    setBlockName('');
    setBlockIndex(getNewBlockIndex());
  }

  function returnToBlocksScreen() {
    navigation.push('informative', { userData: user });
    resetBlockData();
  }

  async function increaseBlockIndex(){
    let currentBlockIndex = await getNewBlockIndex();
    if(blockIndex < currentBlockIndex){
    setBlockIndex(prev => prev + 1);
    }
  }

  async function decreaseBlockIndex(){
    let currentBlockIndex = await blockIndex;
    if(currentBlockIndex > 1){
      currentBlockIndex--;
    setBlockIndex(currentBlockIndex);
    }
  }

  useEffect(() => {
    if (blockToEdit) {
      setMode('edit');
      setBlockName(blockToEdit.name);
      setBlockImage(blockToEdit.image);
      setBlockIndex(blockToEdit.index);
    } else {
      setBlockIndex(getNewBlockIndex());
    }
  }, []);

  return (
    <ScrollView contentContainerStyle={{ backgroundColor: '#fff', flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: '#fff' }}>
        <Appbar.Action icon='arrow-left' onPress={returnToBlocksScreen} />
        <Appbar.Content title={mode == 'add' ? 'Adicionar bloco' : 'Editar Bloco'} titleStyle={{ textAlign: 'center', fontWeight: 'bold' }} />
      </Appbar.Header>
      <SafeAreaView style={homeStyle.container}>
        {!loading ?
          <>
            <View style={{ borderColor: 'black', borderWidth: 3, width: windowWidth / 1.1, height: windowHeight / 2, display: 'flex', alignItems: 'center', paddingTop: 10 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Nome do bloco:</Text>
              <DSGovInput
                placeholder='Digite o nome do bloco...'
                value={blockName}
                onChangeText={(text) => { setBlockName(text) }}
              />
              {blockImage ? <Image source={{ uri: blockImage }} style={{ marginTop: windowHeight / 50, width: '66%', height: '50%', resizeMode: 'contain' }} /> :
                <View style={{ marginTop: windowHeight / 50, backgroundColor: 'lightgray', width: '66%', height: '50%', justifyContent: 'center', alignItems: 'center' }}>
                  <MaterialIcons name='photo' color='black' size={96} style={{ marginRight: 12 }} />
                </View>}
              <DSGovButton primary label={mode == 'add' ? 'Adicionar imagem' : 'Editar imagem'} onPress={pickImage} />
              <View style={{ display: 'flex', flexDirection: 'row', position: 'absolute', bottom: 0, left: 5, marginBottom: 5, alignItems: 'center' }}>
                <Text style={{ color: 'grey', fontWeight: 'bold', fontSize: 16 }}>Bloco {blockIndex}</Text>
                <Pressable onPress = {increaseBlockIndex}>
                  <MaterialIcons name='arrow-upward' size={24} style={{ color: 'grey' }} />
                </Pressable>
                <Pressable onPress = {decreaseBlockIndex}>
                  <MaterialIcons name='arrow-downward' size={24} style={{ color: 'grey' }} />
                </Pressable> 
              </View>
              {mode == 'edit' ?
                <Pressable onPress={switchModalVisibility} style={{ position: 'absolute', top: 5, right: 5 }}>
                  <MaterialIcons name='delete-outline' color='#d8504d' size={32} />
                </Pressable> : <></>}
            </View>
            <FAB
              style={{ backgroundColor: '#1351B4', position: 'absolute', bottom: 0, alignSelf: 'center', marginBottom: 20 }}
              color='white'
              icon='content-save'
              onPress={mode == 'add' ? addBlock : editBlock}
            />
          </>
          : <LoadingCircle />}
      </SafeAreaView>
      <Modal visible={deleteBlockModalVisible} transparent={true}>
        <View style={{ backgroundColor: 'rgba(135, 132, 133, 0.66)', flex: 1, justifyContent: 'center' }}>
          <View style={{ backgroundColor: 'white', borderColor: 'black', borderWidth: 2, display: 'flex', alignItems: 'center', paddingVertical: 20, paddingHorizontal: 10, marginHorizontal: 10 }}>
            <Text style={{ textAlign: 'center' }}>Deseja mesmo apagar esse bloco? (Todas as informações contidas nele também serão apagadas)</Text>
            <DSGovButton
              primary
              label='Sim'
              onPress={deleteBlock}
              block
            />
            <DSGovButton
              label='Não'
              secondary
              onPress={switchModalVisibility}
              block
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
