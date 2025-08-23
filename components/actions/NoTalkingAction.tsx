import ActionScreenLayout from "../ActionScreenLayout";

const NoTalkingAction = () => (
  <ActionScreenLayout
    title="Sprechverbot! Du darfst bis zum nächsten Treffer nicht sprechen!"
    imageSource={require("../../assets/gifs/beQuiet.gif")}
  >
    {/* Hier kannst du weitere Elemente einfügen */}
  </ActionScreenLayout>
);

export default NoTalkingAction;