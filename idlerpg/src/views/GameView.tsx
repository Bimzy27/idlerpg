import {Component} from "solid-js";
import ActiveTaskView from "./ActiveTaskView";
import {StyledGameView} from "../styles/styles";
import HeaderView from "./HeaderView";
import TabView from "./TabView";
import ContentView from "./ContentView";

interface IGameViewProps
{
}

const GameView: Component<IGameViewProps> = (props) => {

    return (
        <StyledGameView>
            <ActiveTaskView/>
            <HeaderView/>
            <TabView/>
            <ContentView/>
        </StyledGameView>
    );
};

export default GameView;