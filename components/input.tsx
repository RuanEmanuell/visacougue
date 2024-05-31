import { TextInput } from "react-native";
import React from "react";

interface inputProps {
    onChangeText: (arg: string) => any,
    secureTextEntry?: boolean,
    placeholder: string,
    value: string,
    multiline?: boolean,
    numberOfLines?: number
}

export default function DSGovInput({ onChangeText, secureTextEntry, placeholder, value, multiline, numberOfLines }: inputProps) {
    return (
        <TextInput
        value = {value}
        placeholder={placeholder}
        onChangeText={text => onChangeText(text)}
        secureTextEntry={secureTextEntry ? secureTextEntry : false}
        multiline = {multiline ? multiline : false}
        numberOfLines={numberOfLines ? numberOfLines : 1}
        style={{
            borderColor: 'black',
            borderWidth: 1,
            borderRadius: 5,
            color: 'black',
            fontSize: 20,
            fontWeight: 'bold',
            width: '75%',
            height: numberOfLines ? 16 * numberOfLines : 48,
            marginTop: 16,
            paddingHorizontal: 8
        }}></TextInput>
    )
}