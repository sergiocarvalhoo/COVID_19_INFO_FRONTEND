import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Index from '../pages/public/Index';
import ChooseAccess from '../pages/public/ChooseAccess';
import AdministratorLogin from '../pages/administrator/AdministratorLogin';
import TabNavigationPrivate from './TabNavigationPrivate';
import TabNavigationPublic from './TabNavigationPublic';


const Stack = createStackNavigator();

function StackNavigation(){ 
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome" screenOptions={{headerShown:false, cardStyle:{backgroundColor:'#f2f3f5'}}}>
                <Stack.Screen name="Welcome" component={Index} />
                <Stack.Screen name="ChooseAccess" component={ChooseAccess} />
                <Stack.Screen name="AdministratorLogin" component={AdministratorLogin} />
                <Stack.Screen name="TabNavigationPrivate" component={TabNavigationPrivate} />
                <Stack.Screen name="TabNavigationPublic" component={TabNavigationPublic} />                
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default StackNavigation;