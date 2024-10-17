import React, { useEffect, useState } from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

import { Feather } from '@expo/vector-icons';
import { globalStyles } from '../styles/globalStyles';
import ListUsers from '../components/ListUsers';
import Loading from '../components/Loading';


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

export default function Users() {

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
   
    useEffect(() => {
    
            getUsers();
    
    }, [setLoading]);

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

    return (
        <View style={ globalStyles.container }>
            <Text style={ styles.title }>
                Listagem de Usuários
            </Text>

            <TouchableOpacity style={ styles.areaButton }>
                <Feather name="plus" size={28} color="#fff" />
                <Text style= { styles.textButton }>
                    Adicionar Usuário
                </Text>
            </TouchableOpacity>

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
                        () => <Text>Nenhum usuário encontrado</Text>
                    }
                    showsVerticalScrollIndicator={false}
                />           
            }
        </View>
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