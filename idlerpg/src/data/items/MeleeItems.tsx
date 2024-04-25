import {IItemBuilder} from "./ItemBuilder";
import {EquippableSlot} from "../../models/Item";
import {AttackType} from "../../models/combat/AttackStyle";
import {SkillRequirement} from "../../models/Requirement";
import {getExpFromLevel} from "../../models/Skill";

export const meleeItemBuilder:IItemBuilder =
    {
        'bronze_dagger':
            {
                name: 'Bronze Dagger',
                value: 50,
                slot: EquippableSlot.MainHand,
                attackType: AttackType.Melee,
                attackSpeed:2.2,
                attackStats:
                    {
                        meleeStrength:6,
                        stabBonus:7,
                        slashBonus:2,
                        blockBonus:7,
                    }
            },
        'bronze_scimitar':
            {
                name: 'Bronze Scimitar',
                value: 50,
                slot: EquippableSlot.MainHand,
                attackType: AttackType.Melee,
                attackSpeed:2.4,
                attackStats:
                    {
                        meleeStrength:6,
                        stabBonus:1,
                        slashBonus:7,
                        blockBonus:1,
                    }
            },
        'iron_dagger':
            {
                name: 'Iron Dagger',
                value: 50,
                slot: EquippableSlot.MainHand,
                attackType: AttackType.Melee,
                attackSpeed:2.2,
                attackStats:{
                        meleeStrength:4,
                        stabBonus:8,
                        slashBonus:3,
                        blockBonus:8,
                }
            },
        'iron_scimitar':
            {
                name: 'Iron Scimitar',
                value: 50,
                slot: EquippableSlot.MainHand,
                attackType: AttackType.Melee,
                attackSpeed:2.4,
                    attackStats:
                        {
                                meleeStrength:9,
                                stabBonus:2,
                                slashBonus:10,
                                blockBonus:2,
                        }
            },
        'steel_dagger':
            {
                name: 'Steel Dagger',
                value: 50,
                slot: EquippableSlot.MainHand,
                attackType: AttackType.Melee,
                attackSpeed:2.2,
                    attackStats:
                        {
                                meleeStrength:7,
                                stabBonus:13,
                                slashBonus:4,
                                blockBonus:13,
                        },
                requirements:[
                    new SkillRequirement({id: 'attack', exp: getExpFromLevel(10)})
                ],
            },
        'steel_scimitar':
            {
                name: 'Steel Scimitar',
                value: 50,
                slot: EquippableSlot.MainHand,
                attackType: AttackType.Melee,
                attackSpeed:2.4,
                    attackStats:
                        {
                                meleeStrength:14,
                                stabBonus:3,
                                slashBonus:15,
                                blockBonus:3,
                        },
                requirements:[
                    new SkillRequirement({id: 'attack', exp: getExpFromLevel(10)})
                ],
            },
        'mithril_dagger':
            {
                name: 'Mithril Dagger',
                value: 50,
                slot: EquippableSlot.MainHand,
                attackType: AttackType.Melee,
                attackSpeed:2.2,
                    attackStats:
                        {
                                meleeStrength:10,
                                stabBonus:18,
                                slashBonus:5,
                                blockBonus:18,
                        },
                requirements:[
                    new SkillRequirement({id: 'attack', exp: getExpFromLevel(20)})
                ],
            },
        'mithril_scimitar':
            {
                name: 'Mithril Scimitar',
                value: 50,
                slot: EquippableSlot.MainHand,
                attackType: AttackType.Melee,
                attackSpeed:2.4,
                    attackStats:
                        {
                                meleeStrength:20,
                                stabBonus:5,
                                slashBonus:21,
                                blockBonus:5,
                        },
                requirements:[
                    new SkillRequirement({id: 'attack', exp: getExpFromLevel(20)})
                ],
            },
        'adamant_dagger':
            {
                name: 'Adamant Dagger',
                value: 50,
                slot: EquippableSlot.MainHand,
                attackType: AttackType.Melee,
                attackSpeed:2.2,
                    attackStats:
                        {
                                meleeStrength:14,
                                stabBonus:22,
                                slashBonus:8,
                                blockBonus:22,
                        },
                requirements:[
                    new SkillRequirement({id: 'attack', exp: getExpFromLevel(30)})
                ],
            },
        'adamant_scimitar':
            {
                name: 'Adamant Scimitar',
                value: 50,
                slot: EquippableSlot.MainHand,
                attackType: AttackType.Melee,
                attackSpeed:2.4,
                    attackStats:
                        {
                                meleeStrength:28,
                                stabBonus:6,
                                slashBonus:29,
                                blockBonus:6,
                        },
                requirements:[
                    new SkillRequirement({id: 'attack', exp: getExpFromLevel(30)})
                ],
            },
        'rune_dagger':
            {
                name: 'Rune Dagger',
                value: 50,
                slot: EquippableSlot.MainHand,
                attackType: AttackType.Melee,
                attackSpeed:2.2,
                    attackStats:
                        {
                                meleeStrength:24,
                                stabBonus:35,
                                slashBonus:12,
                                blockBonus:35,
                        },
                requirements:[
                    new SkillRequirement({id: 'attack', exp: getExpFromLevel(40)})
                ],
            },
        'rune_scimitar':
            {
                name: 'Rune Scimitar',
                value: 50,
                slot: EquippableSlot.MainHand,
                attackType: AttackType.Melee,
                attackSpeed:2.4,
                    attackStats:
                        {
                                meleeStrength:44,
                                stabBonus:7,
                                slashBonus:45,
                                blockBonus:7,
                        },
                requirements:[
                    new SkillRequirement({id: 'attack', exp: getExpFromLevel(40)})
                ],
            },
        'dragon_dagger':
            {
                name: 'Dragon Dagger',
                value: 50,
                slot: EquippableSlot.MainHand,
                attackType: AttackType.Melee,
                attackSpeed:2.2,
                    attackStats:
                        {
                                meleeStrength:40,
                                stabBonus:50,
                                slashBonus:25,
                                blockBonus:50,
                        },
                requirements:[
                    new SkillRequirement({id: 'attack', exp: getExpFromLevel(60)})
                ],
            },
        'dragon_scimitar':
            {
                name: 'Dragon Scimitar',
                value: 50,
                slot: EquippableSlot.MainHand,
                attackType: AttackType.Melee,
                attackSpeed:2.4,
                    attackStats:
                        {
                                meleeStrength:66,
                                stabBonus:8,
                                slashBonus:67,
                                blockBonus:8,
                        },
                requirements:[
                    new SkillRequirement({id: 'attack', exp: getExpFromLevel(60)})
                ],
            },
    }