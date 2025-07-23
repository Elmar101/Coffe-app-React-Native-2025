import {
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { RouteProp, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AntDesign, Feather } from '@expo/vector-icons';
import { themeColors } from '../theme';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, selectCartItemById, selectCartItemQuantity } from '../store';
import { addToCart, CartItem, decrementQuantity, incrementQuantity } from '../store/cartSlice';
import { RootStackParamList } from '../navigation/AppNavigation';
import { ICoffeeItem } from '../constants';

const windowWidth = Dimensions.get('window').width;
const BG_IMAGE_HEIGHT = windowWidth * 0.75;
const ITEM_CONTAINER_SIZE = windowWidth * 0.65;
const ITEM_IMAGE_SIZE = ITEM_CONTAINER_SIZE;

// DetailScreen üçün route parametrlərini düzgün istifadə et
type DetailScreenRouteProp = RouteProp<RootStackParamList, 'detail'>;

type DetailScreenProps = {
  route: DetailScreenRouteProp; // Route-ı öz parametrləri ilə qəbul et
};

export default function DetailScreen(props: DetailScreenProps) {
  const item = props.route.params as ICoffeeItem;
  const [size, setSize] = useState('small');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const cartItem = useSelector((state: RootState) => selectCartItemById(state, item.id));
  const quantity = useSelector((state: RootState) => selectCartItemQuantity(state, item.id));
  const dispatch = useDispatch();

  return (
    <View className="flex-1 bg-white">
      <StatusBar hidden />

      <Image
        source={require('../../assets/images/bg2.png')}
        className="absolute w-full"
        style={{
          height: BG_IMAGE_HEIGHT,
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
        }}
      />
      <SafeAreaView className="flex-1 justify-between">
        {/* Top toolbar */}
        <View className="mx-4 mt-9 flex-row items-center justify-between">
          <TouchableOpacity
            className="rounded-full border border-white p-2"
            onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity className="rounded-full border border-white p-2">
            <AntDesign name="hearto" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Main show Coffee */}
        <View className="-mt-8 items-center">
          <View
            style={{
              width: ITEM_CONTAINER_SIZE,
              height: ITEM_CONTAINER_SIZE,
              shadowColor: themeColors.bgSecondary,
              shadowRadius: 20,
              shadowOpacity: 0.4,
            }}>
            <Image
              source={item.image}
              style={{
                width: ITEM_IMAGE_SIZE,
                height: ITEM_IMAGE_SIZE,
              }}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Content card */}

        <View
          className="px-6 pb-6 pt-8"
          style={{
            marginTop: -ITEM_CONTAINER_SIZE / 2.5,
          }}>
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-3xl font-semibold" style={{ color: themeColors.text }}>
                {item.name}
              </Text>

              <Text className="mt-1 text-xl font-semibold" style={{ color: themeColors.text }}>
                ${item.price}
              </Text>
            </View>
            <View className="absolute right-6 rounded-full bg-primary px-3 py-1">
              <Text className="mt-1 text-xl font-semibold" style={{ color: themeColors.text }}>
                {item.stars}
              </Text>
            </View>
          </View>

          {/* Size selection buttons */}

          <View className="mt-2 flex flex-row justify-between gap-8">
            {['small', 'medium', 'large'].map((s) => (
              <TouchableOpacity
                key={s}
                onPress={() => setSize(s)}
                className="flex-1 rounded-full py-3"
                style={{
                  backgroundColor: size === s ? themeColors.bgPrimary : '#fff',
                  borderWidth: size === s ? 0 : 1,
                  borderColor: themeColors.bgPrimary,
                }}>
                <Text
                  className="text-center font-semibold"
                  style={{
                    color: size === s ? '#fff' : themeColors.text,
                  }}>
                  {s.charAt(0).toLocaleUpperCase() + s.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* About text */}
          <Text className="mt-6 text-lg font-semibold">About</Text>

          <Text className="mt-2 text-base text-gray-600">{item.desc}</Text>
        </View>

        {/* Bottom section: volume & quantity controls */}

        <View className="mb-8 space-y-4 px-4">
          <View className="flex flex-row justify-between">
            {/* Volume */}
            <View className="flex-row items-center gap-2">
              <Text className=" text-lg font-semibold">Volume</Text>

              <Text className="text-base text-gray-600">{item.volume}</Text>
            </View>
            {/* minus plus */}

            <View className="flex-row items-center gap-4 p-1 px-4">
              <TouchableOpacity
                onPress={() => {
                  if (quantity && quantity > 1) dispatch(decrementQuantity(item.id));
                }}>
                <AntDesign name="minuscircle" size={24} color={themeColors.bgPrimary} />
              </TouchableOpacity>
              <Text className="text-base text-gray-600">{quantity}</Text>
              <TouchableOpacity onPress={() => {
               if(!cartItem){
                 dispatch(addToCart(item));
               }
                dispatch(incrementQuantity(item.id));
              }}>
                <AntDesign name="pluscircle" size={24} color={themeColors.bgPrimary} />
              </TouchableOpacity>
            </View>
          </View>

          <View className="mt-1 flex-row items-center justify-between">
            <TouchableOpacity className="rounded-full border border-gray-300 p-4">
              <Feather name="shopping-bag" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                dispatch(addToCart(cartItem ? { ...cartItem, quantity } : item));
                navigation.navigate('cart');
              }}
              className="ml-4 flex-1 rounded-full bg-primary p-4">
              <Text className="text-center text-base font-semibold text-white">Səbətə Əlavə Et</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({});
