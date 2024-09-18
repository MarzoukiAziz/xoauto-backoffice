export interface AdType {
    _id: string;
    uid: string;
    title?: string;
    description?: string;
    price: number;
    type: 'new' | 'used';
    brand: string;
    model: string;
    version?: string;
    category: string;
    mileage: number;
    firstRegistration: {
        month?: number;
        year: number;
    };
    fuelType: string;
    seats?: number;
    color?: string;
    critAir?: string;
    horsepower?: number;
    powerKw?: number;
    autonomyWltpKm?: number;
    optionsVehicule: {
        headsUpDisplay?: boolean;
        parkingAssist?: boolean;
        towHitch?: boolean;
        roofRacks?: boolean;
        bluetooth?: boolean;
        rearCamera?: boolean;
        automaticClimateControl?: boolean;
        gps?: boolean;
        nonSmoker?: boolean;
        firstHand?: boolean;
        rearRadar?: boolean;
        leatherSeats?: boolean;
        heatedSeats?: boolean;
        manufacturerWarranty?: boolean;
        soundSystem?: boolean;
        sunroof?: boolean;
        panoramicRoof?: boolean;
        others?: string[];
    };
    courant: {
        AC?: string;
        DC?: string;
    };
    photos: string[];
    interiorVideo?: string;
    exteriorVideo?: string;
    address?: string;
    phoneNumber?: string;
    maskPhone: boolean;
    active: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
