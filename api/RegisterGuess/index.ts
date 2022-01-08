import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import "../Shared/db";
import Game from "../Shared/game";
import type { GameType } from "../Shared/game";
import { getUserId } from "../Shared/user";
import { concealWord } from "../Shared/gameLogic";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("HTTP trigger function (RegisterGuess) processed a request.");
  const gameId = req?.body?.gameId;
  const guess = req?.body?.guess;

  const userId = getUserId(req.headers["x-ms-client-principal"], context);
  context.log(userId);

  const game = await Game.findById(gameId);
  if (game.playerId !== userId) {
    context.res = {
      status: 403,
    };
  } else if (game.status !== "in progress") {
    context.res = {
      status: 400,
    };
    //TODO: Check if guess is valid
  } else {
    registerGuess(game, guess);

    await game.save();

    context.res = {
      body: JSON.stringify({
        word:
          game.status === "in progress"
            ? concealWord(game.word, game.correctGuesses)
            : game.word,
        incorrectGuesses: game.incorrectGuesses,
        status: game.status,
      }),
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
