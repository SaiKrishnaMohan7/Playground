nums = [];

for num in range(1000, 3001):
    s = str(num)

    if((int(s[0]) % 2 == 0) and (int(s[1]) % 2 == 0) and (int(s[2]) % 2 == 0) and (int(s[2]) % 2 == 0)):
        nums.append(num)

print(nums)