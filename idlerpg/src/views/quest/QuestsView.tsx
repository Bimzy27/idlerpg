import {Component, For} from "solid-js";
import {ColumnCenterAlignedView, ContentFitAltView, ContentFitView, CoreButton, CoreText} from "../../styles/styles";
import questBuilder, {getMaxQuestPoints} from "../../data/QuestBuilder";
import useQuests, {getQuestPoints, QuestData} from "../../contexts/QuestContext";
import {IQuest} from "../../models/Quest";

interface IQuestsViewProps
{
}

const QuestsView: Component<IQuestsViewProps> = (props) => {
    const quests = useQuests() as QuestData;
    const questIds = Object.keys(questBuilder);

    return (
        <ColumnCenterAlignedView>
            <ContentFitAltView>
                <CoreText>Quests</CoreText>
                <CoreText>QP: {getQuestPoints()}/{getMaxQuestPoints()}</CoreText>
            </ContentFitAltView>
            <For each={questIds}>
                {(questId, index) => (
                    <QuestView questId={questId} quest={questBuilder[questId]}/>
                )}
            </For>
        </ColumnCenterAlignedView>
    );
};

interface IQuestViewProps
{
    questId:string
    quest:IQuest
}

const QuestView: Component<IQuestViewProps> = (props) => {
    const quests = useQuests() as QuestData;

    return (
        <ContentFitAltView style={{width: '70%'}}>
            <ColumnCenterAlignedView>
                <CoreText>{props.quest.name}</CoreText>
                <CoreText>QP: {props.quest.questPoints}</CoreText>
                <CoreText>Progress: {quests.getQuestProgress(props.questId)}</CoreText>
                <CoreButton onClick={()=>quests.incrementQuestProgress(props.questId)}>Start Quest</CoreButton>
            </ColumnCenterAlignedView>
        </ContentFitAltView>
    );
};

export default QuestsView;