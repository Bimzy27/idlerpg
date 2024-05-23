import {Component} from "solid-js";
import {ColumnCenterAlignedView, CoreButton, CoreText} from "../../styles/styles";
import EnemyIconView from "./EnemyIconView";
import {enemyData} from "../../loaders/EnemyLoader";
import useCombat, {CombatData} from "../../contexts/combat/CombatContext";
import useActiveTask, {ActiveTaskData} from "../../contexts/ActiveTaskContext";

interface IFightEnemyViewProps {
    enemyId:string,
}

const FightEnemyView : Component<IFightEnemyViewProps> = (props) => {
    const combat = useCombat() as CombatData;
    const tasks = useActiveTask() as ActiveTaskData;

    return (
        <ColumnCenterAlignedView>
            <CoreText>{enemyData[props.enemyId].name}</CoreText>
            <EnemyIconView showAmount={false} amount={0} id={props.enemyId}/>
            <CoreButton onClick={()=>{combat.setEnemy(enemyData[props.enemyId], tasks)}}>Fight!</CoreButton>
        </ColumnCenterAlignedView>
    );
};

export default FightEnemyView;