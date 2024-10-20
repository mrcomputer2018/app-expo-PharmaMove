import { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import axios from 'axios';


export default function Moviments() {

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
        <View>
            <Text>Moviments</Text>
        </View>
    );
}