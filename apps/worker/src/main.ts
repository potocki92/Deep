/** Phase 0 process boundary. Queue consumers will be added only when needed. */
export function startWorker(): void {
  console.log("GŁĘBIA worker ready; no jobs are configured in Phase 0.");
}

startWorker();
