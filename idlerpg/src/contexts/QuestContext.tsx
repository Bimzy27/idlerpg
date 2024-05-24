import {Accessor, createContext, createSignal, JSX, useContext} from "solid-js";
import {createStore} from "solid-js/store";
import questBuilder from "../data/QuestBuilder";
import {EnemyQuestStep, IQuestProgress, questProgressOffset} from "../models/Quest";
import {IObserver} from "../common/Observer";
import useCombat, {CombatData} from "./combat/CombatContext";
import {ItemReward, SkillReward} from "../models/Reward";
import useInventory, {InventoryData} from "./InventoryContext";
import useSkills, {SkillsData} from "./SkillsContext";

export type QuestData = {
    questPoints:Accessor<number>,
    questsProgress:IQuestProgress[],
    setQuestsProgress:(questsProgress:IQuestProgress[])=>void,
    incrementQuestProgress:(questId:string)=>void,
    tryCompleteQuestProgress:(questId:string, inventory:InventoryData, skills:SkillsData)=>void,
    getQuestProgress:(questId:string)=>number,
    incrementQuestStepProgress:(questId:string)=>void,
    getQuestStepProgress:(questId:string)=>number,
};

export const QuestContext = createContext<QuestData>();

export const defaultQuests:IQuestProgress[] = Object.keys(questBuilder).map(id => ({
    id,
    progress: 0,
    stepProgress: 0,
}));

interface QuestProps {
    children?: JSX.Element; // Children elements
}

class QuestObserver implements IObserver
{
    questData:QuestData;
    constructor(questData:QuestData)
    {
        this.questData = questData;
        const combat = useCombat() as CombatData;
        combat.enemyDeathSubject.registerObserver(this);
    }

    update(data: any): void
    {
        const enemyId = data as string;
        for (const questProgress of this.questData.questsProgress)
        {
            const enemyQuestStep = (questBuilder[questProgress.id].steps[questProgress.progress - questProgressOffset] as EnemyQuestStep);
            if (enemyQuestStep && enemyQuestStep.enemyAmount && enemyQuestStep.enemyAmount.id === enemyId)
            {
                this.questData.incrementQuestStepProgress(questProgress.id);
            }
        }
    }
}

export function QuestProvider(props:QuestProps) {
    const [questPoints, setQuestPoints] = createSignal(0);
    const [questsProgress, setQuestsProgress] = createStore<IQuestProgress[]>(defaultQuests);

    function getQuestPoints():number
    {
        let qp = 0;
        const questIds = Object.keys(questBuilder);
        for (const questId in questIds)
        {
            const progress = quests.getQuestProgress(questIds[questId]);
            if (progress === questProgressOffset - 1)
            {
                qp += questBuilder[questIds[questId]].questPoints;
            }
        }

        return qp;
    }

    const quests:QuestData = {
        questPoints:questPoints,
        questsProgress:questsProgress,
        setQuestsProgress:(questsProgress:IQuestProgress[])=>
        {
            setQuestsProgress(questsProgress);
        },
        incrementQuestProgress:(questId:string)=>
        {
            const quest  = questBuilder[questId];
            const curProgress = quests.getQuestProgress(questId);
            if (curProgress === questProgressOffset - 1)
            {
                return;
            }

            const progress:number = curProgress <= 0 ? questProgressOffset : curProgress === questProgressOffset - 1 + quest.steps.length ? 1 : curProgress + 1;
            setQuestsProgress(qp => questId === qp.id, 'progress', progress);
            setQuestsProgress(qp => questId === qp.id, 'stepProgress', 0);
            setQuestPoints(getQuestPoints());
        },
        tryCompleteQuestProgress:(questId:string, inventory:InventoryData, skills:SkillsData)=>
        {
            const quest  = questBuilder[questId];
            const curProgress = quests.getQuestProgress(questId);

            if (curProgress === questProgressOffset - 2)
            {
                // Reward quest
                for (const reward of quest.rewards)
                {
                    if (reward instanceof ItemReward)
                    {
                        reward.reward(inventory);
                    }
                    else if (reward instanceof SkillReward)
                    {
                        reward.reward(skills);
                    }
                }

                quests.incrementQuestProgress(questId);
            }
        },
        getQuestProgress:(questId:string)=>
        {
            for (let i = 0; i < questsProgress.length; i++)
            {
                if (questsProgress[i].id === questId)
                {
                    return questsProgress[i].progress;
                }
            }
            return -1;
        },
        incrementQuestStepProgress:(questId:string)=>
        {
            const curProgress = quests.getQuestStepProgress(questId);
            const progress:number = curProgress + 1;
            setQuestsProgress(qp => questId === qp.id, 'stepProgress', progress);
        },
        getQuestStepProgress:(questId:string)=>
        {
            for (let i = 0; i < questsProgress.length; i++)
            {
                if (questsProgress[i].id === questId)
                {
                    return questsProgress[i].stepProgress;
                }
            }
            return -1;
        },
    };

    new QuestObserver(quests);

    return (
        <QuestContext.Provider value={quests}>
            {props.children}
        </QuestContext.Provider>
    );
}

export default function useQuests() { return useContext(QuestContext) }