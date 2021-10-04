import React, { useState } from 'react';
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

  function handleUpdateBulletin(
    id: number,
    confirmed: number,
    recovered: number,
    discarded: number,
    under_review: number,
    admitted: number,
    deaths: number,
    publication_date: Date){

    navigation.navigate('UpdateBulletin', { 
      id,
      confirmed, 
      recovered, 
      discarded, 
      under_review, 
      admitted, 
      deaths, 
      publication_date     
    });
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
                    <Card>
                      <Subheading style={styles.subheadingred}>CONFIRMADOS: {bulletin.confirmed}</Subheading>
                    </Card>

                    <Card>
                      <Subheading style={styles.subheadinggreen}>RECUPERADOS: {bulletin.recovered}</Subheading>
                    </Card>

                    <Card>
                      <Subheading style={styles.subheadingblue}>DESCARTADOS: {bulletin.discarded}</Subheading>
                    </Card>

                    <Card>
                      <Subheading style={styles.subheadingyellow}>EM ANÁLISE: {bulletin.under_review}</Subheading>
                    </Card>

                    <Card>
                      <Subheading style={styles.subheadingorange}>INTERNADOS: {bulletin.admitted}</Subheading>
                    </Card>

                    <Card>
                      <Subheading style={styles.subheadinggray}>ÓBITOS: {bulletin.deaths}</Subheading>
                    </Card>
                  </Card.Content>

                  <Card>
                    <Card.Content>

                      <View style={styles.button}>

                        <BorderlessButton 
                        onPress={() => {handleUpdateBulletin(
                            bulletin.id,
                            bulletin.confirmed, 
                            bulletin.recovered,
                            bulletin.discarded,
                            bulletin.under_review,
                            bulletin.admitted,
                            bulletin.deaths,
                            bulletin.publication_date
                          )}}>
                          <Icon name="edit" size={32} color="black" />
                        </BorderlessButton>

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
  subheadingred:{
    backgroundColor: '#ef5350',
    color: 'black',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 3,
    paddingTop: 3
  },
  subheadingblue:{
    backgroundColor: '#3f51b5',
    color: 'black',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 3,
    paddingTop: 3
  },
  subheadinggray:{
    backgroundColor: '#9e9e9e',
    color: 'black',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 3,
    paddingTop: 3
  },
  subheadingyellow:{
    backgroundColor: '#ffee58',
    color: 'black',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 3,
    paddingTop: 3
  },
  subheadinggreen:{
    backgroundColor: '#4caf50',
    color: 'black',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 3,
    paddingTop: 3
  },
  subheadingorange:{
    backgroundColor: '#ff7043',
    color: 'black',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 3,
    paddingTop: 3
  },
  title: {
    fontSize: 25,
    fontFamily: 'Roboto',
    color: '#000',
    paddingTop: 15,
    paddingBottom: 20,
    textAlign: 'center'
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
