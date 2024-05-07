import {JSX} from "solid-js";
import {useFirebaseApp} from "solid-firebase";
import {collection, getDocs, getFirestore} from "firebase/firestore";
import {IEnemy} from "../models/combat/Enemy";

type EnemyDic = Record<string, IEnemy>;

interface IEnemyLoaderProps {
    children?: JSX.Element;
    incrementLoadable:()=>void;
}

export let enemyData: EnemyDic = {
};

export function EnemyLoader(props:IEnemyLoaderProps) {

    const app = useFirebaseApp();
    const db = getFirestore(app);

    async function loadEnemyData()
    {
        const querySnapshot = await getDocs(collection(db, "enemies"));
        querySnapshot.forEach((doc) =>
        {
            const enemy:IEnemy =
                {
                    name: doc.data().name,
                    attackType: doc.data().attackType,
                    accuracyRating: doc.data().accuracyRating,
                    attackInterval: doc.data().attackInterval,
                    maxHit: doc.data().maxHit,
                    combatStats: doc.data().combatStats,
                    defenseStats: doc.data().defenseStats,
                    guaranteedDrops: doc.data().guaranteedDrops,
                    potentialDrops: doc.data().potentialDrops,
                };
            enemyData = {...enemyData, [doc.id]: enemy}
        });
    }

    loadEnemyData().then(r => {
        console.log('Enemies Loaded');
        props.incrementLoadable();
    });

    return (
        <div>
            {props.children}
        </div>
    );
}

export const getEnemyId = (enemy:IEnemy) => {
    for (const id in enemyData) {
        if (enemyData[id] === enemy) {
            return id;
        }
    }
    throw new Error('Enemy not found');
};