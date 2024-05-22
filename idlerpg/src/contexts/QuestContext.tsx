import {Accessor, createContext, createSignal, JSX, useContext} from "solid-js";
import {createStore} from "solid-js/store";
import questBuilder from "../data/QuestBuilder";
import {IQuestProgress, questProgressOffset} from "../models/Quest";

export type QuestData = {
    questPoints:Accessor<number>,
    incrementQuestProgress:(questId:string)=>void,
    getQuestProgress:(questId:string)=>number,
};

export const QuestContext = createContext<QuestData>();

interface QuestProps {
    children?: JSX.Element; // Children elements
}

export function QuestProvider(props:QuestProps) {
    const [questPoints, setQuestPoints] = createSignal(0);
    const [questsProgress, setQuestsProgress] = createStore<IQuestProgress[]>([]);

    const questIds = Object.keys(questBuilder);
    for (const questId in questIds)
    {
        setQuestsProgress([...questsProgress, { id: questIds[questId], progress: 0, stepProgress: 0 }])
    }

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

export default function useQuests() { return useContext(QuestContext) }