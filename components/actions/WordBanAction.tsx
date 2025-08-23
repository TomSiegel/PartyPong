import ActionScreenLayout from "../ActionScreenLayout";

const WordBanAction = () => (
  <ActionScreenLayout
    title="Wortverbot! Ein bestimmtes Wort darf bis zum nächsten Treffer nicht gesagt werden."
    imageSource={require("../../assets/gifs/wordBan.gif")}
  >
    {/* Hier kannst du weitere Elemente einfügen */}
  </ActionScreenLayout>
);

export default WordBanAction;