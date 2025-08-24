import { useState } from "react";
import ActionScreenLayout from "../ActionScreenLayout";
import CountdownTimer from "../CountdownTimer";

const DanceBreakAction = () => {
  const [finished, setFinished] = useState(false);

  return (
    <ActionScreenLayout
      title="Dance Break! Alle müssen 10 Sekunden tanzen!"
      imageSource={require("../../assets/gifs/dancingBears.gif")}
      hideHomeButton={!finished}
    >
      {/* Hier kannst du weitere Elemente einfügen */}
      {!finished && <CountdownTimer seconds={10} hideStopButton hideButtonIfFinished hideButtonIfFailed onFinish={() => setFinished(true)} />}
    </ActionScreenLayout>
  );
};


export default DanceBreakAction;