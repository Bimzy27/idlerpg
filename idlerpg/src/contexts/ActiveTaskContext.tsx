import {Accessor, createContext, createSignal, JSX, useContext} from "solid-js";
import {ITask} from "../models/Task";
import taskBuilder from "../data/TaskBuilder";

type ActiveTaskData = {task:Accessor<ITask>, setTask:(task:ITask)=>void};

export const ActiveTaskContext = createContext<ActiveTaskData>();

interface ActiveTaskProps {
    children?: JSX.Element; // Children elements
}

export function ActiveTaskProvider(props:ActiveTaskProps) {
    const [activeTask, setActiveTask] = createSignal(taskBuilder['none']);
    const task:ActiveTaskData = {
        task: activeTask,
        setTask: (task:ITask)=>{
            setActiveTask(task);
        },
    };

    return (
        <ActiveTaskContext.Provider value={task}>
            {props.children}
        </ActiveTaskContext.Provider>
    );
}

export function useActiveTask() { return useContext(ActiveTaskContext) }