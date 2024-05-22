import {Component, For, Show} from "solid-js";
import {
    ColumnCenterAlignedView,
    ContentFitAltView,
    ContentFitView,
    CoreButton,
    CoreText,
    RowCenterAlignedView
} from "../../styles/styles";
import questBuilder, {getMaxQuestPoints} from "../../data/QuestBuilder";
import useQuests, {QuestData} from "../../contexts/QuestContext";
import {IQuest, IQuestStep, ItemQuestStep, MonsterQuestStep, questProgressOffset} from "../../models/Quest";
import ItemView from "../ItemView";
import {IItemAmount} from "../../models/Item";
import {itemData} from "../../loaders/ItemLoader";
import useInventory, {InventoryData} from "../../contexts/InventoryContext";

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
                <Show when={quests.getQuestProgress(props.questId) === 1}>
                    <CompleteQuestView questId={props.questId} quest={props.quest}/>
                </Show>
                <Show when={quests.getQuestProgress(props.questId) === 2}>
                    <CompletedQuestView questId={props.questId} quest={props.quest}/>
                </Show>
                <Show when={quests.getQuestProgress(props.questId) > questProgressOffset - 1 &&
                            (props.quest.steps[quests.getQuestProgress(props.questId) - questProgressOffset] as MonsterQuestStep).monsterId}>
                    <MonsterQuestView questId={props.questId} quest={props.quest}/>
                </Show>
                <Show when={quests.getQuestProgress(props.questId) > questProgressOffset - 1 &&
                    (props.quest.steps[quests.getQuestProgress(props.questId) - questProgressOffset] as ItemQuestStep).itemAmount}>
                    <ItemQuestView questId={props.questId} quest={props.quest}/>
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

const CompletedQuestView: Component<IQuestViewProps> = (props) => {
    return (
        <ColumnCenterAlignedView>
            <CoreText>Quest Completed!</CoreText>
        </ColumnCenterAlignedView>
    );
};

const MonsterQuestView: Component<IQuestViewProps> = (props) => {
    const quests = useQuests() as QuestData;

    function tryProgressStep()
    {
        if (inventory.hasItem(getItemAmount()))
        {
            inventory.removeItem(getItemAmount());
            quests.incrementQuestProgress(props.questId);
        }
    }

    return (
        <ColumnCenterAlignedView>
            <CoreText>Monster Step</CoreText>

            <RowCenterAlignedView>
                <ColumnCenterAlignedView>
                    <CoreText>You Have:</CoreText>
                    <ItemView forceDisplayAmount={true} amount={inventory.getItem(getItemAmount().id).amount} id={getItemAmount().id}></ItemView>
                </ColumnCenterAlignedView>

                <ColumnCenterAlignedView>
                    <CoreText>You Need:</CoreText>
                    <ItemView amount={getItemAmount().amount} id={getItemAmount().id}></ItemView>
                </ColumnCenterAlignedView>
            </RowCenterAlignedView>

            <CoreButton onClick={tryProgressStep}>Complete Step</CoreButton>
        </ColumnCenterAlignedView>
    );
};

const ItemQuestView: Component<IQuestViewProps> = (props) => {
    const quests = useQuests() as QuestData;
    const inventory = useInventory() as InventoryData;

    function getItemAmount():IItemAmount
    {
        const questStep:IQuestStep = props.quest.steps[quests.getQuestProgress(props.questId) - questProgressOffset]
        if ((questStep as ItemQuestStep).itemAmount)
        {
            return (questStep as ItemQuestStep).itemAmount;
        }
        return {id: 'none', amount: 0};
    }

    function tryProgressStep()
    {
        if (inventory.hasItem(getItemAmount()))
        {
            inventory.removeItem(getItemAmount());
            quests.incrementQuestProgress(props.questId);
        }
    }

    return (
        <ColumnCenterAlignedView>
            <CoreText>Item Step</CoreText>

            <RowCenterAlignedView>
                <ColumnCenterAlignedView>
                    <CoreText>You Have:</CoreText>
                    <ItemView forceDisplayAmount={true} amount={inventory.getItem(getItemAmount().id).amount} id={getItemAmount().id}></ItemView>
                </ColumnCenterAlignedView>

                <ColumnCenterAlignedView>
                    <CoreText>You Need:</CoreText>
                    <ItemView amount={getItemAmount().amount} id={getItemAmount().id}></ItemView>
                </ColumnCenterAlignedView>
            </RowCenterAlignedView>

            <CoreButton onClick={tryProgressStep}>Complete Step</CoreButton>
        </ColumnCenterAlignedView>
    );
};

export default QuestsView;