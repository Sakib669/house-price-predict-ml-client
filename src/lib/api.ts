import { HouseFeaturesInput, PredictionResponse } from "@/types/prediction";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function checkBackendHealth(): Promise<{ ok: boolean; message: string }> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const res = await fetch(`${API_BASE_URL}/health`, {
      method: "GET",
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      return { ok: true, message: "FastAPI ML Server Online" };
    }
    return { ok: false, message: `Server responded with ${res.status}` };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Service unreachable";
    return { ok: false, message };
  }
}

/**
 * Fallback analytical estimation derived from the dataset's multi-variable regression
 * when the external FastAPI server is not actively running locally.
 */
function calculateFallbackPrice(features: HouseFeaturesInput): number {
  const baseAreaValue = features.square_feet * 175;
  const lotValue = features.lot_square_feet * 18;
  const bedValue = features.bedrooms * 22000;
  const bathValue = features.bathrooms * 28000;

  const neighborhoodMultipliers: Record<string, number> = {
    Waterfront: 1.48,
    Downtown: 1.32,
    "Historic District": 1.22,
    Uptown: 1.18,
    Suburb: 1.0,
    Westside: 0.95,
    "East End": 0.88,
    "North Hills": 1.05,
  };
  const nMultiplier = neighborhoodMultipliers[features.neighborhood] || 1.0;

  const conditionFactors: Record<string, number> = {
    Poor: 0.72,
    Fair: 0.86,
    Good: 1.0,
    "Very Good": 1.15,
    Excellent: 1.3,
  };
  const cFactor = conditionFactors[features.condition] || 1.0;

  const parkingValue = features.parking_spaces * 12500;
  const gardenValue = features.has_garden === "Yes" ? 18000 : 0;
  const renovatedValue = features.renovated === "Yes" ? 35000 : 0;

  const distanceDeduction = Math.min(features.distance_to_city_center_km * 3500, 75000);
  const ageDeduction = Math.min(features.house_age * 1200, 60000);

  const rawTotal = (baseAreaValue + lotValue + bedValue + bathValue + parkingValue + gardenValue + renovatedValue - distanceDeduction - ageDeduction) * nMultiplier * cFactor;

  return Math.max(120000, Math.round(rawTotal / 100) * 100);
}

export async function predictHousePrice(features: HouseFeaturesInput): Promise<PredictionResponse> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const payload = {
      property_type: features.property_type,
      neighborhood: features.neighborhood,
      square_feet: Number(features.square_feet),
      lot_square_feet: Number(features.lot_square_feet),
      bedrooms: Number(features.bedrooms),
      bathrooms: Number(features.bathrooms),
      condition: features.condition,
      heating_type: features.heating_type,
      parking_spaces: Number(features.parking_spaces),
      has_garden: features.has_garden,
      renovated: features.renovated,
      distance_to_city_center_km: Number(features.distance_to_city_center_km),
      house_age: Number(features.house_age),
    };

    const res = await fetch(`${API_BASE_URL}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const errorJson = await res.json().catch(() => null);
      throw new Error(errorJson?.detail || `Inference error: HTTP ${res.status}`);
    }

    const data = await res.json();
    return {
      predicted_price: data.predicted_price,
      is_fallback: false,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.warn("Backend API call failed, utilizing regression fallback:", error);
    const fallbackPrice = calculateFallbackPrice(features);
    return {
      predicted_price: fallbackPrice,
      is_fallback: true,
      timestamp: new Date().toISOString(),
    };
  }
}
