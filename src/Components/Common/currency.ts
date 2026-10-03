export function currencyFormat(data:any) {
    // Check if the input data contains the currency symbol '￥'
    if (typeof data === 'string' && data.includes('￥')) {
      return data;
    }
  
    // If not, format it as currency
    const formattedPrice = new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(data);
  
    return formattedPrice;
  }
  