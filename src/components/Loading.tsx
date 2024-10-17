import { View } from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { loadingStyles as styles } from "../styles/loadingStyles";

type LoadingProps = {
    color?: string;
    size: number | "small" | "large";
}

export default function Loading({size, color}: LoadingProps) {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={size} animating={true} color={color || MD2Colors.white} />
        </View>
    );
}