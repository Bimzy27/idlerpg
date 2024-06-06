import {Component} from "solid-js";
import {ColumnCenterAlignedView, CoreImage, RowCenterAlignedView} from "../../styles/styles";
import {EnemyHealthbarView, PlayerHealthbarView} from "../combat/HealthbarView";
import {EnemyAttackBarView, PlayerAttackBarView} from "../combat/AttackBarView";
import useCombat, {CombatData} from "../../contexts/combat/CombatContext";
import ReturnButton from "../common/ReturnButton";
import useGameView, {GameViewData} from "../../contexts/GameViewContext";
import {getEnemyId} from "../../loaders/EnemyLoader";

interface IActiveCombatViewProps
{
}

const ActiveCombatView : Component<IActiveCombatViewProps> = (props) => {
    const combat = useCombat() as CombatData;
    const gameView = useGameView() as GameViewData;

    return (
        <ColumnCenterAlignedView>
            <RowCenterAlignedView>
                <ColumnCenterAlignedView>
                    <PlayerHealthbarView/>
                    <PlayerAttackBarView/>
                </ColumnCenterAlignedView>
                <CoreImage src={'assets/combat.png'} width={80} height={80}/>
                <ColumnCenterAlignedView>
                    <EnemyHealthbarView/>
                    <EnemyAttackBarView/>
                </ColumnCenterAlignedView>
                <CoreImage src={`/assets/enemies/${getEnemyId(combat.enemy())}.png`} alt="NO IMG" width={80} height={80} style={{}}/>
                <ReturnButton onReturn={()=>{ gameView.setActiveView('combat') }}/>
            </RowCenterAlignedView>
        </ColumnCenterAlignedView>
    );
};

export default ActiveCombatView;