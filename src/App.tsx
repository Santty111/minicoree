import { useLogisticsController } from './presentation/controllers/useLogisticsController';
import { FilterForm } from './presentation/components/FilterForm';
import { ReportTable } from './presentation/components/ReportTable';

function App() {
  const {
    fechaInicio,
    fechaFin,
    reporte,
    loading,
    error,
    handleFilter,
  } = useLogisticsController();

  return (
    <main className="min-h-screen py-12 px-4 md:px-8 bg-radial from-[#1e1b4b]/20 via-[#090a0f] to-[#090a0f] text-slate-100 flex flex-col items-center justify-start gap-8">
      {/* Header Section */}
      <header className="text-center max-w-2xl mx-auto flex flex-col gap-3">
        <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full border border-brand-500/20 bg-brand-500/5 text-brand-200 text-xs font-semibold tracking-wider uppercase mx-auto animate-pulse">
          📦 Mini Core Logística
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-brand-200 bg-clip-text text-transparent">
          Gestión de Costos de Distribución
        </h1>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          Calcule y consolide el costo total de los envíos por repartidor dentro de un rango de fechas, aplicando las tarifas por kilogramo correspondientes a cada zona de entrega.
        </p>
      </header>

      {/* Main Form Section */}
      <section className="w-full max-w-4xl mx-auto flex flex-col gap-4">
        <FilterForm
          initialFechaInicio={fechaInicio}
          initialFechaFin={fechaFin}
          onFilter={handleFilter}
          loading={loading}
        />
        
        {error && (
          <div className="w-full max-w-4xl mx-auto bg-rose-500/10 border border-rose-500/20 text-rose-300 px-5 py-4 rounded-xl flex items-center gap-3 text-sm">
            <svg className="w-5 h-5 shrink-0 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{error}</span>
          </div>
        )}
      </section>

      {/* Main Results Table Section */}
      <section className="w-full">
        {loading ? (
          <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 py-12 items-center justify-center">
            <div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-400 text-sm font-medium">Procesando envíos y tarifas...</p>
          </div>
        ) : (
          <ReportTable reporte={reporte} />
        )}
      </section>

      {/* Context Guide/Seed Data Details */}
      <footer className="w-full max-w-4xl mx-auto mt-12 mb-6">
        <div className="glass-card p-6 rounded-2xl border border-white/5 bg-white/[0.01]">
          <h4 className="text-sm font-semibold text-white tracking-wide uppercase mb-4 flex items-center gap-2">
            <svg className="w-4 h-4 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Información del Seed Data de Prueba (Mayo 2025)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-400 leading-relaxed">
            <div>
              <p className="font-semibold text-slate-300 mb-1">Repartidores Registrados</p>
              <ul className="list-disc pl-4 space-y-1">
                <li><span className="text-slate-200 font-medium">Andrés Mendoza</span> (ID: 1)</li>
                <li><span className="text-slate-200 font-medium">Camila Rojas</span> (ID: 2)</li>
                <li><span className="text-slate-200 font-medium">Luis Delgado</span> (ID: 3)</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-slate-300 mb-1">Tarifas por Zona</p>
              <ul className="list-disc pl-4 space-y-1">
                <li><span className="text-slate-200 font-medium">Zona Norte:</span> $1.50 por kg</li>
                <li><span className="text-slate-200 font-medium">Zona Sur:</span> $2.00 por kg</li>
                <li><span className="text-slate-200 font-medium">Zona Centro:</span> $1.75 por kg</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-slate-300 mb-1">Casos de Validación</p>
              <p>
                El mes de mayo de 2025 incluye envíos en la Zona Norte y Centro para Andrés, y en la Zona Sur para Camila. 
                Luis no registra envíos en mayo de 2025, lo cual permite verificar el estado "No aplica" y costo total de $0.00.
              </p>
            </div>
          </div>
        </div>
        <div className="text-center text-[10px] text-slate-600 mt-6">
          Logistics Mini Core • Arquitectura Limpia (Clean Architecture) • Diseñado para React + TypeScript
        </div>
      </footer>
    </main>
  );
}

export default App;
