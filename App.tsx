import React from 'react';
import AppLoading from 'expo-app-loading';
import StackNavigation from './src/components/StackNavigation';
import { useFonts } from 'expo-font'
import { Roboto_400Regular } from '@expo-google-fonts/roboto';

export default function App() {

  const [fontsLoaded] = useFonts({
    Roboto_400Regular
  })
  if(!fontsLoaded){
    return <AppLoading/>
  }

  return (
    <>
      <StackNavigation/>
    </>
  )
}