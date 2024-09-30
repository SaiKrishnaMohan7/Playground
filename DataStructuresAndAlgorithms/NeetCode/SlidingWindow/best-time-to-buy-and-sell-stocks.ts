// 121. https://leetcode.com/problems/best-time-to-buy-and-sell-stock/

function maxProfit(prices: number[]): number {
  let maxProfit = 0;
  let buy = 0;
  let sell = 1;

  while (sell < prices.length) {
      if (prices[buy] < prices[sell]) {
          let profit = prices[sell] - prices[buy];
          maxProfit = Math.max(profit, maxProfit);
      } else {
          // If the price at sell is less than or equal to the price at buy, it means there’s no profit to be made by selling at the current sell day. In this case, it’s better to move the buy pointer to the same position as sell,
          // because the sell price is lower, and we would want to "buy" at this lower price on future iterations.
          buy = sell;
      }
      // increment sell pointer regardless as we always want to know the price tomorrow
      sell = sell + 1;
  }

  return maxProfit;
};