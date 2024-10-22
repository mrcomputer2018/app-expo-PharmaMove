import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, SafeAreaView, TouchableOpacity, Image, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { globalStyles } from '../styles/globalStyles';
import { productsStyles as styles } from '../styles/productsStyles';

import Empty from '../components/Empty';
import Loading from '../components/Loading';
import ListProducts from '../components/ListProducts';
import axios from 'axios';

type Product = {
    product_name: string;
    quantity: number;
    image_url: string;
    description: string;
    branch_name: string;
    location: string;
    latitude: number;
    longitude: number;
}

export default function Products() {

    const [ loading, setLoading ] = useState(false);

    const [ products, setProducts ] = useState<Product[]>([]);

    const [ search, setSearch ] = useState('');
    const [ productsFiltered, setProductsFiltered ] = useState<Product[]>([]);
    const [ typeOfSearch, setTypeOfSearch ] = useState('product');

    useEffect(() => {
        function getProducts() {
            setLoading(true);

            axios.get(process.env.EXPO_PUBLIC_API_URL + '/products')
            .then((response) => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch( error => {
                console.log(error);
                setLoading(false);
                Alert.alert('Erro', 'Não foi possível carregar os produtos');
            });
        }

        getProducts();

    }, []);

    useEffect(() => {

        if (search === '') {
            setProductsFiltered(products);
        } else if(typeOfSearch === 'product') {
            setProductsFiltered(
                products.filter(
                    (product) => 
                        product.product_name                    .toLowerCase().includes(search.toLowerCase())
                )
            );
        } else {
            setProductsFiltered(
                products.filter(
                    (product) => 
                        product.branch_name                    .toLowerCase().includes(search.toLowerCase())
                )
            );
        }

    }, [search, products]);

    return (
        <SafeAreaView style= { globalStyles.container }>
            <View>
                <Image
                    source={require('../assets/bgstock.jpg')}
                    style={ styles.bgImage }
                />
    
                <Text style={ styles.labelSearch }>
                    O que você procura?
                </Text>

                <View style={ styles.areaSearch }>
                    <Feather name="search" size={20} color="black" />
                    <TextInput
                        style={ styles.inputSearch }
                        value={search}
                        onChangeText={setSearch}
                        placeholder="Pesquise produto ou loja..."
                    />
                </View>

                <View  style={ styles.areaTypeOfSearch }>
                    {/* Produto */}
                    <TouchableOpacity 
                     style={ 
                        typeOfSearch === 'product' ? 
                        styles.buttonDark : styles.button 
                    }
                    onPress={() => setTypeOfSearch('product')}>
                        <Text  style={ 
                            typeOfSearch === 'product' ?
                            styles.buttonDarkText : styles.buttonText 
                        }>
                            Produto
                        </Text>
                    </TouchableOpacity>
                        
                    {/* Loja */}
                    <TouchableOpacity 
                    style={ 
                        typeOfSearch === 'branch' ? 
                        styles.buttonDark : styles.button 
                    }
                    onPress={() => setTypeOfSearch('branch')}
                    >
                        <Text style={ 
                            typeOfSearch === 'branch' ?
                            styles.buttonDarkText : styles.buttonText 
                        }>
                           Loja
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={ styles.areaTitle }>
                    <Text style={ [styles.labelSearch, {
                        fontSize: 20,
                        fontWeight: 'bold',
                    }] }>
                        Produtos
                    </Text>
                    <TouchableOpacity style={ styles.areaLabelViewAll }>
                        <Text style={ styles.labelViewAll }>
                            Ver todos
                        </Text>
                    </TouchableOpacity>
                </View>

                { loading ?
                    <Loading size={60} color="#004085" />
                :
                    <FlatList 
                        style={ styles.flatListArea}
                        data={ productsFiltered }
                        keyExtractor={ (item) => item.product_name }
                        renderItem={({ item }) => (
                            <ListProducts data={item}/>
                        )}
                        numColumns={2}
                        contentContainerStyle={{

                            paddingBottom: 30,
                            gap: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        columnWrapperStyle={{
                            gap: 20,
                        }}
                        showsVerticalScrollIndicator={ false }
                        ListEmptyComponent={ 
                            () => <Empty message="Nemhum produto encontrado."/>
                        }
                    />
                }
            </View>
        </SafeAreaView>
    );
}