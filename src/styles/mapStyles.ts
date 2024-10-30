import { StyleSheet } from "react-native";

export const mapStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    mapContainer: {
        flex: 1,
    },
    map: {
        flex: 1,
        width: '100%',
    },
    infoContainer: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#cce5ff',
    },
    textInfo: {
        fontSize: 18,
        color: '#004085',
        fontWeight: 'bold',
        padding: 5,
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textLoading: {  
        marginTop: 10,
        fontSize: 18,
        color: '#004085',
        fontWeight: 'bold',
    },
});