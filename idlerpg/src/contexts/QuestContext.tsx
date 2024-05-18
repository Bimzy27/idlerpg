import {createContext, JSX, useContext} from "solid-js";
import {createStore} from "solid-js/store";
import questBuilder from "../data/QuestBuilder";
import {IQuestProgress} from "../models/Quest";

export type QuestData = {
    setQuestProgress:(questProgress:IQuestProgress)=>void,
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
        setQuestProgress:(questProgress:IQuestProgress)=>
        {
            setQuestsProgress(qp => questProgress.id === qp.id, 'progress', questProgress.progress);
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