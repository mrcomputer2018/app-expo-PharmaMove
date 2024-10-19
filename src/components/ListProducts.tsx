import { View, Text, Image, StyleSheet } from 'react-native';

type ProductProps = {
    data: {
        product_name: string;
        quantity: number;
        image_url: string;
        description: string;
        branch_name: string;
        location: string;
        latitude: number;
        longitude: number;
    }
}

export default function ListProducts({data} : ProductProps) {
    return (
        <View style={ styles.card }>
            <Image 
            source={{ uri: data.image_url }}
            style={ styles.productImage }
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

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        width: 140,
        alignItems: 'center',
        borderColor: '#CCC',
        borderWidth: 1,
        elevation: 1,
    },
    areaCardDescription: {
        padding: 10,
        alignItems: 'center',
    },
    productImage: {
        width: 100,
        height: 100,
        borderRadius: 5,
        margin: 10,
    },
    productTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    productQuantity: {
        fontSize: 16,
        color: '#004085',
    },
    productStore: {
        fontSize: 12,
        color: '#333',
    },
    productArea: {
        flexDirection: 'row',
        margin: 10,
        backgroundColor: '#FFF',
        borderRadius: 5,
    },
    productInfo: {
        flex: 1,
        flexDirection: 'column',
    },
    productButton: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        backgroundColor: '#004085',
        padding: 10,
        borderRadius: 5,
    },
    productButtonText: {
        color: '#FFF',
        fontSize: 16,
    },
    productButtonArea: {
        flexDirection: 'row',
    },
    productButtonIcon: {
        marginRight: 5
    }
});