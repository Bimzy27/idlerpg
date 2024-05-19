import {Component, For, Show} from "solid-js";
import {ColumnCenterAlignedView, ContentFitAltView, ContentFitView, CoreButton, CoreText} from "../../styles/styles";
import questBuilder, {getMaxQuestPoints} from "../../data/QuestBuilder";
import useQuests, {QuestData} from "../../contexts/QuestContext";
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
                <CoreText>QP: {quests.questPoints()}/{getMaxQuestPoints()}</CoreText>
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
                <Show when={quests.getQuestProgress(props.questId) === 0}>
                    <StartQuestView questId={props.questId} quest={props.quest}/>
                </Show>
            </ColumnCenterAlignedView>
        </ContentFitAltView>
    );
};

const StartQuestView: Component<IQuestViewProps> = (props) => {
    const quests = useQuests() as QuestData;

    return (
        <ColumnCenterAlignedView>
            <CoreButton onClick={()=>quests.incrementQuestProgress(props.questId)}>Start Quest</CoreButton>
        </ColumnCenterAlignedView>
    );
};

const CompleteQuestView: Component<IQuestViewProps> = (props) => {
    const quests = useQuests() as QuestData;

    return (
        <ColumnCenterAlignedView>
            <CoreButton onClick={()=>quests.incrementQuestProgress(props.questId)}>Complete Quest</CoreButton>
        </ColumnCenterAlignedView>
    );
};

export default QuestsView;