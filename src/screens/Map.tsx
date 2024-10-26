import { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';


export default function Map() {
    
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)

    return (
        <SafeAreaView style={styles.container}>

            <Text>Usando Maps</Text>

            { 
                (latitude && longitude) ? 
                (
                <MapView 
                    style={{ width: 340, height: 600 }}
                    initialRegion={{
                        latitude: -7.5529504,
                        longitude: -48.8832875,
                        latitudeDelta: 1,
                        longitudeDelta: 1
                    }}
                >
                    <Marker 
                        coordinate={{
                            latitude: -7.5529504,
                            longitude: -48.8832875
                        }}
                        title="Pokemon"
                        description="Pokemon encontrado"
                    />
                </MapView>
                ) : 
                (
                    <Text>Carregando...</Text>
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
});