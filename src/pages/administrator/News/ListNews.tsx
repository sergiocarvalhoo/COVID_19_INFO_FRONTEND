import React, { useState } from 'react';
import { Card, DefaultTheme, FAB, Provider as PaperProvider, Subheading, Title } from 'react-native-paper';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
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

  const navigation = useNavigation();

  const [news, setNews] = useState<News[]>([]);

  function handlecreateNews() {
    navigation.navigate('CreateNews');
  }

  function handleUpdateNews(
    id: number,
    title: string,
    description: string) {

    navigation.navigate('UpdateNews', {
      id,
      title,
      description
    });
    
  }

  function handleDetailNews(id: number) {
    navigation.navigate('DetailNews', { id });
  }

  function handleDeleteNews(id: number) {
    apiConnection.delete('/deletenews', { data: { id: `${id}` } });
  }

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

              <View key={news.id}>

                <Card
                  style={styles.card}
                  elevation={7}
                  mode="elevated"
                >

                  <Card.Content>
                    <Title>{news.title}</Title>
                    <Subheading>Data da Publicação: {news.publication_date}</Subheading>
                  </Card.Content>

                  <Card>
                    <Card.Content>
                      <View style={styles.button}>

                        <BorderlessButton onPress={() => { handleUpdateNews(news.id, news.title, news.description) }}>
                          <Icon name="edit" size={32} color="black" />
                        </BorderlessButton>

                        <BorderlessButton onPress={() => { handleDetailNews(news.id) }}>
                          <Icon name="view-list" size={32} color="black" />
                        </BorderlessButton>

                        <BorderlessButton onPress={() => { handleDeleteNews(news.id) }}>
                          <Icon name="delete-forever" size={32} color="black" />
                        </BorderlessButton>

                      </View>
                    </Card.Content>
                  </Card>

                </Card>

              </View>

            )
          }

        </ScrollView>

        <FAB
          style={styles.fab}
          color="white"
          icon="plus"
          onPress={() => { handlecreateNews() }}
        />

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
