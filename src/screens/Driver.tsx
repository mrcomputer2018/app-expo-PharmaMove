import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, SafeAreaView, FlatList, Alert } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { IMovement } from './Movements';
import axios from 'axios';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Constants from "expo-constants"

import { User } from '../components/Header';
import Header from '../components/Header';
import ListMovementsDriver from '../components/ListMovementsDriver';
import { globalStyles } from '../styles/globalStyles';
import Empty from '../components/Empty';
import Loading from '../components/Loading';

const statusBarHeight = Constants.statusBarHeight;

export default function Driver({ navigation }: any) {

    const { user, signOut } = useAuth();
    const [loading, setLoading] = useState(false);
    const  [movements, setMovements] = useState<IMovement[]>([]);

    // Hook para obter a altura da StatusBar e das outras áreas seguras
    const insets = useSafeAreaInsets();


    function getMovements() {

        setLoading(true);

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
        getMovements();
    }, []);

    function handleNavigateToMap(item: IMovement) {
        navigation.navigate('Mapa', { item });
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ paddingTop: statusBarHeight }}>
                <StatusBar
                    style="light"  
                    backgroundColor='#004085'
                />
            </View>
            
            <View style={ globalStyles.areaViewHeader}>
                {user && 
                <Header data={ user as unknown as User | null } 
                signOut={ signOut }/>} 
            </View>

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
    
                { 
                    loading 
                    ? 
                    <Loading size={48} color='#004085'/> 
                    :
                    <FlatList 
                        data={movements}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <ListMovementsDriver 
                                item={item}
                                handleNavigateToMap={handleNavigateToMap}
                                getMovements={getMovements}
                            />
                        )}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ 
                            paddingBottom: 20,
                        }}
                        ListEmptyComponent={
                            <Empty message="Nenhuma movimentação encontrada." />
                        }
                    />
                }
            </View>
            
        </SafeAreaView>
    );
}