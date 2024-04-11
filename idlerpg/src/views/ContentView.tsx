import {Component, Show} from "solid-js";
import useGameView from "../contexts/GameViewContext";
import ProfileView from "./ProfileView";
import InventoryView from "./InventoryView";
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

const StyledContentView = styled.div`
    position: fixed;
    top: 15vh;
    left: 15vw;
    width: 85vw;
    height: 100%;
    background-color: ${transparentColor};
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

interface IContentViewProps
{
}

const ContentView: Component<IContentViewProps> = (props) => {
    const gameView = useGameView();

    return (
        <StyledContentView>
            <div style={{'overflow-y': 'auto', 'width': '100%'}}>
                <div style={{ "padding-bottom": '260px' }}>
                    <Show when={gameView?.activeView() === 'profile'}>
                        <ProfileView/>
                    </Show>
                    <Show when={gameView?.activeView() === 'inventory'}>
                        <InventoryView/>
                    </Show>
                    <Show when={gameView?.activeView() === 'location'}>
                        <LocationView/>
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
            </div>
        </StyledContentView>
);
};

export default ContentView;