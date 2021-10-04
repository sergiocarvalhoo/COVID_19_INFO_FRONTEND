import React, { useEffect, useState } from 'react';
import { Button, DefaultTheme, FAB, Provider as PaperProvider, TextInput } from 'react-native-paper';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import apiConnection from '../../../services/ApiConnection';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import MapView, { MapEvent, Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import HeaderRedLogged from '../../../components/Headers/HeaderRedLogged';
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

  // sempre que o usuário sair e voltar da tela, ela é disparada
  useFocusEffect(() => {
    apiConnection.get('vaccinationLocations').then(response => {
      setLocations(response.data);
    });
  });


  function handleSelectMapPosition(event: MapEvent) {
    setPosition(event.nativeEvent.coordinate);
  }

  function handleAddLocation(latitude:number , longitude:number ,name: string) {
    const data = {
      name,
      description: 'Ponto de Vacinação',
      latitude,
      longitude
     
    }
    apiConnection.post('vaccinationLocations',{data})
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
        >
          {
            vaccinationLocations.map(vaccinationLocations =>
              <Marker key={vaccinationLocations.id} coordinate={{
                latitude: vaccinationLocations.latitude,
                longitude: vaccinationLocations.longitude,
              }}
              >
                <Callout>
                  <Text>
                    {vaccinationLocations.name}
                  </Text>
                </Callout>
              </Marker>)
          }
          {/* <Marker
            coordinate={{
              latitude: position.latitude,
              longitude: position.longitude,
            }}
          ></Marker> */}


        </MapView>


        {/* <View style={styles.footer}>
          <TextInput value={name} onChangeText={text => setName(text)} />  Add Local 

          <RectButton style={styles.createOrphanageButton} onPress={() => {handleAddLocation(position.latitude, position.longitude, name )}} >
            <Feather name="plus" size={20} color="#fff" />
          </RectButton>

        </View> */}
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
    borderRadius: 28,
    height: 46,
    paddingLeft: 24,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 3,
  },
  footerText: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_700Bold'
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
  }
});

export default LocationMap;