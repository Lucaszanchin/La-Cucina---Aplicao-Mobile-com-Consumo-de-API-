import React, { useEffect, useState } from 'react';

import {View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, ActivityIndicator, Alert} from 'react-native';
import {buscarReceitaAleatoria, buscarCategorias, buscarReceitasPorCategoria} from '../services/api';

import MealCard from '../components/MealCard';

export default function Home({ navigation }) {

    const [receitaDestaque, setReceitaDestaque] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const [receitas, setReceitas] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);

    useEffect(() => {
        carregarHome();
    }, []);

    async function carregarHome() {
        try {
            setCarregando(true);

            const [destaque, categoriasApi] = await Promise.all([buscarReceitaAleatoria(), buscarCategorias()]);
            setReceitaDestaque(destaque);
            setCategorias(categoriasApi.slice(0, 8));

            if (categoriasApi.length > 0) {
                const primeiraCategoria = categoriasApi[0].strCategory;

                const receitasApi = await buscarReceitasPorCategoria(primeiraCategoria);
                setReceitas(receitasApi.slice(0, 10));
                setCategoriaSelecionada(primeiraCategoria);
            }

        } catch (error) {

            console.error(error);

            Alert.alert('Não foi possível carregar as receitas.');

        } finally {
            setCarregando(false);
        }
    }

    async function selecionarCategoria(categoria) {

        try {

            setCategoriaSelecionada(categoria);
            setCarregando(true);
            const resultado = await buscarReceitasPorCategoria(categoria);

            setReceitas(resultado.slice(0, 10));

        } catch (error) {

            Alert.alert('Não foi possível carregar essa categoria.');

        } finally {

            setCarregando(false);

        }
    }

    function abrirReceita(id) {

        navigation.navigate(
            'DetalhesReceita',
            {
                mealId: id
            }
        );
    }

    function abrirBusca() {

        navigation.navigate('Busca');

    }

    return (

        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
        >

            <View style={styles.header}>

                <View>
                    <Text style={styles.logo}>
                        La Cucina
                    </Text>
                    <Text style={styles.subtitle}>
                        Sabores que combinam com você
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.searchButton}
                    onPress={abrirBusca}
                >
                    <Text style={styles.searchIcon}>
                        🔍
                    </Text>
                </TouchableOpacity>

            </View>

            <View style={styles.introduction}>

                <Text style={styles.title}>
                    Descubra sua próxima
                </Text>

                <Text style={styles.titleHighlight}>
                    receita favorita
                </Text>

                <Text style={styles.description}>
                    Explore receitas deliciosas de
                    diferentes lugares do mundo.
                </Text>

            </View>

            <TouchableOpacity
                style={styles.searchContainer}
                onPress={abrirBusca}
                activeOpacity={0.8}
            >

                <Text style={styles.searchPlaceholder}>
                    🔎  O que você quer comer?
                </Text>

            </TouchableOpacity>

            <View style={styles.section}>

                <View style={styles.sectionHeader}>

                    <Text style={styles.sectionTitle}>
                        Categorias
                    </Text>

                </View>


                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >

                    {categorias.map((categoria) => (

                        <TouchableOpacity
                            key={categoria.idCategory}
                            style={[
                                styles.categoryButton,

                                categoriaSelecionada ===
                                    categoria.strCategory &&
                                styles.categoryButtonActive
                            ]}
                            onPress={() =>
                                selecionarCategoria(
                                    categoria.strCategory
                                )
                            }
                        >

                            <Image
                                source={{
                                    uri:
                                        categoria.strCategoryThumb
                                }}
                                style={styles.categoryImage}
                            />

                            <Text
                                style={[
                                    styles.categoryText,

                                    categoriaSelecionada ===
                                        categoria.strCategory &&
                                    styles.categoryTextActive
                                ]}
                            >
                                {categoria.strCategory}
                            </Text>

                        </TouchableOpacity>

                    ))}

                </ScrollView>

            </View>

            {receitaDestaque && (

                <View style={styles.section}>

                    <View style={styles.sectionHeader}>

                        <Text style={styles.sectionTitle}>
                            Receita do momento
                        </Text>

                    </View>


                    <TouchableOpacity
                        style={styles.featuredCard}
                        onPress={() =>
                            abrirReceita(
                                receitaDestaque.idMeal
                            )
                        }
                        activeOpacity={0.9}
                    >
                        <Image
                            source={{
                                uri:
                                    receitaDestaque.strMealThumb
                            }}
                            style={styles.featuredImage}
                        />
                        <View
                            style={styles.featuredOverlay}
                        >

                            <View>

                                <Text
                                    style={styles.featuredCategory}
                                >
                                    {receitaDestaque.strCategory}
                                </Text>

                                <Text
                                    style={styles.featuredTitle}
                                    numberOfLines={2}
                                >
                                    {receitaDestaque.strMeal}
                                </Text>

                                <Text
                                    style={styles.featuredArea}
                                >
                                    🌎 {receitaDestaque.strArea}
                                </Text>

                            </View>

                        </View>

                    </TouchableOpacity>

                </View>

            )}

            <View style={styles.section}>

                <View style={styles.sectionHeader}>

                    <Text style={styles.sectionTitle}>
                        Mais receitas
                    </Text>

                </View>


                {carregando ? (

                    <ActivityIndicator
                        size="large"
                        style={styles.loading}
                    />

                ) : (

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >

                        {receitas.map((meal) => (

                            <MealCard
                                key={meal.idMeal}
                                meal={meal}
                                onPress={() =>
                                    abrirReceita(
                                        meal.idMeal
                                    )
                                }
                            />

                        ))}

                    </ScrollView>

                )}

            </View>


            <View style={styles.bottomSpace} />

        </ScrollView>
    );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FAFAF8'
    },

    header: {
        paddingHorizontal: 20,
        paddingTop: 55,
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    logo: {
        fontSize: 28,
        fontWeight: '800',
        color: '#E85D04'
    },

    subtitle: {
        marginTop: 3,
        fontSize: 12,
        color: '#777777'
    },

    searchButton: {
        width: 45,
        height: 45,
        borderRadius: 23,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3
    },

    searchIcon: {
        fontSize: 20
    },

    introduction: {
        paddingHorizontal: 20,
        marginTop: 10
    },

    title: {
        fontSize: 30,
        fontWeight: '800',
        color: '#222222'
    },

    titleHighlight: {
        fontSize: 30,
        fontWeight: '800',
        color: '#E85D04'
    },

    description: {
        marginTop: 10,
        fontSize: 15,
        lineHeight: 22,
        color: '#777777'
    },

    searchContainer: {
        marginHorizontal: 20,
        marginTop: 22,
        height: 55,
        borderRadius: 15,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        paddingHorizontal: 18,
        elevation: 2
    },

    searchPlaceholder: {
        fontSize: 15,
        color: '#999999'
    },

    section: {
        marginTop: 30
    },

    sectionHeader: {
        paddingHorizontal: 20,
        marginBottom: 15
    },

    sectionTitle: {
        fontSize: 21,
        fontWeight: '800',
        color: '#222222'
    },

    categoryButton: {
        marginLeft: 20,
        width: 100,
        padding: 8,
        borderRadius: 15,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        elevation: 2
    },

    categoryButtonActive: {
        backgroundColor: '#E85D04'
    },

    categoryImage: {
        width: 65,
        height: 65,
        borderRadius: 33
    },

    categoryText: {
        marginTop: 7,
        fontSize: 12,
        fontWeight: '600',
        color: '#333333',
        textAlign: 'center'
    },

    categoryTextActive: {
        color: '#FFFFFF'
    },

    featuredCard: {
        marginHorizontal: 20,
        height: 230,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
        elevation: 4
    },

    featuredImage: {
        width: '100%',
        height: '100%'
    },

    featuredOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        padding: 20,
        paddingTop: 50,
        backgroundColor: 'rgba(0,0,0,0.55)'
    },

    featuredCategory: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '700',
        textTransform: 'uppercase'
    },

    featuredTitle: {
        marginTop: 5,
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: '800'
    },

    featuredArea: {
        marginTop: 5,
        color: '#EEEEEE',
        fontSize: 13
    },

    loading: {
        marginTop: 30
    },

    bottomSpace: {
        height: 50
    }

});