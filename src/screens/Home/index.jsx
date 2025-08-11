import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { AirbnbRating } from "react-native-ratings";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { supabase } from "../config/supabaseConfig";

export default function Pessoa({ data, cliente_id, navigation }) {
  const [favorito, setFavorito] = useState(false);

  async function toggleFavorito() {
    try {
      if (!favorito) {
        // Insere no banco quando marcar como favorito
        const { error } = await supabase.from("favoritos").insert([
          {
            profissional_id: data.id, // id do profissional
            cliente_id: cliente_id,   // id do cliente
          },
        ]);

        if (error) {
          console.error("Erro ao salvar favorito:", error);
          return;
        }
        setFavorito(true);
      } else {
        // Remove do banco se desmarcar
        const { error } = await supabase
          .from("favoritos")
          .delete()
          .match({ profissional_id: data.id, cliente_id: cliente_id });

        if (error) {
          console.error("Erro ao remover favorito:", error);
          return;
        }
        setFavorito(false);
      }
    } catch (err) {
      console.error("Erro inesperado:", err);
    }
  }

  return (
    <View style={styles.card}>
      <Image source={{ uri: data.photo_url }} style={styles.image} />

      <View style={styles.info}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.title}>{data.services}</Text>

          <TouchableOpacity onPress={toggleFavorito}>
            <FontAwesome
              name={favorito ? "bookmark" : "bookmark-o"}
              size={22}
              color={favorito ? "gold" : "#333"}
              style={styles.bookmark}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.subtitle}>{data.sentence}</Text>

        <AirbnbRating
          count={5}
          defaultRating={4}
          size={15}
          showRating={false}
          isDisabled
          selectedColor="#f1c40f"
          starContainerStyle={styles.stars}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 10,
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
  },
  stars: {
    marginTop: 5,
    alignSelf: "flex-start",
  },
  bookmark: {
    marginLeft: 8,
  },
});
