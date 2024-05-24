import {styled} from "solid-styled-components";
import {highlightColor, primaryColor} from "../../styles/colors";
import {Component, createSignal} from "solid-js";
import {ColumnCenterAlignedView, CoreText, RowCenterAlignedView} from "../../styles/styles";
import {EnemyHealthbarView, PlayerHealthbarView} from "../combat/HealthbarView";
import {EnemyAttackBarView, PlayerAttackBarView} from "../combat/AttackBarView";
import useCombat, {CombatData} from "../../contexts/combat/CombatContext";

interface IActiveCombatViewProps
{
}

const ActiveCombatView : Component<IActiveCombatViewProps> = (props) => {
    const combat = useCombat() as CombatData;

    return (
        <ColumnCenterAlignedView>
            <RowCenterAlignedView>
                <ColumnCenterAlignedView>
                    <CoreText>Player</CoreText>
                    <PlayerHealthbarView/>
                    <PlayerAttackBarView/>
                </ColumnCenterAlignedView>
                <ColumnCenterAlignedView>
                    <CoreText>Enemy - {combat.enemy().name}</CoreText>
                    <EnemyHealthbarView/>
                    <EnemyAttackBarView/>
                </ColumnCenterAlignedView>
            </RowCenterAlignedView>
        </ColumnCenterAlignedView>
    );
};

export default ActiveCombatView;