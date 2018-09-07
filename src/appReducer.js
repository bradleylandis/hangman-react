export const appReducer = (state = {isLoading: true, isError: false}, action) => {
    switch (action.type) {
        case 'SET_WORD':
            return {
                isLoading: false,
                isError: false
            }
        case 'START_LOADING':
            return {
                isLoading: true,
                isError: false
            }
        case 'SET_ERROR':
            return {
                isLoading: false,
                isError: true
            }
        default:
            return state
    }
}

export const getAppData = state => {
    return {
        isLoading: state.app.isLoading,
        isError: state.app.isError
    }
}