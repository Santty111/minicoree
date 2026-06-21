import { useState, useEffect, useCallback } from 'react';
import type { ReporteLine } from '../../core/domain/entities/ReporteLine';
import { GetLogisticsReportUseCase } from '../../core/useCases/GetLogisticsReport';
import { LocalLogisticsRepository } from '../../infrastructure/repositories/LocalLogisticsRepository';

// Concrete instances are initialized here. In full DI setups, these could be injected via Context.
const repository = new LocalLogisticsRepository();
const getLogisticsReportUseCase = new GetLogisticsReportUseCase(repository);

export const useLogisticsController = () => {
  const [fechaInicio, setFechaInicio] = useState('2025-05-01');
  const [fechaFin, setFechaFin] = useState('2025-05-31');
  const [reporte, setReporte] = useState<ReporteLine[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReport = useCallback(async (start: string, end: string) => {
    setLoading(true);
    setError(null);
    try {
      if (start && end && start > end) {
        throw new Error('La fecha de inicio no puede ser posterior a la fecha de fin.');
      }
      const data = await getLogisticsReportUseCase.execute(start, end);
      setReporte(data);
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error al obtener el reporte de logística.');
      setReporte([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch report on initial mount with the default date range
  useEffect(() => {
    fetchReport(fechaInicio, fechaFin);
  }, [fetchReport]);

  const handleFilter = (start: string, end: string) => {
    setFechaInicio(start);
    setFechaFin(end);
    fetchReport(start, end);
  };

  return {
    fechaInicio,
    fechaFin,
    reporte,
    loading,
    error,
    handleFilter,
  };
};
