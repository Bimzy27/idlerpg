import {IVendor, IVendorItem} from "../models/Vendor";

interface IVendorBuilder
{
    [id:string]:IVendor
}

const vendorBuilder:IVendorBuilder =
    {
        'vendor_lumberton':
            {
                name: 'Lumberton General Store',
                items:[
                    {cost: 150, item: {id: 'meat', amount: 1}},
                    {cost: 300, item: {id: 'iron_arrow', amount: 50}},
                ]
            },
        'vendor_faldomere':
            {
                name: 'Faldomere General Store',
                items:[
                    {cost: 10000, item: {id: 'dragon_scimitar', amount: 1}},
                    {cost: 10000, item: {id: 'dragon_dagger', amount: 1}}
                ]
            },
    };

export default vendorBuilder;