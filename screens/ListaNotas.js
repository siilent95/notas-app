import React, { useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "@ui-kitten/components";
import { useFocusEffect, useNavigation } from "@react-navigation/core";

export default function ListaNotas() {
  const [notas, setNotas] = useState([]);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      getNotas();
    }, [])
  );

  const getNotas = () => {
    AsyncStorage.getItem("NOTAS2").then((notas) => {
      setNotas(JSON.parse(notas));
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text
        style={styles.text}
        category="h5"
        onPress={() =>
          navigation.navigate("Nota", {
            notaUnica: item,
          })
        }
      >
        {item}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title} category="h1">
        Notas
      </Text>
      <View>
        <FlatList
          style={styles.list}
          data={notas.reverse()}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#252525",
  },
  title: {
    textAlign: "left",
    marginTop: 50,
    paddingLeft: 20,
    fontSize: 43,
  },
  list: {
    backgroundColor: "#252525",
    borderRadius: 10,
    paddingTop: 30,
  },
  item: {
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 24,
    borderRadius: 10,
    backgroundColor: "#9EFFFF",
    maxHeight: 350,
  },
  text: {
    padding: 2,
    fontSize: 25,
    fontWeight: "400",
    lineHeight: 35,
    color: "#252525",
  },
});
