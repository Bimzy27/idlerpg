import {IQuest, ItemQuestStep, MonsterQuestStep} from "../models/Quest";
import {SkillRequirement} from "../models/Requirement";
import {ItemReward, QuestPointReward, SkillReward} from "../models/Reward";
import {getExpFromLevel} from "../models/Skill";

interface IQuestBuilder
{
    [id:string]:IQuest
}

const questBuilder:IQuestBuilder =
    {
        'quest_goblin_slayer':
            {
                name: 'Goblin Slayer',
                requirements:
                [
                    new SkillRequirement({id: 'attack', exp: getExpFromLevel(10)}),
                    new SkillRequirement({id: 'strength', exp: getExpFromLevel(10)}),
                ],
                questPoints: 1,
                rewards:
                [
                    new SkillReward({id: 'attack', exp: 2500}),
                    new SkillReward({id: 'strength', exp: 2500}),
                    new ItemReward({id: 'mithril_scimitar', amount: 1}),
                ],
                startLocation:'location_faldomere',
                endLocation:'location_faldomere',
                steps:
                [
                    new ItemQuestStep({id: 'bronze_dagger', amount: 50}),
                    new ItemQuestStep({id: 'bronze_scimitar', amount: 50}),
                    new MonsterQuestStep('goblin', 100),
                ],
            },
        'quest_fishermans_curse':
            {
                name: 'Fisherman\'s Curse',
                requirements:
                    [
                        new SkillRequirement({id: 'fishing', exp: getExpFromLevel(10)}),
                    ],
                questPoints: 1,
                rewards:
                    [
                        new SkillReward({id: 'fishing', exp: 10000}),
                    ],
                startLocation:'location_faldomere',
                endLocation:'location_faldomere',
                steps:
                    [
                        new ItemQuestStep({id: 'shrimp_raw', amount: 100}),
                        new ItemQuestStep({id: 'sardine_raw', amount: 200}),
                        new ItemQuestStep({id: 'herring_raw', amount: 300}),
                    ],
            },
    };

export default questBuilder;

export function getMaxQuestPoints():number
{
    let maxPoints = 0;
    for (let quest in questBuilder)
    {
        maxPoints += questBuilder[quest].questPoints;
    }
    return maxPoints;
}