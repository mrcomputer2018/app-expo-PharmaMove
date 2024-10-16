import React, { useEffect, useState } from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { globalStyles } from '../styles/globalStyles';
import { headerStyles } from '../styles/headerStyles';
import { Switch } from 'react-native-paper';

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
        console.log('Listagem de Usuários');
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
                    <View style={[ globalStyles.container, styles.container, { opacity: item.status ? 1 : 0.2 } ]}>
                        <Image 
                            style={ styles.image }
                            source={require('../assets/motorista.jpg')}
                        />
                        
                        <View style={globalStyles.container}>
                            <Text style={ headerStyles.name }>
                                {item.name}
                            </Text>
                            <Text style={ headerStyles.profile }>
                                {item.profile}
                            </Text>
                        </View>

                        <View style={ styles.areaSwitch }>
                            <Text style={ styles.textSwitch }>
                                {item.status ? 'Ativo' : 'Inativo'}
                            </Text>
                            <Switch 
                                value={item.status} 
                                onValueChange={(value) => {
                                    const updatedUsers = users.map(user => 
                                        user.id === item.id ? { ...user, status: value } : user
                                    );
                                    setUsers(updatedUsers);
                                }}
                                trackColor={{false: '#767577', true: '#ccc'}}
                                thumbColor={isEnabled ? '#f4f3f4' :'#004085'}
                            />
                        </View>
                    </View>
                )}
                ListEmptyComponent={() => <Text>Nenhum usuário encontrado</Text>}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 8,
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
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
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
    areaSwitch: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    textSwitch: {
        fontSize: 14,
        color: '#004085',
        textAlign: 'center',
        marginLeft: 10,
        marginTop: 10,
    },

});