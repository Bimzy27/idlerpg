import {Component, createEffect, createSignal, Show} from "solid-js";
import {CoreImage, CoreText, StyledActiveTaskView} from "../styles/styles";
import useActiveTask, {ActiveTaskData} from "../contexts/ActiveTaskContext";
import useInventory, {InventoryData} from "../contexts/InventoryContext";
import {IReward, ItemReward, SkillReward} from "../models/Reward";
import useSkills, {SkillsData} from "../contexts/SkillsContext";
import {ITask, taskMeetsRequirements} from "../models/Task";
import {ICost, ItemCost} from "../models/Cost";
import {styled} from "solid-styled-components";
import {highlightColor, primaryColor} from "../styles/colors";
import {TaskImage} from "./TaskView";
import {getTaskId, taskData} from "../loaders/TaskLoader";

const TaskProgressBarContainer = styled.div`
    width: 90%;
    height: 35px;
    background-color: ${highlightColor};
    border-radius: 10px;
    margin-bottom: 5px;
`;

const TaskProgressBar = styled.div<{transitionDuration: number}>`
    height: 100%;
    background-color: ${primaryColor};
    transition: width ${props => props.transitionDuration}s linear;
    border-radius: 10px;
`;

interface IActiveTaskViewProps
{
}

const ActiveTaskView: Component<IActiveTaskViewProps> = (props) => {
    const [progress, setProgress] = createSignal<number>(0);
    const [duration, setDuration] = createSignal<number>(0);
    const inventory= useInventory() as InventoryData;
    const skills= useSkills() as SkillsData;
    const task = useActiveTask() as ActiveTaskData;

    const timeoutIds:NodeJS.Timeout[] = [];

    createEffect(() => {
        const activeTask:ITask = task.task() as ITask;

        function startTask()
        {
            // Cleanup function
            for (const id of timeoutIds) {
                clearInterval(id);
            }
            timeoutIds.length = 0;

            const timeoutId1 = setTimeout(()=>
            {
                setDuration(activeTask.intervalSeconds);
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
                        if (taskMeetsRequirements(activeTask, skills, inventory))
                        {
                            startTask();
                        }
                        else
                        {
                            task.setTask(taskData['none']);
                        }
                    }, 10);
                    timeoutIds.push(timeoutId3)
                }, activeTask.intervalSeconds * 1000)
                timeoutIds.push(timeoutId2);
            }, 10);
            timeoutIds.push(timeoutId1);
        }

        setDuration(0);
        setProgress(0);
        if (activeTask.intervalSeconds !== 0)
        {
            startTask();
        }

        return () => {
        };
    }, [task]);

    return (

        <Show when={getTaskId(task.task()) !== 'none'}>
            <StyledActiveTaskView>
                <div style={{'display': "flex", "flex-direction": 'row', "grid-gap": '15px'}}>
                    <Show when={task.task() && task.task().intervalSeconds !== 0}>
                        <TaskImage taskId={getTaskId(task.task())} width={50} height={50}/>
                    </Show>
                    <CoreText>{task.task().name}</CoreText>
                </div>
                <TaskProgressBarContainer>
                    <TaskProgressBar transitionDuration={duration()} style={`width: ${progress()}%`}></TaskProgressBar>
                </TaskProgressBarContainer>
            </StyledActiveTaskView>
        </Show>
    );
};

export default ActiveTaskView;