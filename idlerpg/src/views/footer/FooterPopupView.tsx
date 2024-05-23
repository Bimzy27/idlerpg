import {styled} from "solid-styled-components";
import {backgroundAlt1Color, backgroundAlt2Color, primaryTrimAltColor, secondaryColor} from "../../styles/colors";
import {Component, Show} from "solid-js";
import useActiveTask, {ActiveTaskData} from "../../contexts/ActiveTaskContext";
import {getTaskId} from "../../loaders/TaskLoader";
import ActiveTaskView from "./ActiveTaskView";
import useCombat, {CombatData} from "../../contexts/combat/CombatContext";
import {getEnemyId} from "../../loaders/EnemyLoader";
import ActiveCombatView from "./ActiveCombatView";
import useGameView, {GameViewData} from "../../contexts/GameViewContext";
import GameView from "../GameView";

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
    const gameView = useGameView() as GameViewData;

    function shouldShowTask():boolean
    {
        return getTaskId(task.task()) !== 'none';
    }

    function shouldShowCombat():boolean
    {
        return getEnemyId(combat.enemy()) !== 'none' && gameView.activeView() !== 'combat';
    }

    return (
        <Show when={shouldShowTask() || shouldShowCombat()}>
            <StyledFooterPopupView>
                <Show when={shouldShowTask()}>
                    <ActiveTaskView/>
                </Show>
                <Show when={shouldShowCombat()}>
                    <ActiveCombatView/>
                </Show>
            </StyledFooterPopupView>
        </Show>
    );
};

export default FooterPopupView;