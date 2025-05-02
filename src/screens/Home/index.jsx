import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Home({ navigation }) {
  const [text, setText] = useState("");
  const [feed, setFeed] = useState([]);
  const idUser = useSelector((state) => state.userReducer.idUser);

  useEffect(() => {
    viewTest();
    const interval = setInterval(() => {
      viewTest();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const Pessoa = ({ data }) => (
    <View style={styles.areaPessoa}>
      <Text style={styles.textoPessoa}>idUser: {data.idUser}</Text>
      <Text style={styles.textoPessoa}>Texto: {data.text}</Text>
    </View>
  );

  const renderItem = ({ item }) => <Pessoa data={item} />;

  async function addTest() {
    try {
      const getResponse = await axios.get(
        `https://doall-83ded-default-rtdb.firebaseio.com/teste/${idUser}.json`
      );
      
      const currentData = getResponse.data || {};
      
      const newItemId = `item_${Date.now()}`;
      
      const updatedData = {
        ...currentData,
        [newItemId]: { 
          text: text,
        }
      };
      
      const res = await axios.put(
        `https://doall-83ded-default-rtdb.firebaseio.com/teste/${idUser}.json`,
        updatedData
      );
      
      console.log("Dados adicionados:", res.data);
      setText(""); 
      viewTest(); 
    } catch (error) {
      console.error("Erro ao adicionar teste:", error);
    }
  }

  async function viewTest() {
    try {
      const res = await axios.get(
        "https://doall-83ded-default-rtdb.firebaseio.com/teste.json"
      );
      
      if (res.data) {
        const feedArray = [];

        Object.keys(res.data).forEach(userId => {
          const userData = res.data[userId];
          if (userData && typeof userData === 'object') {
            Object.keys(userData).forEach(itemId => {
              feedArray.push({
                id: `${userId}_${itemId}`, 
                idUser: userId,
                itemId: itemId,
                ...userData[itemId]
              });
            });
          }
        });

        feedArray.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
        
        setFeed(feedArray);
      } else {
        setFeed([]);
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      setFeed([]);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={styles.menuIcon}
        >
          <Feather name="menu" size={24} color="white" />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar..."
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.searchIcon}>
          <Ionicons name="notifications" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Bem-vindo ao Home Screen {idUser}</Text>
        <TextInput 
          style={styles.input} 
          value={text} 
          onChangeText={setText}
          placeholder="Digite seu texto aqui"
        />
        <TouchableOpacity style={styles.button} onPress={addTest}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={feed}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listaContainer}
          ListEmptyComponent={<Text style={styles.emptyText}>Nenhum dado encontrado</Text>}
        />
      </View>
    </SafeAreaView>
  );
}