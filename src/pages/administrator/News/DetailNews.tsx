import React, { useEffect, useState } from 'react';
import { Card, DefaultTheme, Paragraph, Provider as PaperProvider, Subheading, Title } from 'react-native-paper';
import { ScrollView, StyleSheet, View, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import apiConnection from '../../../services/ApiConnection';
import HeaderRedLogged from '../../../components/Headers/HeaderRedLogged';
import AppLoading from 'expo-app-loading';


const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'white',
        accent: 'white'
    },
};

interface ImagePath {
    id: number;
    url: string;
}

interface News {
    id: number;
    title: string;
    description: string;
    publication_date: Date;
    imagesPath: ImagePath[];
}

interface ID {
    id: number;
}

export default function DetailsNews() {

    const route = useRoute();

    const { id } = route.params as ID;

    const [news, setNews] = useState<News>({} as News);

    useEffect(() => {
        apiConnection.get(`detailnews/${id}`).then(response => {
            setNews(response.data);
        })
    }, [id])

    if (!news) {
        return <AppLoading />;
    }

    return (

        <PaperProvider theme={theme}>

            <HeaderRedLogged titulo="Fazer Logout" />

            <View style={styles.container}>

                <Card>

                    <ScrollView>

                        <View key={news.id}>

                            <Card.Content>
                                <Title>{news.title}</Title>

                                {

                                    news.imagesPath?.map(image => (

                                        <View style={styles.item} key={image.id}>

                                            <Card.Cover
                                                key={image.id}
                                                source={{ uri: image.url }}
                                            />

                                        </View>

                                    )
                                    )
                                }

                                <Subheading style={styles.data}>Data de Publicação:
                                    {


                                        news.publication_date

                                    }
                                </Subheading>

                                <Paragraph>{news.description}</Paragraph>

                            </Card.Content>

                        </View>

                    </ScrollView>

                </Card>

            </View>

        </PaperProvider>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    icon: {
        paddingBottom: 30
    },
    title: {
        fontSize: 25,
        fontFamily: 'Roboto',
        color: '#000',
        paddingTop: 15,
        paddingBottom: 20,
        textAlign: 'center'
    },
    item: {
        backgroundColor: '#BDBDBD',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 5,
        margin: 2,
        borderColor: '#2a4944',
        borderWidth: 2
    },
    textItem: {
        fontSize: 18,
        fontFamily: 'Roboto',
    },
    image: {
        width: Dimensions.get('window').width - 35,
        height: 240,
        resizeMode: 'cover',
    },
    data: {
        fontFamily: 'Roboto',
        fontWeight: 'bold'
    }
});
