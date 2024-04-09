import {Component, For} from "solid-js";
import {
    ColumnCenterAlignedView, CoreImage,
    CoreText,
    CoreText_Mid,
    StyledTaskView,
    TransparentButton
} from "../styles/styles";
import {ITask} from "../models/Task";
import taskBuilder from "../data/TaskBuilder";
import useActiveTask from "../contexts/ActiveTaskContext";
import RewardView from "./RewardView";

interface ITaskViewProps
{
    taskId:string
}

const TaskView: Component<ITaskViewProps> = (props) => {
    const activeTask = useActiveTask();
    const task:ITask = taskBuilder[props.taskId];
    return (
        <StyledTaskView>
            <TransparentButton onClick={()=>{activeTask?.setTask(task)}}>
                <ColumnCenterAlignedView>
                    <CoreText>{task.name}</CoreText>
                    <CoreImage src={`/assets/tasks/${props.taskId}.png`} alt="NO IMG" width={50} height={50}/>
                    <CoreText_Mid>Duration: {task.durationSeconds} seconds</CoreText_Mid>
                    <CoreText_Mid>Rewards:</CoreText_Mid>
                    <For each={task.rewards}>
                        {(reward, index) => (<RewardView reward={reward}/>)}
                    </For>
                </ColumnCenterAlignedView>
            </TransparentButton>
        </StyledTaskView>
    );
};

export default TaskView;