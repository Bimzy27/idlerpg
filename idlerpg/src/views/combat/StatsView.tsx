import {Component} from "solid-js";
import useCombat, {CombatData} from "../../contexts/CombatContext";
import {ColumnCenterAlignedView, ContentFitAltView, CoreText} from "../../styles/styles";
import usePlayer, {PlayerData} from "../../contexts/PlayerContext";
import {
    getAccuracyBonus,
    getAccuracyRating, getAttackType,
    getCombatLevel,
    getMaxHit,
    ICombatStats
} from "../../models/combat/CombatStats";
import useEquipment, {EquipmentData} from "../../contexts/EquipmentContext";
import {AttackType} from "../../models/combat/AttackStyle";

interface ICombatStatsViewProps
{
    attackType:AttackType
    stats:ICombatStats
    maxHit:number
    accuracyRating:number
    opponentStats:ICombatStats
}

const CombatStatsView: Component<ICombatStatsViewProps> = (props) => {

    return (
        <ContentFitAltView>
            <CoreText>Combat Level: {getCombatLevel(props.stats)}</CoreText>
            <CoreText>Hit Chance: {/*{getHitChance(props.stats, props.opponentStats).toFixed(2)}*/}</CoreText>
            <CoreText>Max Hit: {props.maxHit}</CoreText>
            <CoreText>Accuracy Rating: {props.accuracyRating}</CoreText>
        </ContentFitAltView>
    );
};

interface IPlayerStatsViewProps
{
}

export const PlayerStatsView: Component<IPlayerStatsViewProps> = (props) => {
    const player = usePlayer() as PlayerData;
    const combat = useCombat() as CombatData;
    const equipment = useEquipment() as EquipmentData;

    return (
        <ColumnCenterAlignedView>
            <CoreText>Stats</CoreText>
            <CombatStatsView
                attackType={getAttackType(combat.attackStyle().attackStyle)}
                stats={player.getPlayerStats()}
                maxHit={getMaxHit(getAttackType(combat.attackStyle().attackStyle), player.getPlayerStats(), equipment.getAttackStats())}
                accuracyRating={getAccuracyRating(getAttackType(combat.attackStyle().attackStyle), player.getPlayerStats(), getAccuracyBonus(combat.attackStyle().attackStyle, equipment.getAttackStats()))}
                opponentStats={combat.enemy().combatStats}
            />
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
            <CombatStatsView
                attackType={combat.enemy().attackType}
                stats={combat.enemy().combatStats}
                maxHit={combat.enemy().maxHit}
                accuracyRating={combat.enemy().accuracyRating}
                opponentStats={player.getPlayerStats()}
            />
        </ColumnCenterAlignedView>
    );
};