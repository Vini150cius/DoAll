import { Image, StyleSheet, Text, View, Dimensions, TouchableOpacity } from "react-native";
import React from "react";

const { width, height } = Dimensions.get("screen");

const SlideItem = ({ item , navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={item.img} resizeMode="contain" style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("SignIn")}
          style={styles.button}
        >
          <Text style={styles.textButton}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SlideItem;

const styles = StyleSheet.create({
  container: {
    width,
    height,
    alignItems: "center",
  },
  image: {
    flex: 0.65,
    width: "60%",
    height: "100%",
  },
  content: {
    flex: 0.3,
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#E4E4E4",
  },
  text: {
    fontSize: 22,
    textAlign: "center",
    marginVertical: 15,
    marginHorizontal: 20,
    color: "#E4E4E4",
  },
  button: {
    fontSize: 45,
    backgroundColor: '#b18461',
    borderCurve: 100,
    paddingHorizontal: 55,
    paddingVertical: 15,
    marginTop: 10,
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 50,
  },
  textButton:{
    fontSize: 25,
    fontWeight: 700,
    color: '#E4E4E4',
  }
});
