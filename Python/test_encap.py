from PrivateVsProtected import Test

c = Test()

print(c._protected)

c._protected = c._protected + 4
print('Chnage value: ' + str(c._protected))

print(c.__private);