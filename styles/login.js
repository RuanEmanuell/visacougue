import { StyleSheet } from "react-native";

export const loginStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
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
      backgroundColor: 'lightgray',
      color: 'black',
      fontSize: 20,
      fontWeight: 'bold',
      width: '75%',
      height: 32,
      marginTop: 16,
      paddingLeft: 5
    },
    standartButton: {
        backgroundColor: 'blue',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 6,
        marginVertical: 16
    }
  });
  