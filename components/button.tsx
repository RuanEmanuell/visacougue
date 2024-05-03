import { Pressable, Text } from "react-native";
import React from "react";

export default function DSGovButton({ onClick, label, primary, secondary }: { onClick: () => void, label: string, primary?: boolean, secondary?: boolean }) {
    return (
        <Pressable style={{
            backgroundColor: primary ? '#1351B4' : 'white',
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderRadius: 24,
            marginVertical: 16,
            borderWidth: secondary ? 2 : 0,
            borderColor: secondary ? '#1351B4' : 'white'
        }}>
            <Text style={{ color: primary ? 'white' : '#1351B4', fontWeight: 'bold' }} onPress={onClick}>{label}</Text>
        </Pressable>
    )
}