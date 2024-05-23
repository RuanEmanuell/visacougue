import { Text, View, SafeAreaView, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';
import { User } from 'firebase/auth';

export default function HomeScreen({route}) {
  const user = route.params;
  return (
    <SafeAreaView>
      <View>
       <Text>{user.displayName}</Text>
      </View>
    </SafeAreaView>
  );
}
