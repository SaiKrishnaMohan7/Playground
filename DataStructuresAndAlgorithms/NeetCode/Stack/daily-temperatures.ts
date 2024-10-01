// https://leetcode.com/problems/daily-temperatures/

function dailyTemperatures(temperatures: number[]): number[] {
  const res = new Array(temperatures.length).fill(0);
  // Monotonic Stack: can have entries increasing of decreasing order
  // Used to find Next Greater Element, Prev Greater element, Largest Traingle in histogram, expression evaluation
  const stack: number[] = []; // Stack stores indices of temperatures

  temperatures.forEach((currentTemp, currentIndex) => {
      // Compare currentTemp with temperatures at indices stored in the stack
      while (stack.length && currentTemp > temperatures[stack[stack.length - 1]]) { // TOS has the idx of the highest value seen till now so no need to store temp, can be accessed with idx
          const prevIndex = stack.pop()!;
          res[prevIndex] = currentIndex - prevIndex; // Calculate the difference in days
      }
      // Push the current index to the stack
      stack.push(currentIndex);
  });

  return res;
}