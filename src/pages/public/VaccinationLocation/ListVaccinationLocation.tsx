import React, { useEffect, useState } from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import apiConnection from '../../../services/ApiConnection';
import { useFocusEffect } from '@react-navigation/native';
import MapView, { MapEvent, Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
const syringe = require('../../../images/syringe.png');
import mapStyle from '../../../maps/mapStyle.json'
import HeaderRed from '../../../components/Headers/HeaderRed';


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF5B5B',
    accent: 'white'
  },
};

interface vaccinationLocations {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  description: string;
}

export default function LocationMap() {

  const [vaccinationLocations, setLocations] = useState<vaccinationLocations[]>([])

  useEffect(() => {
    apiConnection.get('vaccinationLocations').then(response => {
      setLocations(response.data);
    });
  }, [vaccinationLocations]);


  return (

    <PaperProvider theme={theme}>

      <HeaderRed titulo="Voltar para Tela Inicial" navigationPage="Welcome" />

      <View style={styles.container}>
        <MapView
          initialRegion={{
            latitude: -6.892061028520502,
            longitude: -38.558394175307164,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
          }}
          style={styles.mapStyle}
          provider={PROVIDER_GOOGLE}
          customMapStyle={mapStyle}
        >
          {
            vaccinationLocations.map(vaccinationLocations => (

              <Marker
                icon={syringe}
                key={vaccinationLocations.id}
                coordinate={{
                  latitude: vaccinationLocations.latitude,
                  longitude: vaccinationLocations.longitude,
                }}
              >

                <Callout>
                  <Text style={styles.textCallout}>Nome do Local: {vaccinationLocations.name}</Text>
                  <Text style={styles.textCallout}>Descrição: {vaccinationLocations.description}</Text>
                </Callout>

              </Marker>

            )
            )
          }

        </MapView>

      </View>
    </PaperProvider>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    position: 'relative'
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: 625
  },
  button: {
    marginTop: 0,
    color: '#FF5B5B'
  },
  text_input: {
    marginBottom: 15
  },
  textCallout: {
    fontWeight: 'bold',
    fontSize: 18
  }
});
