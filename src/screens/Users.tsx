import React, { useEffect, useState } from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

import { Feather } from '@expo/vector-icons';
import { globalStyles } from '../styles/globalStyles';
import ListUsers from '../components/ListUsers';
import { loadingStyles } from '../styles/loadingStyles';
import { set } from 'zod';

type User = { 
    id: number; 
    profile: string;
    name: string;
    document: string;
    full_address: string;
    email: string;
    password: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
 }

export default function Users() {

    const [users, setUsers] = useState<User[]>([
        {
            id: 2,
            profile: "motorista",
            name: "guilherme ribeiro",
            document: "02644311209",
            full_address: "Rua das flores, 69 - Bento Ribeiro - RJ",
            email: "guilherme@guilherme.com",
            password: "12341234",
            status: true,
            createdAt: "2024-10-16T16:01:29.914Z",
            updatedAt: "2024-10-16T16:01:29.914Z"
        }
    ]);
    const [isEnabled, setIsEnabled] = useState(false);

    useEffect(() => {
        function getUsers() {
            
            setIsEnabled(true);

            axios.get(process.env.EXPO_PUBLIC_API_URL + '/users')
            .then((response) => {
                setUsers(response.data);
                setIsEnabled(false);
            })
            .catch((error) => {
                console.error(error);
                alert("Erro ao buscar usuários");
                setIsEnabled(false);
            });
        }

        getUsers();

    }, []);

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

            <FlatList
                style={ styles.areaFlatlist} 
                data={users}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <ListUsers item={item} users={users} /* setusers={setUsers} */ />
                )}
                ListEmptyComponent={() => <Text>Nenhum usuário encontrado</Text>}
                showsVerticalScrollIndicator={false}
            />
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