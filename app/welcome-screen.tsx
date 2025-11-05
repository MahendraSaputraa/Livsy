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
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <Image
          source={images.onboarding}
          className="object-cover w-full h-4/6"
          resizeMode="contain"
        />

        <View className="px-10">
          <Text className="text-base text-center uppercase font-rubik text-black-200">
            Welcome To Livsy
          </Text>

          <Text className="mt-2 text-3xl text-center font-rubik-bold text-black-300">
            Lets Get You Closer To
            <Text className="text-primary-300">Your Ideal Home</Text>
          </Text>

          <View className="flex flex-row gap-2 mt-4">
            <TouchableOpacity
              onPress={handleSignIn}
              className="bg-white border-[1px] border-primary-300 shadow-md shadow-zinc-300 rounded-full w-6/12  py-4 mt-5"
            >
              <Text className="text-lg text-center font-rubik text-primary-300 ">
                Sign in
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSignUp}
              className="w-6/12 py-4 mt-5 rounded-full shadow-md bg-primary-300 shadow-zinc-300"
            >
              <Text className="text-lg text-center text-white font-rubik ">
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
