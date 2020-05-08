export class StoragePetType {
    public id?: number;
    public microchip: string;

    constructor(id: number, microchip: string) {
        this.id = id;
        this.microchip = microchip;
    }
}
