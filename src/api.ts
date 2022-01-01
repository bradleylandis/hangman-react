import axios from "axios";

interface DifficultySettings {
  selectedPartsOfSpeech: string[];
  maxCorpusCount: number;
  minDictionaryCount: number;
  maxDictionaryCount: number;
  minLength: number;
  maxLength: number;
}

export const fetchWord = async (
  settings: DifficultySettings
): Promise<string> => {
  const {
    selectedPartsOfSpeech,
    maxCorpusCount,
    minDictionaryCount,
    maxDictionaryCount,
    minLength,
    maxLength,
  } = settings;

  const response = await axios.get<{ word: string }>(`/api/StartGame`, {
    params: {
      minCorpusCount: 10000,
      maxCorpusCount: maxCorpusCount,
      minDictionaryCount: minDictionaryCount,
      maxDictionaryCount: maxDictionaryCount,
      minLength: minLength,
      maxLength: maxLength,
      hasDictionaryDef: true,
      includePartOfSpeech: selectedPartsOfSpeech.join(","),
    },
  });
  return response.data.word;
};
