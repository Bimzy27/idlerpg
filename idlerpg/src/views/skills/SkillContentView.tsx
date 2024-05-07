import {Component, createSignal, For, JSX, Show} from "solid-js";
import SkillView from "./SkillView";
import TaskView from "../TaskView";
import {ColumnCenterAlignedView, CoreButton, RowCenterAlignedView} from "../../styles/styles";

interface ISkillNavigationTab
{
    title:string
    taskIds:string[];
}

interface ISkillContentViewProps {
    skillId: string;
    navigationTabs:ISkillNavigationTab[];
    children?: JSX.Element;
}

const SkillContentView: Component<ISkillContentViewProps> = (props) => {
    const [activeTab, setActiveTab] = createSignal('');

    return (
        <ColumnCenterAlignedView style={{"grid-gap": '50px'}}>
            <SkillView skillId={props.skillId}/>

            <div style={{width: '100%', height: "fit-content", display: "flex", "align-items": "flex-start", "flex-wrap": "wrap", "grid-gap": '20px'}}>

                <Show when={props.navigationTabs.length === 1}>
                    <For each={props.navigationTabs[0].taskIds}>
                        {(id, index) => (<TaskView taskId={id}/>)}
                    </For>
                </Show>

                {/*TODO implement tabs here with buttons*/}
                <Show when={props.navigationTabs.length > 1}>
                    <RowCenterAlignedView>
                        <For each={props.navigationTabs}>
                            {(skillNavTab:ISkillNavigationTab, index) => (<CoreButton onClick={()=>setActiveTab(skillNavTab.title)}>{skillNavTab.title}</CoreButton>)}
                        </For>
                    </RowCenterAlignedView>

                    <For each={props.navigationTabs}>
                        {(skillNavTab:ISkillNavigationTab, index) => (
                            <Show when={activeTab() === skillNavTab.title}>
                                <For each={props.navigationTabs[index()].taskIds}>
                                    {(id, index) => (<TaskView taskId={id}/>)}
                                </For>
                            </Show>
                        )}
                    </For>

                </Show>
            </div>

            {props.children}
        </ColumnCenterAlignedView>
    );
};

export default SkillContentView;