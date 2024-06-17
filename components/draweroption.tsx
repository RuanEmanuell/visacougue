import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text, Pressable } from "react-native";

interface drawerOptionProps {
    label: string,
    icon: any,
    onPress: () => any
}

export default function DrawerOption({ label, icon, onPress }: drawerOptionProps) {
    return (
        <Pressable onPress={onPress} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginVertical: 10 }}>
            <MaterialIcons name={icon} color='black' size={24} style={{ marginLeft: 4 }}></MaterialIcons>
            <Text style={{ fontWeight: 'bold', textAlign: 'center', flex: 1 }}>{label}</Text>
        </Pressable>
    )
}