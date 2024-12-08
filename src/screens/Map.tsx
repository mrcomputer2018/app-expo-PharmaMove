import React, { useRef, useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import ActivityIndicator from "react-native-paper/src/components/ActivityIndicator";
import {mapStyles as styles } from '../styles/mapStyles';

interface MapProps {
  route: {
    params: {
      item: {
        origem: {
          latitude: number;
          longitude: number;
          nome: string;
        };
        destino: {
          latitude: number;
          longitude: number;
          nome: string;
        };
      };
    };
  };
}

export default function Map(props: MapProps) {
    const { origem, destino } = props.route.params.item;

    const mapEl = useRef<MapView>(null);
    
    const [distance, setDistance] = useState<number | null>(null);
    const [duration, setDuration] = useState<number | null>(null);
    const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number }[]>([]);

  useEffect(() => {
        if (coordinates.length > 0 && mapEl.current) {
        // Ajusta a visualização do mapa para incluir todos os pontos da rota
        mapEl.current.fitToCoordinates(coordinates, {
                edgePadding: {
                top: 50,
                bottom: 50,
                left: 50,
                right: 50,
            },
            animated: true,
        });
        }
  }, [coordinates]);

  return (
        <SafeAreaView style={styles.container}>
        {origem.latitude && origem.longitude && destino.latitude && destino.longitude ? (
            <View style={styles.mapContainer}>
                <MapView
                style={styles.map}
                ref={mapEl}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: (origem.latitude + destino.latitude) / 2,
                    longitude: (origem.longitude + destino.longitude) / 2,
                    latitudeDelta: Math.abs(origem.latitude - destino.latitude) * 1.8,
                    longitudeDelta: Math.abs(origem.longitude - destino.longitude) * 1.8,
                }}
                >
                <Marker 
                coordinate={{ latitude: origem.latitude, longitude: origem.longitude }}
                title={origem.nome}
                description="Origem da entrega"
                />
                <Marker 
                coordinate={{ latitude: destino.latitude, longitude: destino.longitude }}
                title={destino.nome}
                description="Destino da entrega"
                />
              
                {coordinates.length > 0 && (
                    <Polyline coordinates={coordinates} strokeColor="red" strokeWidth={4} />
                )}

                <MapViewDirections
                    origin={{ latitude: origem.latitude, longitude: origem.longitude }}
                    destination={{ latitude: destino.latitude, longitude: destino.longitude }}
                    apikey={process.env.GOOGLE_MAPS_API_KEY}
                    strokeColor="blue"
                    strokeWidth={4}
                    onReady={result => {
                    setDistance(result.distance);
                    setDuration(result.duration);
                    setCoordinates(result.coordinates);
                    }}
                    onError={error => console.error('Erro ao calcular a rota:', error)}
                />
                </MapView>
                <View style={styles.infoContainer}>
                    <Text style={styles.textInfo}>
                        Distância: {(distance ?? 0).toFixed(2)} km
                    </Text>
                    <Text style={styles.textInfo}>
                        Tempo estimado: {((duration ?? 0) / 60).toFixed(2)} horas
                    </Text>
                </View>
            </View>
        ) : (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size={48} color='#004085' />
                <Text style={styles.textLoading}>Carregando...</Text>
            </View>
        )}
      </SafeAreaView>
  );
}

