const api = () => {
    function fetchWord() {
        return fetch('http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=noun,verb,adjective,adverb,preposition,conjunction,verb-transitive&minCorpusCount=1000000&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=7&maxLength=15&api_key=503890e5c73712c79d3090fb3840a8220541b1c15372a08d8')
                .then(response =>  {
                    return response.json()
                })
                .then(data => {
                    return data.word
                })
    }

    return {
        fetchWord: fetchWord
    }
}

export default api()