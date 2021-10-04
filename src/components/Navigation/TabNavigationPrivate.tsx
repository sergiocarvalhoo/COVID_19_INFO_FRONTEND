import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import News from '../../pages/administrator/News/ListNews';
import Bulletin from '../../pages/administrator/Bulletin/ListBulletin';
import VaccinationLocal from '../../pages/administrator/VaccinationLocation/ListVaccinationLocation';
import ListAdministrators from '../../pages/administrator/ListAdministrators';


const Tab = createMaterialBottomTabNavigator();

function TabNavigationPrivate() {
  return (

    <Tab.Navigator
      initialRouteName="Administradores"
      activeColor="#000"
      inactiveColor="white"
      barStyle={{ backgroundColor: '#FF5B5B' }}
    >
      <Tab.Screen
        name="Administradores"
        component={ListAdministrators}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="account-cog" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Noticias"
        component={News}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="newspaper" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Boletins"
        component={Bulletin}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="chart-bar" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Locais de Vacinação"
        component={VaccinationLocal}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="map-marker-radius" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>

  );
}

export default TabNavigationPrivate;