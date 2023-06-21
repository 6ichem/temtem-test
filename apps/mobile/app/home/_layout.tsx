import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Tabs } from "expo-router";
import Icon from "react-native-remix-icon";
import { ContentContextProvider } from "./state/context";

export default function _layout() {
  return (
    <ContentContextProvider>
      <View style={styles.container}>
        <Tabs
          screenOptions={({ route, navigation }) => ({
            headerShown: false,
            tabBarStyle: {
              backgroundColor: "transparent",
              borderTopColor: "transparent",
              height: Dimensions.get("window").height * 0.1,
            },
            tabBarShowLabel: false,
            tabBarActiveTintColor: "white",
            tabBarIcon: ({ color }) => (
              <View style={styles.tabIconContainer}>
                {navigation.isFocused() && (
                  <View
                    style={[styles.activeTabDot, { backgroundColor: color }]}
                  />
                )}
                <Icon name={getIconName(route.name)} color={color} />
              </View>
            ),
          })}
        >
          <Tabs.Screen name="index" />
          <Tabs.Screen name="search/index" />
          <Tabs.Screen name="profile/index" />
        </Tabs>
      </View>
    </ContentContextProvider>
  );
}

const getIconName = (routeName: string) => {
  // Map route names to icon names
  switch (routeName) {
    case "index":
      return "home-2-fill";
    case "search/index":
      return "search-line";
    case "profile/index":
      return "account-circle-line";
    default:
      return "";
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#09090F",
  },
  tabIconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  activeTabDot: {
    position: "absolute",
    bottom: -15,
    width: 5,
    height: 5,
    borderRadius: 5,
  },
});
