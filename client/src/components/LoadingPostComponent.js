import { View, Text } from "react-native";

export default function LoadingPostComponent() {
  return (
    <View className="bg-white w-full h-64 rounded-lg">
      <View className="flex flex-row items-center justify-start p-6">
        <View className="w-16 h-16 bg-gray-300 rounded-full"></View>
        <View className="flex flex-col ml-2">
          <View className="w-40 h-4 bg-gray-300 rounded"></View>
          <View className="w-20 h-4 bg-gray-300 rounded mt-1"></View>
        </View>
      </View>
      <View className="flex flex-col justify-center p-6">
        <View className="w-64 h-4 bg-gray-300 rounded"></View>
        <View className="w-60 h-4 bg-gray-300 rounded mt-1"></View>
        <View className="w-40 h-4 bg-gray-300 rounded mt-1"></View>
      </View>
    </View>
  );
}
