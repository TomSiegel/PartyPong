import { useState } from "react";
import ActionScreenLayout from "../ActionScreenLayout";
import CountdownTimer from "../CountdownTimer";

const FreezeAction = () => {
  const [finished, setFinished] = useState(false);

  return (
    <ActionScreenLayout
      title="Freeze! Alle müssen für 15 Sekunden einfrieren! Wer sich bewegt trinkt!"
      imageSource={require("../../assets/gifs/dontMovePingu.gif")}
      backgroundColors={["#0a76dbff", "#429cf0ff"]}
      backgroundDuration={2000}
      hideHomeButton={!finished}
    >
    {/* Hier kannst du weitere Elemente einfügen */}
    {!finished && (
      <CountdownTimer seconds={15} hideStopButton hideButtonIfFinished hideButtonIfFailed onFinish={() => setFinished(true)} />
    )}
  </ActionScreenLayout>
);
}
export default FreezeAction;