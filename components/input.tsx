import { TextInput, View, Pressable } from "react-native";
import React, { useState } from "react";
import FontAwesome from '@expo/vector-icons/build/FontAwesome';

interface inputProps {
    onChangeText: (arg: string) => any,
    secureTextEntry?: boolean,
    placeholder: string,
    value: string,
    multiline?: boolean,
    textAlign?: string,
    maxLength?: number
}

export default function DSGovInput({ onChangeText, secureTextEntry, placeholder, value, multiline, textAlign, maxLength }: inputProps) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(secureTextEntry ? !secureTextEntry : false);

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', borderColor: 'black', borderWidth: 1, borderRadius: 5, width: '75%', marginTop: 16 }}>
            <TextInput
                value={value}
                placeholder={placeholder}
                onChangeText={text => onChangeText(text)}
                secureTextEntry={secureTextEntry ? isPasswordVisible : false}
                multiline={multiline ? multiline : false}
                maxLength={maxLength ? maxLength : 10000}
                style={{
                    color: 'black',
                    fontSize: 20,
                    fontWeight: 'bold',
                    height: multiline ? 'auto' : 48,
                    minHeight: multiline ? 72 : 48,
                    paddingHorizontal: 8,
                    flex: 1,
                    textAlign: textAlign ? textAlign : 'start'
                }}
            />
            {secureTextEntry && (
                <Pressable onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={{ padding: 8 }}>
                    <FontAwesome name={isPasswordVisible ? 'eye' : 'eye-slash'} size={24} color='grey' />
                </Pressable>
            )}
        </View>
    );
}
