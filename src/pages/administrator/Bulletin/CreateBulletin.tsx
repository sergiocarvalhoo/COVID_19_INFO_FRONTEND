import React, { useState } from 'react';
import { Button, DefaultTheme, Provider as PaperProvider, TextInput } from 'react-native-paper';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import apiConnection from '../../../services/ApiConnection';
import HeaderRedLogged from '../../../components/Headers/HeaderRedLogged';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#FF5B5B',
        accent: 'white'
    },
};

export default function CreateBulletinData(){

    const navigation = useNavigation();

    const [confirmed, setConfirmed] = useState('');
    const [recovered, setRecovered] = useState('');
    const [discarded, setDiscarded] = useState('');
    const [under_review, setUnder_review] = useState('');
    const [admitted, setAdmitted] = useState('');
    const [deaths, setDeaths] = useState('');
    const [publication_date, setPublication_date] = useState('');


    async function handlecreateBulletin(
        confirmed: string,
         recovered: string,
          discarded: string,
           under_review: string,
            admitted: string,
             deaths: string,
              publication_date: string
              ) {

        const data = {
            confirmed, 
            recovered, 
            discarded, 
            under_review, 
            admitted, 
            deaths, 
            publication_date
        }

        const response = await apiConnection.post('/createbulletin', data);

        if (response.data) {
            navigation.navigate("Boletins");
        } else {
            Alert.alert('Ocorreu um error ao Adicionar o Boletim !');
        }
        
    }

    return (

        <PaperProvider theme={theme}>

            <HeaderRedLogged titulo="Fazer Logout" />

            <Text style={styles.title}>Criar Novo Boletim</Text>

            <ScrollView style={styles.container}>

                <TextInput
                    value={confirmed}
                    onChangeText={number => setConfirmed(number)}
                    label="Informe Os Casos Confirmados:"
                    selectionColor='#FF5B5B'
                    underlineColor='#FF5B5B'
                    outlineColor='#FF5B5B'
                />

                <TextInput
                    value={recovered}
                    onChangeText={number => setRecovered(number)}
                    label="Informe Os Casos Recuperados:"
                    selectionColor='#FF5B5B'
                    underlineColor='#FF5B5B'
                    outlineColor='#FF5B5B'
                />

                <TextInput
                    value={discarded}
                    onChangeText={number => setDiscarded(number)}
                    label="Informe Os Casos Descartados:"
                    selectionColor='#FF5B5B'
                    underlineColor='#FF5B5B'
                    outlineColor='#FF5B5B'
                />

                <TextInput
                    value={under_review}
                    onChangeText={number => setUnder_review(number)}
                    label="Informe Os Casos Em Análise:"
                    selectionColor='#FF5B5B'
                    underlineColor='#FF5B5B'
                    outlineColor='#FF5B5B'
                />

                <TextInput
                    value={admitted}
                    onChangeText={number => setAdmitted(number)}
                    label="Informe Os Casos Internos:"
                    selectionColor='#FF5B5B'
                    underlineColor='#FF5B5B'
                    outlineColor='#FF5B5B'
                />

                <TextInput
                    value={deaths}
                    onChangeText={number => setDeaths(number)}
                    label="Informe Os Casos De Óbitoss:"
                    selectionColor='#FF5B5B'
                    underlineColor='#FF5B5B'
                    outlineColor='#FF5B5B'
                />

                <TextInput
                    value={publication_date}
                    onChangeText={setPublication_date}
                    label="Informe a Data da Publicação:"
                    selectionColor='#FF5B5B'
                    underlineColor='#FF5B5B'
                    outlineColor='#FF5B5B'
                />

                <Button 
                    style={styles.button} 
                    icon="content-save" 
                    color='#FF5B5B' 
                    mode="contained" 
                    onPress={() => { handlecreateBulletin(
                        confirmed, 
                        recovered, 
                        discarded, 
                        under_review, 
                        admitted, 
                        deaths, 
                        publication_date    
                    ) }}>
                    Adicionar Boletim
                </Button>

            </ScrollView>

        </PaperProvider>
    );
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 12,
    },
    title: {
        fontSize: 36,
        fontFamily: 'Roboto',
        color: 'black',
        paddingBottom: 40,
        textAlign: 'center'
    },
    button: {
        marginTop: 25,
        color: '#FF5B5B'
    }
})