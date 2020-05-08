export class StoragePetType {
    public id?: number;
    public microchip: string;
    public male?: number;
    public female?: number;
    public booklet?: string;

    constructor(id: number, microchip: string, male: number, female: number, booklet: string) {
        this.id = id;
        this.microchip = microchip;
        this.male = male;
        this.female = female;
        this.booklet = booklet;
    }
}
