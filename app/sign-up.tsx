import React from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import images from "@/constants/images";

const SignUp = () => {
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <Image source={images.newYork} className="w-full h-2/6" />

        <View className="p-10 bg-white rounded-t-[40px] flex flex-col-1 gap-6 -mt-10">
          <View className="flex flex-col text-start gap-2 w-full">
            <Text className="text-base text-start font-rubik text-black-300">
              Email
            </Text>
            <TextInput
              placeholder="example@mail.com"
              className="border-b focus:border-primary-300
               border-black-100 py-4 rounded-xl px-6"
            ></TextInput>
          </View>
          <View className="flex flex-col text-start gap-2 w-full">
            <Text className="text-base text-start font-rubik text-black-300">
              Password
            </Text>
            <TextInput
              placeholder="Input Password"
              className="border-b focus:border-primary-300
               border-black-100 py-4 rounded-xl px-6"
            ></TextInput>
          </View>
          <TouchableOpacity
            onPress={() => {}}
            className="bg-primary-300  shadow-md shadow-zinc-300 rounded-full w-full  py-4 mt-8"
          >
            <Text className="text-lg font-rubik text-white text-center ">
              Sign in
            </Text>
          </TouchableOpacity>
          {/* Divider */}
          <View className="flex flex-row items-center justify-center my-4">
            <View className="h-[1px] bg-gray-200 flex-1" />
            <Text className="px-3 text-gray-400">or</Text>
            <View className="h-[1px] bg-gray-200 flex-1" />
          </View>
          <Text className="text-base text-center mt-14 font-rubik text-black-300">
            Dont have Account?
            <Text className="text-primary-300 font-bold"> Sign Up</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
