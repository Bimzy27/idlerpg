import {IEnemy} from "../models/combat/Enemy";
import {AttackType} from "../models/combat/AttackStyle";

interface IEnemyBuilder
{
    [id:string]:IEnemy
}

const enemyBuilder:IEnemyBuilder =
    {
        'none':
            {
                name: 'None',
                attackInterval: 0,
                attackType:AttackType.Melee,
                accuracyRating:0,
                maxHit:0,
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
                defenseStats:
                    {
                        meleeDefense: 0,
                        rangedDefense: 0,
                        magicDefense: 0,
                    },
            },
        'chicken':
            {
                name: 'Chicken',
                attackInterval: 2.4,
                attackType:AttackType.Melee,
                accuracyRating:170,
                maxHit:11,
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
                defenseStats:
                    {
                        meleeDefense: 220,
                        rangedDefense: 640,
                        magicDefense: 640,
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
                attackInterval: 2.4,
                attackType:AttackType.Melee,
                accuracyRating:490,
                maxHit:18,
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
                defenseStats:
                    {
                        meleeDefense: 430,
                        rangedDefense: 640,
                        magicDefense: 640,
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
                attackInterval: 3,
                attackType:AttackType.Melee,
                accuracyRating:640,
                maxHit:23,
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
                defenseStats:
                    {
                        meleeDefense: 640,
                        rangedDefense: 640,
                        magicDefense: 640,
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