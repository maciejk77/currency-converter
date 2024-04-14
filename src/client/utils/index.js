export const formatCurrency = (conversionRate, inputAmount, currency) => {
  const value = conversionRate * inputAmount;
  const formatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
  });

  return formatter.format(value);
};
