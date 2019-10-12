import { Items } from './items';

export class Checkout {
    public items: Array<Items>;
    public payment_method: string;
    public shipment_address: string;
    public total: number;
    public username: string;
}
