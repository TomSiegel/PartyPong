import { getRandomAction } from "@/actions/actionRegistry";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ActionButton from "../components/ActionButton";

const { width, height } = Dimensions.get("window");
const CUP_SIZE = width * 0.22;
const TABLE_COLOR = "#1b5e20";

// Konfetti Farben
const CONFETTI_COLORS = [
  "#ffd600",
  "#ff4081",
  "#7c4dff",
  "#18ffff",
  "#69f0ae",
  "#ff6f00",
  "#fff176",
];

const HomeScreen = () => {
  const [showTransition, setShowTransition] = useState(false);
  const transitionAnim = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();
  const CONFETTI_COUNT = 20 + Math.round(Math.random() * 10);
  // Konfetti-Animationen vorbereiten
  const confettiAnims = useRef(
    Array.from({ length: CONFETTI_COUNT }, () => ({
      x: new Animated.Value(0),
      y: new Animated.Value(0),
      rotate: new Animated.Value(0),
    }))
  ).current;

  const startTransition = () => {
    if(showTransition) return; // Verhindert mehrfaches Drücken
    setShowTransition(true);
    // Konfetti Animationen starten
    confettiAnims.forEach((confetti, i) => {
      confetti.x.setValue(0);
      confetti.y.setValue(height / 2);
      confetti.rotate.setValue(0);
      Animated.parallel([
        Animated.timing(confetti.x, {
          toValue: (Math.random() - 0.5) * width * 1.2,
          duration: 900 + Math.random() * 400,
          useNativeDriver: true,
          easing: Easing.out(Easing.exp),
        }),
        Animated.timing(confetti.y, {
          toValue: -height * (Math.random() * 0.5),
          duration: 900 + Math.random() * 400,
          useNativeDriver: true,
          easing: Easing.out(Easing.exp),
        }),
        Animated.timing(confetti.rotate, {
          toValue: Math.random() * 2 * Math.PI,
          duration: 900 + Math.random() * 400,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
      ]).start();
    });

    Animated.timing(transitionAnim, {
      toValue: 1,
      duration: 900,
      useNativeDriver: true,
      easing: Easing.out(Easing.exp),
    }).start(() => {
      const action = getRandomAction();
      router.replace(action.href);
      // setShowTransition(false);
      // transitionAnim.setValue(0);
    });
  };

  // Animationen für Schriftzug
  const scale = transitionAnim.interpolate({
    inputRange: [0, 0.7, 0.9, 1],
    outputRange: [0.5, 1.2, 2, 1.7],
  });
  const opacity = transitionAnim.interpolate({
    inputRange: [0, 0.85, 1],
    outputRange: [0, 0.85, 1],
  });
  const rotate = transitionAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["-20deg", "360deg"],
  });

  return (
    <View
      style={[
        styles.root,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      {/* Tischfläche */}
      <View style={styles.table}>
        {/* Becher-Formation: Rot (oben) */}
        <View style={[styles.cupRow, { top: height * 0.09 }]}>
          <Image
            source={require("../assets/images/red_beer_pong_cup.png")}
            style={styles.cup}
          />
        </View>
        <View style={[styles.cupRow, { top: height * 0.09 + CUP_SIZE * 0.7 }]}>
          <Image
            source={require("../assets/images/red_beer_pong_cup.png")}
            style={styles.cup}
          />
          <Image
            source={require("../assets/images/red_beer_pong_cup.png")}
            style={styles.cup}
          />
        </View>
        <View style={[styles.cupRow, { top: height * 0.09 + CUP_SIZE * 1.4 }]}>
          <Image
            source={require("../assets/images/red_beer_pong_cup.png")}
            style={styles.cup}
          />
          <Image
            source={require("../assets/images/red_beer_pong_cup.png")}
            style={styles.cup}
          />
          <Image
            source={require("../assets/images/red_beer_pong_cup.png")}
            style={styles.cup}
          />
        </View>
        {/* ActionButton mit Party Pong Schriftzug */}
        <View style={styles.buttonArea}>
          <Text style={styles.partyPongTextTop}>P A R T Y</Text>
          <ActionButton onPress={startTransition} />
          <Text style={styles.partyPongTextBottom}>P O N G</Text>
        </View>
        {/* Becher-Formation: Blau (unten) */}
        <View
          style={[styles.cupRow, { bottom: height * 0.09 + CUP_SIZE * 1.4 }]}
        >
          <Image
            source={require("../assets/images/blue_beer_pong_cup.png")}
            style={styles.cup}
          />
          <Image
            source={require("../assets/images/blue_beer_pong_cup.png")}
            style={styles.cup}
          />
          <Image
            source={require("../assets/images/blue_beer_pong_cup.png")}
            style={styles.cup}
          />
        </View>
        <View
          style={[styles.cupRow, { bottom: height * 0.09 + CUP_SIZE * 0.7 }]}
        >
          <Image
            source={require("../assets/images/blue_beer_pong_cup.png")}
            style={styles.cup}
          />
          <Image
            source={require("../assets/images/blue_beer_pong_cup.png")}
            style={styles.cup}
          />
        </View>
        <View style={[styles.cupRow, { bottom: height * 0.09 }]}>
          <Image
            source={require("../assets/images/blue_beer_pong_cup.png")}
            style={styles.cup}
          />
        </View>
      </View>
      {/* Übergangsanimation */}
      {showTransition && (
        <Animated.View style={[styles.transitionOverlay, { opacity }]}>
          <Animated.Text
            style={[
              styles.transitionText,
              {
                transform: [{ scale }, { rotate }],
                textShadowColor: "#fff",
                textShadowOffset: { width: 0, height: 8 },
                textShadowRadius: 24,
              },
            ]}
          >
            PARTY
            PONG!
          </Animated.Text>
          {/* Konfetti-Effekt */}
          <View style={styles.confettiContainer} pointerEvents="none">
            {confettiAnims.map((confetti, i) => (
              <Animated.View
                key={i}
                style={{
                  position: "absolute",
                  left: width / 2 - 8,
                  top: height / 3,
                  width: 16 + Math.random() * 10,
                  height: 8 + Math.random() * 8,
                  borderRadius: 4,
                  backgroundColor: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
                  transform: [
                    { translateX: confetti.x },
                    { translateY: confetti.y },
                    {
                      rotate: confetti.rotate.interpolate({
                        inputRange: [0, Math.PI * 2],
                        outputRange: ["0deg", "360deg"],
                      }),
                    },
                  ],
                  opacity: opacity,
                  shadowColor: "#fff",
                  shadowOpacity: 0.7,
                  shadowRadius: 6,
                }}
              />
            ))}
          </View>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#0d2c0d",
  },
  table: {
    flex: 1,
    backgroundColor: TABLE_COLOR,
    borderRadius: width * 0.12,
    margin: width * 0.04,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    borderWidth: 6,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 8 },
  },
  cupRow: {
    position: "absolute",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    zIndex: 1,
  },
  cup: {
    width: CUP_SIZE,
    height: CUP_SIZE * 1.05,
    marginHorizontal: 8,
    resizeMode: "contain",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  buttonArea: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: height * 0.08,
    zIndex: 2,
  },
  partyPongTextTop: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 8,
    marginBottom: 8,
    textShadowColor: "#ffeb3b",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 12,
  },
  partyPongTextBottom: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 8,
    marginTop: 8,
    textShadowColor: "#2196f3",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 12,
  },
  transitionOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000c",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 99,
  },
  transitionText: {
    fontSize: 54,
    fontWeight: "bold",
    color: "#ffd600",
    letterSpacing: 4,
    textAlign: "center",
    textShadowColor: "#ff4081",
    textShadowOffset: { width: 0, height: 8 },
    textShadowRadius: 24,
    elevation: 10,
  },
  confettiContainer: {
    position: "absolute",
    left: 0,
    top: 0,
    width: width,
    height: height,
    zIndex: 100,
  },
});

export default HomeScreen;
