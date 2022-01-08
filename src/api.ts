import axios from "axios";

interface DifficultySettings {
  includePartsOfSpeech: string[];
  maxCorpusCount: number;
  minDictionaryCount: number;
  maxDictionaryCount: number;
  minLength: number;
  maxLength: number;
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

export interface ApplyGuessResponse {
  id: string;
  currentWord: string;
}

export const getUser = async (): Promise<LoggedInUser> => {
  const response = await axios.get<GetUserResponse>("/user");
  return response.data?.clientPrincipal;
};

export const startGame = async (
  settings: DifficultySettings
): Promise<ApplyGuessResponse> => {
  const {
    includePartsOfSpeech,
    maxCorpusCount,
    minDictionaryCount,
    maxDictionaryCount,
    minLength,
    maxLength,
  } = settings;

  const response = await axios.post<ApplyGuessResponse>(`/api/StartGame`, {
    minCorpusCount: 10000,
    maxCorpusCount: maxCorpusCount,
    minDictionaryCount: minDictionaryCount,
    maxDictionaryCount: maxDictionaryCount,
    minLength: minLength,
    maxLength: maxLength,
    hasDictionaryDef: true,
    includePartsOfSpeech: includePartsOfSpeech,
  });
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
  const response = await axios.post<GameState>(`/api/RegisterGuess`, {
    gameId,
    guess,
  });

  return response.data;
};
