def get_unique(arr):
    freq = []

    for num in arr:
        freq.append(arr.count(num))

    freq_dict = dict(zip(arr, freq))

    for key in freq_dict:
        if freq_dict[key] == 1:
            print(key)

get_unique([1,1,2,3,2,4,5,5,6,6,3,7,8,8,8,7])