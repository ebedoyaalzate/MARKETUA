import { Items } from './Items';

export class Checkout {
    public Items: Array<Items>;
    public Payment_method: string;
    public Shipment_address: string;
    public Total: number;
    public Username: string;
}
