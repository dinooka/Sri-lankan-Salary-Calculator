export function printPaySlip(results) {
  const width = 34;
  // const width = Math.max(...Object.keys(results).map((key) => key.length));
  const valueColumnWidth = Math.max(
    ...Object.values(results).map((v) => String(v).length),
  );

  for (const key in results) {
    const num = Number(results[key]);

    if (num === 0) continue;

    const value = num.toFixed(2);
    const alignedValue = value.padStart(valueColumnWidth);
    console.log(key.padEnd(width) + " = " + alignedValue);
  }
}
