import { Href } from "expo-router";

export interface ActionDefinition {
  href: Href;
  probability: number;
}

export const actions: [Href, number][] = [
  ["/(tabs)/switchSides", 5],
  ["/(tabs)/leoBikini", 5],
  ["/(tabs)/pushUps", 2],
  ["/(tabs)/somersault", 2],
  ["/(tabs)/exYourDrink", 5],
  ["/(tabs)/noTalking", 3],
  ["/(tabs)/freeze", 5],
  ["/(tabs)/teamLosesCup", 10],
  ["/(tabs)/complimentRound", 3],
  ["/(tabs)/tongueTwister", 10],
  ["/(tabs)/wordBan", 10],
  ["/(tabs)/rearrangeYourCups", 10],
  ["/(tabs)/animalSoundsThrow", 10],
  ["/(tabs)/animalImitation", 5],
  ["/(tabs)/bouncerThrow", 10],
  ["/(tabs)/spoonOrCupThrow", 10],
  ["/(tabs)/giveOpponentTask", 10],
  ["/(tabs)/danceBreak", 10],
  ["/(tabs)/everyoneDrinks", 10],
  ["/(tabs)/handOnHead", 10],
  ["/(tabs)/funnyRule", 10],
  ["/(tabs)/rearrangeOpponentCups", 10],
  ["/(tabs)/blindThrow", 10],
  ["/(tabs)/schnickSchnackSchnuck", 10],
  ["/(tabs)/foreheadThrow", 10],
  ["/(tabs)/oneLegThrow", 10],
  ["/(tabs)/leaveTheCup", 10],
  ["/(tabs)/throwerDrinks", 10],
  ["/(tabs)/distributeDrinks", 10],
  ["/(tabs)/throwAgain", 10],
  ["/(tabs)/rhymeUntilNextThrow", 10],
  ["/(tabs)/predictionDoubleHit", 10],
  ["/(tabs)/showDanceMove", 10],
  ["/(tabs)/nextThrowIsTrickshot", 10],
  ["/(tabs)/nextThrowWithWeakHand", 5],
  ["/(tabs)/knockTableBeforeThrow", 10],
  ["/(tabs)/clapBeforeThrow", 10],
  ["/(tabs)/spinBeforeThrow", 10],
];

export function getRandomAction(): ActionDefinition {
  const totalProbability = actions.reduce((sum, action) => sum + action[1], 0);
  const random = Math.random() * totalProbability;
  let cumulativeProbability = 0;

  for (const action of actions) {
    cumulativeProbability += action[1];
    if (random < cumulativeProbability) {
      return { href: action[0], probability: action[1] };
    }
  }
  throw new Error("No action selected, check probabilities");
}
