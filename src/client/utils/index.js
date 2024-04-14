export const formatCurrency = (value, currency) => {
  const formatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
  });

  return formatter.format(value);
};
