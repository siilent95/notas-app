import React, { useState } from "react";
import {
  Dimensions,
  Platform,
  StyleSheet,
  TextInput,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
import { Button, Text, Icon, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

export default function CrearNota() {
  const [nota, setNota] = useState("");
  const navigation = useNavigation();

  const limiteCaracteres = 500;

  const guardarNota = async () => {
    if (nota.trim().length > 0) {
      const value = await AsyncStorage.getItem("NOTAS2");
      const n = value ? JSON.parse(value) : [];
      n.push(nota);
      await AsyncStorage.setItem("NOTAS2", JSON.stringify(n)).then(() =>
        navigation.navigate("ListaNotas")
      );
      setNota("");
    }
  };

  const iconoMas = (props) => (
    <Icon
      fill="#252525"
      name="plus-outline"
      {...props}
      style={[props.style, { width: 48, height: 48 }]}
    />
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.avoidingView}
        behavior={Platform.OS === "ios" ? "padding" : null}
      >
        <View style={styles.container}>
          <IconRegistry icons={EvaIconsPack} />
          <Text style={styles.title} category="h1">
            Notas
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Escriba su nota..."
            placeholderTextColor="#fff"
            value={nota}
            onChangeText={setNota}
            multiline={true}
            maxLength={limiteCaracteres}
            selectionColor="#fff"
            keyboardAppearance="dark"
          />
          <Text style={styles.contador}>
            {limiteCaracteres - nota.length} restantes
          </Text>
          <Button
            style={styles.button}
            accessoryLeft={iconoMas}
            onPress={guardarNota}
          ></Button>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#252525",
    padding: 20,
    paddingTop: 50,

    width: Dimensions.get("window").width,
  },
  avoidingView: {
    flex: 1,
    backgroundColor: "#252525",
  },
  title: {
    textAlign: "left",
    fontSize: 43,
    paddingBottom: 30,
  },
  input: {
    maxHeight: 320,
    height: "80%",
    color: "#fff",
    textAlignVertical: "top",
    paddingVertical: 0,
    fontSize: 22,
    borderBottomWidth: 1,
    borderColor: "#fff",
  },
  contador: {
    fontSize: 18,
    alignSelf: "flex-end",
    paddingTop: 22,
  },
  button: {
    alignSelf: "flex-end",
    marginTop: 170,
    borderRadius: 50,
    width: 70,
    height: 70,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: -2.5, height: 2 },
        shadowOpacity: 0.5,
      },
      android: {
        elevation: 10,
      },
    }),
  },
});
