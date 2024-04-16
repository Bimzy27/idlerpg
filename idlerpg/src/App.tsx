import {Component, createSignal} from 'solid-js';

import GameView from "./views/GameView";
import ContextProvider from "./contexts/ContextProvider";

import { Match, Switch } from 'solid-js'
import { getAuth } from 'firebase/auth'
import { useAuth, useFirebaseApp } from 'solid-firebase'
import { signInWithEmailAndPassword } from "@firebase/auth";
import {ColumnCenterAlignedView, CoreButton} from "./styles/styles";
import {backgroundColor} from "./styles/colors";
import {getHitChance} from "./models/combat/CombatStats";

function Login() {
    const app = useFirebaseApp()
    if (!app) {
        console.error("Firebase app not initialized correctly")
        return null; // Or display an error message
    }
    const signIn = (email:string, pass:string) => signInWithEmailAndPassword(getAuth(app), email, pass);

    const [email, setEmail] = createSignal('');
    const [password, setPassword] = createSignal('');

    return (
        <ColumnCenterAlignedView style={{"background-color": `${backgroundColor}`}}>
            <input class="email" onInput={(e) => setEmail(e.target.value)} />
            <input class='password' onInput={(e) => setPassword(e.target.value)} />
            <CoreButton onClick={() => signIn(email(), password())}>Sign In with Email</CoreButton>
        </ColumnCenterAlignedView>
    );
}

const App: Component = () => {
    const app = useFirebaseApp()
    const state = useAuth(getAuth(app))

    return (
        <Switch fallback={<Login/>}>
            <Match when={state.loading}>
                <p>Loading...</p>
            </Match>
            <Match when={state.error}>
                <Login />
            </Match>
            <Match when={state.data}>
                <ContextProvider>
                    <GameView/>
                </ContextProvider>
            </Match>
        </Switch>
    );
};

export default App;