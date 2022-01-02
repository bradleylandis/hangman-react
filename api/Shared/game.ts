import { model, Schema } from "mongoose";

export interface GameType {
  playerId: string;
  word: string;
  status: "won" | "lost" | "in progress";
  startedAt: Date;
  endedAt: Date;
  correctGuesses: string[];
  incorrectGuesses: string[];
}

const gameSchema = new Schema<GameType>({
  playerId: String,
  word: String,
  status: String,
  startedAt: Date,
  endedAt: Date,
  correctGuesses: [String],
  incorrectGuesses: [String],
});

export default model<GameType>("Game", gameSchema);
