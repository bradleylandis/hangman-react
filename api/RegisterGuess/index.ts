import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import "../Shared/db";
import Game from "../Shared/game";
import { getUserId } from "../Shared/user";
import { concealWord, registerGuess, isInProgress } from "../Shared/gameLogic";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("HTTP trigger function (RegisterGuess) processed a request.");
  //TODO: get gameId from route params instead of body
  const gameId = context.bindingData.id;
  const guess = req?.body?.guess;

  const userId = getUserId(req.headers["x-ms-client-principal"]);

  const game = await Game.findById(gameId);
  if (game.playerId !== userId) {
    context.res = {
      status: 403,
    };
  } else if (!isInProgress(game.status)) {
    context.res = {
      status: 400,
    };
    //TODO: validate guess
  } else {
    registerGuess(game, guess);

    await game.save();

    context.res = {
      body: {
        word: isInProgress(game.status)
          ? concealWord(game.word, game.correctGuesses)
          : game.word,
        incorrectGuesses: game.incorrectGuesses,
        status: game.status,
      },
      // status: 200, /* Defaults to 200 */
    };
  }
};

export default httpTrigger;
