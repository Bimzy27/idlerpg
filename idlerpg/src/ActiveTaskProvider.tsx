import {createContext, createSignal, useContext} from "solid-js";
import {ITask} from "./models/Task";

const ActiveTaskContext = createContext();

export function ActiveTaskProvider(props) {
    const defaultTask:ITask = {
        id:'task_default',
        name:'Default Task',
        durationSeconds:2,
        rewards: []
    }
    /*const [activeTask, setActiveTask] = createSignal(defaultTask),
        task = [
            activeTask,
            {
                setTask(task:ITask)
                {
                    setActiveTask(task);
                }
            }
        ];*/

    const [count, setCount] = createSignal(props.count || 0),
        counter = [
            count,
            {
                increment() {
                    setCount(c => c + 1);
                },
                decrement() {
                    setCount(c => c - 1);
                }
            }
        ];

    return (
        <ActiveTaskProvider value={counter}>
            {props.children}
        </ActiveTaskProvider>
    );
}

export function useActiveTask() { return useContext(ActiveTaskContext); }