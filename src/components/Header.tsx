import { View, Text, Image, TouchableOpacity } from 'react-native';
import { headerStyles as styles } from '../styles/headerStyles';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';

type HeaderProps = {
    data: User | null;
    signOut: () => void;
}

export type User = {
    name: string;
    profile: string;
} | null;

export default function Header({ data, signOut }: HeaderProps) {

    const { profile } = useAuth();

    let image = require('../assets/afro.jpg'); // default image

    if( profile && profile.profile === 'admin'){
        image = require('../assets/afro.jpg');
    }
    else if(profile && profile.profile === 'filial'){
        image = require('../assets/filial.jpg');
    }
    else if(profile && profile.profile === 'motorista'){
        image = require('../assets/motorista.jpg');
    }

    return (
        <View style={ styles.container }>
            <View style={ styles.containerProfile }>
                <Image 
                    style={ styles.image }
                    source={image}
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