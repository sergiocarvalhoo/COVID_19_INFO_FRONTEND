import React from 'react';
import { View, Text,StyleSheet} from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons'; 
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useMyContext } from '../../context/AuthProvider';

interface propHeader{
  titulo:string;
}


const HeaderRedLogged: React.FC<propHeader> = ({titulo}) => {
  const navigation = useNavigation();

  const {logout} = useMyContext();
 
  async function handleLogOut(){
    await logout();
    navigation.navigate("Welcome");
  }
  
  return (
    <View style={styles.container}>

      <BorderlessButton onPress={handleLogOut}>
        <Icon name="logout" size={24} color="white" />
      </BorderlessButton>

      <Text style={styles.title}> {titulo} </Text>

      <Icon style={styles.icon} name="local-hospital" size={48} color="white" />
      
    </View>
  );

}

const styles = StyleSheet.create({
  container:{
    padding:20,
    backgroundColor: '#FF5B5B',
    borderBottomWidth: 1,
    borderColor: '#FF5B5B',
    paddingTop: 35,

    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  title:{
    fontWeight:'bold',
    fontSize:20,
    marginRight:70,
    color: 'white'
  },
  icon:{
    marginRight: 3
  }
})

export default HeaderRedLogged;
