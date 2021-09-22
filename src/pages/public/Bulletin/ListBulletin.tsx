import React from 'react';
import { Button, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import BottomNavigation from '../../../components/BottomNavigation'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'white',
    accent: '#FF5B5B',
    background: 'blue',
  },
};

export default function Bulletin({ navigation }) {
  return (

    <PaperProvider theme={theme}>

      <View style={styles.container}>

        <Text style={styles.title}>Boletim</Text>

        <Icon
          style={styles.icon}
          name="local-hospital"
          size={128}
          color="#FFF"
        />



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
    fontFamily: 'bold',
    color: 'white',
    paddingBottom: 40,
    textAlign: 'center'
  },
  welcome: {
    fontSize: 18,
    fontFamily: 'bold',
    color: 'white',
    paddingBottom: 20,
    textAlign: 'center'
  }
});
