const api = () => {
    function fetchWord() {
        return fetch('http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&excludePartOfSpeech=proper-noun&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=1&api_key=503890e5c73712c79d3090fb3840a8220541b1c15372a08d8')
                .then(response =>  {
                    return response.json()
                })
                .then(data => {
                    return data[0].word
                })
    }

    return {
        fetchWord: fetchWord
    }
}

export default api()