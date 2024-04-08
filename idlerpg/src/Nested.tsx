import {Data, useCounter} from "./Counter";

export default function Nested() {

    const counter:Data | undefined = useCounter();
    return (
        <>
            <div>{counter?.count()}</div>
            <button onClick={counter?.increment}>+</button>
            <button onClick={counter?.decrement}>-</button>
        </>
    );
};