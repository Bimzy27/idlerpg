import {styled} from "solid-styled-components";
import {backgroundAlt1Color, primaryTrimColor} from "../../styles/colors";
import {Component, For, Show} from "solid-js";
import useCombat, {CombatData} from "../../contexts/CombatContext";
import {ColumnCenterAlignedView, ContentFitAltView, ContentFitView, CoreButton, CoreText} from "../../styles/styles";
import ItemView from "../ItemView";
import usePlayer, {PlayerData} from "../../contexts/PlayerContext";
import {getCombatLevel, getHitChance, getMaxHit, ICombatStats} from "../../models/combat/CombatStats";
import {getEnemyId} from "../../data/EnemyBuilder";


const LootContainer = styled.div`
    width: 80%;
    height: fit-content;
    background-color: ${backgroundAlt1Color};
    border-radius: 5px;
    border: 3px solid ${primaryTrimColor};
    box-sizing: border-box;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    grid-gap: 10px;
`;

interface ICombatStatsViewProps
{
    baseStats?:ICombatStats
    stats:ICombatStats
    opponentStats:ICombatStats
}

const CombatStatsView: Component<ICombatStatsViewProps> = (props) => {
    const combat = useCombat() as CombatData;

    return (
        <ContentFitAltView>
            <CoreText>Combat Level: {getCombatLevel(props.baseStats ? props.baseStats : props.stats)}</CoreText>
            <Show when={getEnemyId(combat.enemy()) !== 'none'}>
                <CoreText>Hit Chance: {getHitChance(props.stats, props.opponentStats).toFixed(2)}</CoreText>
            </Show>
            <CoreText>Max Hit: {getMaxHit(props.stats)}</CoreText>
            <CoreText>Attack: {props.stats.attack}</CoreText>
            <CoreText>Strength: {props.stats.strength}</CoreText>
            <CoreText>Defense: {props.stats.defense}</CoreText>
            <CoreText>Hitpoints: {props.stats.hitpoints}</CoreText>
            <CoreText>Ranged: {props.stats.ranged}</CoreText>
            <CoreText>Magic: {props.stats.magic}</CoreText>
            <CoreText>Prayer: {props.stats.prayer}</CoreText>
        </ContentFitAltView>
    );
};

interface IPlayerStatsViewProps
{
}

export const PlayerStatsView: Component<IPlayerStatsViewProps> = (props) => {
    const player = usePlayer() as PlayerData;
    const combat = useCombat() as CombatData;

    return (
        <ColumnCenterAlignedView>
            <CoreText>Stats</CoreText>
            <CombatStatsView stats={player.getPlayerStats()} opponentStats={combat.enemy().combatStats}/>
        </ColumnCenterAlignedView>
    );
};

interface IEnemyStatsViewProps
{
}

export const EnemyStatsView: Component<IEnemyStatsViewProps> = (props) => {
    const combat = useCombat() as CombatData;
    const player = usePlayer() as PlayerData;

    return (
        <ColumnCenterAlignedView>
            <CoreText>Stats</CoreText>
            <CombatStatsView opponentStats={player.getPlayerStats()} stats={combat.enemy().combatStats}/>
        </ColumnCenterAlignedView>
    );
};