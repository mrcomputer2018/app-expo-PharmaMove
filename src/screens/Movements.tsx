import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
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


export default function Movements({ navigation } : any) {

    const { user, signOut } = useAuth();

    const [loading, setLoading] = useState(false);
    const  [movements, setMovements] = useState([
        {
            movement_id: 1,
            origin_name: 'Farmácia Saúde SP',
            destination_name: 'Farmácia Bem-Estar CE',
            product_name: 'Paracetamol 500mg',
            status: 'Aguardando coleta',
            imgUrl: 'https://drogariasp.vteximg.com.br/arquivos/ids/759950-1000-1000/10227---paracetamol-750mg-20-comprimidos-generico-1.jpg?v=637980224448970000'
        }
    ]);

   /*  useEffect(() => {

        setLoading(true);

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

        getMovements(); 

    }, []); */

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
                    keyExtractor={ item => item.movement_id.toString() }
                    renderItem={({ item }) => (
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
