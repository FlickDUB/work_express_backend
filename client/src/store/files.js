const initialState = { files: [], page: 0, totalFiles: 0, }

const files = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_FILES":
            return { ...state, files: [...state.files, ...action.files] }
        case "CLEAR_FILES":
            return { ...state, files: [] }
        default:
            return state

    }
}

export default files
