import {Component} from "solid-js";
import {CoreText} from "../styles/styles";
import {ITask} from "../models/Task";
import taskBuilder from "../data/TaskBuilder";
import {useActiveTask} from "../contexts/ActiveTaskContext";

interface ITaskViewProps
{
    taskId:string
}

const TaskView: Component<ITaskViewProps> = (props) => {
    const activeTask = useActiveTask();
    const task:ITask = taskBuilder[props.taskId];
    return (
        <div>
            <button onClick={()=>{activeTask?.setTask(task)}}>{task.name}</button>
            <CoreText>Duration: {task.durationSeconds}</CoreText>
        </div>
    );
};


export default TaskView;