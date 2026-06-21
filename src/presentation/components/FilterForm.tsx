import React, { useState } from 'react';

interface FilterFormProps {
  initialFechaInicio: string;
  initialFechaFin: string;
  onFilter: (start: string, end: string) => void;
  loading: boolean;
}

export const FilterForm: React.FC<FilterFormProps> = ({
  initialFechaInicio,
  initialFechaFin,
  onFilter,
  loading,
}) => {
  const [start, setStart] = useState(initialFechaInicio);
  const [end, setEnd] = useState(initialFechaFin);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(start, end);
  };

  return (
    <form
      id="filter-form"
      onSubmit={handleSubmit}
      className="glass-panel p-6 rounded-2xl shadow-xl flex flex-col md:flex-row gap-6 items-end w-full max-w-4xl mx-auto"
    >
      <div className="flex flex-col gap-2 w-full md:w-1/3">
        <label htmlFor="fecha-inicio" className="text-xs font-semibold text-brand-200 tracking-wider uppercase">
          Fecha Inicio
        </label>
        <input
          type="date"
          id="fecha-inicio"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          className="w-full bg-[#11121c] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all duration-300"
          required
        />
      </div>

      <div className="flex flex-col gap-2 w-full md:w-1/3">
        <label htmlFor="fecha-fin" className="text-xs font-semibold text-brand-200 tracking-wider uppercase">
          Fecha Fin
        </label>
        <input
          type="date"
          id="fecha-fin"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          className="w-full bg-[#11121c] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all duration-300"
          required
        />
      </div>

      <button
        type="submit"
        id="submit-filter-btn"
        disabled={loading}
        className="w-full md:w-1/3 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-brand-600/20 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
      >
        {loading ? (
          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        ) : (
          <svg
            className="w-5 h-5 text-white/90"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            />
          </svg>
        )}
        <span>Calcular Costos</span>
      </button>
    </form>
  );
};
