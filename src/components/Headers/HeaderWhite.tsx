import React from 'react';
import { View, Text,StyleSheet} from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons'; 
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';


interface propHeader{
  titulo:string;
  navigationPage:string;
}


const HeaderWhite: React.FC<propHeader> = ({titulo, navigationPage}) => {
  const navigation = useNavigation();
 
  function goBackToPage(){
    navigation.navigate(navigationPage);
  }
  
  return (
    <View style={styles.container}>
      <BorderlessButton onPress={goBackToPage}>
        <Feather name="arrow-left" size={24} color="#FF5B5B" />
      </BorderlessButton>
      <Text style={styles.title}> {titulo} </Text>
      <Icon style={styles.icon} name="local-hospital" size={48} color="#FF5B5B"/>
    </View>
  );

}

const styles = StyleSheet.create({
  container:{
    padding:10,
    backgroundColor: '#f9fafc',
    borderBottomWidth: 1,
    borderColor: '#dde3f0',
    paddingTop: 30,

    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  title:{
    fontWeight:'bold',
    fontSize:20,
    marginRight:70,
    color: '#FF5B5B'
  },
  icon:{
    marginRight: 3
  }
})

export default HeaderWhite;
