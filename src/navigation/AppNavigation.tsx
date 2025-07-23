import { StyleSheet, View, SafeAreaView, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeScreen from '../screens/HomeScreen';
import FavScreen from '../screens/FavScreen';
import { Entypo } from '@expo/vector-icons';
import { themeColors } from '../theme';
import DetailScreen from '../screens/DetailScreen';
import CartScreen from '../screens/CartScreen';
import { ComponentProps } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import { ICoffeeItem } from '../constants';

export type RootStackParamList = {
  detail: ICoffeeItem;
  cart: undefined;
  home: undefined;
  fav: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const TAB_BAR_HEIGHT = Math.round(SCREEN_HEIGHT * 0.065);
const TAB_BAR_RADIUS = Math.round(TAB_BAR_HEIGHT / 2);

type EntypoNameType = ComponentProps<typeof Entypo>['name'];

const iconNameObj: Record<string, EntypoNameType> = {
  home: 'home',
  fav: 'heart',
  cart: 'shopping-cart',
};

const renderTabIcon = (routeName: string, focused: boolean = false) => {
  const iconName = iconNameObj[routeName];
  const containerClass = `flex justify-center items-center w-12 h-12 rounded-full ${focused ? 'bg-gray-200' : ''}`;
  return (
    <View className={containerClass.trim()}>
      <Entypo name={iconName} size={24} color={focused ? themeColors.bgPrimary : '#fff'} />
    </View>
  );
};

function HomeTab() {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: { ...styles.tabBar, bottom: insets.bottom + 2 },
          tabBarItemStyle: styles.tabBarItem,
          tabBarIcon: ({ focused }) => {
            return renderTabIcon(route.name, focused);
          },
        })}>
        <Tab.Screen name="home" component={HomeScreen} />
        <Tab.Screen name="fav" component={FavScreen} />
        <Tab.Screen name="cart" component={CartScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

export default function AppNavigation() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            contentStyle: {
              backgroundColor: '#000',
            },
            headerShown: false,
          }}>
          <Stack.Screen name="home" component={HomeTab} options={{ headerShown: false }} />
          <Stack.Screen name="detail" component={DetailScreen} options={{ headerShown: false }} />
          <Stack.Screen
            name="cart"
            component={CartScreen}
            options={{ headerShown: false, contentStyle: { backgroundColor: '#fff' } }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  tabBar: {
    position: 'absolute',
    backgroundColor: themeColors.bgPrimary,
    height: TAB_BAR_HEIGHT,
    borderRadius: TAB_BAR_RADIUS,
    marginLeft: SCREEN_WIDTH * 0.05,
    marginRight: SCREEN_WIDTH * 0.05,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  tabBarItem: {
    marginTop: 10,
  },
});
