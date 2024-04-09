import {Component} from "solid-js";
import InventoryView from "./InventoryView";
import LocationView from "./LocationView";
import ActiveTaskView from "./ActiveTaskView";
import {StyledGameView} from "../styles/styles";

interface IGameViewProps
{
}

const GameView: Component<IGameViewProps> = (props) => {
    return (
        <StyledGameView>
            <InventoryView/>
            <LocationView/>
            <ActiveTaskView/>
        </StyledGameView>
    );
};

export default GameView;