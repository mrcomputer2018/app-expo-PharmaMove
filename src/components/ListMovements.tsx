import { View, Text, Image } from 'react-native';
import { listMovementsStyles as styles } from '../styles/listMovementsStyles';

import { IMovement } from '../screens/Movements';

type ListMovementsProps = {
        item: IMovement;
}

export default function ListMovements({ item }: ListMovementsProps) {
    return (
        <View style={ styles.card }>
            <Image 
                style={ styles.image }
                source={{ uri: item.produto.imagem }}
            />

            <View  style={ styles.areaDetails }>
                <Text style={ styles.textProduct }>
                    {item.produto.nome} - { item.quantidade } unid(s)
                </Text>
                <View style={ styles.description }>
                    <Text style={ styles.text }>Ordem n.º:</Text>
                    <Text>{item.id}</Text>
                </View>
                <View style={ styles.description }>
                    <Text style={ styles.text }>Origem:</Text>
                    <Text>{item.origem.nome}</Text>
                </View>

                <View style={ styles.description }>
                    <Text style={ styles.text }>Destino:</Text>
                    <Text>{item.destino.nome}</Text>
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
