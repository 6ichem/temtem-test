import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Pressable,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import SafeLayout from "../../components/SafeLayout";
import { GlobalStyles } from "../../core/globalStyles";
import RemixIcon from "react-native-remix-icon";
import { http, initHttpToken } from "../../http/config";
import { AppContext } from "./state/context";
import { actionTypes } from "./state/actions";
import { actionTypes as authActionTypes } from "../auth/state/actions";

import { IMAGE_TYPES } from "./constants";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../auth/state/context";

const FilterButton = ({
  iconName,
  title,
  onPress,
}: {
  iconName: string;
  title: string;
  onPress?: () => void;
}) => (
  <View>
    <TouchableOpacity style={filtersStyles.filterButton} onPress={onPress}>
      <RemixIcon
        name={iconName}
        color="white"
        style={filtersStyles.filterIcon}
      />
    </TouchableOpacity>
    <Text style={filtersStyles.filterButtonTitle}>{title}</Text>
  </View>
);

const Filters = () => {
  const router = useRouter();
  return (
    <View style={filtersStyles.filterRow}>
      <FilterButton iconName="star-line" title="Top Rated" />
      <FilterButton iconName="film-line" title="Movies" />
      <FilterButton iconName="movie-line" title="Series" />
      <FilterButton iconName="file-list-line" title="Actors" />
    </View>
  );
};

const ResultsView = ({ data }: { data: any[] }) => {
  const router = useRouter();
  return (
    <View style={{ marginTop: 12 }}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={resultsStyles.container}
      >
        {data?.map((item) => (
          <TouchableOpacity
            style={resultsStyles.resultItem}
            key={item.id}
            onPress={() =>
              router.push(`/details?id=${item.id}&type=${item.media_type}`)
            }
          >
            <Image
              style={{
                width: Dimensions.get("window").width / 2,
                height: 300,
                borderRadius: 16,
              }}
              source={{
                uri: `${IMAGE_TYPES.IMAGE}/${item.poster_path}`,
              }}
              resizeMode="cover"
            />
            <Text style={resultsStyles.resultItemTitle}>
              {item.name || item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default function Home() {
  const router = useRouter();

  const [isLoading, setLoading] = useState(false);

  const { state, dispatch } = useContext(AppContext);
  const { state: authState, dispatch: authDispatch }: any =
    useContext(AuthContext);

  const { trendingContent: trendingResults }: any = state ?? {};

  const handleTrending = async () => {
    try {
      const accessToken = await initHttpToken();

      setLoading(true);

      const { data }: any = await http.get("/content/trending");

      setLoading(false);

      dispatch({
        type: actionTypes.SET_TRENDING_CONTENT,
        payload: data,
      });
    } catch (e: any) {
      setLoading(false);
    }
  };

  const getUser = async () => {
    try {
      const accessToken = await initHttpToken();

      const { data } = await http.get("/auth/user");

      authDispatch({
        type: authActionTypes.SET_USER,
        payload: data,
      });

      setLoading(false);
    } catch (error) {
      setLoading(false);
      await AsyncStorage.clear();
      router.push("/auth/sign-in");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    handleTrending();
  }, []);

  return (
    <SafeLayout>
      {isLoading ? (
        <View style={mainStyles.rootLoader}>
          <ActivityIndicator
            size="large"
            color="white"
            animating
            hidesWhenStopped
          />
        </View>
      ) : (
        <View style={mainStyles.container}>
          <View style={mainStyles.heading}>
            <Text style={mainStyles.heading.title}>Welcome,</Text>
            <Text style={mainStyles.heading.bio}>
              {authState?.user?.username}!
            </Text>
          </View>
          <Text style={mainStyles.sub}>Check our latest additions.</Text>

          <View style={mainStyles.filterContainer}>
            <Filters />
          </View>

          <View style={mainStyles.featuredContent}>
            <View style={mainStyles.featuredHeading}>
              <Text style={mainStyles.featuredHeading.title}>Featured</Text>
              <Text style={mainStyles.featuredHeading.bio}>
                Shows and Movies
              </Text>
            </View>

            <View>
              <ResultsView data={trendingResults} />
            </View>
          </View>
        </View>
      )}
    </SafeLayout>
  );
}

const mainStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  heading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    title: {
      ...GlobalStyles.CustonFontBold,
      fontSize: 30,
      color: "white",
    },
    bio: {
      ...GlobalStyles.CustonFontRegular,
      fontSize: 30,
      color: "white",
    },
  },
  sub: {
    ...GlobalStyles.CustonFontRegular,
    fontSize: 16,
    color: "#A0A0A0",
  },
  filterContainer: { marginVertical: 32 },
  featuredContent: {},
  featuredHeading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    title: {
      ...GlobalStyles.CustonFontBold,
      fontSize: 24,
      color: "white",
    },
    bio: {
      ...GlobalStyles.CustonFontRegular,
      fontSize: 24,
      color: "white",
    },
  },
  rootLoader: {
    flex: 1,
    backgroundColor: "#09090F",
    alignItems: "center",
    justifyContent: "center",
  },
});

const filtersStyles = StyleSheet.create({
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  filterButton: {
    padding: 18,
    backgroundColor: "#51535E",
    color: "white",
    borderRadius: 16,
    width: 62,
    alignSelf: "center",
  },
  filterButtonTitle: {
    ...GlobalStyles.CustonFontBold,
    color: "#A0A0A0",
    textAlign: "center",
    marginTop: 10,
  },
  filterIcon: {
    alignSelf: "center",
  },
});

const resultsStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  resultItem: {
    width: Dimensions.get("window").width / 2,
    borderRadius: 16,
    flexDirection: "column",
    marginRight: 24,
  },
  resultItemTitle: {
    ...GlobalStyles.CustonFontBold,
    color: "white",
    fontSize: 16,
    marginTop: 12,
    textAlign: "center",
  },
});
