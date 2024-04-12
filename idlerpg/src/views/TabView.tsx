import {Component} from "solid-js";
import {
    CoreButton,
    CoreImage,
    CoreText,
    TransparentButton
} from "../styles/styles";
import useGameView from "../contexts/GameViewContext";
import {styled} from "solid-styled-components";
import {backgroundAlt1Color, primaryTrimColor, transparentColor} from "../styles/colors";

export const StyledTabButtonInnerView = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 100%;
    padding-left: 20px;
`;

const StyledTabButtonView = styled.div`
    background-color: ${transparentColor};
    border-radius: 5px;
    border: 3px solid ${primaryTrimColor};
    margin: 0.5em 1em;
    width: 100%;
    height: 80px;
`;

const StyledTabView = styled.div`
    position: fixed;
    top: 15vh;
    left: 0;
    width: 15vw;
    height: 85vh;
    background-color: ${backgroundAlt1Color};
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    overflow-y: auto;
`;

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
            <TabButton viewName={'mining'} imagePath={'skills/mining'}></TabButton>
            <TabButton viewName={'smithing'} imagePath={'skills/smithing'} ></TabButton>
            <TabButton viewName={'fishing'} imagePath={'skills/fishing'} ></TabButton>
            <TabButton viewName={'cooking'} imagePath={'skills/cooking'} ></TabButton>
            <TabButton viewName={'firemaking'} imagePath={'skills/firemaking'} ></TabButton>
            <TabButton viewName={'woodcutting'} imagePath={'skills/woodcutting'} ></TabButton>
            <TabButton viewName={'fletching'} imagePath={'skills/fletching'} ></TabButton>
            <TabButton viewName={'runecrafting'} imagePath={'skills/runecrafting'} ></TabButton>
            <TabButton viewName={'crafting'} imagePath={'skills/crafting'} ></TabButton>
        </StyledTabView>
    );
};

interface ITabButtonProps
{
    viewName:string;
    imagePath?:string;
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
                    <CoreImage src={`/assets/${props.imagePath ? props.imagePath: props.viewName}.png`} alt="NO IMG" width={35} height={35}></CoreImage>
                    <CoreText style={{"padding-left": '20px'}}>{props.viewName}</CoreText>
                </StyledTabButtonInnerView>
            </TransparentButton>
        </StyledTabButtonView>
    );
};

export default TabView;