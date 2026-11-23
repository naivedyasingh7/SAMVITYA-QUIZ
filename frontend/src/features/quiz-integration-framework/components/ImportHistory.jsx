import React from 'react';
import { FileText, RotateCcw } from 'lucide-react';

export function ImportHistory({ imports = [], onRefresh, isLoading }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-semibold text-xs text-white">Ingested Results Audit Ledger</h4>
          <p className="text-[11px] text-slate-400">
            {imports.length} {imports.length === 1 ? 'result' : 'results'} recorded & validated
          </p>
        </div>
        {onRefresh && (
          <button
            type="button"
            onClick={onRefresh}
            disabled={isLoading}
            className="text-xs text-slate-300 hover:text-white font-medium px-2 py-1 rounded-md hover:bg-white/[0.05] transition-colors inline-flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3 stroke-[1.75]" />
            <span>{isLoading ? 'Refreshing...' : 'Refresh Log'}</span>
          </button>
        )}
      </div>

      {imports.length === 0 ? (
        <div className="p-8 text-center glass-card border-dashed">
          <FileText className="w-8 h-8 text-slate-500 mx-auto mb-2 stroke-[1.5]" />
          <p className="text-xs font-medium text-slate-300">No results ingested yet</p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Complete a quiz to record and grade participant answers.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto glass-card">
          <table className="min-w-full divide-y divide-white/[0.06] text-left text-xs">
            <thead className="bg-white/[0.02] text-slate-400 font-medium uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-2.5 px-3">Result ID</th>
                <th className="py-2.5 px-3">Participant</th>
                <th className="py-2.5 px-3">Score</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04] text-slate-300">
              {imports.map((item, idx) => {
                const percent = Math.round((Number(item.raw_score || 0) / Number(item.max_score || 100)) * 100);
                return (
                  <tr key={item.external_result_id || item.id || idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-2.5 px-3 font-mono font-medium text-indigo-300">
                      {item.external_result_id}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-300 max-w-[120px] truncate" title={item.participant_id}>
                      {item.participant_id}
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono tabular-nums text-white">
                          {item.raw_score}/{item.max_score}
                        </span>
                        <div className="w-12 h-1 bg-white/[0.08] rounded-xs overflow-hidden">
                          <div
                            className={`h-full rounded-xs ${
                              percent >= 80 ? 'bg-emerald-400' : percent >= 50 ? 'bg-indigo-400' : 'bg-amber-400'
                            }`}
                            style={{ width: `${Math.min(percent, 100)}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono tabular-nums">{percent}%</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono uppercase bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                        {item.completion_status || 'completed'}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-400 whitespace-nowrap text-[11px]">
                      {item.created_at ? new Date(item.created_at).toLocaleTimeString() : 'N/A'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
