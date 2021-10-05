import React, { useState } from 'react';
import { Button, Card, DefaultTheme, FAB, Provider as PaperProvider, TextInput } from 'react-native-paper';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import apiConnection from '../../../services/ApiConnection';
import { useFocusEffect } from '@react-navigation/native';
import MapView, { MapEvent, Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { BorderlessButton } from 'react-native-gesture-handler';
import HeaderRedLogged from '../../../components/Headers/HeaderRedLogged';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
const syringe = require('../../../images/syringe.png');
import mapStyle from '../../../maps/mapStyle.json'


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
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');


  useFocusEffect(() => {
    apiConnection.get('vaccinationlocations').then(response => {
      setLocations(response.data);
    });
  });

  function handleSelectMapPosition(event: MapEvent) {
    setPosition(event.nativeEvent.coordinate);
  }

  function handleClearInputs() {
    setName('');
    setDescription('');
    setPosition({ latitude: 0, longitude: 0 });
  }

  function handleAddLocation(latitude: number, longitude: number, name: string) {

    const data = {
      name,
      description,
      latitude,
      longitude
    }

    apiConnection.post('createvaccinationlocation', data);

    handleClearInputs();

  }

  function handleDeleteLocation(id: number) {
    apiConnection.delete('/deletevaccinationlocation', { data: { id: `${id}` } });
  }


  return (

    <PaperProvider theme={theme}>

      <HeaderRedLogged titulo="Fazer Logout" />

      <View style={styles.container}>

        <MapView
          initialRegion={{
            latitude: -6.892061028520502,
            longitude: -38.558394175307164,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
          }}
          style={styles.mapStyle}
          onPress={handleSelectMapPosition}
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

                <Callout
                  onPress={() => { handleDeleteLocation(vaccinationLocations.id) }}
                >

                  <Text style={styles.textCallout}>Nome do Local: {vaccinationLocations.name}</Text>
                  <Text style={styles.textCallout}>Descrição: {vaccinationLocations.description}</Text>

                  <BorderlessButton>
                    <Icon name="delete-forever" size={48} color="#FF5B5B" />
                  </BorderlessButton>

                </Callout>

              </Marker>

            )
            )
          }

          <Marker
            icon={syringe}
            pinColor="black"
            coordinate={{
              latitude: position.latitude,
              longitude: position.longitude,
            }}

          />

        </MapView>


        <View>

          <TextInput
            style={styles.text_input}
            label="Digite o Nome do Local de Vacinação:"
            value={name}
            selectionColor='#FF5B5B'
            underlineColor='#FF5B5B'
            outlineColor='#FF5B5B'
            onChangeText={setName}
          />

          <TextInput
            style={styles.text_input}
            label="Digite a Descrição Local de Vacinação:"
            value={description}
            selectionColor='#FF5B5B'
            underlineColor='#FF5B5B'
            outlineColor='#FF5B5B'
            onChangeText={setDescription}
          />

          <Button
            style={styles.button}
            icon="map"
            color='#FF5B5B'
            mode="contained"
            onPress={() => { handleAddLocation(position.latitude, position.longitude, name) }}>
            Adicionar Local de Vacinação
          </Button>

        </View>

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
    height: 410
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
