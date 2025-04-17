import React, { useRef, useState } from "react";
import Slides from "./../../components/Slides";
import { Animated, FlatList, SafeAreaView } from "react-native";
import SlideItem from "./../../components/SlideItem";
import styles from "./styles";
import Pagination from "../../components/Pagination";


// Fonte: https://www.youtube.com/watch?v=2TgArwz6je8

export default function ToggleTypeUser({ navigation }) {
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

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
        data={Slides}
        renderItem={({ item }) => <SlideItem item={item} navigation={navigation} />}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <Pagination data={Slides} scrollX={scrollX} index={index} />
    </SafeAreaView>
  );
}
