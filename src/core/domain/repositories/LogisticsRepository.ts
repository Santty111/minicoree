import type { Repartidor } from '../entities/Repartidor';
import type { Envio } from '../entities/Envio';
import type { Zona } from '../entities/Zona';

export interface LogisticsRepository {
  getRepartidores(): Promise<Repartidor[]>;
  getEnvios(): Promise<Envio[]>;
  getZonas(): Promise<Zona[]>;
}
