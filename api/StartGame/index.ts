import { AzureFunction, Context, HttpRequest } from "@azure/functions";

import axios from "axios";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("HTTP trigger function processed a request.");
  const selectedPartsOfSpeech = [
    "noun",
    "verb",
    "adjective",
    "adverb",
    "conjunction",
    "verb-transitive",
  ];

  const defaultDifficultySettings = {
    minLength: 7,
    maxLength: 15,
    selectedPartsOfSpeech: selectedPartsOfSpeech,
    minCorpusCount: 1000000,
    maxCorpusCount: -1,
    minDictionaryCount: 1,
    maxDictionaryCount: -1,
  };
  const response = await fetchWord(defaultDifficultySettings);
  context.res = {
    // status: 200, /* Defaults to 200 */
    body: response,
  };
};

export default httpTrigger;

const apiKey = "503890e5c73712c79d3090fb3840a8220541b1c15372a08d8";

interface DifficultySettings {
  selectedPartsOfSpeech: string[];
  maxCorpusCount: number;
  minDictionaryCount: number;
  maxDictionaryCount: number;
  minLength: number;
  maxLength: number;
}

const fetchWord = async (
  settings: DifficultySettings
): Promise<{ word: string }> => {
  const {
    selectedPartsOfSpeech,
    maxCorpusCount,
    minDictionaryCount,
    maxDictionaryCount,
    minLength,
    maxLength,
  } = settings;

  const response = await axios.get<{ word: string }>(
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
        includePartOfSpeech: selectedPartsOfSpeech.join(","),
        api_key: apiKey,
      },
    }
  );
  return response.data;
};
