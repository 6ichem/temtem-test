import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
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
import SearchItem from "../../../components/SearchItem";

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
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
    </TouchableWithoutFeedback>
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
