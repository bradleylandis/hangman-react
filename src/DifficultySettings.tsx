import type {DifficultySettings as DifficultySettingsType} from './gameReducer'

interface DifficultySettingsProps {
  difficultySettings: {
    minLength: number,
    maxLength: number,
    selectedPartsOfSpeech: string[],
    minCorpusCount: number,
    maxCorpusCount: number,
    minDictionaryCount: number,
    maxDictionaryCount: number
  },
  availablePartsOfSpeech: string[],
  onUpdate: (data: DifficultySettingsType) => void
}

const DifficultySettings = ({
  difficultySettings,
  availablePartsOfSpeech,
  onUpdate,
}: DifficultySettingsProps) => {
  const {
    minLength,
    maxLength,
    selectedPartsOfSpeech,
    minCorpusCount,
    maxCorpusCount,
    minDictionaryCount,
    maxDictionaryCount,
  } = difficultySettings;

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <fieldset>
        <legend>Difficulty Settings</legend>
        Min Length:{" "}
        <input
          type="text"
          name="minLength"
          id="minLength"
          defaultValue={minLength}
        />
        Max Length:{" "}
        <input
          type="text"
          name="maxLength"
          id="maxLength"
          defaultValue={maxLength}
        />
        Parts of Speech:{" "}
        <select
          name="selectedPartsOfSpeech"
          id="selectedPartsOfSpeech"
          multiple={true}
          defaultValue={selectedPartsOfSpeech}
        >
          {availablePartsOfSpeech.map((part) => (
            <option key={part} value={part}>
              {part}
            </option>
          ))}
        </select>
        Min Corpus Count:{" "}
        <input
          type="text"
          name="minCorpusCount"
          id="minCorpusCount"
          defaultValue={minCorpusCount}
        />
        Max Corpus Count:{" "}
        <input
          type="text"
          name="maxCorpusCount"
          id="maxCorpusCount"
          defaultValue={maxCorpusCount}
        />
        Min Dictionary Count:{" "}
        <input
          type="text"
          name="minDictionaryCount"
          id="minDictionaryCount"
          defaultValue={minDictionaryCount}
        />
        Max Dictionary Count:{" "}
        <input
          type="text"
          name="maxDictionaryCount"
          id="maxDictionaryCount"
          defaultValue={maxDictionaryCount}
        />
        <input type="submit" value="Update" />
      </fieldset>
    </form>
  );
};

export default DifficultySettings;
