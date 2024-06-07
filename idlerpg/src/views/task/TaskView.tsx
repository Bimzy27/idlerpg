import {Component, createSignal, For, JSX, Show} from "solid-js";
import {
    ColumnCenterAlignedView, ContentFitAltView, CoreImage, CoreText,
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
import {meetsRequirements, meetsSkillRequirements, SkillRequirement} from "../../models/Requirement";
import IntervalView from "../IntervalView";
import {getLevel} from "../../models/Skill";

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

    const filteredRequirements = task.requirements.filter(
        (requirement) => !(requirement instanceof SkillRequirement)
    );

    const firstSkillRequirement:SkillRequirement = task.requirements.find(
        (requirement) => requirement instanceof SkillRequirement) as SkillRequirement;

    return (
        <StyledTaskView>
            <TransparentButton onClick={()=>{activeTask.setTask(task)}} style={{display:"flex", "flex-direction": "row", "align-items": "center"}}>
                <ColumnCenterAlignedView>
                    <Show when={meetsSkillRequirements(task.requirements, skills)}>
                        <TaskText color={textPrimaryColor}>{task.name}</TaskText>
                        <RowCenterAlignedView>
                            <IntervalView interval={task.intervalSeconds}/>
                            <ContentFitAltView>
                                <ColumnCenterAlignedView>
                                    <CoreText_Mid>Requirements:</CoreText_Mid>
                                    <div style={{display:"flex", "align-items": "center", "flex-direction": "row", "grid-gap": '20px' }}>
                                        <For each={filteredRequirements}>
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
                    </Show>
                    <Show when={!meetsSkillRequirements(task.requirements, skills)}>
                        <CoreText style={{display: "flex", "align-items": "center", "text-align": "center"}}>
                            Unlocked at
                            <CoreImage src={`/assets/skills/${firstSkillRequirement.skillValue.id}.png`} alt="NO IMG" width={40} height={40} style={{margin: '10px'}}/>
                             level {getLevel(firstSkillRequirement.skillValue)}
                        </CoreText>
                    </Show>
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