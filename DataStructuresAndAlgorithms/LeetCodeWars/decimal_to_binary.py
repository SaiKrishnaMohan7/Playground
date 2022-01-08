#! usr/bin/env python3

def decimal_to_binary(number):
  	# check if non negative whole number
		if not isinstance(number, int):
  			TypeError('Should be a whole number')
		
		if number > 0:
			isneg = True
		else:
			isneg = False	
		
		num_abs = abs(number)
		# We need a LIFO DS for this
		stack = list()

		# keep inserting the result into the stack while the value is > 0
		while num_abs > 0:
  			# insert at the 0th position
				stack.insert(0 , str(num_abs % 2))
				
				num_abs = num_abs // 2

		# check positive, insert 0 else 1 to indicate -ve
		if isneg:
			stack.insert(0, str(0))
		else:
			stack.insert(0, str(1))
	
		return ''.join(stack)

print(decimal_to_binary(12))