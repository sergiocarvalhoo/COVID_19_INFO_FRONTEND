import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import News from '../../pages/public/News/ListNews';
import Bulletin from '../../pages/public/Bulletin/ListBulletin';
import VaccinationLocal from '../../pages/public/VaccinationLocation/ListVaccinationLocation';
import About from '../../pages/public/About';


const Tab = createMaterialBottomTabNavigator();

function TabNavigationPublic(){ 
    return(
        <Tab.Navigator 
        initialRouteName="NoticíasUser" 
        activeColor="#000"
        inactiveColor="white"
        barStyle={{ backgroundColor: '#FF5B5B' }}
        >
          <Tab.Screen 
          name="NoticíasUser" 
          component={News} 
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="newspaper" color={color} size={26} />
            ),
          }}          
          />
          <Tab.Screen 
          name="BoletinsUser" 
          component={Bulletin} 
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="chart-bar" color={color} size={26} />
            ),
          }}            
          />
          <Tab.Screen 
          name="LocaisUser" 
          component={VaccinationLocal} 
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="map-marker-radius" color={color} size={26} />
            ),
          }}            
          />
          <Tab.Screen 
          name="SobreUser" 
          component={About} 
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="help-circle" color={color} size={26} />
            ),
          }}             
          />
        </Tab.Navigator>
    );
}

export default TabNavigationPublic;
