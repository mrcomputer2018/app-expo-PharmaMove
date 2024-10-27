import { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { IMovement } from './Movements';
import ActivityIndicator from "react-native-paper/src/components/ActivityIndicator";


export default function Map(props: IMovement) {

    const { origem } = props.route.params.item
    const { destino } = props.route.params.item
    
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)

    return (
        <SafeAreaView style={styles.container}>
            { 
                (latitude && longitude) ? 
                (
                <MapView 
                    style={{ flex: 1, width: '100%' }}
                    initialRegion={{
                        latitude: (origem.latitude + destino.latitude) / 2,
                        longitude: (origem.longitude + destino.longitude) / 2,
                        latitudeDelta: Math.abs(origem.latitude - destino.latitude) * 2,
                        longitudeDelta: Math.abs(origem.longitude - destino.longitude) * 2
                    }}
                >
                    <Marker 
                        coordinate={{
                            latitude: destino.latitude,
                            longitude: destino.longitude
                        }}
                        title={destino.nome}
                        description="Destino da entrega"
                    />

                    <Marker 
                        coordinate={{
                            latitude: origem.latitude,
                            longitude: origem.longitude
                        }}
                        title={origem.nome}
                        description="Origem da entrega"
                    />

                    <Polyline
                        coordinates={[
                            { 
                                latitude: origem.latitude, 
                                longitude: origem.longitude 
                            },
                            { 
                                latitude: destino.latitude, 
                                longitude: destino.longitude 
                            }
                        ]}
                        strokeColor="red"
                        strokeWidth={3}
                    />
                </MapView>
                ) : 
                (
                    <View>
                        <ActivityIndicator size={48} color='#004085'/>
                        <Text style={ styles.textLoading }>
                            Carregando...
                        </Text>
                    </View>
                )
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textLoading: {  
        marginTop: 10,
        fontSize: 18,
        color: '#004085',
        fontWeight: 'bold'
    }
});