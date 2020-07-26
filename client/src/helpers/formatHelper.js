const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const formatNumber = (value) => {
  return new Intl.NumberFormat('pt-BR').format(value);
};

const formatPercentage = (value, digits = 2) => {
  const percentValue = value / 100;
  return new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    maximumFractionDigits: digits,
  }).format(percentValue);
};

export { formatCurrency, formatNumber, formatPercentage };
