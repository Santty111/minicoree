export interface ReporteLine {
  idRepartidor: number;
  nombreRepartidor: string;
  cantidadEnvios: number;
  totalKg: number;
  zonasAsignadas: string[];
  tarifasAplicadas: number[];
  costoTotal: number;
}
