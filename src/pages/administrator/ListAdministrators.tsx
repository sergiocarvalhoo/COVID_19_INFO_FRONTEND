import React,{useEffect, useState} from 'react';
import { Button, DefaultTheme, Provider as PaperProvider, TextInput } from 'react-native-paper';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import apiConnection from '../../services/ApiConnection';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HeaderRedLogged from '../../components/Headers/HeaderRedLogged';
import { useFocusEffect } from '@react-navigation/native';


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'white',
    accent: 'white'
  },
};


interface Administrator {
    name: string;
    registration: string;
    email: string;
    occupation: string;
  }


export default function ListAdministrators() {

  const [administrators, setAdministrators] = useState<Administrator[]>([]);

  useFocusEffect(()=>{
    apiConnection.get('/administrators').then(response =>{
      setAdministrators(response.data);
    })
  })

  return (

    <PaperProvider theme={theme}>

      <HeaderRedLogged titulo="Fazer Logout"/>

      <View style={styles.container}>

        <Text style={styles.title}>Lista de Administratores</Text>

        <ScrollView>
            
          {
            administrators.map(administrator =>

              <View style={styles.item} key={administrator.registration}>

                <Text style={styles.textItem}>Nome: {administrator.name}</Text>
                <Text style={styles.textItem}>Matricula: {administrator.registration}</Text>
                <Text style={styles.textItem}>Cargo: {administrator.occupation}</Text>
                <Text style={styles.textItem}>E-mail: {administrator.email}</Text>

              </View>
              
            )
          }  

        </ScrollView>

      </View>

   </PaperProvider>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  icon: {
    paddingBottom: 30
  },
  title: {
    fontSize: 25,
    fontFamily: 'Roboto',
    color: '#000',
    paddingTop: 15,
    paddingBottom: 20,
    textAlign: 'center'
  },
  item: {
    backgroundColor: '#BDBDBD',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 5,
    margin: 2,
    borderColor: '#2a4944',
    borderWidth: 2
  },
  textItem: {
    fontSize: 18,
    fontFamily: 'Roboto',    
  }
});
