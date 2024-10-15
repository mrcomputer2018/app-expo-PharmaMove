import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

type HeaderProps = {
    data: User | null;
    signOut: () => void;
}

export type User = {
    name: string;
    profile: string;
} | null;

export default function Header({ data, signOut }: HeaderProps) {

    return (
        <View style={ styles.container }>
            <View style={ styles.containerProfile }>
                <Image 
                    style={ styles.image }
                    source={require('../assets/afro.jpg')}
                />

                <View>
                    <Text  style={ styles.name }>
                        {data ? data.name : "Guilherme Ribeiro"}
                    </Text>

                    <Text  style={ styles.profile }>
                        {data ? data.profile : "Motorista"}
                    </Text>
                </View>
            </View>
            <View>
                <TouchableOpacity 
                style={ styles.button }
                onPress={signOut}
                >
                    <Feather name="log-out" size={28} color="#f8f9fa" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 14,
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#f1f1f1",
        elevation: 2,
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