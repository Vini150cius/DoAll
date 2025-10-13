import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import { LinearGradient } from "expo-linear-gradient";

const Background = [
  "rgba(0, 0, 0, 0)",
  "rgba(0, 0, 0, 0.753)",
  "rgba(0, 0, 0, 0.877)",
  "rgb(0, 0, 0)",
];

export default function InitScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("./../../../assets/wallpaperInit.png")}
        style={styles.background}
      >
        <View style={styles.containerEmpty}></View>
        <LinearGradient style={styles.containerInfo} colors={Background}>
          <View style={styles.infos}>
            <Text style={styles.title}>DoAll</Text>
            <Text style={styles.welcomeText}>
              Conectando quem faz com quem precisa.
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("ToggleTypeUser")}
              style={styles.button}
            >
              <Text style={styles.textButton}>Começar</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
}
