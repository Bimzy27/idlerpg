import {Component} from "solid-js";
import {styled} from "solid-styled-components";
import {redColor, highlightColor, primaryColor} from "../../styles/colors";
import usePlayer, {PlayerData} from "../../contexts/PlayerContext";
import {getHitpoints} from "../../models/combat/CombatStats";
import {CoreButton} from "../../styles/styles";
import useCombat, {CombatData} from "../../contexts/CombatContext";
import enemyBuilder from "../../data/EnemyBuilder";

const HealthBarContainer = styled.div`
    width: 100%;
    height: 35px;
    background-color: ${highlightColor};
    border-radius: 10px;
    margin-bottom: 5px;
`;

const HealthBar = styled.div<{}>`
    height: 100%;
    background-color: ${redColor};
    border-radius: 10px;
`;

interface IHealthbarViewProps
{
}

export const PlayerHealthbarView: Component<IHealthbarViewProps> = (props) => {
    const player = usePlayer() as PlayerData;
    const playerStats = player.getPlayerStats();

    return (
        <HealthBarContainer>
            <HealthBar style={`width: ${(player.curHealth() / getHitpoints(playerStats)) * 100}%`}></HealthBar>
            <CoreButton onClick={()=>{player.gainHealth(1)}}>GainHP</CoreButton>
            <CoreButton onClick={()=>{player.loseHealth(1)}}>LoseHP</CoreButton>
        </HealthBarContainer>
    );
};

export const EnemyHealthbarView: Component<IHealthbarViewProps> = (props) => {
    const combat = useCombat() as CombatData;

    return (
        <HealthBarContainer>
            <HealthBar style={`width: ${(combat.curEnemyHealth() / getHitpoints(combat.enemy().combatStats)) * 100}%`}></HealthBar>
            <CoreButton onClick={()=>{
                if (combat.loseEnemyHealth(1).died)
                {
                    combat.setEnemy(enemyBuilder['goblin']);
                }
            }}>LoseHP</CoreButton>
        </HealthBarContainer>
    );
};