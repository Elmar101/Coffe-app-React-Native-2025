import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems, selectCartTotalPrice } from '../store';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Entypo, Feather } from '@expo/vector-icons';
import { themeColors } from '../theme';
import {
  clearCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from '../store/cartSlice';
import { safePrice } from '../helpers';

export default function CartScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);

  const totalPrice = useSelector(selectCartTotalPrice);
  return (
    <SafeAreaView>
      <StatusBar hidden />
      <View className="mt-5 flex-row items-center justify-between border border-gray-200 px-4 py-3">
        <TouchableOpacity
          className="rounded-full border border-white p-2"
          onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color={themeColors.text} />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-secondary">Cart</Text>

        <TouchableOpacity
          className="rounded-full border border-white p-2"
          onPress={() => dispatch(clearCart())}>
          <Entypo name="trash" size={20} color="red" />
        </TouchableOpacity>
      </View>

      <View className="px-4 pt-4">
        <FlatList
          data={items}
          keyExtractor={(i) => i.id.toString()}
          ListEmptyComponent={<Text className="text-center text-gray-400">Empty Cart</Text>}
          renderItem={({ item }) => {
            const price = safePrice(item.price);
            return (
              <View className="mb-4 flex-row items-center border-b border-b-primary p-4">
                <Image source={item.image} className="h-16 w-16 " />
                <View className="ml-4 flex-1">
                  <Text className="text-base font-medium">{item.name}</Text>

                  <Text className="text-base font-medium">
                    {price.toFixed(2)}$ x {item.quantity}
                  </Text>

                  <View className="mt-3 flex-row items-center">
                    <TouchableOpacity
                      onPress={() => dispatch(decrementQuantity(item.id))}
                      className="p-1">
                      <AntDesign name="minuscircle" size={24} color={themeColors.bgPrimary} />
                    </TouchableOpacity>

                    <Text className="mx-3 text-base" style={{ color: themeColors.text }}>
                      {item.quantity}
                    </Text>

                    <TouchableOpacity
                      onPress={() => dispatch(incrementQuantity(item.id))}
                      className="p-1">
                      <AntDesign name="pluscircle" size={24} color={themeColors.bgPrimary} />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => dispatch(removeFromCart(item.id))}
                      className="ml-auto">
                      <Feather name="delete" size={24} color="red" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>

      {items.length > 0 && (
        <View className="px-4 pb-8">
          <Text className="mb-3 text-lg font-semibold text-secondary">
            Toplam {totalPrice.toFixed(2)}$
          </Text>
          <TouchableOpacity className="rounded-full bg-primary px-2 py-4">
            <Text className="text-center text-xl font-semibold text-white">Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
