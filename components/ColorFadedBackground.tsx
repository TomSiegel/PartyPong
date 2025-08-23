import React, { ReactNode, useEffect, useMemo, useRef } from "react";
import { Animated, StyleSheet, ViewStyle } from "react-native";

interface AnimatedBackgroundProps {
  children: ReactNode;
  colors?: string[];
  duration?: number; // Dauer für einen kompletten Farbzyklus in ms
  style?: ViewStyle;
}

const DEFAULT_COLORS = [
  "#ffcc00",
  "#ff6f00",
  "#ff4081",
  "#7c4dff",
  "#18ffff",
  "#69f0ae",
  "#ffd600",
];

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  children,
  colors = DEFAULT_COLORS,
  duration = 6000,
  style,
}) => {
  const bgColorValue = useRef(new Animated.Value(0)).current;

  // Wenn weniger als 2 Farben, keine Animation nötig
  const fadedColors = useMemo(() => {
    if (!colors || colors.length < 2) return colors;
    return colors;
  }, [colors]);

  // Gleichmäßige Verteilung der Farben auf dem Interpolationsbereich [0, 1]
  const colorInputRange = useMemo(() => {
    if (!fadedColors || fadedColors.length < 2) return [0, 1];
    const step = 1 / fadedColors.length;
    return fadedColors.map((_, i) => i * step).concat(1);
  }, [fadedColors]);

  // Output-Range: Farben + erste Farbe am Ende für weichen Übergang
  const colorOutputRange = useMemo(() => {
    if (!fadedColors || fadedColors.length < 2) return fadedColors;
    return [...fadedColors, fadedColors[0]];
  }, [fadedColors]);

  useEffect(() => {
    bgColorValue.setValue(0);
    Animated.loop(
      Animated.timing(bgColorValue, {
        toValue: 1,
        duration,
        useNativeDriver: false,
      })
    ).start();
  }, [colorOutputRange, duration]);

  const bgColor = bgColorValue.interpolate({
    inputRange: colorInputRange,
    outputRange: colorOutputRange,
  });

  return (
    <Animated.View
      style={[styles.background, { backgroundColor: bgColor }, style]}
    >
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});

export default AnimatedBackground;
