import { Image, SafeAreaView, Text, View } from "react-native";
import styles from "./styles";
import Logo from "./../../../assets/icon.png"

export default function() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.containerLogo}>
                <Image source={Logo} alt="Logo do DoAll" style={styles.logo}/>
            </View>
            <View style={styles.containerText}>
                <Text style={styles.welcomeText}>Seja bem vindo ao DoAll</Text>
            </View>
        </SafeAreaView>
    )
}