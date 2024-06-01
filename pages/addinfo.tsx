import React, { useEffect, useState } from 'react';
import { SafeAreaView, Dimensions, ScrollView, View, Text, Image, Pressable, Modal, Alert } from 'react-native';
import { Appbar, FAB } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { db } from '../utils/firebaseconfig';
import DSGovInput from '../components/input';
import DSGovButton from '../components/button';
import LoadingCircle from '../components/loading';
import { homeStyle } from '../styles/home';
import Info from '../utils/info';
import Block from '../utils/block';
import UserData from '../utils/userdata';
import getCurrentTime from '../utils/gettime';

export default function AddInfoScreen({ route, navigation }) {
  const user: UserData = route.params['userData'];
  const block: Block = route.params['blockData'];
  let infoToEdit: Info | null = route.params['infoData'];

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const [mode, setMode] = useState('add');
  const [infoName, setInfoName] = useState('');
  const [infoDescription, setInfoDescription] = useState('');
  const [infoImage, setInfoImage] = useState<string | null>(null);
  const [infoIndex, setInfoIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [deleteInfoModalVisible, setDeleteInfoModalVisible] = useState(false);

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    setInfoImage(result.assets![0].uri);
  }

  async function uploadImage(uri: string, infoNumber: number) {
    let downloadURL: string | null = null;
    try {
      const storageRef = ref(getStorage(), `blockImages/${block.image}/infoImages/${infoNumber}`);
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

  async function addInfo() {
    if(infoName === ''){
      Alert.alert(
        'Aviso',
        'Digite um nome para a informação!'
      );
    } else if (!infoImage) {
      Alert.alert(
        'Aviso',
        'Selecione uma imagem para a informação!'
      );
    } else if (infoDescription === '') {
      Alert.alert(
        'Aviso',
        'Digite uma descrição para a informação!'
      );
    } else {
      setLoading(true);
      try {
        const queryInfos = await getDocs(collection(db, 'infos'));
        const infoNumber = queryInfos.docs.length + 1;
        const image = await uploadImage(infoImage!, infoNumber);
        await addDoc(collection(db, 'infos'), {
          blockId: block.id,
          name: infoName,
          index: infoIndex,
          image: image,
          description: infoDescription,
          creationUser: user.uid,
          modificationUser: user.uid,
          creationDate: getCurrentTime(),
          modificationDate: getCurrentTime()
        });
      } catch (error) {
        console.error('Ocorreu um erro ao adicionar a informação:', error);
        alert('Ocorreu um erro ao adicionar a informação: ' + error.message);
      }
      setLoading(false);
      returnToBlockScreen();
    }
  }

  async function editInfo() {
    setLoading(true);
    try {
      const infoRef = doc(db, 'infos', infoToEdit!.id);
      const image = infoImage !== infoToEdit!.image ? await uploadImage(infoImage!, infoToEdit!.index) : infoToEdit!.image;
      await updateDoc(infoRef, {
        name: infoName,
        index: infoIndex,
        image: image,
        description: infoDescription,
        modificationUser: user.uid,
        modificationDate: getCurrentTime()
      });
    } catch (error) {
      console.error('Ocorreu um erro ao editar a informação:', error);
      alert('Ocorreu um erro ao editar a informação: ' + error.message);
    }
    setLoading(false);
    returnToBlockScreen();
  }

  async function deleteInfo() {
    setLoading(true);
    switchModalVisibility();
    try {
      const infoRef = doc(db, 'infos', infoToEdit!.id);
      await deleteDoc(infoRef);
    } catch (error) {
      console.error('Ocorreu um erro ao deletar a informação:', error);
      alert('Ocorreu um erro ao deletar a informação: ' + error.message);
    }
    setLoading(false);
    returnToBlockScreen();
  }

  function switchModalVisibility() {
    setDeleteInfoModalVisible(prev => !prev);
  }

  async function getNewInfoIndex() {
    const queryInfos = await getDocs(collection(db, 'infos'));
    const infoNumber = queryInfos.docs.length + 1;
    setInfoIndex(infoNumber);
  }

  function resetInfoData() {
    infoToEdit = null;
    setMode('add');
    setInfoImage(null);
    setInfoName('');
    setInfoDescription('');
    getNewInfoIndex();
  }

  function returnToBlockScreen() {
    navigation.push('block', { userData: user, blockData: block });
    resetInfoData();
  }

  useEffect(() => {
    if (infoToEdit) {
      setMode('edit');
      setInfoName(infoToEdit.name);
      setInfoDescription(infoToEdit.description);
      setInfoImage(infoToEdit.image);
      setInfoIndex(infoToEdit.index);
    } else {
      getNewInfoIndex();
    }
  }, []);

  return (
    <ScrollView contentContainerStyle={{ backgroundColor: '#fff', flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: '#fff' }}>
        <Appbar.Action icon='arrow-left' onPress={returnToBlockScreen} />
        <Appbar.Content title={mode === 'add' ? 'Adicionar Informação' : 'Editar Informação'} titleStyle={{ textAlign: 'center', fontWeight: 'bold' }} />
      </Appbar.Header>
      <SafeAreaView style={homeStyle.container}>
        {!loading ?
          <>
            <View style={{ borderColor: 'black', borderWidth: 3, width: windowWidth / 1.1, height: 'auto', display: 'flex', alignItems: 'center', paddingTop: 10 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Nome da Informação:</Text>
              <DSGovInput
                placeholder='Digite o nome da informação...'
                value={infoName}
                onChangeText={(text) => { setInfoName(text) }}
              />
              <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 20 }}>Descrição:</Text>
              <DSGovInput
                placeholder='Digite a descrição da informação...'
                value={infoDescription}
                onChangeText={(text) => { setInfoDescription(text) }}
                multiline
                textAlign='star'
              />
              {infoImage ? <Image source={{ uri: infoImage }} style={{ marginTop: windowHeight / 50, width: '66%', height: '30%', resizeMode: 'contain' }} /> :
                <View style={{ marginTop: windowHeight / 50, backgroundColor: 'lightgray', width: '66%', height: '30%', justifyContent: 'center', alignItems: 'center' }}>
                  <MaterialIcons name='photo' color='black' size={96} style={{ marginRight: 12 }} />
                </View>}
              <DSGovButton primary label={mode === 'add' ? 'Adicionar imagem' : 'Editar imagem'} onPress={pickImage} />
              <Text style={{ color: 'grey', fontWeight: 'bold', fontSize: 16, position: 'absolute', bottom: 0, left: 5, marginBottom: 5 }}>Informação {infoIndex}</Text>
              {mode === 'edit' ?
                <Pressable onPress={switchModalVisibility} style={{ position: 'absolute', top: 5, right: 5 }}>
                  <MaterialIcons name='delete-outline' color='#d8504d' size={32} />
                </Pressable> : <></>}
            </View>
            <FAB
              style={{ backgroundColor: '#1351B4', position: 'absolute', bottom: 0, alignSelf: 'center', marginBottom: 20 }}
              color='white'
              icon='content-save'
              onPress={mode === 'add' ? addInfo : editInfo}
            />
          </>
          : <LoadingCircle />}
      </SafeAreaView>
      <Modal visible={deleteInfoModalVisible} transparent={true}>
        <View style={{ backgroundColor: 'rgba(135, 132, 133, 0.66)', flex: 1, justifyContent: 'center' }}>
          <View style={{ backgroundColor: 'white', borderColor: 'black', borderWidth: 2, display: 'flex', alignItems: 'center', paddingVertical: 20, paddingHorizontal: 10, marginHorizontal: 10 }}>
            <Text style={{ textAlign: 'center' }}>Deseja mesmo apagar essa informação?</Text>
            <DSGovButton
              primary
              label='Sim'
              onPress={deleteInfo}
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
