import { StyleSheet } from "react-native";

export const loginStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#004085',
        justifyContent: 'center',
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 300,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    }
});