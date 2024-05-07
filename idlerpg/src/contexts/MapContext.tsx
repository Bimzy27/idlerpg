import {Accessor, createContext, createSignal, JSX, useContext} from "solid-js";

export type MapData = {
    location:Accessor<string>,
    setLocation:(locationId:string)=>void
};

export const MapContext = createContext<MapData>();

interface MapProps {
    children?: JSX.Element; // Children elements
}

export function MapProvider(props:MapProps) {
    const [location, setLocation] = createSignal('location_lumberton');

    const loc:MapData = {
        location: location,
        setLocation:(locationId:string)=>
        {
            setLocation(locationId);
        }
    };

    return (
        <MapContext.Provider value={loc}>
            {props.children}
        </MapContext.Provider>
    );
}

export default function useMap() { return useContext(MapContext) }