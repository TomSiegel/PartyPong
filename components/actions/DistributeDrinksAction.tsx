import ActionScreenLayout from "../ActionScreenLayout";

const DistributeDrinksAction = () => {
const random = Math.random();
const amount = Math.ceil(random * 6); // Zufallszahl zwischen 1 und 6
return (<ActionScreenLayout
    title={`Schöner Wurf, du darfst ${amount} ${amount > 1 ? "Schlücke" : "Schluck"} verteilen!`}
    imageSource={require('../../assets/gifs/zoolanderParty.gif')}
    >
    {/* Hier kannst du weitere Elemente einfügen */}
  </ActionScreenLayout>
);
}

export default DistributeDrinksAction;