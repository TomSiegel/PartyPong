import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface CountdownTimerProps {
  seconds: number;
  hideButtonIfFinished?: boolean;
  hideButtonIfFailed?: boolean;
  hideStopButton?: boolean;
  onFinish?: () => void;
  onStopped?: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  seconds,
  hideButtonIfFinished,
  hideButtonIfFailed,
  hideStopButton,
  onFinish,
  onStopped,
}) => {
  const [running, setRunning] = useState(true);
  const [failed, setFailed] = useState(false);
  const [time, setTime] = useState(seconds);
  const intervalRef = useRef<number | null>(null);
  const progress = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (running && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => {
          const next = Math.max(0, prev - 0.01);
          if (next === 0) setRunning(false);
          return next;
        });
      }, 10);
      Animated.timing(progress, {
        toValue: 0,
        duration: seconds * 1000,
        useNativeDriver: false,
        easing: Easing.linear,
      }).start();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  useEffect(() => {
    if (time <= 0) {
      setFailed(true);
      if (onFinish) onFinish();
    }
  }, [time, onFinish]);

  const stopTimer = () => {
    setRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (onStopped) onStopped();
  };

  const animatedColor = progress.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["#ff5252", "#ffd600", "#00e676"],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.timerCircle, { borderColor: animatedColor }]}
      >
        <Text style={styles.timeText}>{time.toFixed(2)}s</Text>
      </Animated.View>
      {(hideButtonIfFinished && !running) ||
      (hideStopButton || (hideButtonIfFailed && failed)) ? null : (
        <TouchableOpacity
          style={[
            styles.stopButton,
            !running ? { backgroundColor: "#099910ff" } : null,
          ]}
          onPress={stopTimer}
          disabled={!running}
        >
          <Text style={styles.stopButtonText}>
            {running ? "Stopp" : "Geschafft!"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: "center", marginVertical: 0 },
  timerCircle: {
    width: 130,
    height: 130,
    borderRadius: "50%",
    borderWidth: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    backgroundColor: "#222",
  },
  timeText: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "bold",
    letterSpacing: 1,
  },
  stopButton: {
    backgroundColor: "#ff5252",
    paddingHorizontal: 64,
    paddingVertical: 36,
    borderRadius: 24,
    elevation: 2,
  },
  stopButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});

export default CountdownTimer;
