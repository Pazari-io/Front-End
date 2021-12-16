export default async function handler(req, res) {
  let avax = 0;
  await fetch('https://api.coingecko.com/api/v3/simple/price?ids=avalanche-2&vs_currencies=USD')
    .then((res) => res.json())
    .then((json) => {
      //console.log(json['avalanche-2']['usd']);
      avax = json['avalanche-2']['usd'];
    });

  if (avax !== 0) {
    let usdPrice = 0;
    if (!req.query['usd']) {
      res.status(200).json({ data: avax, error: null });
    } else {
      usdPrice = req.query['usd'];

      let toAvax = usdPrice / avax;
      res.status(200).json({ data: toAvax.toFixed(18), error: null });
    } // 18 decimal places according to AVAX
  }
}
