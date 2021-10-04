import React from 'react';
import { Card, DefaultTheme, Paragraph, Provider as PaperProvider, Title } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import HeaderRed from '../../components/Headers/HeaderRed';


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'white',
    accent: '#FF5B5B',
    background: 'blue',
  },
};

export default function About() {

  const navigation = useNavigation();

  return (


    <PaperProvider theme={theme}>

      <HeaderRed titulo="Voltar para Tela Inicial" navigationPage="Welcome"/>

      <View>

        <Text style={styles.title}>Sobre</Text>

        <Card>

          <Card.Content>
            <Title>COVID - 19 - INFO</Title>

            <Card.Cover source={{ uri: 'https://e17r5k-datap1.s3-eu-west-1.amazonaws.com/evercorp/s3fs-public/news/diseno_sin_titulo_9.png?Y2_D2_E4BxSCOfzPy0HmfIHQ04lRkIAv' }} />

            <Paragraph>A área de atuação da aplicação está voltada para a saúde.</Paragraph>
            <Paragraph>Dessa maneira o aplicativo visará trazer informações em tempo real sobre o Covid-19, com boletins e notícias oficiais para a cidade de Cajazeiras - PB.</Paragraph>

          </Card.Content>

        </Card>

      </View>

   </PaperProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    paddingBottom: 30
  },
  title: {
    fontSize: 36,
    fontFamily: 'Roboto',
    color: '#000',
    paddingBottom: 40,
    textAlign: 'center'
  }
});
