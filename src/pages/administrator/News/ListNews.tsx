import React, { useEffect, useState } from 'react';
import { Button, DefaultTheme, Provider as PaperProvider, TextInput } from 'react-native-paper';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect } from '@react-navigation/native';
import apiConnection from '../../../services/ApiConnection';
import HeaderRedLogged from '../../../components/Headers/HeaderRedLogged';
import { BorderlessButton } from 'react-native-gesture-handler';


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'white',
    accent: 'white'
  },
};


interface News {
  id: number;
  title: string;
  description: string;
  publication_date: Date;
}


export default function ListNews() {

  const [news, setNews] = useState<News[]>([]);

  useFocusEffect(() => {
    apiConnection.get('/readnews').then(response => {
      setNews(response.data);
    })
  })

  return (

    <PaperProvider theme={theme}>

      <HeaderRedLogged titulo="Fazer Logout" />

      <View style={styles.container}>

        <Text style={styles.title}>Lista de Notícias</Text>

        <ScrollView>

          {
            news.map(news =>

              <View style={styles.item} key={news.id}>

                <Text style={styles.textItem}>{news.title}</Text>
                <Text style={styles.textItem}>Data da Publicação: {news.publication_date}</Text>

                <BorderlessButton>
                  <Icon name="delete-forever" size={32} color="black" />
                </BorderlessButton>

                <BorderlessButton>
                  <Icon name="update" size={32} color="black" />
                </BorderlessButton>

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
    //fontWeight: 'bold',
  }
});
