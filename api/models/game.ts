import { model, Schema } from "mongoose";

interface Game {
  playerId: string;
  word: string;
  status: "won" | "lost" | "in progress";
  startedAt: Date;
}

const gameSchema = new Schema<Game>({
  playerId: String,
  word: String,
  status: String,
  startedAt: Date,
});

export default model("Game", gameSchema);
