import {Component, createContext, createSignal, useContext} from "solid-js";
import {StyledTaskView, TaskProgressBar, TaskProgressBarContainer} from "./styles/styles";
import {ITask} from "./models/Task";
import {useActiveTask} from "./ActiveTaskProvider";

interface ITaskViewProps
{
}

const TaskView: Component<ITaskViewProps> = (props) => {
    const [progress, setProgress] = createSignal<number>(0);
    const [duration, setDuration] = createSignal<number>(0);
    const [isActive, setIsActive] = createSignal<boolean>(false);

    const startTask = (task:ITask) => {
        setIsActive(true);
        setDuration(task.durationSeconds);
        setProgress(100);
        const interval = setInterval(
            ()=>
            {
                setIsActive(false);
                setDuration(0);
                setProgress(0);
                clearInterval(interval)
            },
            task.durationSeconds * 1000);
    };


    /*const startWoodcutting = () => {
        setTask(
            {
                id:'task_woodcutting',
                name:'Woodcutting Task',
                durationSeconds:2,
                rewards: []
            }
        );
    };*/

    /*const [count, { increment, decrement }] = useActiveTask();*/

    return (
        <StyledTaskView>
            <p>Active Task</p>
            <button disabled={isActive()}>Start Woodcutting</button>
            <TaskProgressBarContainer>
                <TaskProgressBar transitionDuration={duration()} style={`width: ${progress()}%`}></TaskProgressBar>
            </TaskProgressBarContainer>
        </StyledTaskView>
    );
};

export default TaskView;