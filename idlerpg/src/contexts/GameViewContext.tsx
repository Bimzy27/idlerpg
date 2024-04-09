import {Accessor, createContext, createSignal, JSX, useContext} from "solid-js";

type GameViewData = {activeView:Accessor<string>, setActiveView:(view:string)=>void};

export const GameViewContext = createContext<GameViewData>();

interface GameViewProps {
    children?: JSX.Element; // Children elements
}

export function GameViewProvider(props:GameViewProps) {
    const [activeView, setActiveView] = createSignal('profile');
    const view:GameViewData = {
        activeView: activeView,
        setActiveView: (view:string)=>{
            setActiveView(view);
        },
    };

    return (
        <GameViewContext.Provider value={view}>
            {props.children}
        </GameViewContext.Provider>
    );
}

export default function useGameView() { return useContext(GameViewContext) }