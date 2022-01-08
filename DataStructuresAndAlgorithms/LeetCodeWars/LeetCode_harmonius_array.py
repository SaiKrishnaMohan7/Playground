""" 
We define a harmonious array is an array where the difference between its maximum value and its minimum value is exactly 1. 
Now, given an integer array, you need to find the length of its longest harmonious subsequence among all its possible subsequences.
"""

def findLHS(nums):
    """
    :type nums: List[int]
    :rtype: int
    """
    nums_count = {}
    for num in nums:
        nums_count[num] = nums_count.get(num, 0) + 1

    result = 0
    for num in nums_count:
        count = nums_count[num]
        if nums_count.get(num+1):
            result = max(result, count + nums_count[num+1])
    return result

print(findLHS([1,3,2,2,5,2,3,7]))