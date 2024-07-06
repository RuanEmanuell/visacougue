import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const homeStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      width: '100%'
    },
    userCircle : {
      borderColor: 'black',
      borderWidth: 4,
      borderRadius: windowWidth,
      marginBottom: 10
    }
  });
  