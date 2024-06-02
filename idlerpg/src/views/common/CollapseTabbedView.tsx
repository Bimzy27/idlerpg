import {Component, createSignal, For, JSX, Show} from "solid-js";
import {backgroundAlt2Color} from "../../styles/colors";
import {CoreText, RowCenterAlignedView, TransparentButton} from "../../styles/styles";

interface ITabElement
{
    name:string
    children: JSX.Element;
}

interface ICollapseTabbedViewProps
{
    tabs:ITabElement[]
    defaultExpandedIndex?:number
}

const CollapseTabbedView : Component<ICollapseTabbedViewProps> = (props) => {
    const [activeTab, setActiveTab] = createSignal(props.tabs[props.defaultExpandedIndex ? props.defaultExpandedIndex : 0].name);

    return (
        <div style={{width: '100%', height: "fit-content"}}>
            <div style={{"background-color": `${backgroundAlt2Color}`, width: '100%', height: '60px'}}>
                <For each={props.tabs}>
                    {(tabElement:ITabElement, index) => (
                        <TransparentButton onClick={()=>setActiveTab(tabElement.name)} style={{width: 'fit-content', "margin-left": '10px', "margin-right": '10px'}}>
                            <RowCenterAlignedView>
                                <CoreText>{tabElement.name}</CoreText>
                            </RowCenterAlignedView>
                        </TransparentButton>
                    )}
                </For>
            </div>
            <For each={props.tabs}>
                {(tabElement:ITabElement, index) => (
                    <Show when={activeTab() === tabElement.name}>
                        <div style={{"background-color": `${backgroundAlt2Color}`, width: '100%', height: "fit-content"}}>
                            {tabElement.children}
                        </div>
                    </Show>
                )}
            </For>
        </div>
    )
}

export default CollapseTabbedView;