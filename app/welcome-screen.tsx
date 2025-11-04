import images from "@/constants/images";
import { useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const router = useRouter();
  const handleSignUp = async () => {
    router.push("/sign-up");
  };
  const handleSignIn = async () => {
    router.push("/sign-in");
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <Image
          source={images.onboarding}
          className="w-full object-cover h-4/6"
          resizeMode="contain"
        />

        <View className="px-10">
          <Text className="text-base text-center uppercase font-rubik text-black-200">
            Welcome To Vorverty
          </Text>

          <Text className="text-3xl font-rubik-bold text-black-300 text-center mt-2">
            Lets Get You Closer To
            <Text className="text-primary-300">Your Ideal Home</Text>
          </Text>

          <View className="flex flex-row gap-2 mt-4">
            <TouchableOpacity
              onPress={handleSignIn}
              className="bg-white border-[1px] border-primary-300 shadow-md shadow-zinc-300 rounded-full w-6/12  py-4 mt-5"
            >
              <Text className="text-lg font-rubik text-primary-300 text-center ">
                Sign in
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSignUp}
              className="bg-primary-300 shadow-md shadow-zinc-300 rounded-full w-6/12 py-4 mt-5"
            >
              <Text className="text-lg font-rubik text-white text-center ">
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
