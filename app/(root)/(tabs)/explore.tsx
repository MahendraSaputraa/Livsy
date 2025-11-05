import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Card } from "@/components/Cards";
import Filters from "@/components/Filters";
import Search from "@/components/Search";

export default function Explore() {
  return (
    <SafeAreaView className="h-full bg-white">
      <FlatList
        data={[1, 2, 3, 4]}
        renderItem={({ item }) => <Card />}
        numColumns={2}
        keyExtractor={(item) => item.toString()}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="px-5">
            {/* search */}
            <Search />
            <Filters />
            {/* main card  */}
            <View className="mt-5">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubik-bold text-black-300">
                  Found 4 Properties
                </Text>
              </View>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}
