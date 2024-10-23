import { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { IMovement } from '../screens/Movements';
import { globalStyles } from '../styles/globalStyles';
import Loading from './Loading';

type ListMovementsDriverProps = {
    item: IMovement
}

export default function ListMovementsDriver({ item }: ListMovementsDriverProps) {

    const [ loading, setLoading ] = useState(false);
    
    return (
        <View style={ styles.container}>
            <View>
                <Image 
                    source={{ uri: item.produto.imagem }}
                    style={{ width: 100, height: 100 }}
                />
                <Text>{item.id}</Text>
            </View>
            
            <View style={ globalStyles.formGroup }>
                    <Button
                        style={globalStyles.button}
                        labelStyle={{ fontSize: 16 }}
                        buttonColor="#fd7e14"
                        icon={ loading ? '' : 'check-circle' }
                        mode="contained"
                        onPress={() => {}}
                    >
                        {loading ? <
                            Loading size="small" color='#fff'/> : 
                            "Iniciar Entrega"
                        }
                    </Button>

                    <Button
                        style={globalStyles.button}
                        labelStyle={{ fontSize: 16 }}
                        buttonColor="gray"
                        icon={ loading ? '' : 'check-circle' }
                        mode="contained"
                        onPress={() => {}}
                    >
                        {loading ? <
                            Loading size="small" color='#fff'/> : 
                            "Mapa"
                        }
                    </Button>
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        padding: 20,
        marginVertical: 8,
        borderRadius: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: '100%',
    },
});