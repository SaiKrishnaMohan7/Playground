def hash(key, load):
    return sum([ord(c) for c in key]) % load

class HashTable(object):

    def __init__(self, capacity, load):
        self.capacity = capacity
        self.load = load
        self.curr_capacity = 0
    
        self.slots = [None] * self.capacity

    def set(self, key, value):
        key_hash = hash(key, self.load)
        slot = key_hash % self.capacity

        if self.slots[slot] is None:
            self.slots[slot] = HashEntry(key, value)
        else:
            self._set_ll(self, key, value, self.slots, slot)
        # loading and resizing
        self.curr_capacity += 1
        curr_load = float(self.curr_capacity) / float(self.capacity)

        if curr_load >= self.load:
            self.resize()
        
    def _set_ll(self, key, value, slots, slot):
        curr = self.slots[slot]

        while curr is not None:
            if curr.key == key:
                curr.value = value
                curr = None
            elif curr.next is None:
                curr.next = HashEntry(key, value)
                curr = None
            else:
                curr = curr.next

    # Given key, hash to slot, return value if not empty or None if empty
    def get(self, key):
        key_hash = hash(key, self.load)
        slot = key_hash % self.capacity

        if self.slots[slot] is not None:
            curr = self.slots[slot]
            while curr is not None:
                if curr.key == key:
                    return curr.value
                curr = curr.next

    # Resizing: Double the current capacity, rehash every object
    def resize(self):
        new_capacity = self.capacity * 2
        new_slots = [None] * new_capacity

        # rehash all items into new slots
        for slot_index in range(0, len(self.slots)):
            curr = self.slots[slot_index]
            while curr is not None:
                key_hash = hash(curr.key, self.load)
                new_slot = key_hash % new_capacity
                if new_slots[new_slot] is None:
                    new_slots[new_slot] = HashEntry(curr.key, curr.value)
                else:
                    self._set_ll(curr.key, curr.value, new_slots, new_slot)

                curr = curr.next

        self.slots = new_slots
        self.capacity = new_capacity

# Using a LL stored at slot to prevent collision, store key val at end if problems
class HashEntry(object):

    def __init__(self, k, v):
        self.key = k
        self.value = v
        self.next = None


if __name__ == '__main__':
    ht = HashTable(10, 10)

    ht.set('Sai', 25)

    print(ht.get('Sai'))