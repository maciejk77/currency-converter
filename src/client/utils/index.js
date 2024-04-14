export const formatCurrency = (value, currency) => {
  const formatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
  });

  return formatter.format(value);
};

export const addConversionToHistory = async (fromAmount, toAmount) => {
  try {
    const response = await fetch('/history', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fromAmount,
        toAmount,
        timestamp: new Date(),
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to save history');
    }
  } catch (err) {
    console.error(err);
  }
};
