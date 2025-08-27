import { Image, ImageStyle } from "expo-image";
import React, { ReactNode, useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import ColorFadedBackground from "./ColorFadedBackground";
import HomeButton from "./HomeButton";

const { height } = Dimensions.get("window");

interface ActionScreenLayoutProps {
  title: string;
  imageSource?: any;
  children?: ReactNode;
  backgroundColors?: string[];
  backgroundDuration?: number;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  imageStyle?: ImageStyle;
  hideHomeButton?: boolean;
}

const ActionScreenLayout: React.FC<ActionScreenLayoutProps> = ({
  title,
  imageSource,
  children,
  backgroundColors,
  backgroundDuration,
  containerStyle,
  textStyle,
  imageStyle,
  hideHomeButton,
}) => {
  const scaleValue = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: 1.1,
        friction: 2,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const scale = scaleValue.interpolate({
    inputRange: [0.8, 1.1],
    outputRange: [0.8, 1.1],
  });

  return (
    <ColorFadedBackground
      colors={backgroundColors}
      duration={backgroundDuration}
    >
      <View style={[styles.container, containerStyle]}>
        <Animated.Text
          style={[
            styles.actionText,
            {
              transform: [{ scale }],
              textShadowColor: "#fff",
              textShadowOffset: { width: 0, height: 2 },
              textShadowRadius: 10,
            },
            textStyle,
          ]}
        >
          {title}
        </Animated.Text>
        {imageSource ? (
          <Image
            source={imageSource}
            style={[styles.gif, imageStyle ?? null]}
            resizeMode="contain"
          />
        ) : null}
        {children}
      </View>
      <View style={styles.homeButtonContainer}>
        {!hideHomeButton && <HomeButton />}
      </View>
    </ColorFadedBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: height * 0.07,
    marginHorizontal: 12,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 16,
    paddingHorizontal: 12,
    flex: 1,
    maxWidth: 600,
  },
  actionText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
    letterSpacing: 1,
    textAlign: "center",
  },
  gif: {
    width: "100%",
    aspectRatio: 1,
  },
  homeButtonContainer: {
    width: "100%",
    alignItems: "center",
    paddingBottom: 32,
  },
});

export default ActionScreenLayout;
