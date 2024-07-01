import { createSlice} from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        notificationChange(state, action) {
            return action.payload
        },
        clearNotification(state, action) {
            return ''
        }
    }
})

export const setNotification = (message, seconds) => {
    return async dispatch => {
        dispatch(notificationChange(message))
        setTimeout(() => dispatch(clearNotification()), (1000 * seconds))
    }
}

export const { notificationChange, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer