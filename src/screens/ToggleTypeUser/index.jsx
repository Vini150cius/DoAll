import React, { useRef, useState } from "react";
import { Animated, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SlideItem from "./../../components/SlideItem";
import styles from "./styles";
import Pagination from "../../components/Pagination";

// Fonte: https://www.youtube.com/watch?v=2TgArwz6je8

export default function ToggleTypeUser({ navigation }) {
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const slides = [
    {
      id: 1,
      img: require("./../../../assets/client.png"),
      title: "Cliente",
      text: "Serviços de confiança, a um toque de você",
    },
    {
      id: 2,
      img: require("./../../../assets/profissional.png"),
      title: "Profissional",
      text: "Mostre seu talento. A gente leva até quem precisa",
    },
  ];

  const handleOnScroll = (event) => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      }
    )(event);
  };

  const handleOnViewableItemsChanged = useRef(({ viewableItems }) => {
    setIndex(viewableItems[0].index);
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={slides}
        renderItem={({ item }) => (
          <SlideItem item={item} navigation={navigation} />
        )}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <Pagination data={slides} scrollX={scrollX} index={index} />
    </SafeAreaView>
  );
}
