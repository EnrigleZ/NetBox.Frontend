import React from 'react'
import { AuthContextValue, ExtraWrappedComponentProps } from './types'

export const AuthContext = React.createContext<AuthContextValue>({
    isAuthed: false
})

const AuthContextConsumer = AuthContext.Consumer

export function withAuthContext<T> (Component: React.ComponentClass<T & ExtraWrappedComponentProps>) {
    const WrappedComponent: React.FunctionComponent<T & ExtraWrappedComponentProps> = (props) => {
        return (<AuthContextConsumer>
            {value => {
                const { isAuthed } = value
                return (<Component {...props} isAuthed={isAuthed}/>)
            }}
        </AuthContextConsumer>)
    }

    return WrappedComponent
}
