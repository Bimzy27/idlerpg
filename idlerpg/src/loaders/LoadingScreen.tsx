import {createSignal, JSX, Show} from "solid-js";
import {EnemyLoader} from "./EnemyLoader";
import {ColumnCenterAlignedView, CoreText} from "../styles/styles";
import ContextProvider from "../contexts/ContextProvider";
import {backgroundColor} from "../styles/colors";
import {ItemLoader} from "./ItemLoader";
import {TaskLoader} from "./TaskLoader";

interface ILoadingScreenProps {
    children?: JSX.Element;
}

export function LoadingScreen(props:ILoadingScreenProps) {
    const [loaded, setLoaded] = createSignal(0);
    function IncrementLoadable()
    {
        setLoaded(loaded() + 1);
        console.log('Loading incremented! ' + loaded());
    }
    const loadableViews:number = 3;
    return (
        <EnemyLoader incrementLoadable={IncrementLoadable}>
            <ItemLoader incrementLoadable={IncrementLoadable}>
                <TaskLoader incrementLoadable={IncrementLoadable}>
                    <Show when={loaded() >= loadableViews}>
                        <ContextProvider>
                            {props.children}
                        </ContextProvider>
                    </Show>
                    <Show when={loaded() < loadableViews}>
                        <ColumnCenterAlignedView style={{"background-color": `${backgroundColor}`}}>
                            <CoreText>Loading!</CoreText>
                        </ColumnCenterAlignedView>
                    </Show>
                </TaskLoader>
            </ItemLoader>
        </EnemyLoader>
    );
}

export default LoadingScreen;