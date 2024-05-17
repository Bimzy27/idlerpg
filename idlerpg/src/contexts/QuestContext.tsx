import {Accessor, createContext, createSignal, JSX, useContext} from "solid-js";

export type QuestData = {
    questPoints:Accessor<number>,
    setQuestPoints:(questPoints:number)=>void,
};

export const QuestContext = createContext<QuestData>();

interface QuestProps {
    children?: JSX.Element; // Children elements
}

export function QuestProvider(props:QuestProps) {
    const [questPoints, setQuestPoints] = createSignal(0);

    const quests:QuestData = {
        questPoints:questPoints,
        setQuestPoints:(questPoints:number)=>
        {
            setQuestPoints(questPoints)
        },
    };

    return (
        <QuestContext.Provider value={quests}>
            {props.children}
        </QuestContext.Provider>
    );
}

export default function useQuests() { return useContext(QuestContext) }