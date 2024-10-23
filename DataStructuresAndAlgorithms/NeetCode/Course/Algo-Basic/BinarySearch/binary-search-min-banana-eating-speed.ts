// https://leetcode.com/problems/koko-eating-bananas/description/

function minEatingSpeed(piles: number[], h: number): number {
  let left = 1;
  let right = Math.max(...piles);

  let canFinish = (speedOfConsumption: number): boolean => {
    let netTimeTakenToFinishAllPiles = 0;
    for (let pile of piles) {
      netTimeTakenToFinishAllPiles =
        netTimeTakenToFinishAllPiles + Math.ceil(pile / speedOfConsumption);
    }

    return netTimeTakenToFinishAllPiles <= h;
  };

  while (left < right) {
    let mid = Math.floor(left + (right - left) / 2);

    if (canFinish(mid)) {
      // If Koko can finish eating at this speed, try to find a slower speed; WE WANT THE MIN SPEED!!
      right = mid;
    } else {
      // If not, she needs to eat faster, so increase the speed
      left = mid + 1;
    }
  }

  // At the end, 'left' will be the minimum speed at which she can finish in 'H' hours
  return left;
}
