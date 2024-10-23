import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { View, Text, Alert, SafeAreaView, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { globalStyles } from '../styles/globalStyles';
import { movementsStyles as styles } from '../styles/movementsStyles';

import { User } from '../components/Header';
import { Button, List } from 'react-native-paper';
import Header from '../components/Header';
import Empty from '../components/Empty';
import ListMovements from '../components/ListMovements';
import { useFocusEffect } from '@react-navigation/native';

export interface IMovement {
    id: number;
    produto: {
        nome: string;
        imagem: string;
    };
    origem: {
        nome: string;
    };
    destino: {
        nome: string;
    };
    status: string;
}

export default function Movements({ navigation } : any) {

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

    // Atualiza a lista de movimentações toda vez que a tela é focada
    useFocusEffect(
        useCallback(() => {
            getMovements();
        }, [])
      );

    useEffect(() => {

        setLoading(true);

        getMovements(); 

    }, []);

    function handlenavigateToAddMovement() {
        navigation.navigate('Adicionar Movimentação');
    }

    return (
        <SafeAreaView>
            <StatusBar style="light"  backgroundColor='#004085'/>
            
            <View style={ styles.areaViewHeader}>
                {user && 
                <Header data={ user as unknown as User | null } 
                signOut={ signOut }/>} 
            </View>

            <View style={ styles.container }>
            
                <Button
                    style={ [globalStyles.button, styles.buttonMovements] }
                    labelStyle={{ fontSize: 18 }}
                    buttonColor="#fd7e14"
                    icon="plus-circle" 
                    mode="contained" 
                    onPress={handlenavigateToAddMovement}
                >
                    Adicionar Movimentação
                </Button>

                <Text style={ styles.titleMovement }>
                    Movimentações
                </Text>

                <FlatList
                    data={movements}
                    keyExtractor={ item => item.id.toString() }
                    renderItem={({ item }: { item: IMovement }) => (
                        <ListMovements item={item} />
                    )}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <Empty message="Nenhuma movimentação encontrada." />
                    }
                />
            </View>
        </SafeAreaView>
    );
}
