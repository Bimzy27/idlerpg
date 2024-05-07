import {Component} from "solid-js";
import {styled} from "solid-styled-components";
import {redColor, highlightColor} from "../../styles/colors";
import usePlayer, {PlayerData} from "../../contexts/PlayerContext";
import {getHitpoints} from "../../models/combat/CombatStats";
import {CoreButton, CoreImage, CoreText, RowCenterAlignedView} from "../../styles/styles";
import useCombat, {CombatData} from "../../contexts/CombatContext";

const HealthBarContainer = styled.div`
    width: 100%;
    height: 35px;
    background-color: ${highlightColor};
    border-radius: 10px;
    margin-bottom: 50px;
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
            <RowCenterAlignedView>
                <CoreImage width={26} height={26} src={`/assets/skills/hitpoints.png`} />
                <CoreText>{player.curHealth()}/{getHitpoints(playerStats)}</CoreText>
            </RowCenterAlignedView>
        </HealthBarContainer>
    );
};

export const EnemyHealthbarView: Component<IHealthbarViewProps> = (props) => {
    const combat = useCombat() as CombatData;

    return (
        <HealthBarContainer>
            <HealthBar style={`width: ${(combat.curEnemyHealth() / getHitpoints(combat.enemy().combatStats)) * 100}%`}></HealthBar>
            <RowCenterAlignedView>
                <CoreImage width={26} height={26} src={`/assets/skills/hitpoints.png`} />
                <CoreText>{combat.curEnemyHealth()}/{getHitpoints(combat.enemy().combatStats)}</CoreText>
            </RowCenterAlignedView>
        </HealthBarContainer>
    );
};