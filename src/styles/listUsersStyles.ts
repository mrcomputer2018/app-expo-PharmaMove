import { StyleSheet } from "react-native";

export const listUsersStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
        marginBottom: 16,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    areaSwitch: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    textSwitch: {
        fontSize: 14,
        color: '#004085',
        textAlign: 'center',
        marginLeft: 10,
        marginTop: 10,
    },
});