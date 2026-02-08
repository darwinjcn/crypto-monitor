/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const { cryptoId, prices } = data as { 
    cryptoId: string; 
    prices: Array<{ price: number }> 
  };

  if (!prices || prices.length === 0) {
    return;
  }

  // Calcular promedio móvil (SMA - Simple Moving Average)
  const movingAverage = prices.reduce(
    (sum: number, p: { price: number }) => sum + p.price, 
    0
  ) / prices.length;

  // Calcular volatilidad (desviación estándar)
  const variance = prices.reduce(
    (sum: number, p: { price: number }) => 
      sum + Math.pow(p.price - movingAverage, 2), 
    0
  ) / prices.length;
  
  const volatility = Math.sqrt(variance);

  // Enviar resultados de vuelta
  postMessage({ 
    cryptoId, 
    movingAverage, 
    volatility 
  });
});
