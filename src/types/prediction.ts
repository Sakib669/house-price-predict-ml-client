export type PropertyType =
  | "Single Family"
  | "Condo"
  | "Townhouse"
  | "Villa"
  | "Duplex"
  | "Apartment";

export type Neighborhood =
  | "Waterfront"
  | "Downtown"
  | "Suburb"
  | "Historic District"
  | "Uptown"
  | "Westside"
  | "East End"
  | "North Hills";

export type PropertyCondition = "Poor" | "Fair" | "Good" | "Very Good" | "Excellent";

export type HeatingType = "Gas" | "Heat Pump" | "Electric" | "None" | "Geothermal" | "Solar";

export type YesNo = "Yes" | "No";

export interface HouseFeaturesInput {
  property_type: PropertyType | string;
  neighborhood: Neighborhood | string;
  square_feet: number;
  lot_square_feet: number;
  bedrooms: number;
  bathrooms: number;
  condition: PropertyCondition;
  heating_type: HeatingType | string;
  parking_spaces: number;
  has_garden: YesNo;
  renovated: YesNo;
  distance_to_city_center_km: number;
  house_age: number;
}

export interface PredictionRequestPayload {
  property_type: string;
  neighborhood: string;
  square_feet: number;
  lot_square_feet: number;
  bedrooms: number;
  bathrooms: number;
  condition: PropertyCondition;
  heating_type: string;
  parking_spaces: number;
  has_garden: YesNo;
  renovated: YesNo;
  distance_to_city_center_km: number;
  house_age: number;
}

export interface PredictionResponse {
  predicted_price: number;
  is_fallback?: boolean;
  timestamp?: string;
}

export interface PresetProperty {
  id: string;
  title: string;
  tagline: string;
  badge: string;
  data: HouseFeaturesInput;
}
