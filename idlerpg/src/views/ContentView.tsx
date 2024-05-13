import {Component, Show} from "solid-js";
import useGameView from "../contexts/GameViewContext";
import ProfileView from "./profile/ProfileView";
import InventoryView from "./inventory/InventoryView";
import LocationView from "./LocationView";
import WoodcuttingView from "./skills/WoodcuttingView";
import MiningView from "./skills/MiningView";
import SmithingView from "./skills/SmithingView";
import FishingView from "./skills/FishingView";
import CookingView from "./skills/CookingView";
import FiremakingView from "./skills/FiremakingView";
import FletchingView from "./skills/FletchingView";
import RunecraftingView from "./skills/RunecraftingView";
import CraftingView from "./skills/CraftingView";
import {styled} from "solid-styled-components";
import {transparentColor} from "../styles/colors";
import CombatView from "./combat/CombatView";
import MapView from "./MapView";
import HeaderView from "./HeaderView";
import Scrollbars from "solid-custom-scrollbars";

const StyledContentView = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${transparentColor};
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    align-items: center;
`;

interface IContentViewProps
{
}

const ContentView: Component<IContentViewProps> = (props) => {
    const gameView = useGameView();

    return (
        <div style={{width: '100%', height: '100%'}}>
            <StyledContentView>
                <Scrollbars style={{'width': '100%'}} autoHide>
                    <HeaderView/>
                    <div style={{ "padding-bottom": '180px', padding: '20px' }}>
                        <Show when={gameView?.activeView() === 'profile'}>
                            <ProfileView/>
                        </Show>
                        <Show when={gameView?.activeView() === 'bank'}>
                            <InventoryView/>
                        </Show>
                        <Show when={gameView?.activeView() === 'location'}>
                            <LocationView/>
                        </Show>
                        <Show when={gameView?.activeView() === 'map'}>
                            <MapView/>
                        </Show>
                        <Show when={gameView?.activeView() === 'combat'}>
                            <CombatView/>
                        </Show>
                        <Show when={gameView?.activeView() === 'mining'}>
                            <MiningView/>
                        </Show>
                        <Show when={gameView?.activeView() === 'smithing'}>
                            <SmithingView/>
                        </Show>
                        <Show when={gameView?.activeView() === 'fishing'}>
                            <FishingView/>
                        </Show>
                        <Show when={gameView?.activeView() === 'cooking'}>
                            <CookingView/>
                        </Show>
                        <Show when={gameView?.activeView() === 'firemaking'}>
                            <FiremakingView/>
                        </Show>
                        <Show when={gameView?.activeView() === 'woodcutting'}>
                            <WoodcuttingView/>
                        </Show>
                        <Show when={gameView?.activeView() === 'fletching'}>
                            <FletchingView/>
                        </Show>
                        <Show when={gameView?.activeView() === 'runecrafting'}>
                            <RunecraftingView/>
                        </Show>
                        <Show when={gameView?.activeView() === 'crafting'}>
                            <CraftingView/>
                        </Show>
                    </div>
                </Scrollbars>
            </StyledContentView>
        </div>
    );
};

export default ContentView;