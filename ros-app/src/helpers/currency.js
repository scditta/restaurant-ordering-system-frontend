export function currency(itemPrice = {}) {
  return (itemPrice / 100).toLocaleString('en-ca', { style: 'currency', currency: 'CAD' });
}
