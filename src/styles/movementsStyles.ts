import { StyleSheet } from 'react-native';

export const movementsStyles = StyleSheet.create({
    areaViewHeader: {
        marginTop: 24,
    },
    container: {
        padding: 20,
    },
    areaTitleMovement: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 10,
        marginBottom: 10,
    },
    titleMovement : {
        fontSize: 20,
        fontWeight: 'bold',
    },
    buttonMovements: {
        marginBottom: 20,
        marginTop: 10,
    },
    listMovements: {
        height: 530,
        width: '100%',
    }
});