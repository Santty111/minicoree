import type { Repartidor } from '../../core/domain/entities/Repartidor';
import type { Zona } from '../../core/domain/entities/Zona';
import type { Envio } from '../../core/domain/entities/Envio';

export const seedRepartidores: Repartidor[] = [
  { id_repartidor: 1, nombre: 'Andrés Mendoza', email: 'andres.mendoza@logistics.com' },
  { id_repartidor: 2, nombre: 'Camila Rojas', email: 'camila.rojas@logistics.com' },
  { id_repartidor: 3, nombre: 'Luis Delgado', email: 'luis.delgado@logistics.com' }
];

export const seedZonas: Zona[] = [
  { id_zona: 1, nombre_zona: 'Zona Norte', tarifa_por_kg: 1.50 },
  { id_zona: 2, nombre_zona: 'Zona Sur', tarifa_por_kg: 2.00 },
  { id_zona: 3, nombre_zona: 'Zona Centro', tarifa_por_kg: 1.75 }
];

export const seedEnvios: Envio[] = [
  // Andrés Mendoza - May 2025 (Active)
  { id_envio: 101, id_repartidor: 1, id_zona: 1, peso_kg: 12.5, fecha_envio: '2025-05-02' },
  { id_envio: 102, id_repartidor: 1, id_zona: 1, peso_kg: 8.0, fecha_envio: '2025-05-14' },
  { id_envio: 103, id_repartidor: 1, id_zona: 3, peso_kg: 15.0, fecha_envio: '2025-05-25' },
  
  // Camila Rojas - May 2025 (Active)
  { id_envio: 104, id_repartidor: 2, id_zona: 2, peso_kg: 20.0, fecha_envio: '2025-05-05' },
  { id_envio: 105, id_repartidor: 2, id_zona: 2, peso_kg: 5.5, fecha_envio: '2025-05-18' },
  
  // Envíos fuera del rango de Mayo 2025 para probar filtros
  // Andrés Mendoza - June 2025
  { id_envio: 106, id_repartidor: 1, id_zona: 1, peso_kg: 10.0, fecha_envio: '2025-06-01' },
  // Luis Delgado - June 2025 (Luis has 0 shipments in May 2025)
  { id_envio: 107, id_repartidor: 3, id_zona: 2, peso_kg: 10.0, fecha_envio: '2025-06-15' }
];
