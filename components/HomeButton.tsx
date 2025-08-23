import { router } from "expo-router";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const HomeButton = () => {
  function goHome() {
    router.replace("/(tabs)");
  }

  return (
    <TouchableOpacity style={styles.button} onPress={goHome}>
      <View style={styles.contentRow}>
        <Image
          source={require("../assets/images/blue_beer_pong_cup.png")}
          style={styles.maskImage}
        />
        <Text style={styles.buttonText}>Zurück zum Start</Text>
        <Image
          source={require("../assets/images/red_beer_pong_cup.png")}
          style={styles.maskImage}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FF6347",
    borderRadius: 100,
    paddingVertical: 12,
    paddingHorizontal: 22,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  contentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  maskImage: {
    width: 46,
    height: 46,
    resizeMode: "contain",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default HomeButton;
