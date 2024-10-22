import { StyleSheet } from "react-native";

export const listMovementsStyles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        padding: 10,
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    image: {
        width: 80,
        height: 100,
    },
    textProduct: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    description: {
        flexDirection: 'row',
        alignItems: 'center',
        gap:10,
    },
    text: {
        fontWeight: 'bold',
    },
    areaStatus: {
        paddingTop: 10, 
        justifyContent: 'center',
        alignItems: 'flex-start',

    },
    textStatus: {
        color: 'white',
        backgroundColor: 'red',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    }
});