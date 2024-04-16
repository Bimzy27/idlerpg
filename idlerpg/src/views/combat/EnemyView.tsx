import {Component, createEffect} from "solid-js";
import useCombat, {CombatData} from "../../contexts/CombatContext";
import {CoreImage, CoreText} from "../../styles/styles";
import {getEnemyId} from "../../data/EnemyBuilder";
import {EnemyHealthbarView} from "./HealthbarView";

interface IEnemyViewProps
{
}

const EnemyView: Component<IEnemyViewProps> = (props) => {
    const combat = useCombat() as CombatData;

    return (
        <div>
            <CoreText>{combat.enemy().name}</CoreText>
            <EnemyHealthbarView/>
            <CoreImage src={`/assets/enemies/${getEnemyId(combat.enemy())}.png`} alt="NO IMG" width={300} height={300} style={{"margin-top": '50px'}}/>
        </div>
    );
};

export default EnemyView;