import { Dimensions, Pressable, View, Text } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

interface optionProps {
    onPress: () => void;
    label: string;
    color: string;
    icon: any;
}

export default function HomeOption({ onPress, label, color, icon }: optionProps) {
    const windowWidth = Dimensions.get('window').width;
    return (
        <Pressable onPress={onPress}>
        <View style={{ backgroundColor: color, width: windowWidth / 1.25, height: 72, margin: 18, display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: 'white', marginLeft: 12, fontWeight: 'bold', fontSize: 24 }}>{label}</Text>
            <MaterialIcons name={icon} color='white' size={32} style={{ marginRight: 12 }}></MaterialIcons>
        </View>
        </Pressable>
    )
}