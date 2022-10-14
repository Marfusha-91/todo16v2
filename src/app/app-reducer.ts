import {setIsLoggedInAC} from "../features/Login/authReducer";
import {authAPI} from "../api/todolists-api";
import {Dispatch} from "redux";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";



const initialState: InitialStateType = {
    isInitialized: false,
    status: 'idle',
    error: null
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return {...state}
        case 'APP/SET-IS_INITIALIZED':
            return {...state, isInitialized: action.value}
    }
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    isInitialized: boolean
}

export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setInitializedAC = (value: boolean) => ({type: 'APP/SET-IS_INITIALIZED', value} as const)


export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setInitializedAC(true))
             dispatch(setIsLoggedInAC(true))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })


}

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SeInitializedActionType = ReturnType<typeof setInitializedAC>

type ActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | SeInitializedActionType
