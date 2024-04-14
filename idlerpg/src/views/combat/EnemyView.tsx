import {Component, createEffect} from "solid-js";
import useCombat, {CombatData} from "../../contexts/CombatContext";
import {CoreImage, CoreText} from "../../styles/styles";
import {getEnemyId} from "../../data/EnemyBuilder";

interface IEnemyViewProps
{
}

const EnemyView: Component<IEnemyViewProps> = (props) => {
    const combat = useCombat() as CombatData;

    createEffect(() => {
        const activeEnemy = combat.enemy();

    }, []);

    return (
        <div>
            <CoreText>{combat.enemy().name}</CoreText>
            <CoreImage src={`/assets/enemies/${getEnemyId(combat.enemy())}.png`} alt="NO IMG" width={300} height={300}/>
        </div>
    );
};

export default EnemyView;