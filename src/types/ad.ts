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
  first_registration: {
    month?: number;
    year: number;
  };
  fuel_type: string;
  seats?: number;
  color?: string;
  crit_air?: string;
  horsepower?: number;
  power_kw?: number;
  autonomy_wltp_km?: number;
  options_vehicule: {
    non_smoker?: boolean;
    first_hand?: boolean;
    manufacturer_warranty?: boolean;
    others?: string[];
  };
  equipments: {
    safety: {
      type: string[];
      default: [];
    };
    outdoor: {
      type: string[];
      default: [];
    };
    indoor: {
      type: string[];
      default: [];
    };
    functional: {
      type: string[];
      default: [];
    };
  };
  courant: {
    AC?: string;
    DC?: string;
  };
  photos: string[];
  interior_video?: string;
  exterior_video?: string;
  address?: string;
  region?: string;
  phone_number?: string;
  mask_phone: boolean;
  active: boolean;
  pro: boolean;
  sold: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  views?: number;
}
