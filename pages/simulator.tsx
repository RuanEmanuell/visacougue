import React, { useState, useRef } from 'react';
import { SafeAreaView, ScrollView, View, Text, Dimensions, Pressable } from 'react-native';
import { Appbar, Checkbox } from 'react-native-paper';
import DSGovButton from '../components/button';
import { simulatorInfo, simulatorInfoMap } from '../utils/info/simulator';

export default function SimulatorScreen({ route, navigation }) {
    const user = route.params['userData'];
    const windowHeight = Dimensions.get('window').height;
    const scrollRef = useRef<ScrollView>(null);

    const [concludedPercentage, setConcludedPercentage] = useState(0);
    const [currentSimulatorInfo, setCurrentSimulatorInfo] = useState(0);
    const [checkboxStates, setCheckboxStates] = useState(
        Object.fromEntries(
            Object.entries(simulatorInfo).map(([section, items]) => 
                [section, Array(items.length).fill(false)]
            )
        )
    );

    function setNewSimulatorPercentage() {
        scrollRef.current?.scrollTo({ y: 0, animated: true });
        setConcludedPercentage(prev => prev < 75 ? prev + 15 : 100);
        setCurrentSimulatorInfo(prev => prev < 5 ? prev + 1 : prev);
    }

    function toggleCheckbox(section, index) {
        setCheckboxStates(prevState => ({
            ...prevState,
            [section]: prevState[section].map((checked, i) =>
                i === index ? !checked : checked
            )
        }));
    }

    function calculateSelectedCount(section) {
        return checkboxStates[section].filter(checked => checked).length;
    }

    function calculateRegularPercentage(section) {
        const total = checkboxStates[section].length;
        const selected = calculateSelectedCount(section);
        return (selected / total) * 100;
    }

    function renderSummary() {
        return (
            Object.keys(simulatorInfoMap).map(sectionIndex => {
                const section = simulatorInfoMap[sectionIndex];
                const selectedCount = calculateSelectedCount(section);
                const total = checkboxStates[section].length;
                const regularPercentage = calculateRegularPercentage(section).toFixed(2);

                return (
                    <View key={sectionIndex} style={{ marginVertical: 10, paddingHorizontal: 10 }}>
                        <Text style={{ fontWeight: 'bold' }}>{section}</Text>
                        <Text>Selecionados: {selectedCount} de {total}</Text>
                        <Text>Documentação regular: {regularPercentage}%</Text>
                    </View>
                );
            })
        );
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
                    <View style={{ backgroundColor: 'green', width: `${concludedPercentage}%`, height: 26 }}></View>
                </View>
                {concludedPercentage < 100 && 
                <>
                <Text style={{ fontWeight: 'bold', marginTop: 30, marginBottom: 10 }}>
                    Perguntas de {simulatorInfoMap[currentSimulatorInfo]}
                </Text>
                <View style={{ borderColor: 'black', borderWidth: 2, marginHorizontal: 30, paddingVertical: 10, marginVertical: 10 }}>
                    {simulatorInfo[simulatorInfoMap[currentSimulatorInfo]].map((item, key) => (
                        <View style={{ display: 'flex', width: '100%' }} key={key}>
                            <Pressable onPress={() => toggleCheckbox(simulatorInfoMap[currentSimulatorInfo], key)}>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginVertical: 5, marginRight: 40 }}>
                                    <Checkbox
                                        status={checkboxStates[simulatorInfoMap[currentSimulatorInfo]][key] ? 'checked' : 'unchecked'}
                                        color='#1351B4'
                                    />
                                    <Text>{item}</Text>
                                </View>
                            </Pressable>
                        </View>
                    ))}
                </View>
                <DSGovButton
                    label='Continuar'
                    primary
                    onPress={setNewSimulatorPercentage}
                />
                </>}
                {concludedPercentage === 100 && (
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, alignSelf: 'center' }}>Resumo Final</Text>
                        <View style = {{borderWidth: 2, backgroundColor: '#ededed', width: '100%', marginTop: 10}}>
                            {renderSummary()}
                        </View>
                    </View>
                )}
            </SafeAreaView>
        </ScrollView>
    );
}
