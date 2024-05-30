import { TextInput } from "react-native";
import React from "react";

interface inputProps {
    onChangeText: (arg: string) => any,
    secureTextEntry?: boolean,
    placeholder: string,
    value: string
}

export default function DSGovInput({ onChangeText, secureTextEntry, placeholder, value }: inputProps) {
    return (
        <TextInput
        value = {value}
        placeholder={placeholder}
        onChangeText={text => onChangeText(text)}
        secureTextEntry={secureTextEntry ? secureTextEntry : false}
        style={{
            borderColor: 'black',
            borderWidth: 1,
            borderRadius: 5,
            color: 'black',
            fontSize: 20,
            fontWeight: 'bold',
            width: '75%',
            height: 48,
            marginTop: 16,
            paddingLeft: 16
        }}></TextInput>
    )
}