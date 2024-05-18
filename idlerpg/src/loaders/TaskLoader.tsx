import {JSX} from "solid-js";
import {useFirebaseApp} from "solid-firebase";
import {collection, getDocs, getFirestore} from "firebase/firestore";
import {ITask} from "../models/Task";
import {ICost, ItemCost} from "../models/Cost";
import {IItemAmount} from "../models/Item";
import {IReward, ItemReward, SkillReward} from "../models/Reward";
import {ISkillValue} from "../models/Skill";
import {getRequirements} from "../models/Requirement";

type TaskDic = Record<string, ITask>;

interface ITaskLoaderProps {
    children?: JSX.Element;
    incrementLoadable:()=>void;
}

export let taskData: TaskDic = {
};

export function TaskLoader(props:ITaskLoaderProps) {

    const app = useFirebaseApp();
    const db = getFirestore(app);

    async function loadTaskData()
    {
        const querySnapshot = await getDocs(collection(db, "tasks"));
        querySnapshot.forEach((doc) =>
        {


            let rewards:IReward[] = [];
            const rewardsPacked: Object[] = doc.data().rewards;
            for (const reward of rewardsPacked) {
                if ('itemAmount' in reward)
                {
                    rewards.push(new ItemReward(reward.itemAmount as IItemAmount));
                }
                else if ('skillValue' in reward)
                {
                    rewards.push(new SkillReward(reward.skillValue as ISkillValue));
                }
            }

            let costs:ICost[] = [];
            const costsPacked: { itemAmount:IItemAmount }[] = doc.data().costs;
            for (const cost of costsPacked) {
                costs.push(new ItemCost(cost.itemAmount));
            }

            const task:ITask =
                {
                    name: doc.data().name,
                    intervalSeconds: doc.data().intervalSeconds,
                    requirements: getRequirements(doc.data().requirements),
                    rewards: rewards,
                    costs: costs,
                };
            taskData = {...taskData, [doc.id]: task}
        });
    }

    loadTaskData().then(r => {
        console.log('Tasks Loaded');
        props.incrementLoadable();
    });

    return (
        <div>
            {props.children}
        </div>
    );
}

export const getTaskId = (task:ITask) => {
    for (const id in taskData) {
        if (taskData[id] === task) {
            return id;
        }
    }
    throw new Error('Task not found');
};