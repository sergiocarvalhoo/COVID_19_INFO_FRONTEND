import React, { useState } from 'react';
import { Button, DefaultTheme, Provider as PaperProvider, TextInput } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import apiConnection from '../../../services/ApiConnection';
import HeaderRedLogged from '../../../components/Headers/HeaderRedLogged';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
} from 'react-native';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#FF5B5B',
        accent: 'white'
    },
};

interface News {
    id: number;
    title: string;
    description: string;
}

interface ID {
    id: number;
}

export default function UpdateNewsData() {


    const route = useRoute();

    const {
        id,
        title,
        description } = route.params as News;

    const navigation = useNavigation();

    const [titlestate, setTitle] = useState(title);
    const [descriptionstate, setDescription] = useState(description);


    async function handleUpdateNews(
        title: string,
        description: string
    ) {

        const data = {
            id,
            title,
            description
        }

        const response = await apiConnection.put('/updatenews', data);

        if (response.data) {
            navigation.navigate("Noticias");
        } else {
            Alert.alert('Ocorreu um error ao Atualizar a Boletim !');
        }
    }


    return (

        <PaperProvider theme={theme}>

            <HeaderRedLogged titulo="Fazer Logout" />

            <Text style={styles.title}>Atualizar Notícia</Text>

            <ScrollView style={styles.container}>

                <TextInput
                    value={titlestate}
                    onChangeText={text => setTitle(text)}
                    label="Informe o novo Titulo:"
                    selectionColor='#FF5B5B'
                    underlineColor='#FF5B5B'
                    outlineColor='#FF5B5B'
                />

                <TextInput
                    value={descriptionstate}
                    onChangeText={text => setDescription(text)}
                    label="Informe a nova Descrição:"
                    selectionColor='#FF5B5B'
                    underlineColor='#FF5B5B'
                    outlineColor='#FF5B5B'
                />

                <Button style={styles.button} icon="update" color='#FF5B5B' mode="contained" onPress={() => { handleUpdateNews(titlestate, descriptionstate) }}>
                    Atualizar Notícia
                </Button>

            </ScrollView>

        </PaperProvider >
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