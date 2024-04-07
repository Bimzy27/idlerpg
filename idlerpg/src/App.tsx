import type { Component } from 'solid-js';
import { createSignal, For, onCleanup } from 'solid-js';
import { createStore } from 'solid-js/store';

import Clicker from './Clicker';
import AutoClicker, { IAutoClicker } from './AutoClicker';
import {HeaderBanner} from "./styles/styles";
import ItemView, {IItemAmount} from "./ItemView";

const initialClicksValue = 0;
const initialAutoClickersValue: IAutoClicker[] = [
    { id: 'auto', cost: 10, amount: 0 },
    { id: 'double', cost: 20, amount: 0 },
    { id: 'multi', cost: 100, amount: 0 },
    { id: 'mega', cost: 1000, amount: 0 },
    { id: 'ultra', cost: 10000, amount: 0 },
    { id: 'monster', cost: 100000, amount: 0 },
];

const initialInventory:IItemAmount[] = [
    {name:'', amount:0},
    {name:'', amount:0},
    {name:'', amount:0},
    {name:'', amount:0},
    {name:'', amount:0},
    {name:'', amount:0},
    {name:'', amount:0},
    {name:'', amount:0},
    {name:'', amount:0},
    {name:'', amount:0},
];

const App: Component = () => {
    const [clicks, setClicks] = createSignal<number>(initialClicksValue);
    const [netWorth, setNetWorth] = createSignal<number>(initialClicksValue);
    const [autoClickers, setAutoClickers] = createStore<IAutoClicker[]>(initialAutoClickersValue);
    const [inventory, setInventory] = createStore<IItemAmount[]>(initialInventory);

    const updateClicker = (): void => {
        setClicks(clicks() + 1);
        setNetWorth(netWorth() + 1);
    };

    const updateAutoClicker = (id: string, increment = true): void => {
        const direction = increment ? 1 : -1;
        const currentAutoClicker: IAutoClicker | undefined = autoClickers.find(autoClicker => autoClicker.id === id);
        currentAutoClicker && setClicks(clicks() - currentAutoClicker.cost * direction);
        setAutoClickers(autoClicker => autoClicker.id === id, 'amount', amount => amount + 1 * direction);
    };

    const updateInventory = (name: string, increment = true, amount: number): void => {
        const direction = increment ? 1 : -1;
        const currentItem: IItemAmount | undefined = inventory.find(item => item.name === name);
        if (currentItem)
        {
            let finalAmount = Math.max(0, currentItem.amount + (amount * direction))
            setInventory(autoClicker => autoClicker.name === name, 'amount', amount => finalAmount);
        }
    };

    const [progress, setProgress] = createSignal(0);
    const updateTotal = (): void => {
        const newTotal: number = autoClickers.reduce((acc, cur) => acc + cur.amount * (cur.cost * 0.1), 0);
        setClicks(newTotal + clicks());
        setNetWorth(newTotal + netWorth());
        setProgress((p) => p + 1);
    };

    const interval = setInterval(updateTotal, 1000);

    onCleanup(() => clearInterval(interval));

    return (
        <div className="game">
            <HeaderBanner>
                <p>this is header</p>
            </HeaderBanner>

            <div className="progress-bar-container">
                <div className="progress-bar" style={`width: ${progress()}%`}></div>
            </div>

            <Clicker amount={clicks()} update={updateClicker}/>

            <For each={autoClickers} children={(item, index) => {
                return <p>hello</p>
            }}>
                {(autoClicker, index) => (
                    <AutoClicker
                        {...autoClicker}
                        update={updateAutoClicker}
                        clicks={clicks()}
                        netWorth={netWorth()}
                    />
                )}
            </For>

            <For each={inventory} children={(item, index) => {
                return <p>hello</p>
            }}>
                {(itemView, index) => (
                    <ItemView
                        {...itemView}
                        update={updateInventory}
                    />
                )}
            </For>
        </div>
    );
};

export default App;