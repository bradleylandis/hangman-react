import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import "../Shared/db";
import { fetchWord } from "../Shared/wordnikApiGateway";
import Game from "../Shared/game";
import { getUserId } from "../Shared/user";
import { concealWord } from "../Shared/gameLogic";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("HTTP trigger function (StartGame) processed a request.");

  //TODO: validate request body

  const response = await fetchWord(req.body);

  const playerId = getUserId(req.headers["x-ms-client-principal"]);

  const game = new Game({
    word: response.word,
    status: "in progress",
    playerId: playerId,
    startedAt: new Date(Date.now()),
  });
  await game.save();

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: {
      id: game._id,
      currentWord: concealWord(response.word, []),
    },
  };
};

export default httpTrigger;
