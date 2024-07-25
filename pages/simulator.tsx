import { SafeAreaView, Dimensions, ScrollView, View, Text } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import UserData from '../utils/interfaces/userdata';
import { Appbar, Checkbox } from 'react-native-paper';
import { simulatorInfo, simulatorInfoMap } from '../utils/info/simulator';
import DSGovButton from '../components/button';

export default function SimulatorScreen({ route, navigation }) {
    const user: UserData = route.params['userData'];

    const windowHeight = Dimensions.get('window').height;

    const scrollRef = useRef<ScrollView>(null);

    const [concludedPercentage, setConcludedPercentage] = useState(0);
    const [currentSimulatorInfo, setCurrentSimulatorInfo] = useState(0);

    function setNewSimulatorPercentage(){
        scrollRef.current?.scrollTo({ y: 0, animated: true });
        setConcludedPercentage(prev => prev < 80 ? prev  + 16 : 100);
        setCurrentSimulatorInfo(prev => prev < 5 ? prev + 1 : prev);
    }

    return (
        <ScrollView contentContainerStyle={{ backgroundColor: '#fff', flexGrow: 1 }} ref={scrollRef}>
            <Appbar.Header style={{ backgroundColor: '#fff' }}>
                <Appbar.Action icon='arrow-left' onPress={() => { navigation.navigate('home', { userData: user }) }} />
                <Appbar.Content title='Simulador' titleStyle={{ textAlign: 'center', fontWeight: 'bold' }} />
            </Appbar.Header>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center', width: '100%' }}>
                <Text style={{ fontWeight: 'bold' }}>{concludedPercentage}% concluído</Text>
                <View style={{ borderColor: 'black', borderWidth: 2, width: '80%', height: 30, marginTop: 5 }}>
                    <View style = {{backgroundColor: 'green', width: `${concludedPercentage}%`, height: 26}}></View>
                </View>
                <Text style={{ fontWeight: 'bold', marginTop: 30, marginBottom: 10 }}>Perguntas de {simulatorInfoMap[currentSimulatorInfo]}</Text>
                <View style={{ borderColor: 'black', borderWidth: 2, marginHorizontal: 30, paddingVertical: 10, marginVertical: 10 }}>
                    {simulatorInfo[simulatorInfoMap[currentSimulatorInfo]].map((item, key) => (
                        <View style={{ display: 'flex', width: '100%' }}>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginVertical: 5, marginRight: 40 }}>
                                <Checkbox status='checked' color='#1351B4'/>
                                <Text key={key}>{item}</Text>
                            </View>
                        </View>
                    ))}
                </View>
                <DSGovButton
                label='Continuar'
                primary
                onPress={setNewSimulatorPercentage}
                />
            </SafeAreaView>
        </ScrollView>
    );
}
