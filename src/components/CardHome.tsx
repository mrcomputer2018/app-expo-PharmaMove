import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

type CardHomeProps = {
    image: string | undefined;
    title: string;
    subtitle: string;
    action: () => void;
}

export default function CardHome({image, title, subtitle, action}: CardHomeProps) {
    return (
        <TouchableOpacity 
            style={ styles.container }
            onPress={ action }
        >
            <Image 
                style= { styles.image }
                source={image ? image : require('../assets/afro.jpg')}
            />

            <View style={ styles.areaTitle }>
                <Text style={ styles.title }>
                   {title}
                </Text>
                <Text style={ styles.subtitle }>
                    {subtitle}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
        height: 100,
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        cursor: 'pointer',
    },
    image: {   
        width: 100,
        height: 100,
    },
    areaTitle: {
        flex: 1, 
        padding: 10
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
    } 
});