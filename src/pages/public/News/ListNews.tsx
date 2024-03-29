import React, { useEffect, useState } from 'react';
import { Button, Card, DefaultTheme, FAB, Provider as PaperProvider, Subheading, TextInput, Title } from 'react-native-paper';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import apiConnection from '../../../services/ApiConnection';
import HeaderRedLogged from '../../../components/Headers/HeaderRedLogged';
import { BorderlessButton } from 'react-native-gesture-handler';
import HeaderRed from '../../../components/Headers/HeaderRed';


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

  const navigation = useNavigation();

  const [news, setNews] = useState<News[]>([]);

  function handleDetailNews(id: number) {
    navigation.navigate('DetailNewsUser', { id });
  }

  useFocusEffect(() => {
    apiConnection.get('/readnews').then(response => {
      setNews(response.data);
    })
  })

  return (

    <PaperProvider theme={theme}>

      <HeaderRed titulo="Voltar para Tela Inicial" navigationPage="ChooseAccess" />

      <View style={styles.container}>

        <Text style={styles.title}>Lista de Notícias</Text>

        <ScrollView>

          {
            news.map(news =>

              <View key={news.id}>

                <Card
                  style={styles.card}
                  elevation={7}
                  mode="elevated"
                  onPress={() => { handleDetailNews(news.id) }}
                >

                  <Card.Content>
                    <Title>{news.title}</Title>
                    <Subheading>Data da Publicação: {news.publication_date}</Subheading>
                  </Card.Content>

                </Card>

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
    justifyContent: 'center',
  },
  button: {
    flexDirection: 'row',
    alignContent: 'center'
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: 'black'
  },
  card: {
    margin: 5
  }
});
