import {GameViewProvider} from "./GameViewContext";
import {InventoryProvider} from "./InventoryContext";
import {ActiveTaskProvider} from "./ActiveTaskContext";
import {JSX} from "solid-js";
import {SkillProvider} from "./SkillsContext";
import {useFirebaseApp} from "solid-firebase";
import {addDoc, collection, getFirestore} from "firebase/firestore";

interface ContextProviderProps {
    children?: JSX.Element;
}

export function ContextProvider(props:ContextProviderProps) {

    const app = useFirebaseApp();
    const db = getFirestore(app);

    async function saveUserData()
    {
        try {
            const docRef = await addDoc(collection(db, 'users'), {
                id: "mining",
                exp: 10000,
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <GameViewProvider>
            <SkillProvider>
                <InventoryProvider>
                    <ActiveTaskProvider>
                            {props.children}
                    </ActiveTaskProvider>
                </InventoryProvider>
            </SkillProvider>
        </GameViewProvider>
    );
}

export default ContextProvider;