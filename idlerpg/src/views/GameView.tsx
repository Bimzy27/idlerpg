import {Component} from "solid-js";
import ActiveTaskView from "./footer/ActiveTaskView";
import HeaderView from "./HeaderView";
import TabView from "./TabView";
import ContentView from "./ContentView";
import {styled} from "solid-styled-components";
import {backgroundColor} from "../styles/colors";
import FooterPopupView from "./footer/FooterPopupView";

const StyledGameView = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: ${backgroundColor};
    display: flex;
    flex-direction: row;
    align-items: center;
`;

interface IGameViewProps
{
}

const GameView: Component<IGameViewProps> = (props) => {

    return (
        <StyledGameView>
            <FooterPopupView/>
            <TabView/>
            <ContentView/>
        </StyledGameView>
    );
};

export default GameView;