import React, { useState } from 'react';
import { Button, DefaultTheme, Provider as PaperProvider, TextInput } from 'react-native-paper';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import apiConnection from '../../../services/ApiConnection';
import HeaderRedLogged from '../../../components/Headers/HeaderRedLogged';
import * as ImagePicker from 'expo-image-picker';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#FF5B5B',
        accent: 'white'
    },
};

export default function CreateNewsData() {

    const navigation = useNavigation();

    const [title, setTitle] = useState('');
    const [description, setDescripition] = useState('');
    const [publication_date, setPublication_date] = useState('');
    const [imagesURL, setImagesURL] = useState<string[]>([]);

    async function handleCreateNews() {

        const data = new FormData();

        data.append('title', title);
        data.append('description', description);
        data.append('publication_date', publication_date);

        imagesURL.forEach((imageURL, index) => {
            data.append('images', {
                name: `image_${index}.jpg`,
                type: `image/jpeg`,
                uri: imageURL
            } as any);
        });

        const response = await apiConnection.post('/createnews', data);

        if (response.data) {
            navigation.navigate("Noticias");
        } else {
            Alert.alert('Ocorreu um error ao Adicionar a Notícia !');
        }
    }

    async function handleSelectImages() {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();

        if (status !== 'granted') {
            alert('Por Favor, precisamos acessar os Suas Imagens !');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });

        if (result.cancelled) {
            alert('A seleção de imagens foi cancelada !');
            return;
        }

        const { uri } = result;
        setImagesURL([...imagesURL, uri]);

    }

    return (

        <PaperProvider theme={theme}>

            <HeaderRedLogged titulo="Fazer Logout" />

            <Text style={styles.title}>Criar nova noticia</Text>

            <ScrollView style={styles.container}>

                <TextInput
                    value={title}
                    onChangeText={text => setTitle(text)}
                    label="Digite o Titulo da Noticia:"
                    selectionColor='#FF5B5B'
                    underlineColor='#FF5B5B'
                    outlineColor='#FF5B5B'
                />

                <TextInput
                    value={description}
                    onChangeText={setDescripition}
                    label="Digite a Descrição da Noticia:"
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

                <Text style={styles.label}>Adicionar Imagem(ens):</Text>

                <Button style={styles.button} icon="image-plus" color='#FF5B5B' mode="contained" onPress={() => { handleSelectImages() }}>
                    Adicionar Imagem(ens)
                </Button>

                <View style={styles.uploadedImageContainer}>
                    {
                        imagesURL.map(imageURL => (
                            <Image
                                key={imageURL}
                                source={{ uri: imageURL }}
                                style={styles.uploadedImage}
                            />
                        )
                        )
                    }
                </View>

                <Button style={styles.button} icon="content-save" color='#FF5B5B' mode="contained" onPress={() => { handleCreateNews() }}>
                    Adicionar Notícia
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
    label: {
        color: 'black',
        fontFamily: 'Roboto',
        marginTop: 20
    },
    imagesInput: {
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 1.4,
        borderRadius: 5,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
    },
    uploadedImageContainer: {
        flexDirection: 'row',
    },
    uploadedImage: {
        width: 64,
        height: 64,
        borderRadius: 5,
        marginBottom: 30,
        marginTop: 50,
        marginRight: 8
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    button: {
        marginTop: 25,
        color: '#FF5B5B'
    }
})