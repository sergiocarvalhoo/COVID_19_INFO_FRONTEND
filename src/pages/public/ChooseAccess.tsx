import React from 'react';
import { Appbar, Button, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import HeaderWhite from '../../components/Headers/HeaderWhite';


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'white',
    accent: '#FF5B5B',
    background: 'blue',
  },
};


export default function ChooseAccess() {
  
  const navigation = useNavigation();

  return (

    <PaperProvider theme={theme}>

    <HeaderWhite titulo="Voltar para Página Inicial" navigationPage="Welcome"/>
    
      <View style={styles.container}>

        <Icon
          style={styles.icon}
          name="local-hospital"
          size={128}
          color="#FFF"
        />

        <Text style={styles.title}>COVID 19 - INFO</Text>
        <Text style={styles.access}>Escolha o Tipo de Acesso para Prosseguir com o Uso do App: </Text>

        <Button style={styles.button} icon="login" mode="contained" onPress={() => navigation.navigate('TabNavigationPublic')}>
        Acessar
        </Button>

        <Button style={styles.button} icon="key" mode="contained" onPress={() => navigation.navigate('AdministratorLogin')}>
        Acessar Como Administrador
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
    justifyContent: 'center'
  },
  icon: {
    paddingBottom: 30
  },
  title: {
    fontSize: 36,
    fontFamily: 'Roboto',
    color: 'white',
    paddingBottom: 40,
    textAlign: 'center',
  },
  access: {
    fontSize: 18,
    fontFamily: 'Roboto',
    color: 'white',
    paddingBottom: 20,
    textAlign: 'center'
  },
  button: {
    marginBottom: 15
  }
});
