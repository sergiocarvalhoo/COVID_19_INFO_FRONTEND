import React from 'react';
import { Button, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'white',
    accent: '#FF5B5B',
    background: 'blue',
  },
};

export default function Index() {

  const navigation = useNavigation();

  return (

    <PaperProvider theme={theme}>

      <View style={styles.container}>

        <Icon
          style={styles.icon}
          name="local-hospital"
          size={128}
          color="#FFF"
        />

        <Text style={styles.title}>COVID 19 - INFO</Text>
        <Text style={styles.welcome}>Aplicativo de Notícias e Informações do Covid-19, na Cidade de Cajazeiras - PB.</Text>

        <Button icon="play" mode="contained" onPress={() => navigation.navigate('ChooseAccess')}>
        Iniciar
        </Button>

      </View>

   </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF5B5B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    paddingBottom: 30
  },
  title: {
    fontSize: 36,
    fontFamily: 'Roboto',
    color: 'white',
    paddingBottom: 40,
    textAlign: 'center'
  },
  welcome: {
    fontSize: 18,
    fontFamily: 'Roboto',
    color: 'white',
    paddingBottom: 20,
    textAlign: 'center'
  }
});
