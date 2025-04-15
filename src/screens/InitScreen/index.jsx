import {
  Image,
  ImageBackground,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles";
import { LinearGradient } from "expo-linear-gradient";
import Logo from "./../../../assets/icon.png";

const Background = ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.74)", "rgb(0, 0, 0)"];

export default function () {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("./../../../assets/wallpaperEXEMPLO.jpeg")}
        style={styles.background}
      >
        <View style={styles.containerEmpty}></View>
        <LinearGradient style={styles.containerInfo} colors={Background}>
          <View style={styles.infos}>
            <Text style={styles.title}>DoAll</Text>
            <Text style={styles.welcomeText}>
              Conectando quem faz com quem precisa.
            </Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.textButton}>Começar</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
}
