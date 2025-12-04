import React from "react";
import { Text as RNText, TextProps, StyleSheet } from "react-native";

export const Text: React.FC<TextProps> = ({ style, children, ...rest }) => {
  return (
    <RNText style={[styles.default, style]} {...rest}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    color: "#222",
  },
});
