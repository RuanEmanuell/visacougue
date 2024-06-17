import { MaterialIcons } from "@expo/vector-icons";
import React, { ReactNode } from "react";
import { Modal, View, Text } from "react-native";

interface drawerProps {
    visible: boolean,
    children: ReactNode
}

export default function CustomDrawer({ visible, children }: drawerProps) {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
        >
            <View style={{ backgroundColor: 'rgba(166, 164, 165, 0.48)', flex: 1 }}>
                <View style={{ backgroundColor: 'white', maxWidth: '50%', height: '100%' }}>
                    {children}
                    <View style={{flex: 1, flexDirection: 'row',alignItems: 'flex-end', justifyContent: 'center'}}>
                        <Text style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: 10}}>VisAçougue v1.0</Text>
                    </View>
                </View>
            </View>
        </Modal>
    )
}