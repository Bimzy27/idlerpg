import {Component, createEffect} from "solid-js";
import EnemyView from "./EnemyView";
import useCombat, {CombatData} from "../../contexts/CombatContext";
import enemyBuilder from "../../data/EnemyBuilder";
import {CoreButton, CoreText} from "../../styles/styles";
import {PlayerHealthbarView} from "./HealthbarView";
import EquipmentView from "../EquipmentView";
import {styled} from "solid-styled-components";
import {backgroundAlt1Color, primaryTrimColor, transparentColor} from "../../styles/colors";
import usePlayer, {PlayerData} from "../../contexts/PlayerContext";
import {getHitChance, getMaxHit} from "../../models/combat/CombatStats";
import MathUtil from "../../common/MathUtil";
import useSkills, {SkillsData} from "../../contexts/SkillsContext";

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
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    grid-gap: 10px;
`;

const CombatView: Component<ICombatViewProps> = (props) => {
    const combat = useCombat() as CombatData;
    const player = usePlayer() as PlayerData;
    const skills = useSkills() as SkillsData;

    const playerAttackSpeed = 1;
    const enemyAttackSpeed = 1.5;

    const playerTimeoutIds:NodeJS.Timeout[] = [];

    createEffect(() => {
        const activeEnemy = combat.enemy();

        function startPlayerAttack()
        {
            // Cleanup function
            for (const id of playerTimeoutIds) {
                clearInterval(id);
            }
            playerTimeoutIds.length = 0;

            const timeoutId1 = setTimeout(()=>
            {
                const timeoutId2 = setTimeout(()=>
                {
                    const playerStats = player.getPlayerStats();

                    //Attack Enemy

                    const hitChance = getHitChance(playerStats, activeEnemy.combatStats);
                    console.log('RndHitChance: hc ' + hitChance + ' - min ' + 0 + ' - max ' + 1);
                    if (hitChance <= MathUtil.getRandomNumber(0, 1))
                    {
                        const maxHit = getMaxHit(playerStats);
                        console.log('RndMaxHit: ' + 1 + ' - maxHit ' + maxHit);
                        const damage = MathUtil.getRandomNumber(1, maxHit);
                        const enemyDamage = combat.loseEnemyHealth(damage);

                        skills.addExp({id: 'strength', exp: enemyDamage.damage * 4}); //TODO add attack styles to allow training other skills.

                        if (enemyDamage.died) //TODO calculate damage
                        {
                            combat.setEnemy(enemyBuilder['goblin']);
                        }

                        //TODO add droptable
                    }

                    const timeoutId3 = setTimeout(()=>
                    {
                        startPlayerAttack();
                    }, 10);
                    playerTimeoutIds.push(timeoutId3)
                }, playerAttackSpeed * 1000)
                playerTimeoutIds.push(timeoutId2);
            }, 10);
            playerTimeoutIds.push(timeoutId1);
        }

        startPlayerAttack();

        return () => {
        };
    });

    return (
        <StyledCombatView>
            <StyledCombatChildView>
                <CoreText>Player</CoreText>
                <PlayerHealthbarView/>
                <EquipmentView/>
            </StyledCombatChildView>
            <StyledCombatChildView>
                <CoreText>Enemy</CoreText>
                <CoreButton onClick={() => {
                    combat.setEnemy(enemyBuilder['goblin']);
                }}>Fight Goblin!</CoreButton>
                <EnemyView/>
            </StyledCombatChildView>
        </StyledCombatView>
    );
};

export default CombatView;