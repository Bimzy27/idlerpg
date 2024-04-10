import {Component, Show} from "solid-js";
import useGameView from "../contexts/GameViewContext";
import {StyledContentView} from "../styles/styles";
import ProfileView from "./ProfileView";
import InventoryView from "./InventoryView";
import LocationView from "./LocationView";

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
                </div>
            </div>
        </StyledContentView>
);
};

export default ContentView;