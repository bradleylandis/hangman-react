import axios from "axios";

interface DifficultySettings {
  selectedPartsOfSpeech: string[];
  maxCorpusCount: number;
  minDictionaryCount: number;
  maxDictionaryCount: number;
  minLength: number;
  maxLength: number;
}

export const startGame = async (
  playerId: string,
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

  const response = await axios.post<{ id: string; word: string }>(
    `/api/StartGame`,
    {
      minCorpusCount: 10000,
      maxCorpusCount: maxCorpusCount,
      minDictionaryCount: minDictionaryCount,
      maxDictionaryCount: maxDictionaryCount,
      minLength: minLength,
      maxLength: maxLength,
      hasDictionaryDef: true,
      includePartOfSpeech: selectedPartsOfSpeech.join(","),
      playerId: playerId,
    }
  );
  return response.data;
};

export const registerGuess = async (
  gameId: string,
  guess: string
): Promise<void> => {
  await axios.post(`/api/RegisterGuess`, { gameId, guess });
};
