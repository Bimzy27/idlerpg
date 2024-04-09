import {Component, Show} from "solid-js";
import InventoryView from "./InventoryView";
import LocationView from "./LocationView";
import ActiveTaskView from "./ActiveTaskView";
import {StyledContentView, StyledGameView} from "../styles/styles";
import HeaderView from "./HeaderView";
import TabView from "./TabView";
import ProfileView from "./ProfileView";
import useGameView from "../contexts/GameViewContext";

interface IGameViewProps
{
}

const GameView: Component<IGameViewProps> = (props) => {
    const gameView = useGameView();

    return (
        <StyledGameView>
            <ActiveTaskView/>
            <HeaderView/>
            <TabView/>
            <StyledContentView>
                <Show when={gameView?.activeView() === 'profile'}>
                    <ProfileView/>
                </Show>
                <Show when={gameView?.activeView() === 'inventory'}>
                    <InventoryView/>
                </Show>
                <Show when={gameView?.activeView() === 'location'}>
                    <LocationView/>
                </Show>
            </StyledContentView>
        </StyledGameView>
    );
};

export default GameView;