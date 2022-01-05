import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import "../Shared/db";
import Game from "../Shared/game";
import type { GameType } from "../Shared/game";
import { verify } from "../Shared/jwtvalidation";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("HTTP trigger function processed a request.");
  const gameId = req?.body?.gameId;
  const guess = req?.body?.guess;

  const authHeader = req?.headers?.authorization;
  let userId: string;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    const result = await verify(token);
    userId = result.sub;
  }

  const game = await Game.findById(gameId);
  if (game.playerId !== userId) {
    context.res = {
      status: 403,
    };
  } else if (game.status !== "in progress") {
    context.res = {
      status: 400,
    };
  } else {
    registerGuess(game, guess);

    await game.save();

    context.res = {
      // status: 200, /* Defaults to 200 */
    };
  }
};

export default httpTrigger;

const registerGuess = (game: GameType, guess: string): GameType => {
  const maxIncorrectGuesses = 7;

  if (game.status !== "in progress") {
    return game;
  }
  const loweredWord = game.word.split("").map((c) => c.toLowerCase());
  const loweredLetter = guess.toLowerCase();
  const isCorrect = loweredWord.includes(loweredLetter);
  game.correctGuesses =
    isCorrect && !game.correctGuesses.includes(loweredLetter)
      ? [...game.correctGuesses, loweredLetter]
      : game.correctGuesses;
  game.incorrectGuesses =
    !isCorrect && !game.incorrectGuesses.includes(loweredLetter)
      ? [...game.incorrectGuesses, loweredLetter]
      : game.incorrectGuesses;
  const lost = game.incorrectGuesses.length > maxIncorrectGuesses;
  const won = loweredWord.every((c) => game.correctGuesses.includes(c));
  game.status = won ? "won" : lost ? "lost" : "in progress";
  game.endedAt = won || lost ? new Date(Date.now()) : undefined;
};
