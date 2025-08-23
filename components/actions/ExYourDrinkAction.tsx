import { useState } from "react";
import { StyleSheet, Text } from "react-native";
import ActionScreenLayout from "../ActionScreenLayout";
import CountdownTimer from "../CountdownTimer";

const ExYourDrinkAction = () => {
  const [failed, setFailed] = useState(false);
  const [stopped, setStopped] = useState(false);

  return (
    <ActionScreenLayout
      hideHomeButton={!stopped && !failed}
      title="Ex dein Getränk oder 2 deiner Becher innerhalb der Zeit!"
      backgroundColors={["#ad1818ff", "#200bd8ff"]}
      backgroundDuration={1000}
    >
      {!failed && (
        <CountdownTimer
          hideButtonIfFailed
          seconds={10}
          onFinish={() => {
            setFailed(true);
          }}
          onStopped={() => {
            setStopped(true);
          }}
        />
      )}
      {failed && (
        <Text style={styles.failedText}>
          Du hast die Aufgabe nicht rechtzeitig erfüllt, alle Teammitglieder trinken 3 Schlücke!
        </Text>
      )}
    </ActionScreenLayout>
  );
};

const styles = StyleSheet.create({
  failedText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffffff",
    marginTop: 32,
    letterSpacing: 1,
    textAlign: "center",
  },
});

export default ExYourDrinkAction;
