import React from "react";
import { Text, Pressable, StyleSheet, ViewStyle } from "react-native";

type Props = {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
  disabled?: boolean;
};

export const Button: React.FC<Props> = ({
  label,
  onPress,
  style,
  disabled,
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#2563eb",
    alignItems: "center",
  },
  label: {
    color: "#fff",
    fontWeight: "600",
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    backgroundColor: "#94a3b8",
  },
});
