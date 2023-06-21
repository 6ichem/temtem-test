import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import React, { Fragment, useContext, useEffect } from "react";
import SafeLayout from "../../../components/SafeLayout";
import SearchInput from "../../../components/SearchInput";
import { http, initHttpToken } from "../../../http/config";
import { AppContext } from "../../home/state/context";
import { actionTypes } from "../../home/state/actions";
import { IMAGE_TYPES } from "../../home/constants";
import { GlobalStyles } from "../../../core/globalStyles";
import { useRouter } from "expo-router";

const SearchItem = ({ result }: { result: any }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      key={result.id}
      style={searchItemStyles.searchResultItem}
      onPress={() =>
        router.push(`/details?id=${result.id}&type=${result.media_type}`)
      }
    >
      {result.poster_path || result.backdrop_path ? (
        <Image
          style={searchItemStyles.searchResultBanner}
          source={{
            uri: result.poster_path
              ? `${IMAGE_TYPES.IMAGE}/${result.poster_path}`
              : `${IMAGE_TYPES.BACKDROP}/${result.backdrop_path}`,
          }}
          resizeMode="cover"
        />
      ) : (
        <View style={searchItemStyles.noImagePlaceholder}>
          <Text style={searchItemStyles.noImageText}>No image available.</Text>
        </View>
      )}
      <Text style={searchItemStyles.searchResultText}>
        {result.title || result.name}
      </Text>
    </TouchableOpacity>
  );
};

const ResultView = ({
  searchResults,
  isLoading,
}: {
  searchResults: any[];
  isLoading: boolean;
}) => (
  <>
    {searchResults && searchResults.length > 0 ? (
      <View style={styles.searchResultsContainer}>
        {searchResults.map((result: any) => (
          <Fragment key={result.id}>
            <SearchItem result={result} />
          </Fragment>
        ))}
      </View>
    ) : (
      !isLoading && (
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundMessage}>No results found.</Text>
        </View>
      )
    )}
  </>
);

export default function Search() {
  const { state, dispatch } = useContext(AppContext);
  const [isLoading, setLoading] = React.useState(false);

  const { searchContent: searchResults }: any = state ?? {};

  const handleSearch = async (searchQuery: string) => {
    dispatch({
      type: actionTypes.SET_SEARCH_CONTENT,
      payload: null,
    });

    try {
      const accessToken = await initHttpToken();

      setLoading(true);

      const { data }: any = await http.get("/content/search", {
        params: {
          q: searchQuery,
        },
      });

      setLoading(false);

      dispatch({
        type: actionTypes.SET_SEARCH_CONTENT,
        payload: data,
      });
    } catch (e: any) {
      setLoading(false);
    }
  };

  return (
    <SafeLayout>
      <View
        style={{
          paddingHorizontal: 30,
          paddingTop: 16,
        }}
      >
        <SearchInput onChangeText={(e) => handleSearch(e)} />
      </View>

      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          )}

          <ResultView searchResults={searchResults} isLoading={isLoading} />
        </ScrollView>
      </View>
    </SafeLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notFoundMessage: {
    ...GlobalStyles.CustonFontMedium,
    color: "#A0A0A0",
  },
  searchResultsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },
});

const searchItemStyles = StyleSheet.create({
  searchResultItem: {
    width: "48%",
    paddingVertical: 16,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1,
    backgroundColor: "#18181b",
    borderRadius: 8,
    alignItems: "center",
  },
  searchResultBanner: {
    width: Dimensions.get("window").width / 3,
    height: Dimensions.get("window").height / 5,
    borderRadius: 16,
  },
  searchResultText: {
    color: "white",
    textAlign: "center",
    marginVertical: 10,
    flexWrap: "wrap",
  },
  noImagePlaceholder: {
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width / 3,
    height: Dimensions.get("window").height / 5,
  },
  noImageText: {
    color: "#999",
    fontSize: 16,
  },
});
