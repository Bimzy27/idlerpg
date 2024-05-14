import {Component, createEffect} from "solid-js";
import useCombat, {CombatData} from "../../contexts/CombatContext";
import {
    ColumnCenterAlignedView,
    ContentFitAltView,
    CoreImage,
    CoreText,
    RowCenterAlignedView
} from "../../styles/styles";
import {EnemyHealthbarView} from "./HealthbarView";
import {EnemyStatsView} from "./StatsView";
import {getEnemyId} from "../../loaders/EnemyLoader";
import {EnemyAttackBarView} from "./AttackBarView";

interface IEnemyViewProps
{
}

const EnemyView: Component<IEnemyViewProps> = (props) => {
    const combat = useCombat() as CombatData;

    return (
        <ColumnCenterAlignedView>
            <CoreText>{combat.enemy().name}</CoreText>
            <RowCenterAlignedView>
                <EnemyHealthbarView/>
                <EnemyAttackBarView/>
            </RowCenterAlignedView>
            <RowCenterAlignedView>
                <ContentFitAltView style={{width: '100%'}}>
                    <CoreImage src={`/assets/enemies/${getEnemyId(combat.enemy())}.png`} alt="NO IMG" width={300} height={300} style={{"margin-top": '50px'}}/>
                </ContentFitAltView>
                <EnemyStatsView/>
            </RowCenterAlignedView>
        </ColumnCenterAlignedView>
    );
};

export default EnemyView;