import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import HeaderRedLogged from '../../../components/Headers/HeaderRedLogged';


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'white',
    accent: '#FF5B5B',
    background: 'blue',
  },
};

export default function VaccinationLocal() {

  const navigation = useNavigation();

  return (
   
    <PaperProvider theme={theme}>

      <HeaderRedLogged titulo="Fazer LogOff"/>

      <View style={styles.container}>

        <Text style={styles.title}>Locais de Vacinação Administrator</Text>

        <Icon
          style={styles.icon}
          name="local-hospital"
          size={128}
          color="#000"
        />

      </View>

   </PaperProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    paddingBottom: 30
  },
  title: {
    fontSize: 36,
    fontFamily: 'Roboto',
    color: '#000',
    paddingBottom: 40,
    textAlign: 'center'
  }
});
