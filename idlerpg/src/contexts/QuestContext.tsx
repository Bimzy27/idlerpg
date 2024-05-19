import {createContext, JSX, useContext} from "solid-js";
import {createStore} from "solid-js/store";
import questBuilder from "../data/QuestBuilder";
import {IQuestProgress} from "../models/Quest";

export type QuestData = {
    incrementQuestProgress:(questId:string)=>void,
    getQuestProgress:(questId:string)=>number,
};

export const QuestContext = createContext<QuestData>();

interface QuestProps {
    children?: JSX.Element; // Children elements
}

export function QuestProvider(props:QuestProps) {
const [questsProgress, setQuestsProgress] = createStore<IQuestProgress[]>([]);

    const questIds = Object.keys(questBuilder);
    for (const questId in questIds)
    {
        setQuestsProgress([...questsProgress, { id: questIds[questId], progress: 0 }])
    }

    const quests:QuestData = {
        incrementQuestProgress:(questId:string)=>
        {
            const quest  = questBuilder[questId];
            const curProgress = quests.getQuestProgress(questId);

            if (curProgress === 1)
            {
                return;
            }

            const progress:number = curProgress <= 0 ? 2 : curProgress === 1 + quest.steps.length ? 1 : curProgress + 1;
            setQuestsProgress(qp => questId === qp.id, 'progress', progress);
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
    };

    return (
        <QuestContext.Provider value={quests}>
            {props.children}
        </QuestContext.Provider>
    );
}

export function getQuestPoints():number
{
    //TODO implement
    return 0;
}

export default function useQuests() { return useContext(QuestContext) }