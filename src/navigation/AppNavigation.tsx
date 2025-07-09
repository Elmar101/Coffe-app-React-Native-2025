import { Text, StyleSheet, View, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HomeScreen from "../screens/HomeScreen";
import FavScreen from "../screens/FavScreen";
import ProductScreen from "../screens/ProductScreen";
import { use } from "react";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTab() {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Tab.Navigator screenOptions={({route})=>({ 
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {...styles.tabBar, bottom: insets.bottom + 2}
      })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Fav" component={FavScreen} />
        <Tab.Screen name="Product" component={ProductScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          contentStyle: {
            backgroundColor: "#000",
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeTab}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "transparent",
  },
  tabBar: {
    position: "absolute",
  }
});
