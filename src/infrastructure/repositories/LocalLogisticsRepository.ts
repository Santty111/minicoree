import type { LogisticsRepository } from '../../core/domain/repositories/LogisticsRepository';
import type { Repartidor } from '../../core/domain/entities/Repartidor';
import type { Envio } from '../../core/domain/entities/Envio';
import type { Zona } from '../../core/domain/entities/Zona';
import { seedRepartidores, seedEnvios, seedZonas } from '../data/seedData';

export class LocalLogisticsRepository implements LogisticsRepository {
  async getRepartidores(): Promise<Repartidor[]> {
    // Return a shallow copy of the seed data to simulate database queries.
    return [...seedRepartidores];
  }

  async getEnvios(): Promise<Envio[]> {
    return [...seedEnvios];
  }

  async getZonas(): Promise<Zona[]> {
    return [...seedZonas];
  }
}
