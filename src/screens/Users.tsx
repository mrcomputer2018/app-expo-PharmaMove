import React, { useEffect, useState } from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import axios from 'axios';

import { Feather } from '@expo/vector-icons';
import { globalStyles } from '../styles/globalStyles';
import ListUsers from '../components/ListUsers';
import Loading from '../components/Loading';
import Empty from '../components/Empty';
import { Button } from 'react-native-paper';


type User = { 
    id: number; 
    profile: string;
    name: string;
    document: string;
    full_address: string;
    email: string;
    password: string;
    status: number;
}

export default function Users({ navigation }: any) {

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
   
    // Carregango usuários na tela
    useEffect(() => {
    
            getUsers();
    
    }, [setLoading]);

    // Função para buscar usuários
    function getUsers() {
            
        setLoading(true);

        axios.get(process.env.EXPO_PUBLIC_API_URL + '/users')
        .then((response) => {
            setUsers(response.data);
            setLoading(false);
        })
        .catch((error) => {
            console.error(error);
            setLoading(false);
            alert("Erro ao buscar usuários");
        });
     }

     // Função para atualizar status do usuário
    async function handleSwitch(item: User) {
        setLoading(true);

        await axios.patch(`http://192.168.0.212:3000/users/${item.id}/toggle-status`,{})
        .then(response => {
            alert("Status atualizado com sucesso");
            setLoading(false);
            getUsers();
        })
        .catch(error => {
            console.error(error);
            alert("Erro ao atualizar status");
            setLoading(false);
        });
    }

    // Função para navegar para tela de adicionar usuário
    function handleNavigateToAddUser() {
        navigation.navigate('Adicionar Usuário');
    }

    return (
        <SafeAreaView style={ globalStyles.container }>
            <Button
                style={ globalStyles.button }
                labelStyle={{ fontSize: 18 }}
                buttonColor="#fd7e14"
                icon="plus-circle" 
                mode="contained" 
                onPress={ handleNavigateToAddUser }
            >
                Adicionar usuário
            </Button>

            { loading ?
                <Loading size={60} color="#004085" />
                :
                <FlatList
                    style={ styles.areaFlatlist} 
                    data={users}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <ListUsers item={item} action={handleSwitch}/>
                    )}
                    ListEmptyComponent={
                        () => <Empty message="Nenhum usuário encontrado."/>
                    }
                    showsVerticalScrollIndicator={false}
                />           
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    areaButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        gap: 10,
        padding: 16,
        backgroundColor: '#004085',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },
    textButton: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    areaFlatlist: {
        marginTop: 30,
    },
});