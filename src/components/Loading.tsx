import { View } from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { loadingStyles as styles } from "../styles/loadingStyles";

export default function Loading() {
    return (
        <View style={styles.container}>
            <ActivityIndicator animating={true} color={MD2Colors.red800} />
        </View>
    );
}