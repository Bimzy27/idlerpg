import {Component, createEffect, createSignal, onMount} from "solid-js";
import {CoreText, StyledActiveTaskView, TaskProgressBar, TaskProgressBarContainer} from "../styles/styles";
import useActiveTask from "../contexts/ActiveTaskContext";
import useInventory from "../contexts/InventoryContext";
import {IReward, ItemReward} from "../models/Reward";

interface IActiveTaskViewProps
{
}

const ActiveTaskView: Component<IActiveTaskViewProps> = (props) => {
    const [progress, setProgress] = createSignal<number>(0);
    const [duration, setDuration] = createSignal<number>(0);
    const task= useActiveTask();
    const inventory= useInventory();

    function getDuration():number {
        if (task) {
            return task?.task().durationSeconds;
        }
        return 0;
    }

    createEffect(() => {
        function beginInterval()
        {
            const duration = getDuration();
            setDuration(duration);
            if (duration !== 0)
            {
                setProgress(100);
            }

            const intervalId = setInterval(() => {
                setDuration(0);
                if (duration !== 0)
                {
                    setProgress(0);
                }
                clearInterval(intervalId);

                //give rewards
                const rewards:IReward[] = task?.task().rewards as IReward[];
                for (let i = 0; i < rewards.length; i++) {
                    const rewardAmount = (rewards[i] as ItemReward).itemAmount;
                    inventory?.addItem(rewardAmount);
                }

                const offsetIntervalId = setInterval(() => {
                    clearInterval(offsetIntervalId);
                    beginInterval()
                }, 5);
            }, duration * 1000);
        }

        onMount(() => {
            beginInterval();
        });

        return () => {
        };
    });

    return (
        <StyledActiveTaskView>
            <CoreText>{task?.task().name}</CoreText>
            <TaskProgressBarContainer>
                <TaskProgressBar transitionDuration={duration()} style={`width: ${progress()}%`}></TaskProgressBar>
            </TaskProgressBarContainer>
        </StyledActiveTaskView>
    );
};

export default ActiveTaskView;