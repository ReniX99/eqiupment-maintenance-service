import { readFile } from "node:fs/promises";
import InternalServerError from "../errors/internal-server.error";
import GatewayTimeoutError from "../errors/gatewey-timeout.error";
import BadGatewayError from "../errors/bad-gateway.error";
import HttpError from "../errors/http.error";

process.loadEnvFile(".env");

function getTimeout() {
  const envTimeout = Number(process.env.REQUEST_TIMEOUT_MS);
  if (!Number.isNaN(envTimeout)) {
    return envTimeout;
  }
  return 5000;
}

async function getAllowedParameters() {
  const file = await readFile("src/config/weather.json", "utf-8");

  const config = JSON.parse(file);

  const allowedMinTemperature = config.minTemperature;
  const allowedMaxTemperature = config.maxTemperature;
  const allowedPrecipitationSum = config.precipitationSum;
  const allowedWindSpeed = config.windSpeed;

  return {
    allowedMinTemperature,
    allowedMaxTemperature,
    allowedPrecipitationSum,
    allowedWindSpeed,
  };
}

async function isWorksAllowed(
  minTemperature: number,
  maxTemperature: number,
  precipitationSum: number,
  windSpeed: number,
): Promise<boolean> {
  const {
    allowedMinTemperature,
    allowedMaxTemperature,
    allowedPrecipitationSum,
    allowedWindSpeed,
  } = await getAllowedParameters();

  if (
    minTemperature < allowedMinTemperature ||
    maxTemperature > allowedMaxTemperature ||
    precipitationSum > allowedPrecipitationSum ||
    windSpeed > allowedWindSpeed
  )
    return false;

  return true;
}

export async function getForecast(
  latitude: number,
  longitude: number,
  date: string,
) {
  const WEATHER_API_URL = process.env.WEATHER_API_URL;

  if (!WEATHER_API_URL) {
    throw new InternalServerError(
      "Environment variable WEATHER_API_URL is not found",
    );
  }

  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    daily:
      "temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max",
    start_date: date,
    end_date: date,
    wind_speed_unit: "ms",
  });

  const timeout = getTimeout();

  try {
    const response = await fetch(`${WEATHER_API_URL}?${params}`, {
      signal: AbortSignal.timeout(timeout),
    });

    const json = await response.json();

    if (!response.ok) {
      const errorMessage = json.reason;
      throw new BadGatewayError(errorMessage);
    }

    const daily = json.daily;
    if (!daily) {
      throw new BadGatewayError("Failed to get forecast data");
    }

    const minTemperature = daily.temperature_2m_min?.[0] || -50;
    const maxTemperature = daily.temperature_2m_max?.[0] || 50;
    const precipitationSum = daily.precipitation_sum?.[0] || 50;
    const windSpeed = daily.wind_speed_10m_max?.[0] || 15;

    const isAllowed = await isWorksAllowed(
      minTemperature,
      maxTemperature,
      precipitationSum,
      windSpeed,
    );

    return {
      forecast: { minTemperature, maxTemperature, precipitationSum, windSpeed },
      isAllowed,
    };
  } catch (error) {
    if (error instanceof Error && error.name === "TimeoutError") {
      throw new GatewayTimeoutError("Weather API timeout");
    }

    if (error instanceof HttpError) {
      throw error;
    }

    throw new InternalServerError(
      error instanceof Error ? error.message : "Unknown error",
    );
  }
}
