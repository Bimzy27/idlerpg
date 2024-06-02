import {Component, createSignal, For, JSX} from "solid-js";
import {
    ColumnCenterAlignedView, ContentFitAltView,
    CoreText_Mid, RowCenterAlignedView,
    TransparentButton
} from "../../styles/styles";
import {ITask} from "../../models/Task";
import useActiveTask, {ActiveTaskData} from "../../contexts/ActiveTaskContext";
import RewardView from "../RewardView";
import RequirementView from "../RequirementView";
import useSkills, {SkillsData} from "../../contexts/SkillsContext";
import {backgroundAlt1Color, primaryTrimColor, redColor, textPrimaryColor} from "../../styles/colors";
import useInventory, {InventoryData} from "../../contexts/InventoryContext";
import {styled} from "solid-styled-components";
import {taskData} from "../../loaders/TaskLoader";
import {meetsRequirements} from "../../models/Requirement";

const StyledTaskView = styled.div`
    width: 100%;
    height: fit-content;
    background-color: ${backgroundAlt1Color};
    border-radius: 5px;
    border: 3px solid ${primaryTrimColor};
    align-items: center;
`;

export const TaskText = styled.p<{color:string}>`
    color: ${props => props.color};
    font-size: clamp(1rem, 1.5rem, 2rem);
    white-space: nowrap;
`;

interface ITaskViewProps
{
    taskId:string
}

const TaskView: Component<ITaskViewProps> = (props) => {
    const activeTask = useActiveTask() as ActiveTaskData;
    const task:ITask = taskData[props.taskId];
    const skills = useSkills() as SkillsData;
    const inventory = useInventory() as InventoryData;

    return (
        <StyledTaskView>
            <TransparentButton onClick={()=>{activeTask?.setTask(task)}} style={{display:"flex", "flex-direction": "row", "align-items": "center"}}>
                <ColumnCenterAlignedView>
                    <TaskText color={meetsRequirements(task.requirements, skills, inventory) ? textPrimaryColor : redColor}>{task.name}</TaskText>
                    <RowCenterAlignedView>
                        <CoreText_Mid>Interval: {task.intervalSeconds} seconds</CoreText_Mid>
                        <ContentFitAltView>
                            <ColumnCenterAlignedView>
                                <CoreText_Mid>Requirements:</CoreText_Mid>
                                <div style={{display:"flex", "align-items": "center", "flex-direction": "row", "grid-gap": '20px' }}>
                                    <For each={task.requirements}>
                                        {(requirement, index) => (<RequirementView requirement={requirement}/>)}
                                    </For>
                                </div>
                            </ColumnCenterAlignedView>
                        </ContentFitAltView>
                        <ContentFitAltView>
                            <ColumnCenterAlignedView>
                                <CoreText_Mid>Rewards:</CoreText_Mid>
                                <div style={{display:"flex", "align-items": "center", "flex-direction": "row", "grid-gap": '20px' }}>
                                    <For each={task.rewards}>
                                        {(reward, index) => (<RewardView reward={reward}/>)}
                                    </For>
                                </div>
                            </ColumnCenterAlignedView>
                        </ContentFitAltView>
                    </RowCenterAlignedView>
                </ColumnCenterAlignedView>
            </TransparentButton>
        </StyledTaskView>
    );
};

type TaskImageProps = {
    taskId: string;
    width?: number;
    height?: number;
};

export const TaskImage: (props: TaskImageProps) => JSX.Element = ({
                                                           taskId,
                                                           width = 80,
                                                           height = 80,
                                                       }) =>
{
    const [isError, setIsError] = createSignal(false);
    const handleError = () => {
        setIsError(true);
    };
    const skillId = taskId.substring(0, taskId.indexOf('_'));
    return (
        <img
            src={isError() ? `/assets/skills/${skillId}.png` : `/assets/tasks/${taskId}.png`}
            alt={'NO IMG'}
            width={width}
            height={height}
            onError={handleError}
        />
    );
};

export default TaskView;