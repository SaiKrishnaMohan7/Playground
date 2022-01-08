from copy import deepcopy as dc

def possible_bit_strings(bit_expr):
  bit_list = list(bit_expr)
  bit_list_cp = dc(bit_list)
  possible_values = list()
  idx_arr = list()

  for idx, value in enumerate(bit_expr):
    if value == '?':
      idx_arr.append(idx)
  
  for k in idx_arr:
    bit_list[k] = '0'
    possible_values.append(''.join(bit_list))
    bit_list_cp[k] = '1'
    possible_values.append(''.join(bit_list_cp))
  
  # possible_values = bit_list + bit_list_cp

  return possible_values



print(possible_bit_strings('00??'))
