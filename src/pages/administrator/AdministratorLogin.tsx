import React,{useState} from 'react';
import { Button, DefaultTheme, Provider as PaperProvider, TextInput, Title } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import HeaderWhite from '../../components/Headers/HeaderWhite';
import {AuthProvider} from '../../context/AuthProvider';
import { useMyContext } from '../../context/AuthProvider';


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'white',
    accent: 'white'
  },
};

export default function AdministratorLogin() {

    const navigation = useNavigation();

    const {login, isLogged} = useMyContext();
   
    const [cpf, setCPFText] = useState('');
    const [password, setPasswordText] = useState('');

    async function handlerLogin(cpf:string, password:string){
      await login(cpf, password);

      if (isLogged == true){
        navigation.navigate('TabNavigationPrivate')
      }

    }

  return (

    <PaperProvider theme={theme}>

      <AuthProvider>

      </AuthProvider>

      <HeaderWhite titulo="Voltar a Forma de Acesso" navigationPage="ChooseAccess"/>
    
      <View style={styles.container}>

        <Text style={styles.title}>Login como Administrador</Text>
        
        <TextInput
            label="Digite seu CPF:"
            value={cpf}
            selectionColor='#FF5B5B'
            underlineColor='#FF5B5B'
            outlineColor='#FF5B5B'
            onChangeText={setCPFText}
        />

        <TextInput
            label="Digite sua Senha:"
            value={password}
            secureTextEntry
            right={<TextInput.Icon name="eye" />}
            selectionColor='#FF5B5B'
            underlineColor='#FF5B5B'
            outlineColor='#FF5B5B'
            onChangeText={setPasswordText}
        />

        <Button style={styles.button} icon="login" color= '#FF5B5B' mode="contained" onPress={() => {handlerLogin(cpf, password)}}>
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
    fontFamily: 'Roboto',
    color: '#000000',
    paddingBottom: 40,
    textAlign: 'center'
  },
  welcome: {
    fontSize: 18,
    fontFamily: 'Roboto',
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
