// Applied in top-k-frequent-elements.js


function properBucketSort(nums:Array<number>): Array<number> {
  if (nums.length === 0) {
    return nums;
  }

  const maxValueInArray = Math.max(...nums);
  const minValueInArray = Math.min(...nums);

  // Sqrt(length) is based on a common heuristic for Uniformly distributed data
  const numOfBuckets = Math.floor(Math.sqrt(nums.length));
  // The range of values buckets can hold
  const sizeOfEachBucket = (maxValueInArray - minValueInArray) / numOfBuckets;

  const buckets: Array<Array<number>> = Array.from({length: numOfBuckets + 1}, () => []);

  for (const num of nums) {
    const bucketIndex = Math.floor((num - minValueInArray) / sizeOfEachBucket);
    buckets[bucketIndex].push(num);
  }

  return buckets.reduce((sortedArray, bucket) => {
    if(bucket.length > 0) {
      bucket.sort((a, b)=> a - b);
      sortedArray.push(...bucket);
    }

    return sortedArray;
  }, []);
}

// ### 1. **Bucket Index Calculation (`bucketIndex`)**
// The goal of bucket sort is to **distribute** elements into smaller groups (buckets) so that each bucket contains elements within a specific range.
// After distributing, we can sort each bucket individually, and since each bucket has fewer elements than the original array, sorting is faster.

// The formula for calculating the `bucketIndex`:
// ```typescript
// const bucketIndex = Math.floor((num - minValue) / bucketSize);
// ```

// #### Intuition:
// - **`num - minValue`**: This shifts the value of `num` so that the smallest element starts from `0`.
// For example, if `minValue` is `5` and `num` is `7`, `7 - 5 = 2`. This helps to map numbers relative to the minimum value in the dataset.

// - **`bucketSize`**: This represents the range of values that each bucket can hold.
// By dividing the adjusted number (`num - minValue`) by `bucketSize`, we can determine which bucket the element belongs to.

// - **`Math.floor(...)`**: Since dividing might give a decimal (e.g., `2.7`), taking the `floor` ensures we always get an integer index. This index corresponds to the specific bucket where the element should be placed.

// #### Example:
// Imagine you have an array `[7, 5, 12, 6, 3]`, with `minValue = 3` and `maxValue = 12`. Let’s assume we decide to have `3` buckets:
// - **`bucketSize = (maxValue - minValue) / bucketCount = (12 - 3) / 3 = 3`**

// So, the buckets represent ranges like this:
// 1. **Bucket 0**: Values from `3` to `<6` (i.e., `3, 4, 5`)
// 2. **Bucket 1**: Values from `6` to `<9` (i.e., `6, 7, 8`)
// 3. **Bucket 2**: Values from `9` to `12` (i.e., `9, 10, 11, 12`)

// When inserting `7`, the calculation is:
// ```typescript
// bucketIndex = Math.floor((7 - 3) / 3) = Math.floor(4 / 3) = 1
// ```
// So, `7` goes into **Bucket 1**.

// ### 2. **Bucket Size (`bucketSize`)**
// The `bucketSize` represents the **range** of values that each bucket will hold. It is calculated as:
// ```typescript
// bucketSize = (maxValue - minValue) / bucketCount;
// ```

// #### Intuition:
// - **`maxValue - minValue`**: This gives the total range of values in the dataset. Dividing this range by the `bucketCount` tells us how wide each bucket's range should be.
// - The larger the `bucketSize`, the more elements each bucket can contain. Conversely, a smaller `bucketSize` means fewer elements per bucket but more buckets overall.

// #### Example:
// If the range is `9` (`maxValue 12 - minValue 3`), and we have `3` buckets, then:
// - **`bucketSize = 9 / 3 = 3`**
// Each bucket will handle `3` consecutive numbers.

// ### Why Use Mathematical Operations?
// - **Uniform Distribution**: The math allows us to ensure that values are distributed **evenly** across the buckets. By calculating `bucketIndex`, each element is mapped to the correct "zone" based on its value.
// - **Efficient Sorting**: Since each bucket holds a smaller subset of the input array, sorting them is faster than sorting the entire array at once.
// - **Generalized Solution**: The approach is flexible; by changing `bucketCount` or `bucketSize`, you can adapt the sort to different data distributions.

// ### Summary
// The `bucketIndex` calculation ensures that every value is **mapped** correctly into a
// smaller bucket based on its value. The `bucketSize` ensures that these buckets cover a **specific range**.
// Together, these calculations help in splitting the original sorting problem into smaller, manageable pieces that can be solved more efficiently.


// The **`bucketCount`** is a crucial parameter in bucket sort, and the intuition behind it revolves around balancing **efficiency** and **distribution**.
// Choosing an appropriate number of buckets can greatly impact the performance of the sorting algorithm. Here's how to think about it:

// ### 1. **Balancing the Load:**
// The purpose of `bucketCount` is to decide **how many smaller groups (buckets)** you want to divide the input array into.
// Each bucket will hold elements that fall within a specific range of values. The goal is to **distribute the elements as evenly as possible** across the buckets.

// - **More Buckets (Higher `bucketCount`):**
//   - Each bucket will have fewer elements, making it faster to sort each bucket individually.
//   - However, creating too many buckets can be inefficient if most of them end up empty or with very few elements
// (since we still have to check them during the merge step).
//   - It can lead to unnecessary overhead in processing and memory usage.

// - **Fewer Buckets (Lower `bucketCount`):**
//   - Each bucket will have more elements, potentially leading to uneven distribution.
//   - If the data isn’t distributed well, it might cause some buckets to become overloaded, leading to a slower sort (since sorting large buckets can take more time).
//   - The fewer buckets you have, the less advantage you're getting from bucket sort, as you're not fully leveraging the benefits of dividing the problem.

// ### 2. **Intuitive Choice:**
// A common heuristic for setting `bucketCount` is to use **`√n`** (the square root of the number of elements `n`). The intuition behind this is based on a **balance**:
// - If you have `n` elements, splitting them into approximately `√n` buckets often gives a **good balance** between the number of elements per bucket and
// the number of buckets.
// - This heuristic tends to work well because it reduces the complexity of sorting each bucket to a manageable size while keeping the number of buckets reasonable.

// **Example:**
// - Suppose you have `100` elements. Using `√100 = 10` buckets means each bucket will roughly handle around `10` elements.
// - This is usually small enough to sort quickly (using a simple sort like insertion sort or JavaScript’s `Array.sort`).

// ### 3. **Adapting `bucketCount` to Data Distribution:**
// The choice of `bucketCount` can vary depending on your **data distribution**:
// - **Uniformly Distributed Data:** `√n` or a similar heuristic often works well because the data is spread out evenly, so each bucket gets a fair share of elements.
// - **Clustered Data:** If your data tends to cluster around certain values (e.g., many elements are close to each other), using `√n` might not work well. You might end up with some buckets getting overloaded.
//   - In such cases, you might increase `bucketCount` to spread the data out more or even consider a **dynamic bucketing approach** (where you allocate buckets based on the data as you scan through it).

// ### 4. **Why the Heuristic Works:**
// The heuristic of using `√n` buckets comes from balancing two opposing forces:
// 1. **Cost of Sorting Each Bucket:**
//    - If `n` is large, dividing it by `√n` gives smaller subproblems to sort. Sorting fewer elements per bucket can be done in linear or near-linear time using efficient algorithms.
// 2. **Cost of Creating and Merging Buckets:**
//    - Having `√n` buckets ensures that there are enough buckets to distribute the data reasonably well, reducing the chances of a single bucket holding too many elements.
//    - At the same time, it keeps the number of buckets manageable, avoiding too much overhead.

// ### Summary:
// The `bucketCount` parameter helps determine how **finely you want to divide** your data. The balance you strike can affect performance:
// - Too few buckets = too many elements in each bucket, leading to slow sorting within buckets.
// - Too many buckets = overhead with too many empty/underfilled buckets, wasting time and space.

// Using **`√n`** as a guideline gives a balance between having enough buckets to distribute elements evenly while keeping each bucket small enough for efficient sorting.
// However, you should adjust it based on your data characteristics and experiment to find the best performance for your specific use case.

function bucket_sort(nums:Array<number>): Array<number> {
  // Find the maximum element in the array to define the range of the counts array
  const maxElementInArray = Math.max(...nums);
  const counts = Array(maxElementInArray + 1).fill(0);

  // count the number of times an element occurs (could use a hashmap)
  for(const num of nums) {
    counts[num] = counts[num] + 1;
  }

  // Reconstruct the sorted array
  let index = 0;
  for (let n = 0; n < counts.length; n++) {
    while (counts[n] > 0) {
      nums[index] = n;
      index = index + 1;
      counts[n] = counts[n] - 1;
    }
  }

  return nums;
}