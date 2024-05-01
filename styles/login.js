import { StyleSheet } from "react-native";

export const loginStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      width: '100%'
    },
    logoBox: {
      flexDirection: 'row',
      marginTop: '10%'
    },
    loginBox: {
      flex: 1,
      width: '100%',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },
    customInput: {
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 5,
      color: 'black',
      fontSize: 20,
      fontWeight: 'bold',
      width: '75%',
      height: 48,
      marginTop: 16,
      paddingLeft: 16,
    },
    standartButton: {
        backgroundColor: '#1351B4',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 24,
        marginVertical: 16
    }
  });
  