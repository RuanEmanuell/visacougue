import { Text, View, SafeAreaView, Dimensions, Image } from 'react-native';
import React, { useState } from 'react';
import { Appbar } from 'react-native-paper';
import Info from '../utils/info';
import UserData from '../utils/userdata';
import Block from '../utils/block';
import DSGovButton from '../components/button';

export default function InfoScreen({ route, navigation }) {
    const user: UserData = route.params['userData'];
    const blockData: Block = route.params['blockData'];
    const infoData = route.params['infoData'];

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [searchValue, setSearchValue] = useState('');
    const [blockInfos, setBlockInfos] = useState<Info[]>([]);
    const [loading, setLoading] = useState(false);

    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <Appbar.Header style={{ backgroundColor: '#fff' }}>
                <Appbar.Action icon='arrow-left' onPress={() => { navigation.goBack() }} />
                <Appbar.Content title={`Informativo`} titleStyle={{ textAlign: 'center', fontWeight: 'bold' }} />
            </Appbar.Header>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ width: '85%', alignSelf: 'center', marginVertical: windowHeight / 30 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 32, textAlign: 'center', marginVertical: 10, color: '#0066FF' }}>{infoData.name}</Text>
                    <Image source={{ uri: infoData.image }} style={{ borderColor: 'black', borderWidth: 2, width: '100%', height: '50%', resizeMode: 'cover', alignSelf: 'center' }} />
                    <Text style={{ textAlign: 'center', marginTop: 20, fontWeight: 'bold' }}>{infoData.description}</Text>
                    <DSGovButton
                        label='Voltar'
                        secondary
                        onPress={() => { navigation.goBack() }}
                    />
                </View>
            </SafeAreaView>
        </View>
    );
}
