import {Component} from "solid-js";
import EnemyView from "./EnemyView";
import useCombat, {CombatData} from "../../contexts/CombatContext";
import enemyBuilder from "../../data/EnemyBuilder";
import {CoreButton, CoreText} from "../../styles/styles";
import HealthbarView from "./HealthbarView";
import EquipmentView from "../EquipmentView";
import {styled} from "solid-styled-components";
import {backgroundAlt1Color, primaryTrimColor, transparentColor} from "../../styles/colors";

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

    return (
        <StyledCombatView>
            <StyledCombatChildView>
                <CoreText>Player</CoreText>
                <HealthbarView/>
                <EquipmentView/>
            </StyledCombatChildView>
            <StyledCombatChildView>
                <CoreText>Enemy</CoreText>
                <CoreButton onClick={() => {
                    combat.setEnemy(enemyBuilder['goblin'])
                }}>Fight Goblin!</CoreButton>
                <EnemyView/>
            </StyledCombatChildView>
        </StyledCombatView>
    );
};

export default CombatView;