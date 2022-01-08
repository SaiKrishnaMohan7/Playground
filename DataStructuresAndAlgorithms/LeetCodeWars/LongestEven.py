#! usr/bin/env python3
"""Longest even subsequence from a gven array"""

# from itertools import tee, islice, izip_longest
# def get_next(some_iterable, window=1):
#     items, nexts = tee(some_iterable, 2)
#     nexts = islice(nexts, window, None)
#     return izip_longest(items, nexts)


# def longest_even(numbers):
#     if not numbers:
#         return 'Empty Array'
#     even_numbers = []
#     # loop through numbers
#     for num, num_next in get_next(numbers):
#         # if the list is not homogenous
#         if type(num) or type(num_next) is not int:
#             return 'Array not Homogeneous'
#         # if the item is even, put it in the new array
#         elif num % 2 == 0 and num_next % 2 ==0:
#             even_numbers.append(num)
#             even_numbers.append(num_next)
#         # if the number is odd return the array, ensuring continuity
#         elif num % 2 != 0:
#             return even_numbers

        # Question - do we still have to continue to loop through, find other consecutives?
        # if so, maybe a generator could be used instead of a function?

def longest_even(numbers):
    if not numbers:
        return 'Empty Array'
    even_numbers = []
    # loop through numbers
    for index, num in enumerate(numbers):
        # At the last elem
        if index + 1 == len(numbers):
            # Check if last elem is even
            if num % 2 == 0 and index != index - 1:
                if num not in even_numbers:
                    even_numbers.append(num)
            break
        elif num % 2 == 0:
            if num not in even_numbers:
                even_numbers.append(num)
            if numbers[index+1] % 2 == 0:
                even_numbers.append(numbers[index+1])
            else:
                continue                
        
    return even_numbers
        


print(longest_even([1,3,5,7,9,11,2,4, 4, 6, 11, 2, 2]))