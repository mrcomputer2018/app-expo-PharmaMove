import { useEffect, useState } from 'react';
import { View, Text, Alert, SafeAreaView } from 'react-native';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

import Header from '../components/Header';
import { User } from '../components/Header';


export default function Moviments() {

    const { user, signOut } = useAuth();

    const [loading, setLoading] = useState(false);
    const  [moviments, setMoviments] = useState([]);

    useEffect(() => {

        setLoading(true);

        function getMoviments() {
            axios.get(process.env.EXPO_PUBLIC_API_URL + '/movements')  
            .then((response) => {
                setMoviments(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
                Alert.alert('Error', 'Erro ao buscar movimentações.');
            });
        }

        getMoviments(); 

    }, []);

    return (
        <SafeAreaView>
            {user && 
            <Header data={ user as unknown as User | null } 
            signOut={ signOut }/>} 

            <View>
                <Text>Movimentações</Text>
            </View>
        </SafeAreaView>
    );
}