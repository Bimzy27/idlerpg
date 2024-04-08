import {createSignal, createContext, useContext, JSX, Accessor} from "solid-js";

export type Data = {count: Accessor<number>, increment:()=>void, decrement:()=>void};
export const CounterContext = createContext<Data>();

interface CounterProps {
    children?: JSX.Element; // Children elements
}

export function CounterProvider(props:CounterProps) {
    const [_count, setCount] = createSignal(0);
    const counter:Data = {
        count: _count, // Access the current count value
        increment: ()=>{
            console.log("increment")
            setCount(c => c + 1); // Increment the count
        },
        decrement: ()=>{
            console.log("decrement")
            setCount(c => c - 1); // Decrement the count
        },
    };

    return (
        <CounterContext.Provider value={counter}>
            {props.children}
        </CounterContext.Provider>
    );
}

export function useCounter() { return useContext(CounterContext) }