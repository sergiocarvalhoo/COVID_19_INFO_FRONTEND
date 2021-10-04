import React, { useState } from 'react';
import { Button, DefaultTheme, Provider as PaperProvider, TextInput } from 'react-native-paper';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
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

interface Bulletin {
    id: string,
    confirmed: string,
    recovered: string,
    discarded: string,
    under_review: string,
    admitted: string,
    deaths: string,
    publication_date: string
}

export default function UpdateBulletinData(){

    const route = useRoute();

    const { 
        id,
        confirmed,
        recovered,
        discarded,
        under_review,
        admitted,
        deaths,
        publication_date } = route.params as Bulletin;


    const navigation = useNavigation();

    const [confirmedstate, setConfirmed] = useState(confirmed);
    const [recoveredstate, setRecovered] = useState(recovered);
    const [discardedstate, setDiscarded] = useState(discarded);
    const [under_reviewstate, setUnder_review] = useState(under_review);
    const [admittedstate, setAdmitted] = useState(admitted);
    const [deathsstate, setDeaths] = useState(deaths);
    const [publication_datestate, setPublication_date] = useState(publication_date);

    async function handleUpdateBulletin(
        confirmed: string,
        recovered: string,
        discarded: string,
        under_review: string,
        admitted: string,
        deaths: string,
        publication_date: string){

        const data = {
            id,
            confirmed, 
            recovered, 
            discarded, 
            under_review, 
            admitted, 
            deaths, 
            publication_date
        }
        
        const response = await apiConnection.put('/updatebulletin', data);

        if (response.data) {
            navigation.navigate("Boletins");
        } else {
            Alert.alert('Ocorreu um error ao Atualizar o Boletim !');
        }
        
    }

    return (

        <PaperProvider theme={theme}>

            <HeaderRedLogged titulo="Fazer Logout" />

            <Text style={styles.title}>Atualizar Boletim</Text>

            <ScrollView style={styles.container}>

                <TextInput
                    value={confirmedstate}
                    onChangeText={number => setConfirmed(number)}
                    label="Informe Os Casos Confirmados:"
                    selectionColor='#FF5B5B'
                    underlineColor='#FF5B5B'
                    outlineColor='#FF5B5B'
                />

                <TextInput
                    value={recoveredstate}
                    onChangeText={number => setRecovered(number)}
                    label="Informe Os Casos Recuperados:"
                    selectionColor='#FF5B5B'
                    underlineColor='#FF5B5B'
                    outlineColor='#FF5B5B'
                />

                <TextInput
                    value={discardedstate}
                    onChangeText={number => setDiscarded(number)}
                    label="Informe Os Casos Descartados:"
                    selectionColor='#FF5B5B'
                    underlineColor='#FF5B5B'
                    outlineColor='#FF5B5B'
                />

                <TextInput
                    value={under_reviewstate}
                    onChangeText={number => setUnder_review(number)}
                    label="Informe Os Casos Em Análise:"
                    selectionColor='#FF5B5B'
                    underlineColor='#FF5B5B'
                    outlineColor='#FF5B5B'
                />

                <TextInput
                    value={admittedstate}
                    onChangeText={number => setAdmitted(number)}
                    label="Informe Os Casos Internos:"
                    selectionColor='#FF5B5B'
                    underlineColor='#FF5B5B'
                    outlineColor='#FF5B5B'
                />

                <TextInput
                    value={deathsstate}
                    onChangeText={number => setDeaths(number)}
                    label="Informe Os Casos De Óbitoss:"
                    selectionColor='#FF5B5B'
                    underlineColor='#FF5B5B'
                    outlineColor='#FF5B5B'
                />

                <TextInput
                    value={publication_datestate}
                    onChangeText={setPublication_date}
                    label="Informe a Data da Publicação:"
                    selectionColor='#FF5B5B'
                    underlineColor='#FF5B5B'
                    outlineColor='#FF5B5B'
                />

                <Button 
                    style={styles.button} 
                    icon="update" 
                    color='#FF5B5B' 
                    mode="contained" 
                    onPress={() => { handleUpdateBulletin(
                        confirmedstate, 
                        recoveredstate, 
                        discardedstate, 
                        under_reviewstate, 
                        admittedstate, 
                        deathsstate, 
                        publication_datestate    
                    ) }}>
                    Atualizar Boletim
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