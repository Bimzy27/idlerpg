import {IEnemy} from "../models/combat/Enemy";
import {ITask} from "../models/Task";
import taskBuilder from "./tasks/TaskBuilder";

interface IEnemyBuilder
{
    [id:string]:IEnemy
}

const enemyBuilder:IEnemyBuilder =
    {
        'none':
            {
                name: 'None',
                combatStats:
                    {
                        hitpoints: 0,
                        attack: 0,
                        strength: 0,
                        defense: 0,
                    }
            },
        'goblin':
            {
                name: 'Goblin',
                combatStats:
                    {
                        hitpoints: 5,
                        attack: 1,
                        strength: 1,
                        defense: 1,
                    }
            },
    };

export const getEnemyId = (enemy: IEnemy) => {
    for (const id in enemyBuilder) {
        if (enemyBuilder[id] === enemy) {
            return id;
        }
    }
    throw new Error('Enemy not found in enemyBuilder');
};

export default enemyBuilder;