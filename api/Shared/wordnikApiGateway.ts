import axios from "axios";

const apiKey = process.env.WORDNIK_API_KEY;

interface DifficultySettings {
  includePartsOfSpeech: string[];
  minCorpusCount: number;
  maxCorpusCount: number;
  minDictionaryCount: number;
  maxDictionaryCount: number;
  minLength: number;
  maxLength: number;
  hasDictionaryRef: true;
}

export const fetchWord = async (
  settings: DifficultySettings
): Promise<{ word: string }> => {
  try {
    const response = await axios.get<{ word: string }>(
      `https://api.wordnik.com/v4/words.json/randomWord`,
      {
        params: {
          ...settings,
          includePartOfSpeech: settings.includePartsOfSpeech.join(","),
          api_key: apiKey,
        },
      }
    );
    return response.data;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(`Could not get word from wordnik: ${JSON.stringify(e)}`);
    }
  }
};
