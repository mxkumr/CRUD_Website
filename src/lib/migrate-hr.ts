/**
 * One-time migration from legacy agency roles/storage keys to HR recruiting app.
 */
export function runHrLocalStorageMigration(): void {
  if (typeof window === 'undefined') return;

  const role = localStorage.getItem('userRole');
  if (role === 'developer') localStorage.setItem('userRole', 'recruiter');
  if (role === 'marketer') localStorage.setItem('userRole', 'hiring_manager');

  const raw = localStorage.getItem('signupRequests');
  if (raw) {
    try {
      const arr: { desiredRole?: string }[] = JSON.parse(raw);
      const map: Record<string, string> = { developer: 'recruiter', marketer: 'hiring_manager' };
      let changed = false;
      const next = arr.map((u) => {
        if (u.desiredRole && map[u.desiredRole]) {
          changed = true;
          return { ...u, desiredRole: map[u.desiredRole] };
        }
        return u;
      });
      if (changed) localStorage.setItem('signupRequests', JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }

  const dev = localStorage.getItem('developerTasks');
  if (dev && !localStorage.getItem('recruiterTasks')) {
    localStorage.setItem('recruiterTasks', dev);
  }
  const mkt = localStorage.getItem('marketingTasks');
  if (mkt && !localStorage.getItem('hiringManagerTasks')) {
    localStorage.setItem('hiringManagerTasks', mkt);
  }
  const camp = localStorage.getItem('marketingCampaigns');
  if (camp && !localStorage.getItem('candidateImports')) {
    localStorage.setItem('candidateImports', camp);
  }
}
