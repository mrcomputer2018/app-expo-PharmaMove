import { View, Text, Image } from 'react-native';
import { listMovementsStyles as styles } from '../styles/listMovementsStyles';

export default function ListMovements({ item }: any) {
    return (
        <View style={ styles.card }>
            <Image 
                style={ styles.image }
                source={{ uri: item.imgUrl }}
            />

            <View>
                <Text style={ styles.textProduct }>
                    {item?.product_name}
                </Text>
                <View style={ styles.description }>
                    <Text style={ styles.text }>Origem:</Text>
                    <Text>{item.origin_name}</Text>
                </View>

                <View style={ styles.description }>
                    <Text style={ styles.text }>Destino:</Text>
                    <Text>{item?.destination_name}</Text>
                </View>
                
                <View style={ styles.areaStatus }>
                    <Text style={ styles.textStatus }>
                        {item.status}
                    </Text>
                </View>
            </View>
        </View>
    );
}
