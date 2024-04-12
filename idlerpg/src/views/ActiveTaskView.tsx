import {Component, createEffect, createSignal, Show} from "solid-js";
import {CoreImage, CoreText, StyledActiveTaskView, TaskProgressBar, TaskProgressBarContainer} from "../styles/styles";
import useActiveTask from "../contexts/ActiveTaskContext";
import useInventory, {InventoryData} from "../contexts/InventoryContext";
import {IReward, ItemReward, SkillReward} from "../models/Reward";
import taskBuilder, {getTaskId} from "../data/tasks/TaskBuilder";
import useSkills, {SkillsData} from "../contexts/SkillsContext";
import {ITask, taskMeetsRequirements} from "../models/Task";
import {ICost, ItemCost} from "../models/Cost";

interface IActiveTaskViewProps
{
}

const ActiveTaskView: Component<IActiveTaskViewProps> = (props) => {
    const [progress, setProgress] = createSignal<number>(0);
    const [duration, setDuration] = createSignal<number>(0);
    const inventory= useInventory();
    const skills= useSkills();
    const task = useActiveTask();

    const timeoutIds:NodeJS.Timeout[] = [];

    createEffect(() => {

        const activeTask:ITask = task?.task() as ITask;

        function startTask()
        {
            // Cleanup function
            for (const id of timeoutIds) {
                clearInterval(id);
            }
            timeoutIds.length = 0;

            const timeoutId1 = setTimeout(()=>
            {
                setDuration(activeTask.durationSeconds);
                setProgress(100);

                const timeoutId2 = setTimeout(()=>
                {
                    //give rewards
                    const rewards:IReward[] = task?.task().rewards as IReward[];
                    for (let i = 0; i < rewards.length; i++) {
                        if (rewards[i] instanceof ItemReward)
                        {
                            rewards[i].reward(inventory);
                        }
                        else if (rewards[i] instanceof SkillReward)
                        {
                            rewards[i].reward(skills);
                        }
                    }
                    //consume costs
                    const costs:ICost[] = task?.task().costs as ICost[];
                    for (let i = 0; i < costs.length; i++) {
                        if (costs[i] instanceof ItemCost)
                        {
                            costs[i].consume(inventory);
                        }
                    }

                    setDuration(0);
                    setProgress(0);
                    const timeoutId3 = setTimeout(()=>
                    {
                        if (taskMeetsRequirements(activeTask, skills as SkillsData, inventory as InventoryData))
                        {
                            startTask();
                        }
                        else
                        {
                            task?.setTask(taskBuilder['none']);
                        }
                    }, 10);
                    timeoutIds.push(timeoutId3)
                }, activeTask.durationSeconds * 1000)
                timeoutIds.push(timeoutId2);
            }, 10);
            timeoutIds.push(timeoutId1);
        }

        setDuration(0);
        setProgress(0);
        if (activeTask.durationSeconds !== 0)
        {
            startTask();
        }

        return () => {
        };
    }, [task]);

    return (
        <StyledActiveTaskView>
            <div style={{'display': "flex", "flex-direction": 'row', "grid-gap": '15px'}}>
                <Show when={task?.task() && task?.task().durationSeconds !== 0}>
                    <CoreImage src={`/assets/tasks/${getTaskId(task?.task())}.png`} alt="NO IMG" width={50} height={50}/>
                </Show>
                <CoreText>{task?.task().name}</CoreText>
            </div>
            <TaskProgressBarContainer>
                <TaskProgressBar transitionDuration={duration()} style={`width: ${progress()}%`}></TaskProgressBar>
            </TaskProgressBarContainer>
        </StyledActiveTaskView>
    );
};

export default ActiveTaskView;