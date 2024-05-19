import {Component, createEffect, createSignal} from "solid-js";
import EnemyView from "./EnemyView";
import useCombat, {CombatData} from "../../contexts/CombatContext";
import {
    ColumnCenterAlignedView,
    ContentFitAltView,
    CoreButton,
    CoreText,
    RowCenterAlignedView
} from "../../styles/styles";
import {PlayerHealthbarView} from "./HealthbarView";
import EquipmentView from "../EquipmentView";
import {styled} from "solid-styled-components";
import {backgroundAlt1Color, primaryTrimColor, transparentColor} from "../../styles/colors";
import usePlayer, {PlayerData} from "../../contexts/PlayerContext";
import {
    getAccuracyBonus,
    getAccuracyRating,
    getAttackType,
    getHitChance,
    getMaxHit, getMinHit
} from "../../models/combat/CombatStats";
import MathUtil from "../../common/MathUtil";
import useSkills, {SkillsData} from "../../contexts/SkillsContext";
import {Collapse} from "solid-collapse";
import SkillView from "../skills/SkillView";
import {tryRewardDrops} from "../../models/combat/Droptable";
import LootView from "./LootView";
import AttackStyleView from "./AttackStyleView";
import useActiveTask, {ActiveTaskData} from "../../contexts/ActiveTaskContext";
import {PlayerStatsView} from "./StatsView";
import FoodView from "./FoodView";
import useEquipment, {EquipmentData} from "../../contexts/EquipmentContext";
import {enemyData, getEnemyId} from "../../loaders/EnemyLoader";
import {getTaskId} from "../../loaders/TaskLoader";
import {getItemId} from "../../loaders/ItemLoader";
import {PlayerAttackBarView} from "./AttackBarView";

interface ICombatViewProps
{
}

const StyledCombatView = styled.div`
    width: 90%;
    height: fit-content;
    background-color: ${transparentColor};
    box-sizing: border-box;
    padding: 10px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    grid-gap: 10px;
`;

const StyledCombatChildView = styled.div`
    width: 70%;
    height: fit-content;
    background-color: ${backgroundAlt1Color};
    border-radius: 5px;
    border: 3px solid ${primaryTrimColor};
    box-sizing: border-box;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    grid-gap: 20px;
`;

const CombatView: Component<ICombatViewProps> = (props) => {
    const combat = useCombat() as CombatData;
    const tasks = useActiveTask() as ActiveTaskData;
    const player = usePlayer() as PlayerData;
    const skills = useSkills() as SkillsData;
    const equipment = useEquipment() as EquipmentData;
    const [isExpanded, setIsExpanded] = createSignal(false);

    let respawnTimeoutId:NodeJS.Timeout;
    const playerTimeoutIds:NodeJS.Timeout[] = [];
    const enemyTimeoutIds:NodeJS.Timeout[] = [];

    function startEnemyRespawn()
    {
        const prevEnemyId = getEnemyId(combat.enemy());
        combat.setEnemy(enemyData['none'], tasks);
        respawnTimeoutId = setTimeout(()=>
        {
            if (getTaskId(tasks.task()) === 'none')
            {
                combat.setEnemy(enemyData[prevEnemyId], tasks);
            }
        }, 1000)
    }

    createEffect(() => {

        clearInterval(respawnTimeoutId);
        function startPlayerAttack()
        {
            // Cleanup function
            for (const id of playerTimeoutIds) {
                clearInterval(id);
            }
            playerTimeoutIds.length = 0;

            if (getEnemyId(combat.enemy()) === 'none')
            {
                return;
            }

            const timeoutId1 = setTimeout(()=>
            {
                combat.setPlayerAttackDuration(equipment.getWeaponAttackSpeed());
                combat.setPlayerAttackProgress(100);

                const timeoutId2 = setTimeout(()=>
                {
                    const activeEnemy = combat.enemy();
                    const playerStats = player.getPlayerStats();

                    //Attack Enemy
                    const attackStyle = combat.attackStyle().attackStyle;
                    const attackType = getAttackType(attackStyle);
                    const accuracyBonus = getAccuracyBonus(attackStyle, equipment.getAttackStats());
                    const hitChance = getHitChance(attackType, getAccuracyRating(attackType, playerStats, accuracyBonus), activeEnemy.combatStats, activeEnemy.defenseStats);

                    console.log("Player Attempt Hit")
                    const rng = MathUtil.getRandomNumber(0, 100);
                    console.log('Player hit chance: ' + hitChance.toFixed(2) + ' rng: ' + rng.toFixed(2));
                    if (rng <= hitChance)
                    {
                        const maxHit = getMaxHit(attackType, playerStats, equipment.getAttackStats());
                        const damage = MathUtil.getRandomWholeNumber(getMinHit(), maxHit);

                        const enemyDamage = combat.loseEnemyHealth(damage);

                        for (const skillExp of combat.attackStyle().expPerHit)
                        {
                            skills.addExp({id: skillExp.id, exp: enemyDamage.damage * skillExp.exp});
                        }

                        if (enemyDamage.died)
                        {
                            if (activeEnemy.guaranteedDrops)
                            {
                                combat.addLoot(activeEnemy.guaranteedDrops);
                            }

                            if (activeEnemy.potentialDrops)
                            {
                                tryRewardDrops(combat, activeEnemy.potentialDrops);
                            }

                            startEnemyRespawn();
                        }
                    }

                    combat.setPlayerAttackDuration(0);
                    combat.setPlayerAttackProgress(0);

                    const timeoutId3 = setTimeout(()=>
                    {
                        startPlayerAttack();
                    }, 10);
                    playerTimeoutIds.push(timeoutId3)
                }, equipment.getWeaponAttackSpeed() * 1000)
                playerTimeoutIds.push(timeoutId2);
            }, 10);
            playerTimeoutIds.push(timeoutId1);
        }

        function startEnemyAttack()
        {
            // Cleanup function
            for (const id of enemyTimeoutIds) {
                clearInterval(id);
            }
            enemyTimeoutIds.length = 0;

            if (getEnemyId(combat.enemy()) === 'none')
            {
                return;
            }

            const timeoutId1 = setTimeout(()=>
            {
                combat.setEnemyAttackDuration(combat.enemy().attackInterval);
                combat.setEnemyAttackProgress(100);

                const timeoutId2 = setTimeout(()=>
                {
                    const activeEnemy = combat.enemy();

                    //Attack Player
                    const hitChance = getHitChance(activeEnemy.attackType, activeEnemy.accuracyRating, player.getPlayerStats(), equipment.getDefenseStats());

                    console.log("Enemy Attempt Hit")
                    const rng = MathUtil.getRandomNumber(0, 100);
                    console.log('Enemy hit chance: ' + hitChance.toFixed(2) + ' rng: ' + rng.toFixed(2));
                    if (rng <= hitChance)
                    {
                        const damage = MathUtil.getRandomWholeNumber(getMinHit(), activeEnemy.maxHit);
                        const playerDamage = player.loseHealth(damage);

                        if (playerDamage.died)
                        {
                            combat.setEnemy(enemyData['none'], tasks);
                        }
                    }

                    combat.setEnemyAttackDuration(0);
                    combat.setEnemyAttackProgress(0);

                    const timeoutId3 = setTimeout(()=>
                    {
                        startEnemyAttack();
                    }, 10);
                    enemyTimeoutIds.push(timeoutId3)
                }, combat.enemy().attackInterval * 1000)
                enemyTimeoutIds.push(timeoutId2);
            }, 10);
            enemyTimeoutIds.push(timeoutId1);
        }

        combat.setPlayerAttackDuration(0);
        combat.setPlayerAttackProgress(0);
        combat.setEnemyAttackDuration(0);
        combat.setEnemyAttackProgress(0);

        startPlayerAttack();
        startEnemyAttack();

        return () => {
        };
    }, [combat.enemy]);


    return (
        <StyledCombatView>
            <StyledCombatChildView>
                <CoreText>Player</CoreText>
                <RowCenterAlignedView>
                    <ColumnCenterAlignedView>
                        <PlayerHealthbarView/>
                        <EquipmentView/>
                    </ColumnCenterAlignedView>
                    <ColumnCenterAlignedView>
                        <PlayerAttackBarView/>
                        <FoodView/>
                        <AttackStyleView/>
                        <PlayerStatsView/>
                    </ColumnCenterAlignedView>
                </RowCenterAlignedView>

                <ContentFitAltView>
                    <ColumnCenterAlignedView>
                        <CoreButton onClick={() => setIsExpanded(!isExpanded())}>Skills</CoreButton>
                        <section>
                            <Collapse value={isExpanded()}>
                                <SkillView skillId={'attack'}/>
                                <SkillView skillId={'strength'}/>
                                <SkillView skillId={'defense'}/>
                                <SkillView skillId={'hitpoints'}/>
                                <SkillView skillId={'ranged'}/>
                                <SkillView skillId={'magic'}/>
                                <SkillView skillId={'prayer'}/>
                            </Collapse>
                        </section>
                    </ColumnCenterAlignedView>
                </ContentFitAltView>

            </StyledCombatChildView>
            <StyledCombatChildView>
                <CoreText>Enemy</CoreText>
                <EnemyView/>
                <LootView/>
            </StyledCombatChildView>
        </StyledCombatView>
    );
};

export default CombatView;