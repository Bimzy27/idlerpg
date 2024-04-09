import {Component} from "solid-js";
import {
    CoreImage,
    CoreText,
    StyledTabButtonInnerView,
    StyledTabButtonView,
    StyledTabView,
    TransparentButton
} from "../styles/styles";
import useGameView from "../contexts/GameViewContext";
import {transparentColor} from "../styles/colors";

interface ITabViewProps
{
}

const TabView: Component<ITabViewProps> = (props) => {
    const gameView = useGameView();
    return (
        <StyledTabView>
            <CoreText>Active view: {gameView?.activeView()}</CoreText>
            <TabButton viewName={'profile'}></TabButton>
            <TabButton viewName={'inventory'}></TabButton>
            <TabButton viewName={'location'}></TabButton>
            <CoreText>Combat</CoreText>
            <CoreText>Skills</CoreText>
        </StyledTabView>
    );
};

interface ITabButtonProps
{
    viewName:string;
}

const TabButton = (props:ITabButtonProps) => {
    const gameView = useGameView();
    const handleButtonClick = () => {
        gameView?.setActiveView(props.viewName);
    };
    return (
        <StyledTabButtonView>
            <TransparentButton onClick={() => handleButtonClick()}>
                <StyledTabButtonInnerView>
                    <CoreImage src={`/assets/${props.viewName}.png`} alt="NO IMG" width={35} height={35}></CoreImage>
                    <CoreText style={{"padding-left": '20px'}}>{props.viewName}</CoreText>
                </StyledTabButtonInnerView>
            </TransparentButton>
        </StyledTabButtonView>
    );
};

export default TabView;