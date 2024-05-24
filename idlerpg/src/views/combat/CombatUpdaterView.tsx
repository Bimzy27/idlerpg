import {Component, createEffect} from "solid-js";
import useCombat, {CombatData} from "../../contexts/combat/CombatContext";
import useActiveTask, {ActiveTaskData} from "../../contexts/ActiveTaskContext";
import usePlayer, {PlayerData} from "../../contexts/PlayerContext";
import useSkills, {SkillsData} from "../../contexts/SkillsContext";
import useEquipment, {EquipmentData} from "../../contexts/EquipmentContext";
import {enemyData, getEnemyId} from "../../loaders/EnemyLoader";
import {getTaskId} from "../../loaders/TaskLoader";
import {
    getAccuracyBonus,
    getAccuracyRating,
    getAttackType,
    getHitChance,
    getMaxHit, getMinHit
} from "../../models/combat/CombatStats";
import MathUtil from "../../common/MathUtil";
import {tryRewardDrops} from "../../models/combat/Droptable";

interface ICombatUpdaterViewProps
{
}

const CombatUpdaterView: Component<ICombatUpdaterViewProps> = (props) => {
    const combat = useCombat() as CombatData;
    const tasks = useActiveTask() as ActiveTaskData;
    const player = usePlayer() as PlayerData;
    const skills = useSkills() as SkillsData;
    const equipment = useEquipment() as EquipmentData;

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

                    const rng = MathUtil.getRandomNumber(0, 100);
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

                    const rng = MathUtil.getRandomNumber(0, 100);
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
        <div/>
    );
};

export default CombatUpdaterView;