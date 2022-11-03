
// Given two crystal balls that will break if dropped from high enough
// distance, determine the exact spot in which it will break in the most
// optimized way

// The above is the generalization of the interview problem
// If you drop two crystal balls from a 100 storey building
// find the exact spot where they break in the most efficient
// way possible
export default function two_crystal_balls(breaks: boolean[]): number {
  // For finding where the balls break, we will think of `breaks` as an array
  // that has boolean values, basically, there will be a point where one ball
  // breaks and there will be another point where the other ball breaks, so we
  // will have two `true` values and we need to find them. The array may be
  // sorted and hence we could use a linear search to find the values but that
  // is not the best. We could go with splitting the array in half and then checking
  // the value but that will give us a worst case of O(N/2) whihc is O(N).
  // Therefore instead of halving the array, we can jump sqrt(n) (chosen to avoid linear time;
  // if we choose higher roots then it will tend closer to 1 and hence becomes linear) times in the array
  // and if we find one of the `true` values we go back to the last `false` value and
  // jump ahead sqrt(n)

  let jumpAmount = Math.floor(Math.sqrt(breaks.length));
  let ballOneBreaksAt = 0;
  let ballTwoBreaksAt = 0;

  let i = jumpAmount;
  // jump ahead by jumpAmount
  for ( ; i < breaks.length; i++) {
    if (breaks[i]){
      ballOneBreaksAt = i;
      break;
    }
  }

  // Jump back by jumpAmount
  i -= jumpAmount;

  // jump ahead by jumpAmount
  for(let j = 0; j < breaks.length; j++, i++) {
    if (breaks[i]){
      ballTwoBreaksAt = i;
      return i;
    }
  }

  // return { ballOneBreaksAt, ballTwoBreaksAt };
  return -1;
}