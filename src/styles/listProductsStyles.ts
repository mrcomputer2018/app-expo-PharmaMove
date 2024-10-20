import { StyleSheet } from "react-native";

export const listProductsStyles = StyleSheet.create({
    card: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        width: 160,
        alignItems: 'center',
        borderColor: '#CCC',
        borderWidth: 1,
        elevation: 1,
        overflow: 'hidden',
    },
    areaCardDescription: {
        padding: 10,
        alignItems: 'center',
        backgroundColor: 'rgba(0, 64, 133, 0.1)',
        width: '100%',
        height: 96,
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
    },
    productImage: {
        width: 100,
        height: 90,
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
        textAlign: 'center',
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