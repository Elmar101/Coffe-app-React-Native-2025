import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { themeColors } from '../theme';
import { AntDesign } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ICoffeeItem } from '../constants';
import { RootStackParamList } from '../navigation/AppNavigation';

interface IProps {
  item: ICoffeeItem;
}

export default function CoffeeCardItem({ item }: IProps) {
  const { height: SCREEN_H, width: SCREEN_W } = Dimensions.get('window');

  const CARD_WIDTH = SCREEN_W * 0.7;
  const CARD_HEIGHT = SCREEN_H * 0.5;

   const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
      }}
      className="relative items-center overflow-visible">
      <LinearGradient
        colors={[themeColors.bgPrimary, themeColors.bgSecondary]}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={{
          position: 'absolute',
          bottom: 0,
          width: CARD_WIDTH,
          height: CARD_HEIGHT - (CARD_WIDTH * 0.5) / 2,
          borderRadius: 40,
        }}
      />

      <Image
        source={item.image}
        className="absolute shadow-2xl"
        resizeMode="cover"
        style={{
          width: CARD_WIDTH * 0.8,
          height: CARD_HEIGHT * 0.5,
          top: CARD_HEIGHT * 0.02,
        }}
      />

      <View className="absolute bottom-2 w-full space-y-2 p-4">
        <Text className="z-10 text-3xl font-semibold text-white">{item.name}</Text>

        <View className="mt-4 w-14 items-center rounded-full bg-white/20 px-2 py-1">
          <Text className="text-sm font-semibold text-white">{item.stars}</Text>
        </View>

        <Text className="mt-2 text-base text-white opacity-70">Volume {item.volume}</Text>

        <View className="mt-2 flex-row items-center justify-between">
          <Text className="text-lg font-semibold text-white">${item.price}</Text>

          <TouchableOpacity
            className="h-14 w-14  items-center justify-center rounded-full"
            onPress={() => navigation.navigate('detail', { ...item })}
          >
            <AntDesign name="pluscircle" size={47} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
