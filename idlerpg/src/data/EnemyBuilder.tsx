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
                        ranged: 0,
                        magic: 0,
                        prayer: 0,
                    },
                attackInterval: 0
            },
        'chicken':
            {
                name: 'Chicken',
                attackInterval: 2,
                combatStats:
                    {
                        hitpoints: 3,
                        attack: 1,
                        strength: 1,
                        defense: 1,
                        ranged: 1,
                        magic: 1,
                        prayer: 0,
                    },
                guaranteedDrops:
                    [
                        {
                            id: 'bones',
                            amount: 1
                        },
                        {
                            id: 'chicken_raw',
                            amount: 1
                        },
                        {
                            id: 'feathers',
                            amount: 5
                        },
                    ],
            },
        'cow':
            {
                name: 'Cow',
                attackInterval: 2,
                combatStats:
                    {
                        hitpoints: 8,
                        attack: 1,
                        strength: 1,
                        defense: 1,
                        ranged: 1,
                        magic: 1,
                        prayer: 0,
                    },
                guaranteedDrops:
                    [
                        {
                            id: 'bones',
                            amount: 1
                        },
                        {
                            id: 'leather',
                            amount: 1
                        },
                        {
                            id: 'meat_raw',
                            amount: 1
                        },
                    ],
            },
        'goblin':
            {
                name: 'Goblin',
                attackInterval: 2,
                combatStats:
                    {
                        hitpoints: 5,
                        attack: 1,
                        strength: 1,
                        defense: 1,
                        ranged: 1,
                        magic: 1,
                        prayer: 0,
                    },
                guaranteedDrops:
                    [
                        {
                            id: 'bones',
                            amount: 1
                        }
                    ],
                potentialDrops:
                    {
                        drops: [
                            {
                                chance:10,
                                itemId:'bronze_arrow',
                                minAmount:3,
                                maxAmount:6
                            }
                        ]
                    },
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