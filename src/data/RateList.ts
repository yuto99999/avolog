export type Rate = {
    code: number;
    rate: number;
  };
  
  export const RateList: Rate[] = [];
  
  for (let i = 0.1; i <= 5.0; i += 0.1) {
    RateList.push({ code: Math.round(i * 10), rate: parseFloat(i.toFixed(1)) });
  }