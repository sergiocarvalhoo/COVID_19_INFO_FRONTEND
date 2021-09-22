import React from 'react';
import { Appbar, Button, DefaultTheme, Provider as PaperProvider, TextInput, Title } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'white',
    accent: 'white'
  },
};

export default function AdministratorLogin({ navigation }) {

    const _goBack = () => navigation.goBack();

    const [cpf, setCPFText] = React.useState('');

    const [password, setPasswordText] = React.useState('');

  return (

    <PaperProvider theme={theme}>

        <View>
            <Appbar.Header style={styles.header}>
                <Appbar.BackAction onPress={_goBack} />
                <Appbar.Content title="Voltar" subtitle="Voltar para Escolher Forma de Acesso" />
                <Icon name="local-hospital" size={48} color="white"/>
            </Appbar.Header>       
        </View>

      <View style={styles.container}>
{/* 
        <Icon
          style={styles.icon}
          name="local-hospital"
          size={120}
          color="#FF5B5B"
        /> */}

        <Text style={styles.title}>Login como Administrador</Text>
        
        <TextInput
            label="Digite seu CPF:"
            value={cpf}
            onChangeText={text => setCPFText(text)}
            selectionColor='#FF5B5B'
            underlineColor='#FF5B5B'
            outlineColor='#FF5B5B'
        />

        <TextInput
            label="Digite sua Senha:"
            value={password}
            secureTextEntry
            onChangeText={text => setPasswordText(text)}
            right={<TextInput.Icon name="eye" />}
            selectionColor='#FF5B5B'
            underlineColor='#FF5B5B'
            outlineColor='#FF5B5B'
        />

        <Button style={styles.button} icon="login" color= '#FF5B5B' mode="contained" onPress={() => navigation.navigate('TabNavigationPrivate')}>
        Acessar
        </Button>

      </View>

   </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECECEC',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
      backgroundColor: '#FF5B5B'
  },
  icon: {
    alignSelf: 'center',  
    paddingBottom: 30
  },
  title: {
    fontSize: 36,
    fontFamily: 'bold',
    color: '#000000',
    paddingBottom: 40,
    textAlign: 'center'
  },
  welcome: {
    fontSize: 18,
    fontFamily: 'bold',
    color: 'white',
    paddingBottom: 20,
    textAlign: 'center'
  },
  text_input: {
    marginBottom: 15
  },
  button: {
    marginTop: 25,
    color: '#FF5B5B'
  }
});
