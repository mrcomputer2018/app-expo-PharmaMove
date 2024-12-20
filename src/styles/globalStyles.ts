import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    areaView: {
        marginBottom: 20,
    },
    text: {
        textAlign: "center",
        color: "#f8f9fa",
        fontSize: 34,
        letterSpacing: 1,
    },
    button: {
        marginTop: 40,
        padding: 5,
        fontWeight: "bold",
        height: 50,
    },
    formGroup: {
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    label: {
        marginBottom: 5,
    },
    selectContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        overflow: 'hidden',
    },
    picker: {
        height: 50,
        width: '100%',
        backgroundColor: '#fff',
    },
    input: {
        padding: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    textProduct: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    areaViewHeader: {
        marginTop: 0,
    },
    areaTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginVertical: 20,
    }
});