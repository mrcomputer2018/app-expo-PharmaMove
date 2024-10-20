import { View, Text, Image } from 'react-native';
import { listProductsStyles as styles } from '../styles/listProductsStyles';

type ProductProps = {
    data: {
        product_name: string;
        quantity: number;
        image_url: string;
        branch_name: string;
    }
}

export default function ListProducts({data} : ProductProps) {
    return (
        <View style={ styles.card }>
            <Image 
            source={{ uri: data.image_url }}
            style={[styles.productImage, { 
                opacity: data.quantity === 0 ? 0.2 : 1 }
            ]}
            />
            <View style={ styles.areaCardDescription }>
                <Text style={ styles.productTitle }>
                    { data.product_name }
                </Text>
                <Text style={ styles.productStore }>
                    { data.branch_name }
                </Text>
                <Text style={ styles.productQuantity }>
                    { data.quantity } unids.
                </Text>
            </View>
        </View>
    );
}