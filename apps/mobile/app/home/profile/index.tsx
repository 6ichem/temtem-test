import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { Fragment, useContext } from "react";
import SafeLayout from "../../../components/SafeLayout";
import { GlobalStyles } from "../../../core/globalStyles";
import RemixIcon from "react-native-remix-icon";
import { AuthContextProvider, AuthContext } from "../../auth/state/context";
import CustomButton from "../../../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const WatchlistItem = ({
  item,
  onPress,
}: {
  item: any;
  onPress: () => void;
}) => (
  <TouchableOpacity style={listItemStyles.container} onPress={onPress}>
    <View>
      <Image
        source={{ uri: item.bannerUrl }}
        style={listItemStyles.image}
        resizeMode="cover"
      />
    </View>
    <View>
      <Text style={listItemStyles.title}>{item.title}</Text>
      <Text style={listItemStyles.sub}>
        Added on {new Date(item.createdAt).toDateString()}
      </Text>
    </View>
  </TouchableOpacity>
);

export default function Profile() {
  const router = useRouter();

  const { state, dispatch }: any = useContext(AuthContext);
  const userFavorites = state.user?.favorites;

  const logOut = async () => {
    await AsyncStorage.clear();
    router.push("/auth/sign-in");
  };

  console.log(userFavorites);

  return (
    <SafeLayout>
      <View style={styles.container}>
        <View style={styles.heading}>
          <View style={styles.titleContainer}>
            <RemixIcon name="heart-2-fill" size={24} color="white" />
            <Text style={styles.heading.title}>Watchlist</Text>
          </View>

          <TouchableOpacity onPress={logOut}>
            <RemixIcon name="logout-circle-line" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {userFavorites?.length > 0 ? (
          <ScrollView style={styles.watchlistContainer}>
            {userFavorites.map((item: any) => (
              <Fragment key={item.id}>
                <WatchlistItem
                  item={item}
                  onPress={() =>
                    router.push(
                      `/details?id=${item.moviedbId}&type=${item.mediaType}`
                    )
                  }
                />
              </Fragment>
            ))}
          </ScrollView>
        ) : (
          <View style={styles.notFoundContainer}>
            <Text style={styles.notFoundMessage}>
              You don't have any items in your watchlist yet.
            </Text>
          </View>
        )}
      </View>
    </SafeLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    flexDirection: "column",
  },
  heading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  watchlistContainer: {
    marginTop: 20,
  },
  notFoundContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  notFoundMessage: {
    ...GlobalStyles.CustonFontMedium,
    color: "#A0A0A0",
  },
});

const listItemStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 24,
  },
  image: {
    width: 150,
    height: 80,
    borderRadius: 10,
  },
  title: {
    ...GlobalStyles.CustomFontSemiBold,
    fontSize: 20,
    color: "white",
  },
  sub: {
    ...GlobalStyles.CustonFontRegular,
    fontSize: 14,
    color: "#A0A0A0",
  },
});
