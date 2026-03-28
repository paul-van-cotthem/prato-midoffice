const BASE_URL = 'http://localhost:5037/api';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

export const api = {
  /**
   * Verzenden van een person-snapshot naar de .NET backend.
   * Past in de Earnie message flow (PersoonGewijzigd).
   */
  async savePersonSnapshot(personId: string, snapshot: any): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(`${BASE_URL}/person/${personId}/snapshot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(snapshot),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          status: response.status,
          error: errorData.message || `Server fout (${response.status})`
        };
      }

      const data = await response.json();
      return { status: response.status, data };
    } catch (err) {
      return {
        status: 500,
        error: 'Netwerkfout: kon geen verbinding maken met de API service.'
      };
    }
  },

  /**
   * Ophalen van alle personen (ter voorbereiding op volledige sync)
   */
  async getPersons(): Promise<ApiResponse<any[]>> {
    try {
      const response = await fetch(`${BASE_URL}/person`);
      const data = await response.json();
      return { status: response.status, data };
    } catch (err) {
      return { status: 500, error: 'Kon personen niet ophalen.' };
    }
  }
};
