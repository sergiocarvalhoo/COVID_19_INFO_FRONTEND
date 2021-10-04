import React, { useState } from 'react';
import { DefaultTheme, Card, FAB, Provider as PaperProvider, Title, Subheading } from 'react-native-paper';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import HeaderRedLogged from '../../../components/Headers/HeaderRedLogged';
import apiConnection from '../../../services/ApiConnection';
import { BorderlessButton } from 'react-native-gesture-handler';
import HeaderRed from '../../../components/Headers/HeaderRed';

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

export default function Bulletin() {

  const [bulletin, setBulletin] = useState<Bulletin[]>([]);

  useFocusEffect(() => {
    apiConnection.get('/bulletins').then(response => {
      setBulletin(response.data);
    })
  })

  return (

    <PaperProvider theme={theme}>

      <HeaderRed titulo="Voltar para Tela Inicial" navigationPage="Welcome"/>

      <View style={styles.container}>

        <Text style={styles.title}>Boletins</Text>

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
                      <Title style={styles.title2}>Data Do Boletim: {bulletin.publication_date}</Title>
                    </Card>

                    <Card>
                      <Subheading style={styles.subheadingred}>CONFIRMADOS: {bulletin.confirmed}</Subheading>
                    </Card>

                    <Card>
                      <Subheading style={styles.subheadingblue}>RECUPERADOS: {bulletin.recovered}</Subheading>
                    </Card>

                    <Card>
                      <Subheading style={styles.subheadinggreen}>DESCARTADOS: {bulletin.discarded}</Subheading>
                    </Card>

                    <Card>
                    <Subheading style={styles.subheadingorange}>EM ANÁLISE: {bulletin.under_review}</Subheading>
                    </Card>

                    <Card>
                    <Subheading style={styles.subheadingpurple}>INTERNADOS: {bulletin.admitted}</Subheading>
                    </Card>

                    <Card>
                    <Subheading style={styles.subheadinggray}>ÓBITOS: {bulletin.deaths}</Subheading>
                    </Card>
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
  title2: {
    fontWeight: 'bold'
  },
  subheadingred:{
    backgroundColor: '#ef5350',
    color: 'black',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 3,
    paddingTop: 3,
    textAlign: 'center',
  },
  subheadingblue:{
    backgroundColor: '#3f51b5',
    color: 'black',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 3,
    textAlign: 'center',
    paddingTop: 3
  },
  subheadinggray:{
    backgroundColor: '#9e9e9e',
    color: 'black',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 3,
    textAlign: 'center',
    paddingTop: 3
  },
  subheadingpurple:{
    backgroundColor: '#7e57c2',
    color: 'black',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 3,
    textAlign: 'center',
    paddingTop: 3
  },
  subheadinggreen:{
    backgroundColor: '#4caf50',
    color: 'black',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 3,
    textAlign: 'center',
    paddingTop: 3
  },
  subheadingorange:{
    backgroundColor: '#ff7043',
    color: 'black',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 3,
    textAlign: 'center',
    paddingTop: 3
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

  card: {
    margin: 5
  }
});

