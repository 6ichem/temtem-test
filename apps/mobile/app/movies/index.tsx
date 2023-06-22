import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import SafeLayout from "../../components/SafeLayout";
import { Stack } from "expo-router";
import { http, initHttpToken } from "../../http/config";
import { AppContext } from "../home/state/context";
import SearchItem from "../../components/SearchItem";
import { MEDIA_TYPES } from "../../utils/constants";

export default function Details() {
  const [isLoading, setLoading] = useState(true);
  const [movies, setMovies] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  const handleMovies = async () => {
    try {
      const accessToken = await initHttpToken();

      const { data }: any = await http.get("/content/top-rated-movies", {
        params: {
          page,
        },
      });

      setLoading(false);

      setMovies((prevMovies) => [...prevMovies, ...data]);
    } catch (e: any) {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleMovies();
  }, [page]);

  return (
    <SafeLayout isFaded={false}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#18181b",
          },
          headerTitle: "Top rated movies",
          headerTintColor: "white",
          headerBackVisible: true,
          headerShadowVisible: true,
          headerBackButtonMenuEnabled: false,
        }}
      />

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : (
        <View>
          <FlatList
            data={movies}
            renderItem={({ item }) => (
              <SearchItem result={item} type={MEDIA_TYPES.MOVIE} />
            )}
            keyExtractor={(item: any) => item.id}
            numColumns={2}
            contentContainerStyle={styles.gridContainer}
            onEndReached={() => setPage((prevPage) => prevPage + 1)}
          />
        </View>
      )}
    </SafeLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    height: 300,
  },
  BannerImage: {
    width: "100%",
    height: "100%",
  },
  gridContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  itemContainer: {
    width: (Dimensions.get("window").width - 40) / 2, // Adjust spacing as needed
    height: 200, // Adjust item height as needed
    margin: 10, // Adjust item margin as needed
    backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
  },
});
