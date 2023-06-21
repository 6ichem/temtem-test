import React from "react";
import {
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleProp,
} from "react-native";
import { GlobalStyles } from "../../core/globalStyles";
import RemixIcon from "react-native-remix-icon";

interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
  isLoading?: boolean;
  style?: StyleProp<any>;
  icon?: string;
  iconColor?: string;
}

export default function CustomButton({
  title,
  isLoading = false,
  style,
  icon,
  iconColor,
  ...rest
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      style={{ ...styles.CustomButton, ...style }}
      activeOpacity={0.8}
      {...rest}
    >
      {!isLoading && (
        <>
          {icon && <RemixIcon name={icon} color={iconColor} />}
          <Text style={styles.ButtonText}>{title}</Text>
        </>
      )}
      {isLoading && (
        <ActivityIndicator size="small" style={styles.loader} color="white" />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  CustomButton: {
    backgroundColor: "#FF8F71",
    width: "100%",
    borderRadius: 8,
    padding: 16,
    color: "white",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    textAlign: "center",
  },
  ButtonText: {
    ...GlobalStyles.CustomFontSemiBold,
    fontSize: 16,
    alignSelf: "center",
    color: "white",
    textAlign: "center",
    justifyContent: "center",
    flex: 1,
  },
  loader: {
    ...GlobalStyles.CustomFontSemiBold,
    fontSize: 16,
    alignSelf: "center",
    color: "white",
    textAlign: "center",
    justifyContent: "center",
    flex: 1,
    marginVertical: 1,
  },
});
