import React, { useEffect, useState } from 'react';
import { Button, Card, DefaultTheme, FAB, Provider as PaperProvider, TextInput } from 'react-native-paper';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import apiConnection from '../../../services/ApiConnection';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import MapView, { MapEvent, Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import HeaderRedLogged from '../../../components/Headers/HeaderRedLogged';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//import {maker} from '../../../../assets/map-maker@2x.png' ;


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'white',
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

const LocationMap: React.FC = () => {

  const navigation = useNavigation();

  const [vaccinationLocations, setLocations] = useState<vaccinationLocations[]>([])
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [name, setName] = useState('');


  useFocusEffect(() => {
    apiConnection.get('vaccinationlocations').then(response => {
      setLocations(response.data);
    });
  });

  function handleSelectMapPosition(event: MapEvent) {
    setPosition(event.nativeEvent.coordinate);
  }

  function handleAddLocation(latitude: number, longitude: number, name: string) {
    const data = {
      name,
      description: 'Ponto de Vacinação',
      latitude,
      longitude

    }
    apiConnection.post('createvaccinationlocation', { data });
    console.log(data);
  }

  function handleDeleteLocation(id: number) {
    apiConnection.delete('/deletevaccinationlocation', { data: { id: `${id}` } });
    console.log(id);
  }

  function handleUpdateNews(latitude: number, longitude: number, name: string) {
    const data = {
      name,
      description: 'Ponto de Vacinação',
      latitude,
      longitude
    }

    apiConnection.put('/updatevaccinationlocation', data)
  };


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
        >
          {
            vaccinationLocations.map(vaccinationLocations =>
              <Marker key={vaccinationLocations.id} coordinate={{
                latitude: vaccinationLocations.latitude,
                longitude: vaccinationLocations.longitude,
              }}
              >
                <Callout>
                  <Card>
                    <Text>
                      {vaccinationLocations.name}
                      ({vaccinationLocations.description})
                    </Text>
                  </Card>
                  <BorderlessButton onPress={() => { handleDeleteLocation(vaccinationLocations.id) }}>
                    <Icon name="delete-forever" size={32} color="black" />

                  </BorderlessButton>

                </Callout>


              </Marker>

            )
          }

          <Marker
            pinColor="black"
            coordinate={{
              latitude: position.latitude,
              longitude: position.longitude,
            }}

          />

        </MapView>


        <View style={styles.container1}>

          <TextInput
            style={styles.footerText}
            label="Digite o Nome do Local de Vacinação:"
            value={name}
            selectionColor='#FF5B5B'
            underlineColor='#FF5B5B'
            outlineColor='#FF5B5B'
            onChangeText={setName}
          />

          <Button
            style={styles.button}
            icon="map"
            color='#FF5B5B'
            mode="contained"
            onPress={() => { handleAddLocation(position.latitude, position.longitude, name) }}>
            Adicionar
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


  container1: {
    margin: 'auto' ,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    //footer
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 3,
    
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 3,
   
    // // borderRadius: 28,
    // height: 50,
    // paddingLeft: 50,
   

  },

  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: "#15c3d6",
    borderRadius: 28,

    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: "#fff",
    // borderRadius: 28,
    height: 46,
    paddingLeft: 24,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',


    elevation: 3,
  },
  footerText: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_700Bold',
    alignItems: 'center',
    height: 25,
    width: 200,

    justifyContent: 'space-between',
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,

    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 40,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  },
  button: {
    marginTop: 0,
    color: '#FF5B5B',
    alignItems: 'flex-start'
  }
});

export default LocationMap;