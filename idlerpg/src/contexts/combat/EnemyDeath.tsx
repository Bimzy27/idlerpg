import {Subject} from "../../common/Observer";

export class EnemyDeathSubject extends Subject
{
    notifyEnemyDeath(enemyId:string)
    {
        this.notifyObservers(enemyId)
    }
}