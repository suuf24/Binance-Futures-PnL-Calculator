function calculatePnL() {
  const entry = parseFloat(document.getElementById('entryPrice').value);
  const close = parseFloat(document.getElementById('closePrice').value);
  const margin = parseFloat(document.getElementById('margin').value);
  const leverage = parseFloat(document.getElementById('leverage').value);
  const position = document.getElementById('position').value;

  if (!entry || !close || !margin || !leverage) {
    document.getElementById('result').innerHTML = "<span style='color:red'>Please fill out all fields correctly.</span>";
    return;
  }

  const positionSize = margin * leverage;
  const feeRate = 0.0004;
  const totalFees = positionSize * feeRate * 2;
  let profit = 0;

  if (position === "long") {
    profit = (close - entry) * (positionSize / entry);
  } else {
    profit = (entry - close) * (positionSize / entry);
  }

  const netProfit = profit - totalFees;
  const percentage = (netProfit / margin) * 100;

  const liquidationPrice = position === "long"
    ? entry - (entry / leverage)
    : entry + (entry / leverage);

  document.getElementById('result').innerHTML =
    `<strong>PnL Percentage:</strong> ${percentage.toFixed(2)}%<br>` +
    `<strong>Net Profit:</strong> $${netProfit.toFixed(2)} (after fees)<br>` +
    `<strong>Estimated Liquidation Price:</strong> ${liquidationPrice.toFixed(2)}`;
}
