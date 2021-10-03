import React, { useEffect, useState } from 'react';
import { DefaultTheme, Card, FAB, Provider as PaperProvider, Title, Subheading } from 'react-native-paper';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import HeaderRedLogged from '../../../components/Headers/HeaderRedLogged';
import apiConnection from '../../../services/ApiConnection';
import { BorderlessButton } from 'react-native-gesture-handler';

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

  const navigation = useNavigation();

  function handlecreateBulletin() {
    navigation.navigate('CreateBulletin');
  }

  function handleDetailBulletin(id: number) {
    navigation.navigate('DetailBulletin', { id });
  }

  function handleDeleteBulletin(id: number) {
    apiConnection.delete('/deletebulletin', { data: { id: `${id}` } });
  }

  useFocusEffect(() => {
    apiConnection.get('/bulletins').then(response => {
      setBulletin(response.data);
    })
  })


  return (

    <PaperProvider theme={theme}>

      <HeaderRedLogged titulo="Fazer Logout" />

      <View style={styles.container}>

        <Text style={styles.title}>Lista De Boletins</Text>

        <ScrollView>

          {
            bulletin.map(bulletin =>

              <View key={bulletin.id}>

                <Card
                  style={styles.card}
                  elevation={7}
                  mode="elevated"
                >

                  <Card.Content>
                    <Title>Data Do Boletim: {bulletin.publication_date}</Title>
                    <Subheading>Confirmados: {bulletin.confirmed}</Subheading>
                    <Subheading>Recuperados: {bulletin.recovered}</Subheading>
                    <Subheading>Descartados: {bulletin.discarded}</Subheading>
                    <Subheading>Em Análise: {bulletin.under_review}</Subheading>
                    <Subheading>Internados: {bulletin.admitted}</Subheading>
                    <Subheading>Óbitos: {bulletin.deaths}</Subheading>

                  </Card.Content>

                  <Card>
                    <Card.Content>
                      <View style={styles.button}>
                        <BorderlessButton onPress={() => { handleDeleteBulletin(bulletin.id) }}>
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
          onPress={() => { handlecreateBulletin() }}
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
    backgroundColor: '#ffffff',
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
