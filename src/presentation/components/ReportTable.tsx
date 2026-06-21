import React from 'react';
import type { ReporteLine } from '../../core/domain/entities/ReporteLine';

interface ReportTableProps {
  reporte: ReporteLine[];
}

export const ReportTable: React.FC<ReportTableProps> = ({ reporte }) => {
  // Aggregate calculations for summary cards
  const totalEnvios = reporte.reduce((sum, item) => sum + item.cantidadEnvios, 0);
  const totalPeso = reporte.reduce((sum, item) => sum + item.totalKg, 0);
  const totalCosto = reporte.reduce((sum, item) => sum + item.costoTotal, 0);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 flex flex-col gap-6">
      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Envíos</p>
            <h3 className="text-3xl font-bold text-white mt-1">{totalEnvios}</h3>
          </div>
          <div className="p-3 bg-brand-500/10 rounded-xl text-brand-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Peso Distribuido</p>
            <h3 className="text-3xl font-bold text-white mt-1">
              {totalPeso.toFixed(2)} <span className="text-sm font-normal text-slate-400">kg</span>
            </h3>
          </div>
          <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Costo Incurrido</p>
            <h3 className="text-3xl font-bold text-[#10b981] mt-1">{formatCurrency(totalCosto)}</h3>
          </div>
          <div className="p-3 bg-[#10b981]/10 rounded-xl text-[#10b981]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Main Responsive Table */}
      <div className="glass-panel rounded-2xl shadow-xl overflow-hidden border border-white/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02]">
                <th className="px-6 py-4 text-xs font-semibold text-brand-200 tracking-wider uppercase">Repartidor</th>
                <th className="px-6 py-4 text-xs font-semibold text-brand-200 tracking-wider uppercase text-center">Envíos</th>
                <th className="px-6 py-4 text-xs font-semibold text-brand-200 tracking-wider uppercase text-right">Peso Total</th>
                <th className="px-6 py-4 text-xs font-semibold text-brand-200 tracking-wider uppercase">Zona(s) Asignada(s)</th>
                <th className="px-6 py-4 text-xs font-semibold text-brand-200 tracking-wider uppercase">Tarifa Aplicada</th>
                <th className="px-6 py-4 text-xs font-semibold text-brand-200 tracking-wider uppercase text-right">Costo Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {reporte.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    No se encontraron datos para el rango de fechas seleccionado.
                  </td>
                </tr>
              ) : (
                reporte.map((row) => (
                  <tr key={row.idRepartidor} className="hover:bg-white/[0.01] transition-colors duration-200">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-white">{row.nombreRepartidor}</div>
                      <div className="text-xs text-slate-400">ID: {row.idRepartidor}</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-semibold bg-brand-500/10 text-brand-100">
                        {row.cantidadEnvios}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-slate-200 font-mono">
                      {row.totalKg.toFixed(2)} kg
                    </td>
                    <td className="px-6 py-4">
                      {row.zonasAsignadas.length === 0 ? (
                        <span className="text-xs italic text-slate-500">No aplica</span>
                      ) : (
                        <div className="flex flex-wrap gap-1.5">
                          {row.zonasAsignadas.map((zona) => (
                            <span key={zona} className="px-2.5 py-0.5 rounded-md bg-[#1f2030] text-slate-300 text-xs border border-white/5 font-medium">
                              {zona}
                            </span>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {row.tarifasAplicadas.length === 0 ? (
                        <span className="text-xs italic text-slate-500">No aplica</span>
                      ) : (
                        <div className="flex flex-wrap gap-1.5 text-xs text-slate-300 font-mono">
                          {row.tarifasAplicadas.map((tarifa) => (
                            <span key={tarifa} className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                              {formatCurrency(tarifa)}/kg
                            </span>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right font-bold font-mono">
                      {row.cantidadEnvios === 0 ? (
                        <span className="text-slate-500 text-xs font-normal italic">No aplica ($0.00)</span>
                      ) : (
                        <span className="text-[#10b981]">{formatCurrency(row.costoTotal)}</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
