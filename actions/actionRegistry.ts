import { Href } from "expo-router";

export interface ActionDefinition {
  href: Href;
  probability: number;
}

export const actions: [Href, number][] = [
  ["/(tabs)/switchSides", 1],
  ["/(tabs)/pushUps", 2],
  ["/(tabs)/somersault", 2],
  ["/(tabs)/exYourDrink", 2],
  ["/(tabs)/noTalking", 3],
  ["/(tabs)/freeze", 3],
  ["/(tabs)/teamLosesCup", 3],
  ["/(tabs)/complimentRound", 3],
  ["/(tabs)/tongueTwister", 5],
  ["/(tabs)/wordBan", 5],
  ["/(tabs)/rearrangeYourCups", 5],
  ["/(tabs)/animalSoundsThrow", 5],
  ["/(tabs)/animalImitation", 5],
  ["/(tabs)/bouncerThrow", 5],
  ["/(tabs)/spoonOrCupThrow", 5],
  ["/(tabs)/giveOpponentTask", 5],
  ["/(tabs)/danceBreak", 7],
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
  ["/(tabs)/nextThrowIsTrickshot", 15],
  ["/(tabs)/nextThrowWithWeakHand", 15],
  ["/(tabs)/knockTableBeforeThrow", 20],
  ["/(tabs)/clapBeforeThrow", 20],
  ["/(tabs)/spinBeforeThrow", 20],
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
