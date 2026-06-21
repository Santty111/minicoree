import type { LogisticsRepository } from '../domain/repositories/LogisticsRepository';
import type { ReporteLine } from '../domain/entities/ReporteLine';

export class GetLogisticsReportUseCase {
  private logisticsRepository: LogisticsRepository;

  constructor(logisticsRepository: LogisticsRepository) {
    this.logisticsRepository = logisticsRepository;
  }

  async execute(fechaInicio: string, fechaFin: string): Promise<ReporteLine[]> {
    const [repartidores, envios, zonas] = await Promise.all([
      this.logisticsRepository.getRepartidores(),
      this.logisticsRepository.getEnvios(),
      this.logisticsRepository.getZonas(),
    ]);

    const zonasMap = new Map(zonas.map(zona => [zona.id_zona, zona]));

    // Filter shipments within inclusive date range.
    // Comparing YYYY-MM-DD strings directly works perfectly lexicographically.
    const enviosFiltrados = envios.filter(envio => {
      const fecha = envio.fecha_envio;
      const startOk = !fechaInicio || fecha >= fechaInicio;
      const endOk = !fechaFin || fecha <= fechaFin;
      return startOk && endOk;
    });

    // Initialize report structure for all couriers to ensure 0-shipment ones are listed.
    const reportMap = new Map<number, ReporteLine>();
    
    for (const repartidor of repartidores) {
      reportMap.set(repartidor.id_repartidor, {
        idRepartidor: repartidor.id_repartidor,
        nombreRepartidor: repartidor.nombre,
        cantidadEnvios: 0,
        totalKg: 0,
        zonasAsignadas: [],
        tarifasAplicadas: [],
        costoTotal: 0,
      });
    }

    // Accumulate metrics for each shipment
    for (const envio of enviosFiltrados) {
      const line = reportMap.get(envio.id_repartidor);
      if (!line) continue;

      const zona = zonasMap.get(envio.id_zona);
      if (!zona) continue;

      const costo = envio.peso_kg * zona.tarifa_por_kg;

      line.cantidadEnvios += 1;
      line.totalKg = Number((line.totalKg + envio.peso_kg).toFixed(2));
      line.costoTotal = Number((line.costoTotal + costo).toFixed(2));

      if (!line.zonasAsignadas.includes(zona.nombre_zona)) {
        line.zonasAsignadas.push(zona.nombre_zona);
      }
      
      if (!line.tarifasAplicadas.includes(zona.tarifa_por_kg)) {
        line.tarifasAplicadas.push(zona.tarifa_por_kg);
      }
    }

    return Array.from(reportMap.values());
  }
}
