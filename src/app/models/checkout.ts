import { Items } from './Items';

export interface Checkout {
    Items: Array<Items>;
    Payment_method: string;
    Shipment_address: string;
    Total: string;
    Username: string;
}
