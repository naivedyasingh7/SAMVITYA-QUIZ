export const transactionService = {
  async appendTransaction(tx) {
    console.log('Appended immutable transaction:', tx);
    return { id: `tx-${Date.now()}`, ...tx, created_at: new Date().toISOString() };
  }
};
