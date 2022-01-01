const apiKey = "503890e5c73712c79d3090fb3840a8220541b1c15372a08d8";

interface DifficultySettings {
  selectedPartsOfSpeech: string[],
  maxCorpusCount: number,
  minDictionaryCount: number,
  maxDictionaryCount: number,
  minLength: number,
  maxLength: number
}

export const fetchWord = async (settings: DifficultySettings) => {
  const {
    selectedPartsOfSpeech,
    maxCorpusCount,
    minDictionaryCount,
    maxDictionaryCount,
    minLength,
    maxLength,
  } = settings;

  const response = await fetch(
    `https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=${selectedPartsOfSpeech.join(
      ","
    )}&minCorpusCount=10000&maxCorpusCount=${maxCorpusCount}&minDictionaryCount=${minDictionaryCount}&maxDictionaryCount=${maxDictionaryCount}&minLength=${minLength}&maxLength=${maxLength}&api_key=${apiKey}`
  );
  const data = await response.json();
  return data.word;
};
