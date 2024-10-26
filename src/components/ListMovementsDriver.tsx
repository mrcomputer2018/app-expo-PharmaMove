import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { Button, ProgressBar } from 'react-native-paper';
import { IMovement } from '../screens/Movements';
import { globalStyles } from '../styles/globalStyles';
import Loading from './Loading';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

type ListMovementsDriverProps = {
    item: IMovement
}

type MyImage = {
    uri: string,
    type: string,
    name: string
}

export default function ListMovementsDriver({ item }: ListMovementsDriverProps, { navigation }: any) {

    const [ loadingDelivery, setLoadingDelivery ] = useState(false);
    const [ loadingMap, setLoadingMap ] = useState(false);
    const [currentStatus, setCurrentStatus] = useState("created");

    async function getImageCamera() {
        const permission = await ImagePicker.requestCameraPermissionsAsync()

        if (permission.granted) {

            const imageInCamera = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!imageInCamera.canceled && imageInCamera.assets) {
                return {
                    uri: imageInCamera.assets[0].uri,
                    type: imageInCamera.assets[0].mimeType || 'image/jpeg',
                    name: imageInCamera.assets[0].fileName || 'photo.jpg'
                };

            }
        }
    }

    async function updateDatabase(item: IMovement, myImage: MyImage) { 

        const data: any =  {
            uri: myImage,
        }

        const formData = new FormData();
       
        formData.append('file', myImage as any);

        formData.append('motorista', 'Guilherme Silva');

        axios.put(process.env.EXPO_PUBLIC_API_URL + `/movements/${item.id}/start`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            }
        })
        .then((response) => {
            console.log("DEU BOM NO UPLOAD");
            Alert.alert("Sucesso","Entrega iniciada com sucesso!");
        })
        .catch((error) => {
            console.log(error);
            console.log("DEU RUIM NO UPLOAD");
        });
    }

    async function updateDatabaseFinalize(item: IMovement, myImage: MyImage) {
        const data: any =  {
            uri: myImage,
        }

        const formData = new FormData();
       
        formData.append('file', myImage as any);

        formData.append('motorista', 'Guilherme Silva');

        axios.put(process.env.EXPO_PUBLIC_API_URL + `/movements/${item.id}/end`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            }
        })
        .then((response) => {
            console.log("DEU BOM NO UPLOAD");
            Alert.alert("Sucesso","Entrega iniciada com sucesso!");
        })
        .catch((error) => {
            console.log(error);
            console.log("DEU RUIM NO UPLOAD");
        });
    }

    // Função para iniciar a entrega
    async function handleStartDelivery() {
        setLoadingDelivery(true);

        const myImage = await getImageCamera();

        if (myImage) {
            await updateDatabaseFinalize(item, myImage);
        }

        setLoadingDelivery(false);
    }

    // Função para finalizar a entrega
    async function handleFinalizeDelivery() {
        setLoadingDelivery(true);

        const myImage = await getImageCamera();

        if (myImage) {
            await updateDatabase(item, myImage);
        }

        setLoadingDelivery(false);
    }
    
    return (
        <View style={ styles.container}>
            <View style={ styles.areaDetails }>
                <Image 
                    source={{ uri: item.produto.imagem }}
                    style={{ width: 100, height: 100 }}
                />

                <View style={ styles.areaOrder }>
                    <Text style={ [globalStyles.textProduct, {
                        fontSize: 20,
                        color: "#004085",
                    }] }>
                        {item.produto.nome}
                    </Text>

                    <Text style={ styles.textOrder }>
                        Ordem n.º: {item.id}
                    </Text>

                    <Text style={ styles.textOrder }>
                        {item.quantidade} unid(s)
                    </Text>
                </View>
            </View>

            <View>
                <Text style={ [globalStyles.textProduct, { 
                    marginBottom: 10, 
                    color: "#004085",
                    fontSize: 18,
                }] }>
                   {
                        currentStatus === "created" ? "Aguardando coleta" : 
                        currentStatus === "em transito" ? "Em trânsito" : 
                        "Finalizado"
                    }
                </Text>
                {
                    currentStatus === "created" ? (
                        <ProgressBar 
                            progress={0.1} 
                            color="gray" 
                        /> ) : 
                    currentStatus === "em transito" ?
                        (
                        <ProgressBar 
                            progress={0.5} 
                            color="#ffc107" 
                        /> ) :
                        ( <ProgressBar 
                            progress={1} 
                            color="#28a745" 
                        /> 
                    )
                }
            </View>

            <View style={ styles.AreaDestination }>
                <View style={ styles.destination }>
                    <Text style={ styles.text }>Origem:</Text>
                    <Text>{item.origem.nome}</Text>
                </View>

                <View style={ styles.destination }>
                    <Text style={ styles.text }>Destino:</Text>
                    <Text>{item.destino.nome}</Text>
                </View>
            </View>
            
            <View>
                <Text style={ [globalStyles.textProduct, { 
                    marginVertical: 10,
                    color:"#004085",
                    fontSize: 18,
                }] }>
                   Historico de Entrega
                </Text>

                {Array.isArray(item.historico) && item.historico.map((historicoItem, index) => {
                    return (
                        <View key={index} style={ styles.destination }>
                            <Text style={ styles.text }>
                                {
                                historicoItem.descricao === "created" ?
                                "Aguardando coleta" :  historicoItem.descricao
                                }
                            </Text>

                            <Text>
                                {new Date(historicoItem.data)
                                .toLocaleString('pt-BR')}
                            </Text>
                        </View>
                    );
                })}
        
            </View>

            <View style={ globalStyles.formGroup }>
                    {/* botao entrega */}
                    { currentStatus === "created" && (
                        <Button
                            style={globalStyles.button}
                            labelStyle={{ fontSize: 16 }}
                            buttonColor="#fd7e14"
                            icon={ loadingDelivery ? '' : 'check-circle' }
                            mode="contained"
                            onPress={handleStartDelivery}
                        >
                            {loadingDelivery ? <
                                Loading size="small" color='#fff'/> : 
                                "Iniciar Entrega"
                            }
                        </Button> )
                    }

                     {/* botao finalizar */}
                    { currentStatus === "em transito" && (
                        <Button
                            style={globalStyles.button}
                            labelStyle={{ fontSize: 16 }}
                            buttonColor="#fd7e14"
                            icon={ loadingDelivery ? '' : 'check-circle' }
                            mode="contained"
                            onPress={handleFinalizeDelivery}
                        >
                            {loadingDelivery ? <
                                Loading size="small" color='#fff'/> : 
                                "Finalizar Entrega"
                            }
                        </Button> )
                    }

                    <Button
                        style={ [globalStyles.button, { marginTop: 10 }] }
                        labelStyle={{ fontSize: 16 }}
                        buttonColor="gray"
                        icon={ loadingMap ? '' : 'check-circle' }
                        mode="contained"
                        onPress={() => navigation.navigate("Mapa")}
                    >
                        {loadingMap ? <
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
        backgroundColor: '#f7f8fa',
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
        width: 350,
    },
    areaDetails: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 20,
    },
    areaOrder: {
        paddingHorizontal: 8,
        width: 260,
    },
    AreaDestination: {
        marginTop: 20,
    },
    destination: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
        width: 200,
    },
    text: {
        fontWeight: 'bold',
    },
    textOrder :{
        color: '#404040', // or another valid color
        fontSize: 16,
        fontWeight: 'bold',
    }

});