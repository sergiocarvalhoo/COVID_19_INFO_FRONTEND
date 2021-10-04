import React,{ useState } from 'react';
import { Card, DefaultTheme, Provider as PaperProvider, Subheading, Title } from 'react-native-paper';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import apiConnection from '../../services/ApiConnection';
import HeaderRedLogged from '../../components/Headers/HeaderRedLogged';
import { useFocusEffect } from '@react-navigation/native';


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF5B5B',
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
            administrators.map(administrator => (

              <View key={administrator.registration}>

                <Card 
                  style={styles.card}
                  elevation = {7}
                  mode="elevated"
                >

                  <Card.Content>
                    <Title>{administrator.name}</Title>
                    <Subheading>{administrator.registration}</Subheading>
                    <Subheading>{administrator.occupation}</Subheading>
                    <Subheading>{administrator.email}</Subheading>
                  </Card.Content>

                </Card>

              </View>

              )
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
  textItem: {
    fontSize: 18,
    fontFamily: 'Roboto',    
  },
  card: {
    margin: 5
  }
});
