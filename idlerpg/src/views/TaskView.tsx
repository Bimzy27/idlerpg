import {Component, createSignal, For, JSX, Show} from "solid-js";
import {
    ColumnCenterAlignedView, CoreImage,
    CoreText,
    CoreText_Mid,
    TransparentButton
} from "../styles/styles";
import {ITask, taskMeetsRequirements} from "../models/Task";
import taskBuilder, {getTaskId} from "../data/tasks/TaskBuilder";
import useActiveTask, {ActiveTaskData} from "../contexts/ActiveTaskContext";
import RewardView from "./RewardView";
import RequirementView from "./RequirementView";
import useSkills, {SkillsData} from "../contexts/SkillsContext";
import {backgroundAlt1Color, primaryTrimColor, redColor, textPrimaryColor} from "../styles/colors";
import useInventory, {InventoryData} from "../contexts/InventoryContext";
import {styled} from "solid-styled-components";

const StyledTaskView = styled.div`
    width: 32%;
    background-color: ${backgroundAlt1Color};
    border-radius: 5px;
    border: 3px solid ${primaryTrimColor};
    align-items: center;
    flex: 1 1 auto;
    align-self: stretch;
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
    const task:ITask = taskBuilder[props.taskId];
    const skills = useSkills();
    const inventory = useInventory();

    const skillId = props.taskId.substring(0, props.taskId.indexOf('_'));

    return (
        <StyledTaskView>
            <TransparentButton onClick={()=>{activeTask?.setTask(task)}} style={{display:"flex", "flex-direction": "row", "align-items": "center"}}>
                <ColumnCenterAlignedView>
                    <TaskText color={taskMeetsRequirements(task, skills as SkillsData, inventory as InventoryData) ? textPrimaryColor : redColor}>{task.name}</TaskText>
                    <TaskImage taskId={props.taskId} skillId={skillId} width={80} height={80}/>
                    <CoreText_Mid>Interval: {task.intervalSeconds} seconds</CoreText_Mid>
                </ColumnCenterAlignedView>
                <ColumnCenterAlignedView>
                    <CoreText_Mid>Requirements:</CoreText_Mid>
                    <div style={{display:"flex", "align-items": "center", "flex-direction": "row", "grid-gap": '20px' }}>
                        <For each={task.requirements}>
                            {(requirement, index) => (<RequirementView requirement={requirement}/>)}
                        </For>
                    </div>
                    <CoreText_Mid>Rewards:</CoreText_Mid>
                    <div style={{display:"flex", "align-items": "center", "flex-direction": "row", "grid-gap": '20px' }}>
                        <For each={task.rewards}>
                            {(reward, index) => (<RewardView reward={reward}/>)}
                        </For>
                    </div>
                </ColumnCenterAlignedView>
            </TransparentButton>
        </StyledTaskView>
    );
};

type TaskImageProps = {
    taskId: string;
    skillId: string;
    width?: number;
    height?: number;
};

export const TaskImage: (props: TaskImageProps) => JSX.Element = ({
                                                           taskId,
                                                           skillId,
                                                           width = 80,
                                                           height = 80,
                                                       }) => {
    const [isError, setIsError] = createSignal(false);

    const handleError = () => {
        setIsError(true);
    };

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