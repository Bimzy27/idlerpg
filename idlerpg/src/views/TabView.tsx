import {Component, JSX} from "solid-js";
import {
    CoreButton,
    CoreImage,
    CoreText,
    TransparentButton
} from "../styles/styles";
import useGameView from "../contexts/GameViewContext";
import {styled} from "solid-styled-components";
import {backgroundAlt1Color, primaryTrimColor, transparentColor} from "../styles/colors";
import CoinsView from "./CoinsView";
import useInventory, {InventoryData} from "../contexts/InventoryContext";

const StyledTabButtonInnerView = styled.div`
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
    const inventory = useInventory() as InventoryData;

    return (
        <StyledTabView>
            <CoreText>Active view: {gameView?.activeView()}</CoreText>
            <TabButton viewName={'profile'}></TabButton>
            <TabButton viewName={'inventory'}>
                <CoinsView amount={inventory.coins()}/>
            </TabButton>
            <TabButton viewName={'location'}></TabButton>
            <TabButton viewName={'map'}></TabButton>
            <CoreText>Combat</CoreText>
            <TabButton viewName={'attack'} imagePath={'skills/attack'} viewOverride={'combat'}></TabButton>
            <TabButton viewName={'strength'} imagePath={'skills/strength'} viewOverride={'combat'}></TabButton>
            <TabButton viewName={'defense'} imagePath={'skills/defense'} viewOverride={'combat'}></TabButton>
            <TabButton viewName={'hitpoints'} imagePath={'skills/hitpoints'} viewOverride={'combat'}></TabButton>
            <TabButton viewName={'ranged'} imagePath={'skills/ranged'} viewOverride={'combat'}></TabButton>
            <TabButton viewName={'magic'} imagePath={'skills/magic'} viewOverride={'combat'}></TabButton>
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
    viewOverride?:string;
    children?: JSX.Element;
}

const TabButton = (props:ITabButtonProps) => {
    const gameView = useGameView();
    const handleButtonClick = () => {
        gameView?.setActiveView(props.viewOverride ? props.viewOverride : props.viewName);
    };
    return (
        <StyledTabButtonView>
            <TransparentButton onClick={() => handleButtonClick()}>
                <StyledTabButtonInnerView>
                    <CoreImage src={`/assets/${props.imagePath ? props.imagePath: props.viewName}.png`} alt="NO IMG" width={35} height={35}></CoreImage>
                    <CoreText style={{"padding-left": '20px'}}>{props.viewName}</CoreText>
                    {props.children}
                </StyledTabButtonInnerView>
            </TransparentButton>
        </StyledTabButtonView>
    );
};

export default TabView;