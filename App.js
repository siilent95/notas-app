import { StatusBar } from "expo-status-bar";
import React from "react";
import * as eva from "@eva-design/eva";
import { StyleSheet, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  ApplicationProvider,
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from "@ui-kitten/components";
import { default as theme } from "./theme.json";
import CrearNota from "./screens/CrearNota";
import ListaNotas from "./screens/ListaNotas";
import Nota from "./screens/Nota";

const { Navigator, Screen } = createBottomTabNavigator();

//Iconos navigation
const iconCrear = (props) => <Icon name="file-add-outline" {...props} />;
const iconNotas = (props) => <Icon name="folder-outline" {...props} />;

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    style={styles.navigation}
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab icon={iconCrear} />
    <BottomNavigationTab icon={iconNotas} />
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator
    screenOptions={{ headerShown: false }}
    tabBar={(props) => <BottomTabBar {...props} />}
  >
    <Screen name="CrearNota" component={CrearNota} />
    <Screen name="ListaNotas" component={ListaNotas} />
    <Screen name="Nota" component={Nota} />
  </Navigator>
);

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </ApplicationProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#252525",
  },
  navigation: {
    backgroundColor: "#252525",
  },
});
