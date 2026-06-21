import { describe, it, expect } from 'vitest';
import { GetLogisticsReportUseCase } from './GetLogisticsReport';
import type { LogisticsRepository } from '../domain/repositories/LogisticsRepository';
import type { Repartidor } from '../domain/entities/Repartidor';
import type { Envio } from '../domain/entities/Envio';
import type { Zona } from '../domain/entities/Zona';

// Mock dataset for clean isolated tests
const mockRepartidores: Repartidor[] = [
  { id_repartidor: 1, nombre: 'Andrés Mendoza', email: 'andres@test.com' },
  { id_repartidor: 2, nombre: 'Camila Rojas', email: 'camila@test.com' },
  { id_repartidor: 3, nombre: 'Luis Delgado', email: 'luis@test.com' },
];

const mockZonas: Zona[] = [
  { id_zona: 1, nombre_zona: 'Zona Norte', tarifa_por_kg: 1.50 },
  { id_zona: 2, nombre_zona: 'Zona Sur', tarifa_por_kg: 2.00 },
];

const mockEnvios: Envio[] = [
  // Andrés Mendoza - Zone Norte ($1.50) & Zone Sur ($2.00)
  { id_envio: 101, id_repartidor: 1, id_zona: 1, peso_kg: 10.0, fecha_envio: '2025-05-10' }, // Cost: 15.00
  { id_envio: 102, id_repartidor: 1, id_zona: 2, peso_kg: 5.0, fecha_envio: '2025-05-20' },  // Cost: 10.00
  
  // Camila Rojas - Zone Sur ($2.00)
  { id_envio: 103, id_repartidor: 2, id_zona: 2, peso_kg: 8.0, fecha_envio: '2025-05-15' },  // Cost: 16.00
  
  // Andrés Mendoza - Out of range (June 2025)
  { id_envio: 104, id_repartidor: 1, id_zona: 1, peso_kg: 20.0, fecha_envio: '2025-06-01' },
];

class MockLogisticsRepository implements LogisticsRepository {
  async getRepartidores() { return mockRepartidores; }
  async getEnvios() { return mockEnvios; }
  async getZonas() { return mockZonas; }
}

describe('GetLogisticsReportUseCase', () => {
  const repository = new MockLogisticsRepository();
  const useCase = new GetLogisticsReportUseCase(repository);

  it('should correctly calculate shipment metrics inside a date range', async () => {
    const report = await useCase.execute('2025-05-01', '2025-05-31');

    expect(report).toHaveLength(3);

    // Andrés Mendoza
    const andresLine = report.find(r => r.idRepartidor === 1);
    expect(andresLine).toBeDefined();
    expect(andresLine?.cantidadEnvios).toBe(2);
    expect(andresLine?.totalKg).toBe(15.0); // 10 + 5
    expect(andresLine?.costoTotal).toBe(25.0); // 15 + 10
    expect(andresLine?.zonasAsignadas).toContain('Zona Norte');
    expect(andresLine?.zonasAsignadas).toContain('Zona Sur');
    expect(andresLine?.tarifasAplicadas).toContain(1.5);
    expect(andresLine?.tarifasAplicadas).toContain(2.0);

    // Camila Rojas
    const camilaLine = report.find(r => r.idRepartidor === 2);
    expect(camilaLine).toBeDefined();
    expect(camilaLine?.cantidadEnvios).toBe(1);
    expect(camilaLine?.totalKg).toBe(8.0);
    expect(camilaLine?.costoTotal).toBe(16.0); // 8 * 2.00
    expect(camilaLine?.zonasAsignadas).toEqual(['Zona Sur']);
    expect(camilaLine?.tarifasAplicadas).toEqual([2.0]);

    // Luis Delgado (no shipments in May 2025)
    const luisLine = report.find(r => r.idRepartidor === 3);
    expect(luisLine).toBeDefined();
    expect(luisLine?.cantidadEnvios).toBe(0);
    expect(luisLine?.totalKg).toBe(0);
    expect(luisLine?.costoTotal).toBe(0);
    expect(luisLine?.zonasAsignadas).toEqual([]);
    expect(luisLine?.tarifasAplicadas).toEqual([]);
  });

  it('should filter shipments inclusively', async () => {
    // Only includes 2025-05-15 to 2025-05-20 (Andrés 102 and Camila 103)
    const report = await useCase.execute('2025-05-15', '2025-05-20');

    const andresLine = report.find(r => r.idRepartidor === 1);
    expect(andresLine?.cantidadEnvios).toBe(1);
    expect(andresLine?.totalKg).toBe(5.0);
    expect(andresLine?.costoTotal).toBe(10.0);

    const camilaLine = report.find(r => r.idRepartidor === 2);
    expect(camilaLine?.cantidadEnvios).toBe(1);
    expect(camilaLine?.totalKg).toBe(8.0);
    expect(camilaLine?.costoTotal).toBe(16.0);
    
    const luisLine = report.find(r => r.idRepartidor === 3);
    expect(luisLine?.cantidadEnvios).toBe(0);
  });

  it('should return empty metrics for all couriers if range matches zero shipments', async () => {
    const report = await useCase.execute('2024-01-01', '2024-12-31');
    
    expect(report).toHaveLength(3);
    report.forEach(line => {
      expect(line.cantidadEnvios).toBe(0);
      expect(line.totalKg).toBe(0);
      expect(line.costoTotal).toBe(0);
      expect(line.zonasAsignadas).toEqual([]);
      expect(line.tarifasAplicadas).toEqual([]);
    });
  });
});
