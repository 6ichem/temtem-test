import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  Image,
  ImageBackground,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import SafeLayout from "../../components/SafeLayout";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { http, initHttpToken } from "../../http/config";
import { WebView } from "react-native-webview";
import { IMAGE_TYPES } from "../home/constants";
import { LinearGradient } from "expo-linear-gradient";
import { GlobalStyles } from "../../core/globalStyles";
import {
  convertToReadableTime,
  countStars,
  extractReleaseYear,
} from "../../utils/stringUtils";
import StarRating from "react-native-star-rating-widget";
import { MEDIA_TYPES } from "../../utils/constants";
import CustomButton from "../../components/Button";
import { AuthContext, AuthContextProvider } from "../auth/state/context";
import { actionTypes } from "../auth/state/actions";

const DetailView = ({ contentDetails, contentTrailer }: any) => {
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);

  const { state, dispatch } = useContext(AuthContext);
  const { user }: any = state ?? {};

  const userFavorites = user?.favorites ?? [];

  const currentFav = userFavorites.find(
    (item: any) => item.moviedbId == contentDetails.id
  );

  const isAlreadyFav = () => {
    return userFavorites.some(
      (item: any) => item.moviedbId === contentDetails.id
    );
  };

  const addToFavourites = async ({
    title,
    description,
    bannerUrl,
    moviedbId,
  }: {
    title: string;
    description: string;
    bannerUrl: string;
    moviedbId: number;
  }) => {
    setIsFavoriteLoading(true);
    try {
      const accessToken = await initHttpToken();

      const { data } = await http.put(`/favorites/add`, {
        title,
        description,
        bannerUrl,
        moviedbId,
      });

      setIsFavoriteLoading(false);

      dispatch({
        type: actionTypes.SET_USER,
        payload: {
          ...user,
          favorites: [...userFavorites, data.content],
        },
      });
    } catch (error) {
      setIsFavoriteLoading(false);
      throw error;
    }
  };

  const removeFromFavourites = async () => {
    setIsFavoriteLoading(true);
    try {
      const accessToken = await initHttpToken();

      const { data } = await http.delete(`/favorites/remove`, {
        params: {
          id: parseInt(currentFav.id),
        },
      });

      setIsFavoriteLoading(false);

      dispatch({
        type: actionTypes.SET_USER,
        payload: {
          ...user,
          favorites: userFavorites.filter(
            (item: any) => item.id !== currentFav.id
          ),
        },
      });
    } catch (error) {
      setIsFavoriteLoading(false);
      throw error;
    }
  };

  return (
    <View style={{ paddingBottom: 68 }}>
      <View style={detailStyles.DetailInfo}>
        <Text style={detailStyles.DetailTitle}>
          {contentDetails.name || contentDetails.title}
        </Text>

        <HeaderDetails contentDetails={contentDetails} />

        <View style={detailStyles.DetailRatings}>
          <StarRating
            rating={countStars(contentDetails?.vote_average)}
            onChange={() => {}}
            starSize={24}
          />

          <Text style={detailStyles.DetailSub.TextStyle}>
            ({contentDetails?.vote_count})
          </Text>
        </View>

        <View style={{ flex: 1, marginTop: 16, justifyContent: "center" }}>
          {isAlreadyFav() ? (
            <CustomButton
              title="Remove from Watchlist"
              icon="close-circle-fill"
              iconColor="white"
              style={{ backgroundColor: "#FF3B30" }}
              isLoading={isFavoriteLoading}
              onPress={removeFromFavourites}
            />
          ) : (
            <CustomButton
              title="Add to Watchlist"
              icon="heart-fill"
              iconColor="white"
              isLoading={isFavoriteLoading}
              onPress={() =>
                addToFavourites({
                  title: contentDetails.name || contentDetails.title,
                  description: contentDetails.overview,
                  bannerUrl:
                    `${IMAGE_TYPES.BACKDROP}/${contentDetails.backdrop_path}` ||
                    `${IMAGE_TYPES.IMAGE}/${contentDetails.poster_path}`,
                  moviedbId: contentDetails.id,
                })
              }
            />
          )}
        </View>
      </View>

      <View style={detailStyles.DetailContent}>
        <View>
          <Text style={detailStyles.DetailContent.HeadTitle}>Overview</Text>
          <Text style={detailStyles.DetailContent.HeadBio}>
            {contentDetails?.overview}
          </Text>
        </View>

        <SeasonsView contentDetails={contentDetails} />
      </View>

      <TrailerView contentTrailer={contentTrailer} />
    </View>
  );
};

const HeaderDetails = ({ contentDetails }: any) => (
  <View style={detailStyles.DetailSub}>
    {(contentDetails?.first_air_date || contentDetails?.release_date) && (
      <Text style={detailStyles.DetailSub.TextStyle}>
        {extractReleaseYear(
          contentDetails?.first_air_date || contentDetails?.release_date
        )}
      </Text>
    )}
    <Text style={detailStyles.DetailSub.TextStyle}> | </Text>
    <Text style={detailStyles.DetailSub.TextStyle}>
      {contentDetails?.genres
        .slice(0, 2)
        .map((genre: any) => genre.name)
        .join(", ")}
    </Text>
    {(contentDetails?.number_of_episodes || contentDetails?.runtime) && (
      <>
        <Text style={detailStyles.DetailSub.TextStyle}> | </Text>
        <Text style={detailStyles.DetailSub.TextStyle}>
          {contentDetails?.media_type === "tv" ? (
            <>Episodes: {contentDetails?.number_of_episodes}</>
          ) : (
            <>{convertToReadableTime(contentDetails?.runtime)}</>
          )}
        </Text>
      </>
    )}
  </View>
);

const SeasonsView = ({ contentDetails }: any) => {
  return (
    <>
      {contentDetails?.media_type === MEDIA_TYPES.TV &&
        contentDetails?.seasons &&
        contentDetails?.seasons.length > 0 && (
          <View style={{ marginVertical: 24 }}>
            <Text style={detailStyles.DetailContent.HeadTitle}>Seasons</Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={resultsStyles.container}
            >
              {contentDetails?.seasons?.map((item: any) => (
                <View style={resultsStyles.resultItem} key={item.id}>
                  <Image
                    style={{
                      width: Dimensions.get("window").width / 4,
                      height: 150,
                      borderRadius: 16,
                    }}
                    source={{
                      uri: `${IMAGE_TYPES.IMAGE}/${item.poster_path}`,
                    }}
                    resizeMode="cover"
                  />
                  <Text style={resultsStyles.resultItemTitle}>{item.name}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
    </>
  );
};

const TrailerView = ({ contentTrailer }: any) => {
  return (
    <>
      {contentTrailer && contentTrailer?.length > 0 && (
        <View style={{ marginVertical: 24 }}>
          <Text style={detailStyles.DetailContent.HeadTitle}>Trailers</Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={resultsStyles.container}
          >
            {contentTrailer?.map((item: any) => (
              <View
                style={{
                  flex: 1,
                  width:
                    contentTrailer.length == 1
                      ? Dimensions.get("window").width / 1 - 50
                      : Dimensions.get("window").width / 1.5,
                  marginRight: 16,
                }}
                key={item.key}
              >
                <WebView
                  javaScriptEnabled={true}
                  scrollEnabled={false}
                  source={{
                    uri: `https://www.youtube.com/embed/${item.key}?controls=0&showinfo=0&wmode=transparent&rel=0&mode=opaque&modestbranding=1`,
                  }}
                  style={{
                    height: 200,
                    borderRadius: 16,
                  }}
                  onError={(err) => {
                    console.log(err, "this is errr");
                  }}
                />

                <Text style={resultsStyles.resultItemTitle}>{item.name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default function Details() {
  const params = useSearchParams();
  const { id, type } = params;

  const [isLoading, setLoading] = useState(true);
  const [contentDetails, setContentDetails] = useState<any>({});
  const [contentTrailer, setContentTrailer] = useState<any>({});

  const getDetails = async () => {
    try {
      const accessToken = await initHttpToken();

      const { data } = await http.get(`/content/details`, {
        params: { id, type },
      });

      setContentDetails(data);
    } catch (error) {
      throw error;
    }
  };

  const getTrailer = async () => {
    try {
      const accessToken = await initHttpToken();

      const { data } = await http.get(`/content/trailer`, {
        params: { id, type },
      });

      setContentTrailer(data);
    } catch (error) {
      throw error;
    }
  };

  const getFullData = async () => {
    setLoading(true);

    try {
      await getDetails();
      await getTrailer();

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFullData();
  }, []);

  return (
    <SafeLayout>
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#18181b",
          },
          headerTitle:
            contentDetails?.title || contentDetails?.name || "Loading...",
          headerTintColor: "white",
          headerBackVisible: true,
          headerShadowVisible: true,
        }}
      />

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : (
        <>
          <View style={styles.imageContainer}>
            <ImageBackground
              source={{
                uri: contentDetails.backdrop_path
                  ? `${IMAGE_TYPES.BACKDROP}/${contentDetails.backdrop_path}`
                  : `${IMAGE_TYPES.IMAGE}/${contentDetails.poster_path}`,
              }}
              style={styles.BannerImage}
              resizeMode="cover"
            />
            <LinearGradient
              style={{ ...StyleSheet.absoluteFillObject }}
              colors={["#00000000", "#00000000", "#09090F"]}
              locations={[0.1, 0.1, 1]}
            />
          </View>

          <View style={styles.container}>
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
            >
              <DetailView
                contentDetails={contentDetails}
                contentTrailer={contentTrailer}
              />
            </ScrollView>
          </View>
        </>
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
});

const detailStyles = StyleSheet.create({
  DetailInfo: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  DetailTitle: {
    ...GlobalStyles.CustonFontBold,
    color: "#fff",
    fontSize: 32,
    textAlign: "center",
  },
  DetailSub: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
    marginTop: 5,
    marginBottom: 10,
    TextStyle: {
      ...GlobalStyles.CustonFontRegular,
      color: "#A0A0A0",
      fontSize: 14,
    },
  },
  DetailRatings: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  DetailEpisodes: {},
  DetailContent: {
    marginTop: 32,
    HeadTitle: {
      ...GlobalStyles.CustonFontBold,
      color: "#fff",
      fontSize: 24,
      marginBottom: 5,
    },
    HeadBio: {
      ...GlobalStyles.CustonFontRegular,
      color: "#A0A0A0",
      fontSize: 14,
    },
  },
});

const resultsStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  resultItem: {
    width: Dimensions.get("window").width / 3.5,
    borderRadius: 16,
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
  },
  resultItemTitle: {
    ...GlobalStyles.CustonFontBold,
    color: "white",
    fontSize: 16,
    marginTop: 12,
    textAlign: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
});
