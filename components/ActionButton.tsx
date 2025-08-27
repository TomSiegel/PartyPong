import { Image } from "expo-image";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

// Hilfsfunktion für zufällige Funken
const Spark = ({
  size,
  color,
  style,
}: {
  size: number;
  color: string;
  style: any;
}) => (
  <Animated.View
    style={[
      {
        position: "absolute",
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        opacity: 0.7,
      },
      style,
    ]}
  />
);

const SPARK_COLORS = [
  "#fff176",
  "#ff8a65",
  "#ba68c8",
  "#4fc3f7",
  "#ff5252",
  "#ffd600",
  "#00e676",
];

const ActionButton = ({
  onPress,
}: {
  onPress: (event: GestureResponderEvent) => void;
}) => {
  const pulse = useRef(new Animated.Value(1)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const sparks = Array.from({ length: 14 }).map(() => ({
    angle: Math.random() * 2 * Math.PI,
    distance: 90 + Math.random() * 30,
    size: 10 + Math.random() * 10,
    color: SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)],
    anim: new Animated.Value(0),
    delay: Math.random() * 1000,
  }));

  // Pulsierende Animation für Button
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.15,
          duration: 700,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      ])
    ).start();
  }, []);

  // Rotierende Animation für Funken-Kreis
  useEffect(() => {
    Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
        easing: Easing.linear,
      })
    ).start();
  }, []);

  // Einzelne Funken animieren (aufleuchten und verblassen)
  useEffect(() => {
    sparks.forEach((spark) => {
      const animateSpark = () => {
        spark.anim.setValue(0);
        Animated.sequence([
          Animated.delay(spark.delay),
          Animated.timing(spark.anim, {
            toValue: 1,
            duration: 900 + Math.random() * 500,
            useNativeDriver: true,
          }),
          Animated.timing(spark.anim, {
            toValue: 0,
            duration: 900 + Math.random() * 500,
            useNativeDriver: true,
          }),
        ]).start(() => animateSpark());
      };
      animateSpark();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rotateInterpolate = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.center}>
      <Animated.View
        style={[
          styles.sparkContainer,
          {
            transform: [{ rotate: rotateInterpolate }],
          },
        ]}
        pointerEvents="none"
      >
        {sparks.map((spark, i) => {
          const x = Math.cos(spark.angle) * spark.distance + 90;
          const y = Math.sin(spark.angle) * spark.distance + 90;
          return (
            <Spark
              key={i}
              size={spark.size}
              color={spark.color}
              style={{
                left: x,
                top: y,
                opacity: spark.anim.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0, 1, 0.2],
                }),
                transform: [
                  {
                    scale: spark.anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.7, 1.5],
                    }),
                  },
                ],
                shadowColor: spark.color,
                shadowOpacity: 0.7,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 0 },
              }}
            />
          );
        })}
      </Animated.View>
      <Animated.View
        style={[
          styles.buttonWrapper,
          {
            transform: [{ scale: pulse }],
            shadowColor: "#fff176",
            shadowOpacity: 0.7,
            shadowRadius: 30,
            shadowOffset: { width: 0, height: 0 },
          },
        ]}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={onPress}
          activeOpacity={0.85}
        >
          <Image
            style={styles.image}
            source={require("../assets/images/buttonV1.png")}
            contentFit="contain"
            resizeMode="contain"
          />
        </TouchableOpacity>
        {/* Farbige Aura */}
        <Animated.View
          style={[
            styles.aura,
            {
              opacity: pulse.interpolate({
                inputRange: [1, 1.15],
                outputRange: [0.4, 0.7],
              }),
              transform: [
                {
                  scale: pulse.interpolate({
                    inputRange: [1, 1.15],
                    outputRange: [1.1, 1.25],
                  }),
                },
              ],
            },
          ]}
          pointerEvents="none"
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    position: "relative",
  },
  sparkContainer: {
    position: "absolute",
    width: "150%",
    height: "150%",
    borderRadius: "50%",
    left: 0,
    top: 0,
    zIndex: 1,
  },
  buttonWrapper: {
    width: "66%",
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#dbdfeecc",
    overflow: "visible",
    zIndex: 2,
  },
  button: {
    width: "100%",
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  aura: {
    position: "absolute",
    width: "140%",
    height: "140%",
    borderRadius: "50%",
    left: "-20%",
    top: "-20%",
    backgroundColor: "rgba(255, 214, 0, 0.25)",
    zIndex: 0,
    borderWidth: 2,
    borderColor: "#fff176",
  },
});

export default ActionButton;
