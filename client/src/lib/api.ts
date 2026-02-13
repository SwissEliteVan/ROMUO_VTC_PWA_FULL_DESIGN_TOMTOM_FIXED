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

/**
 * Fetch driver documents that require validation
 */
export async function getDriverDocuments() {
  const response = await fetch(`${API_BASE_URL}/admin/driver-documents`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch driver documents');
  }

  return response.json();
}

/**
 * Validate a driver document
 * @param documentId ID of the document to validate
 */
export async function validateDocument(documentId: string) {
  const response = await fetch(`${API_BASE_URL}/admin/validate-document`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ documentId }),
  });

  if (!response.ok) {
    throw new Error('Failed to validate document');
  }

  return response.json();
}

/**
 * Fetch commissions data
 */
export async function getCommissions() {
  const response = await fetch(`${API_BASE_URL}/admin/commissions`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch commissions');
  }

  return response.json();
}

/**
 * Update commission status
 * @param commissionId ID of the commission to update
 * @param status New status for the commission
 */
export async function updateCommissionStatus(commissionId: string, status: string) {
  const response = await fetch(`${API_BASE_URL}/admin/update-commission`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ commissionId, status }),
  });

  if (!response.ok) {
    throw new Error('Failed to update commission status');
  }

  return response.json();
}

/**
 * Fetch fleet statistics
 */
export async function getFleetStats() {
  const response = await fetch(`${API_BASE_URL}/admin/fleet-stats`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch fleet statistics');
  }

  return response.json();
}
