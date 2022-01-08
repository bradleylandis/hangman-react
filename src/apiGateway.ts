import axios from "axios";

interface DifficultySettings {
  includePartsOfSpeech: string[];
  minCorpusCount: number;
  maxCorpusCount: number;
  minDictionaryCount: number;
  maxDictionaryCount: number;
  minLength: number;
  maxLength: number;
  hasDictionaryDef: boolean;
}
export type LoggedInUser =
  | {
      userId: string;
      identityProvider: string;
      userDetails: string;
    }
  | null
  | undefined;

type GetUserResponse = {
  clientPrincipal: LoggedInUser;
} | null;

export interface StartGameResponse {
  id: string;
  currentWord: string;
}

export const getUser = async (): Promise<LoggedInUser> => {
  const response = await axios.get<GetUserResponse>("/user");
  return response.data?.clientPrincipal;
};

export const startGame = async (
  settings: DifficultySettings
): Promise<StartGameResponse> => {
  const response = await axios.post<StartGameResponse>(`/api/game`, settings);
  return response.data;
};

export type Status = "won" | "lost" | "in progress";

export interface GameState {
  word: string;
  incorrectGuesses: string[];
  status: Status;
}

export const registerGuess = async (
  gameId: string,
  guess: string
): Promise<GameState> => {
  const response = await axios.post<GameState>(`/api/game/${gameId}/guess`, {
    guess,
  });

  return response.data;
};
