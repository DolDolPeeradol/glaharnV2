export const calculateTotalDebt = (debts) => {
    return debts.reduce((total, debt) => total + debt.amountOwed, 0);
  };
  
  export const resetAllDebts = () => {
    localStorage.removeItem('debts');
  };
  