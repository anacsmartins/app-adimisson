import axios from 'axios';
import { registrationService } from '~/services/registrationService';
import { RegistrationData } from '~/types/RegistrationData';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('RegistrationService', () => {
  const registrationMock: RegistrationData = {
    id: '1',
    employeeName: 'John Doe',
    email: 'johndoe@example.com',
    admissionDate: '01/01/2024',
    cpf: '123.456.789-00',
    status: 'REVIEW'
  };

  it('should fetch registrations successfully', async () => {
    mockedAxios.get.mockResolvedValue({ data: [registrationMock] });

    const result = await registrationService.find();
    expect(result).toEqual([registrationMock]);
    expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3000/registrations', { params: {} });
  });

  it('should create a new registration successfully', async () => {
    mockedAxios.post.mockResolvedValue({ data: registrationMock });

    const newRegistration: RegistrationData = {
      id: '',
      employeeName: 'Jane Doe',
      email: 'janedoe@example.com',
      admissionDate: '01/02/2024',
      cpf: '987.654.321-00',
      status: 'REVIEW'
    };

    const result = await registrationService.create(newRegistration);
    expect(result).toEqual(registrationMock);
    expect(mockedAxios.post).toHaveBeenCalledWith('http://localhost:3000/registrations', newRegistration);
  });

  it('should update registration status', async () => {
    mockedAxios.put.mockResolvedValue({ data: registrationMock });

    const result = await registrationService.updateStatus('1', 'APPROVED');
    expect(result).toEqual(registrationMock);
    expect(mockedAxios.put).toHaveBeenCalledWith('http://localhost:3000/registrations/1', expect.any(Object));
  });

  it('should delete a registration successfully', async () => {
    mockedAxios.delete.mockResolvedValue({ data: [] });

    const result = await registrationService.delete('1');
    expect(result).toEqual([]);
    expect(mockedAxios.delete).toHaveBeenCalledWith('http://localhost:3000/registrations/1');
  });
});
