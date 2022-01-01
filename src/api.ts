import axios from 'axios';

const apiKey = "503890e5c73712c79d3090fb3840a8220541b1c15372a08d8";

interface DifficultySettings {
  selectedPartsOfSpeech: string[],
  maxCorpusCount: number,
  minDictionaryCount: number,
  maxDictionaryCount: number,
  minLength: number,
  maxLength: number
}

export const fetchWord = async (settings: DifficultySettings) : Promise<string> => {
  const {
    selectedPartsOfSpeech,
    maxCorpusCount,
    minDictionaryCount,
    maxDictionaryCount,
    minLength,
    maxLength,
  } = settings;

  const response = await axios.get<{word: string}>(
    `https://api.wordnik.com/v4/words.json/randomWord`,
    {
      params: {
        minCorpusCount: 10000,
        maxCorpusCount: maxCorpusCount,
        minDictionaryCount: minDictionaryCount,
        maxDictionaryCount: maxDictionaryCount,
        minLength: minLength,
        maxLength: maxLength,
        hasDictionaryDef: true,
        includePartOfSpeech: selectedPartsOfSpeech.join(','),
        api_key: apiKey
      }
    }
  );
  return response.data.word;
};
