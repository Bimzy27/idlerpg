import {Component, createSignal} from "solid-js";
import EnemyView from "./EnemyView";
import useCombat, {CombatData} from "../../contexts/combat/CombatContext";
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
import {Collapse} from "solid-collapse";
import SkillView from "../skills/SkillView";
import LootView from "./LootView";
import AttackStyleView from "./AttackStyleView";
import {PlayerStatsView} from "./StatsView";
import FoodView from "./FoodView";
import {PlayerAttackBarView} from "./AttackBarView";

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

interface ICombatViewProps
{
}

const CombatView: Component<ICombatViewProps> = (props) => {
    const combat = useCombat() as CombatData;
    const [isExpanded, setIsExpanded] = createSignal(false);

    return (
        <StyledCombatView>
            <StyledCombatChildView>
                <CoreText>Player</CoreText>
                <RowCenterAlignedView style={{"align-items": "start"}}>
                    <ColumnCenterAlignedView>
                        <PlayerHealthbarView/>
                        <EquipmentView/>
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
                    </ColumnCenterAlignedView>
                    <ColumnCenterAlignedView>
                        <PlayerAttackBarView/>
                        <FoodView/>
                        <AttackStyleView/>
                        <PlayerStatsView/>
                    </ColumnCenterAlignedView>
                </RowCenterAlignedView>
            </StyledCombatChildView>
            <StyledCombatChildView>
                <CoreText>Enemy - {combat.enemy().name}</CoreText>
                <EnemyView/>
                <LootView/>
            </StyledCombatChildView>
        </StyledCombatView>
    );
};

export default CombatView;