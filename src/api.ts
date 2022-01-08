import axios from "axios";

interface DifficultySettings {
  selectedPartsOfSpeech: string[];
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
  word: string;
}

export const getUser = async (): Promise<LoggedInUser> => {
  const response = await axios.get<GetUserResponse>("/user");
  return response.data?.clientPrincipal;
};

export const startGame = async (
  settings: DifficultySettings
): Promise<{ id: string; word: string }> => {
  const {
    selectedPartsOfSpeech,
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
    includePartOfSpeech: selectedPartsOfSpeech.join(","),
  });
  return response.data;
};

export const registerGuess = async (
  gameId: string,
  guess: string
): Promise<void> => {
  await axios.post(`/api/RegisterGuess`, {
    gameId,
    guess,
  });
};
