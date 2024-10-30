import { StyleSheet } from "react-native";

export const productsStyles = StyleSheet.create({
    bgImage: {
        width: '100%',
        height: 120,
        borderRadius: 16,
        elevation: 5,
    },
    areaSearch: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 64, 133, 0.1)',
        padding: 10,
        borderRadius: 16,
        height: 50,
        marginBottom: 10,
    },
    labelSearch: {
        fontSize: 22,
        color: '#333',
        marginBottom: 10,
        textAlign: 'left',
        fontWeight: 'bold',
        marginTop: 20,
    },
    inputSearch: {
        marginLeft: 10,
        fontSize: 18,
        width: '90%',
        height: "100%",
    },
    quantitySearch: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
    },
    areaTypeOfSearch: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    button: {
        padding: 10,
        borderRadius: 16,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 64, 133, 0.1)',
    },
    buttonDark: {
        padding: 10,
        borderRadius: 16,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#004085',
    },
    buttonText: {
        fontSize: 14,
        color: '#004085',
    },
    buttonDarkText: {
        fontSize: 14,
        color: '#FFF',
        fontWeight: 'bold',
    },
    textProductQuantity: {
        fontSize: 18,
        color: '#004085',
        textAlign: 'center',
    },
    areaTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    areaLabelViewAll: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    labelViewAll: {
        fontSize: 16,
        color: '#004085',
    },
    flatListArea: {
        marginBottom: 10,
        height: 400,
    }
});