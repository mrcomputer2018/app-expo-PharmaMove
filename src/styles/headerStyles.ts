import { StyleSheet } from "react-native";

export const headerStyles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 14,
        padding: 12,
        borderBottomWidth: 2,
        borderBottomColor: "#ddd",
        shadowColor: "#000",
        elevation: 1,
        backgroundColor: "##f8f9fa",
    },
    containerProfile: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12
    },
    image : {
        width: 60,
        height: 60,
        borderRadius: 30
    },
    name: {
        fontWeight: "bold",
        fontSize: 17,
        color: "#333",
    },
    profile: {
        fontSize: 14,
        color: "#666",
    },
    button: {
        padding: 10,
        borderRadius: 8,
        borderColor: "#666",
        borderWidth: 1,
        backgroundColor: "gray",
    }
});