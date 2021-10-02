import React from 'react';
import AppLoading from 'expo-app-loading';
import StackNavigation from './src/components/Navigation/StackNavigation';
import { useFonts } from 'expo-font'
import { Roboto_400Regular } from '@expo-google-fonts/roboto';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthProvider';


export default function App() {

  const [fontsLoaded] = useFonts({
    Roboto_400Regular
  })
  if(!fontsLoaded){
    return <AppLoading/>
  }

  return (
    <>
      <NavigationContainer>
        <AuthProvider>
        <StackNavigation/>
        </AuthProvider>
      </NavigationContainer>  
    </>
  )
}
