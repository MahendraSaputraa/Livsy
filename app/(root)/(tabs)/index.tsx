import { Link } from "expo-router";
import { Text, View } from "react-native";
export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-lg font-bold text-blue-500">
        Welcome to Nativewind!
      </Text>

      <Link href="/sign-in">Sign in</Link>
      <Link href="/welcome-screen">Welcome</Link>
      <Link href="/explore">Explore</Link>
      <Link href="/profile">Profile</Link>
    </View>
  );
}
