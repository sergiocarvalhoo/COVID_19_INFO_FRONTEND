import React,{useEffect, useState} from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import HeaderRedLogged from '../../../components/Headers/HeaderRedLogged';
import apiConnection from '../../../services/ApiConnection';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'white',
    accent: '#FF5B5B',
    background: 'blue',
  },
};

interface Bulletin {
  id: number,
  confirmed: number,
  recovered: number,
  discarded: number,
  under_review: number,
  admitted: number,
  deaths: number,
  publication_date: Date
}

export default function ListBulletin() {

  const [bulletin, setBulletin] = useState<Bulletin[]>([]);

  useFocusEffect(()=>{
    apiConnection.get('/bulletins').then(response =>{
      setBulletin(response.data);
    })
  })
  

  const navigation = useNavigation();

  return (

    <PaperProvider theme={theme}>

      <HeaderRedLogged titulo="Fazer Logout"/>

      <View style={styles.container}>

        <Text style={styles.title}>Lista De Boletins</Text>

        <ScrollView>
            
          {
            bulletin.map(bulletin =>

              <View style={styles.item} key={bulletin.id}>

                <Text style={styles.textItem}>ID: {bulletin.id}</Text>
                <Text style={styles.textItem}>Data: {bulletin.publication_date}</Text>

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
