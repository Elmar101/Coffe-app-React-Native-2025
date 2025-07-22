import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const Button = ({ title, onPress }: { title: string, onPress: () => void }) => {
  return (
    <TouchableOpacity
      className="bg-gray-700 p-4 rounded-lg"
      onPress={onPress}
    >
      <Text className="text-black text-center">{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
