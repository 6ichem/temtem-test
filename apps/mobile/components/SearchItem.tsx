import { useRouter } from "expo-router";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { IMAGE_TYPES } from "../app/home/constants";

export default function SearchItem({
  result,
  type,
}: {
  result: any;
  type?: string;
}) {
  const router = useRouter();

  return (
    <TouchableOpacity
      key={result.id}
      style={searchItemStyles.searchResultItem}
      onPress={() =>
        router.push(
          `/details?id=${result.id}&type=${result.media_type || type}`
        )
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
}

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
