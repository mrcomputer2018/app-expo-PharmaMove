import { View } from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { loadingStyles as styles } from "../styles/loadingStyles";

type LoadingProps = {
    color?: string;
}

export default function Loading({color}: LoadingProps) {
    return (
        <View style={styles.container}>
            <ActivityIndicator animating={true} color={color || MD2Colors.white} />
        </View>
    );
}