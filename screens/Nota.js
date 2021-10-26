import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Text, Icon } from "@ui-kitten/components";
import { useFocusEffect, useNavigation } from "@react-navigation/core";

export default function Nota({ route }) {
  const [notas, setNotas] = useState([]);
  const { notaUnica } = route.params;
  const navigation = useNavigation();

  const [cambio, setCambio] = useState("");

  const iconEliminar = (props) => (
    <Icon
      name="trash-2"
      {...props}
      style={[props.style, { width: 24, height: 24 }]}
    />
  );
  const iconGuardar = (props) => (
    <Icon
      name="save"
      {...props}
      style={[props.style, { width: 24, height: 24 }]}
    />
  );

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

  const modificarNota = async () => {
    const index = notas.findIndex((obj) => obj === notaUnica);
    const nuevoArreglo = await notas.fill(cambio, index);
    console.log(nuevoArreglo);
    await AsyncStorage.setItem("NOTAS2", JSON.stringify(nuevoArreglo)).then(
      () => navigation.navigate("ListaNotas")
    );
  };

  const eleminarNota = async () => {
    const nuevasNotas = await notas.filter((nota) => nota !== notaUnica);
    await AsyncStorage.setItem("NOTAS2", JSON.stringify(nuevasNotas)).then(() =>
      navigation.navigate("ListaNotas")
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.avoidingView}
        behavior={Platform.OS === "ios" ? "padding" : null}
      >
        <View style={styles.container}>
          <View style={styles.buttonGroup}>
            <Text style={styles.title} category="h1">
              Editar
            </Text>
            <Button
              onPress={eleminarNota}
              style={styles.button}
              accessoryLeft={iconEliminar}
            ></Button>
            <Button
              style={styles.button}
              accessoryLeft={iconGuardar}
              onPress={modificarNota}
            ></Button>
          </View>
          <ScrollView style={styles.scrollView}>
            <TextInput
              style={styles.input}
              defaultValue={notaUnica}
              editable={true}
              multiline={true}
              onChangeText={setCambio}
              maxLength={500}
              keyboardAppearance="dark"
              selectionColor="#fff"
            />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#252525",
  },
  avoidingView: {
    flex: 1,
    padding: 21,
    paddingTop: 50,
    backgroundColor: "#252525",
  },
  title: {
    textAlign: "left",
    fontSize: 43,
    paddingBottom: 45,
    marginTop: 4,
    width: 235,
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 17,
    //borderBottomWidth: 1,
    borderColor: "#fff",
    includeFontPadding: false,
    paddingVertical: 0,
  },
  buttonGroup: {
    flexDirection: "row",
  },
  button: {
    margin: 7,
    alignSelf: "flex-start",
    backgroundColor: "#3B3B3B",
    borderColor: "#3B3B3B",
    borderRadius: 15,
    width: 50,
    height: 50,
  },
  scrollView: {
    height: "65%",
  },
});
