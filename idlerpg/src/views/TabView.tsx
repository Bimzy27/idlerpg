import {Component, JSX} from "solid-js";
import {
    ColumnCenterAlignedView,
    CoreImage,
    CoreText,
    TransparentButton
} from "../styles/styles";
import useGameView, {GameViewData} from "../contexts/GameViewContext";
import {styled} from "solid-styled-components";
import {backgroundAlt1Color, backgroundColor, transparentColor} from "../styles/colors";
import CoinsView from "./CoinsView";
import useInventory, {InventoryData} from "../contexts/InventoryContext";
import Scrollbars from "solid-custom-scrollbars";
import GameIconView, {IGameIconViewProps} from "./GameIconView";
import useMap, {MapData} from "../contexts/MapContext";
import locationBuilder from "../data/LocationBuilder";

const StyledTabButtonInnerView = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 100%;
    padding-left: 10px;
    box-sizing: border-box;
`;

const StyledTabButtonView = styled.div`
    background-color: ${transparentColor};
    width: 100%;
    height: 80px;
    box-sizing: border-box;
`;

const StyledTabView = styled.div`
    width: 10vw;
    height: 100%;
    background-color: ${backgroundAlt1Color};
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    align-items: center;
`;

interface ITabViewProps
{
}

const TabView: Component<ITabViewProps> = (props) => {
    const inventory = useInventory() as InventoryData;
    const map = useMap() as MapData;

    return (
        <StyledTabView>
            <Scrollbars style={{width: "100%"}} autoHide>
                <ColumnCenterAlignedView style={{height: '80px', "background-color": `${backgroundColor}`}}>
                    <CoreImage src={`/assets/icon.png`} alt="NO IMG" style={{"margin-right": '50px'}} width={80} height={80}></CoreImage>
                </ColumnCenterAlignedView>
                <TabButton viewName={'profile'}></TabButton>
                <TabButton viewName={'bank'}>
                    <CoinsView amount={inventory.coins()}/>
                </TabButton>
                <TabButton viewName={'quests'}></TabButton>
                <TabButton viewName={'location'} textOverride={locationBuilder[map.location()].name}></TabButton>
                <TabButton viewName={'map'}></TabButton>
                <TabButton viewName={'combat'}></TabButton>
                {/*<CoreText>Combat</CoreText>*/}
                {/*<TabButton viewName={'attack'} viewOverride={'combat'}></TabButton>
                <TabButton viewName={'strength'} viewOverride={'combat'}></TabButton>
                <TabButton viewName={'defense'} viewOverride={'combat'}></TabButton>
                <TabButton viewName={'hitpoints'} viewOverride={'combat'}></TabButton>
                <TabButton viewName={'ranged'} viewOverride={'combat'}></TabButton>
                <TabButton viewName={'magic'} viewOverride={'combat'}></TabButton>*/}
                {/*<CoreText>Skills</CoreText>
                <TabButton viewName={'mining'}></TabButton>
                <TabButton viewName={'smithing'}></TabButton>
                <TabButton viewName={'fishing'}></TabButton>
                <TabButton viewName={'cooking'}></TabButton>
                <TabButton viewName={'firemaking'}></TabButton>
                <TabButton viewName={'woodcutting'}></TabButton>
                <TabButton viewName={'fletching'}></TabButton>
                <TabButton viewName={'runecrafting'}></TabButton>
                <TabButton viewName={'crafting'}></TabButton>*/}
            </Scrollbars>
        </StyledTabView>
    );
};

interface ITabButtonProps extends IGameIconViewProps
{
    viewName:string;
    viewOverride?:string;
    textOverride?:string;
    children?: JSX.Element;
}

const TabButton = (props:ITabButtonProps) => {
    const gameView = useGameView() as GameViewData;
    const handleButtonClick = () => {
        gameView.setActiveView(props.viewOverride ? props.viewOverride : props.viewName);
    };
    return (
        <StyledTabButtonView>
            <TransparentButton onClick={() => handleButtonClick()}>
                <StyledTabButtonInnerView>
                    <GameIconView viewName={props.viewName} textOverride={props.textOverride}/>
                    {props.children}
                </StyledTabButtonInnerView>
            </TransparentButton>
        </StyledTabButtonView>
    );
};

export default TabView;