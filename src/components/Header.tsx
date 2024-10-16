import { View, Text, Image, TouchableOpacity } from 'react-native';
import { headerStyles as styles } from '../styles/headerStyles';
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