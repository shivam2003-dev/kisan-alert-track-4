const villageFeatures = {
  Kothapalli: { sentinel1Wetness: "low", ndvi: 0.42, ndwi: 0.16, rainfallAnomaly: -34 },
  Ramapuram: { sentinel1Wetness: "moderate", ndvi: 0.51, ndwi: 0.22, rainfallAnomaly: -22 },
  Chennapuram: { sentinel1Wetness: "low", ndvi: 0.38, ndwi: 0.12, rainfallAnomaly: -41 },
};

export function getSatelliteFeatures({ village = "Kothapalli" }) {
  return villageFeatures[village] || villageFeatures.Kothapalli;
}

export function computeDrynessSeverity(features) {
  let severity = 0;
  if (features.sentinel1Wetness === "low") severity += 35;
  if (features.ndvi < 0.45) severity += 20;
  if (features.ndwi < 0.18) severity += 20;
  if (features.rainfallAnomaly < -30) severity += 25;
  return Math.min(100, severity);
}
