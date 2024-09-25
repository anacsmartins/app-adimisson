import axios, { isAxiosError } from 'axios';
import { RegistrationData } from '~/types/RegistrationData';
import formatDate from '~/utils/helpers';

const baseUrl = `http://localhost:3000/registrations`;

interface Filter {
  cpf?: string;
  id?: string;
}

class RegistrationService {
  async find(filter: Filter = {}): Promise<RegistrationData[]> {
    try {
      const response = await axios.get<RegistrationData[]>(baseUrl, { params: filter });
      return response.data;
    } catch (error) {
      this.handleError(error, 'Fetch error');
    }
  }

  async updateStatus(id: string, status: string): Promise<RegistrationData> {
    const url = `${baseUrl}/${id}`;
    try {
      const registrationData = await this.find({ id });
      if (!registrationData.length) throw new Error('Registration not found');

      registrationData[0].status = status;
      
      const response = await axios.put<RegistrationData>(url, registrationData[0]);
      return response.data;
    } catch (error) {
      this.handleError(error, 'Error updating registration status');
    }
  }

  async delete(id: string): Promise<RegistrationData[]> {
    const url = `${baseUrl}/${id}`;
    try {
      const response = await axios.delete(url);      
      return response.data;
    } catch (error) {
      this.handleError(error, 'Error deleting registration');
    }
  }

  async create(data: RegistrationData): Promise<RegistrationData> {
    try {
      const registrations = await this.find();
      registrations.sort((a, b) => parseInt(b.id) -  parseInt(a.id))

      data.id = `${parseInt(registrations[0].id) + 1}`
      data.admissionDate = formatDate(data.admissionDate)

      const response = await axios.post<RegistrationData>(baseUrl, data);
      return response.data;
    } catch (error) {
      this.handleError(error, 'Error creating registration');
    }
  }

  private handleError(error: unknown, message: string): never {
    if (isAxiosError(error)) {
      console.error('Axios error:', error.response?.data);
    } else {
      console.error('Unknown error:', error);
    }
    throw new Error(message);
  }
}

export const registrationService = new RegistrationService();
