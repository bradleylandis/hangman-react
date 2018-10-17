import React from 'react'
import serialize from 'form-serialize'

const DifficultySettings = ({difficultySettings, availablePartsOfSpeech, onUpdate}) => {
    const {
        minLength,
        maxLength,
        selectedPartsOfSpeech,
        minCorpusCount,
        maxCorpusCount,
        minDictionaryCount,
        maxDictionaryCount
    } = difficultySettings

    const onSubmit = (event) => {
        event.preventDefault();
        const data = serialize(event.target, {hash: true, empty: true});
        onUpdate(data)
    }

    return  <form onSubmit={onSubmit}>
                <fieldset>
                    <legend>Difficulty Settings</legend>
                    Min Length: <input type="text" name="minLength" id="minLength" defaultValue={minLength}/>
                    Max Length: <input type="text" name="maxLength" id="maxLength" defaultValue={maxLength}/>
                    Parts of Speech: <select name="selectedPartsOfSpeech" id="selectedPartsOfSpeech" multiple={true} defaultValue={selectedPartsOfSpeech}>
                                        {availablePartsOfSpeech.map(part => <option key={part} value={part}>{part}</option>)}
                                     </select>
                    Min Corpus Count: <input type="text" name="minCorpusCount" id="minCorpusCount" defaultValue={minCorpusCount}/>
                    Max Corpus Count: <input type="text" name="maxCorpusCount" id="maxCorpusCount" defaultValue={maxCorpusCount}/>
                    Min Dictionary Count: <input type="text" name="minDictionaryCount" id="minDictionaryCount" defaultValue={minDictionaryCount}/>
                    Max Dictionary Count: <input type="text" name="maxDictionaryCount" id="maxDictionaryCount" defaultValue={maxDictionaryCount}/>
                    <input type="submit" value="Update"/>
                </fieldset>
            </form>
}

export default DifficultySettings