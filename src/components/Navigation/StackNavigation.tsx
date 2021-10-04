import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Index from '../../pages/public/Index';
import ChooseAccess from '../../pages/public/ChooseAccess';
import AdministratorLogin from '../../pages/administrator/AdministratorLogin';

import TabNavigationPrivate from './TabNavigationPrivate';
import TabNavigationPublic from './TabNavigationPublic';

import DetailsNews from '../../pages/administrator/News/DetailNews';
import CreateNews from '../../pages/administrator/News/CreateNews';
import DetailsNewsUser from '../../pages/public/News/DetailNews';

import CreateBulletin from '../../pages/administrator/Bulletin/CreateBulletin';
import UpdateBulletin from '../../pages/administrator/Bulletin/UpdateBulletin';


const Stack = createStackNavigator();

function StackNavigation() {
    return (
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#f2f3f5' } }}>
            <Stack.Screen name="Welcome" component={Index} />
            <Stack.Screen name="ChooseAccess" component={ChooseAccess} />
            <Stack.Screen name="AdministratorLogin" component={AdministratorLogin} />

            <Stack.Screen name="DetailNews" component={DetailsNews} />
            <Stack.Screen name="DetailNewsUser" component={DetailsNewsUser} />
            <Stack.Screen name="CreateNews" component={CreateNews} />

            <Stack.Screen name="TabNavigationPrivate" component={TabNavigationPrivate} />
            <Stack.Screen name="TabNavigationPublic" component={TabNavigationPublic} />

            <Stack.Screen name="CreateBulletin" component={CreateBulletin} />
            <Stack.Screen name="UpdateBulletin" component={UpdateBulletin} />
        </Stack.Navigator>
    );
}

export default StackNavigation;