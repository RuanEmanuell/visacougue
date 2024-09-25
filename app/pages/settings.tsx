import { SafeAreaView, ScrollView, View, Text, Switch, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Appbar } from 'react-native-paper';
import DSGovButton from '../components/button';
import { saveUserSettings, getUserSettings, removeUserInfo } from '../utils/functions/dbservice';

export default function SettingsScreen({ navigation }) {
  const [saveLoginData, setSaveLoginData] = useState(false);

  async function fetchSettings() {
    const savedLoginData = await getUserSettings();
    setSaveLoginData(savedLoginData);
  }

  const handleSaveSettings = async () => {
    await saveUserSettings(saveLoginData);
    if (!saveLoginData) {
      await removeUserInfo();
    }
    alert('Configurações salvas!');
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <ScrollView contentContainerStyle={{ backgroundColor: '#fff', flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: '#fff' }}>
        <Appbar.Action icon='arrow-left' onPress={() => navigation.goBack()} />
        <Appbar.Content title="Configurações" />
      </Appbar.Header>
      <SafeAreaView style={{ flex: 1, padding: 20, margin: 20}}>
       <View style={{ marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Salvar dados de login</Text>
          <Switch
            value={saveLoginData}
            onValueChange={setSaveLoginData}
          />
        </View>
        <DSGovButton label='Salvar configurações' onPress={handleSaveSettings} primary block />
      </SafeAreaView>
    </ScrollView>
  );
}
