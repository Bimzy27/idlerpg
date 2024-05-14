import {styled} from "solid-styled-components";
import {backgroundAlt1Color, backgroundAlt2Color, primaryTrimAltColor, secondaryColor} from "../../styles/colors";
import {Component, Show} from "solid-js";
import useActiveTask, {ActiveTaskData} from "../../contexts/ActiveTaskContext";
import {getTaskId} from "../../loaders/TaskLoader";
import ActiveTaskView from "./ActiveTaskView";
import useCombat, {CombatData} from "../../contexts/CombatContext";
import {getEnemyId} from "../../loaders/EnemyLoader";
import ActiveCombatView from "./ActiveCombatView";

const StyledFooterPopupView = styled.div`
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 50vw;
    height: fit-content;
    background-color: ${backgroundAlt1Color};
    z-index: 200;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px;
    border: 3px solid ${primaryTrimAltColor};
    border-radius: 10px;
`;

interface IFooterPopupViewProps
{
}

const FooterPopupView: Component<IFooterPopupViewProps> = (props) => {
    const task = useActiveTask() as ActiveTaskData;
    const combat = useCombat() as CombatData;

    return (
        <Show when={getTaskId(task.task()) !== 'none' || getEnemyId(combat.enemy()) !== 'none'}>
            <StyledFooterPopupView>
                <Show when={getTaskId(task.task()) !== 'none'}>
                    <ActiveTaskView/>
                </Show>
                <Show when={getEnemyId(combat.enemy()) !== 'none'}>
                    <ActiveCombatView/>
                </Show>
            </StyledFooterPopupView>
        </Show>
    );
};

export default FooterPopupView;