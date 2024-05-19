import {styled} from "solid-styled-components";
import {highlightColor, primaryTrimColor} from "../../styles/colors";
import {Component} from "solid-js";
import {CoreText} from "../../styles/styles";
import useCombat, {CombatData} from "../../contexts/CombatContext";
import useEquipment, {EquipmentData} from "../../contexts/EquipmentContext";

const AttackBarContainer = styled.div`
    width: 100%;
    height: 35px;
    background-color: ${highlightColor};
    border-radius: 10px;
    margin-bottom: 50px;
`;

const AttackBar = styled.div<{transitionDuration: number}>`
    height: 100%;
    background-color: ${primaryTrimColor};
    border-radius: 10px;
    transition: width ${props => props.transitionDuration}s linear;
`;

interface IAttackBarViewProps
{
}

export const PlayerAttackBarView: Component<IAttackBarViewProps> = (props) => {
    const equipment = useEquipment() as EquipmentData;
    const weapon = equipment.getWeapon();
    const combat = useCombat() as CombatData;

    function getAttackSpeed():number
    {
        const as = combat.playerAttackDuration();
        console.log('player AS: ' + as)
        return as;
    }

    return (
        <AttackBarContainer>
            <AttackBar transitionDuration={getAttackSpeed()} style={`width: ${combat.playerAttackProgress()}%`}></AttackBar>
            <CoreText>Attack Speed: {weapon.attackSpeed}s</CoreText>
        </AttackBarContainer>
    );
};

export const EnemyAttackBarView: Component<IAttackBarViewProps> = (props) => {
    const combat = useCombat() as CombatData;

    return (
        <AttackBarContainer>
            <AttackBar transitionDuration={combat.enemyAttackDuration()} style={`width: ${combat.enemyAttackProgress()}%`}></AttackBar>
            <CoreText>Attack Speed: {combat.enemy().attackInterval}s</CoreText>
        </AttackBarContainer>
    );
};