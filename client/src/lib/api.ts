/**
 * API Client for ROMUO VTC
 * Centralizes all API calls and handles authentication/errors
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

interface RouteRequest {
  origin: string;
  destination: string;
}

interface GeocodeRequest {
  query: string;
}

/**
 * Calculate route using TomTom via server proxy
 * API key is hidden on the server
 */
export async function calculateRoute(origin: string, destination: string) {
  const response = await fetch(`${API_BASE_URL}/maps/route`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ origin, destination } satisfies RouteRequest),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Network error' }));
    throw new Error(error.error || 'Route calculation failed');
  }

  return response.json();
}

/**
 * Geocode address using TomTom via server proxy
 */
export async function geocodeAddress(query: string) {
  const response = await fetch(`${API_BASE_URL}/maps/geocode`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query } satisfies GeocodeRequest),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Network error' }));
    throw new Error(error.error || 'Geocoding failed');
  }

  return response.json();
}

/**
 * Get application configuration from server
 */
export async function getAppConfig() {
  const response = await fetch(`${API_BASE_URL}/config`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch app config');
  }

  return response.json();
}
