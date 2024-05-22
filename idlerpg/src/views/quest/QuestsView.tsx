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
import {IQuest, IQuestStep, ItemQuestStep, EnemyQuestStep, questProgressOffset} from "../../models/Quest";
import ItemView from "../ItemView";
import {IItemAmount} from "../../models/Item";
import {itemData} from "../../loaders/ItemLoader";
import useInventory, {InventoryData} from "../../contexts/InventoryContext";
import EnemyIconView from "../combat/EnemyIconView";
import useMap, {MapData} from "../../contexts/MapContext";
import locationBuilder from "../../data/LocationBuilder";
import useSkills, {SkillsData} from "../../contexts/SkillsContext";

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
                            (props.quest.steps[quests.getQuestProgress(props.questId) - questProgressOffset] as EnemyQuestStep).enemyAmount}>
                    <EnemyQuestView questId={props.questId} quest={props.quest}/>
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
    const map = useMap() as MapData;

    function tryProgressStep()
    {
        if (map.location() === props.quest.startLocation)
        {
            quests.incrementQuestProgress(props.questId)
        }
    }

    return (
        <ColumnCenterAlignedView>
            <Show when={map.location() !== props.quest.startLocation}>
                <CoreText>You need to be in {locationBuilder[props.quest.startLocation].name}!</CoreText>
            </Show>
            <CoreButton onClick={tryProgressStep}>Start Quest</CoreButton>
        </ColumnCenterAlignedView>
    );
};

const CompleteQuestView: Component<IQuestViewProps> = (props) => {
    const quests = useQuests() as QuestData;
    const map = useMap() as MapData;
    const inventory = useInventory() as InventoryData;
    const skills = useSkills() as SkillsData;

    function tryProgressStep()
    {
        if (map.location() === props.quest.startLocation)
        {
            quests.tryCompleteQuestProgress(props.questId, inventory, skills)
        }
    }

    return (
        <ColumnCenterAlignedView>
            <Show when={map.location() !== props.quest.startLocation}>
                <CoreText>You need to be in {locationBuilder[props.quest.startLocation].name}!</CoreText>
            </Show>
            <CoreButton onClick={tryProgressStep}>Complete Quest</CoreButton>
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

const EnemyQuestView: Component<IQuestViewProps> = (props) => {
    const quests = useQuests() as QuestData;

    function getEnemyAmount():IItemAmount
    {
        const questStep:IQuestStep = props.quest.steps[quests.getQuestProgress(props.questId) - questProgressOffset]
        if ((questStep as EnemyQuestStep).enemyAmount)
        {
            return (questStep as EnemyQuestStep).enemyAmount;
        }
        return {id: 'none', amount: 0};
    }

    function tryProgressStep()
    {
        if (quests.getQuestStepProgress(props.questId) >= getEnemyAmount().amount)
        {
            quests.incrementQuestProgress(props.questId);
        }
    }

    return (
        <ColumnCenterAlignedView>
            <CoreText>Monster Step</CoreText>

            <RowCenterAlignedView>
                <ColumnCenterAlignedView>
                    <CoreText>You've Killed:</CoreText>
                    <EnemyIconView amount={quests.getQuestStepProgress(props.questId)} id={getEnemyAmount().id}></EnemyIconView>
                </ColumnCenterAlignedView>

                <ColumnCenterAlignedView>
                    <CoreText>You Need To Kill:</CoreText>
                    <EnemyIconView amount={getEnemyAmount().amount} id={getEnemyAmount().id}></EnemyIconView>
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