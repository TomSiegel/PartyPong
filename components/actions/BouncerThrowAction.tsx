import ActionScreenLayout from "../ActionScreenLayout";

const BouncerThrowAction = () => (
  <ActionScreenLayout
    title="Mit Aufsetzer! Der nächste Wurf muss den Ball gegen die Wand oder Decke prallen lassen um zu treffen!"
    imageSource={require("../../assets/gifs/ricochetMonster.gif")}
  >
    {/* Hier kannst du weitere Elemente einfügen */}
  </ActionScreenLayout>
);

export default BouncerThrowAction;