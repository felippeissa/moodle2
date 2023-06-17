import { MENU_OPEN } from "./action";

const initialState = false

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case MENU_OPEN:
            return action.payload
        default:
            return state
    }
}