import ActionScreenLayout from "../ActionScreenLayout";

const ThrowerDrinksAction = () => {
const random = Math.random();
const amount = Math.ceil(random * 3); // Zufallszahl zwischen 1 und 3
return (<ActionScreenLayout
    title={`Schöner Wurf, darauf ${amount} ${amount > 1 ? "Schlücke" : "Schluck"} für dich!`}
    imageSource={require('../../assets/gifs/cheersLeo.gif')}
    >
    {/* Hier kannst du weitere Elemente einfügen */}
  </ActionScreenLayout>
);
}

export default ThrowerDrinksAction;