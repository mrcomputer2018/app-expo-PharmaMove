import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, FlatList, Alert } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { IMovement } from './Movements';
import axios from 'axios';

import { User } from '../components/Header';
import Header from '../components/Header';
import ListMovementsDriver from '../components/ListMovementsDriver';
import { globalStyles } from '../styles/globalStyles';

export default function Driver() {

    const { user, signOut } = useAuth();
    const [loading, setLoading] = useState(false);
    const  [movements, setMovements] = useState<IMovement[]>([]);


    function getMovements() {
        axios.get(process.env.EXPO_PUBLIC_API_URL + '/movements')  
        .then((response) => {
            setMovements(response.data);
            setLoading(false);
        })
        .catch((error) => {
            console.error(error);
            setLoading(false);
            Alert.alert('Error', 'Erro ao buscar movimentações.');
        });
    }

    useEffect(() => {
        setLoading(true);
        getMovements();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            
            {user && 
            <Header data={ user as unknown as User | null } 
            signOut={ signOut }/>}

            <View style={{ 
                flex: 1, 
                justifyContent: 'center',
                alignItems: 'flex-start',
                backgroundColor: "#fff",
                padding: 20,
            }}>
                <Text style={ globalStyles.title }>
                    Movimentações
                </Text>
                
                <FlatList 
                    data={movements}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <ListMovementsDriver item={item} />
                    )}
                />
            </View>
            
        </SafeAreaView>
    );
}