Set.prototype.union = function (inputSet) {
  const unionSet = new Set();
  
  for(const item of this) {
    unionSet.add(item);
  }

  for(const item of inputSet) {
    unionSet.add(item);
  }

  return unionSet;
};

Set.prototype.intersection = function (inputSet) {
  const intersectionSet = new Set();

  for (const inputItem of inputSet) {
    if(this.has(inputItem)) {
      intersectionSet.add(inputItem);
    }
  }

  return intersectionSet;
};

Set.prototype.difference = function (inputSet) {
  const differenceSet = new Set();

  for (const inputItem of inputSet) {
    if(!this.has(inputItem)) {
      differenceSet.add(inputItem);
    }
  }

  return differenceSet;
}

Set.prototype.subset = function (inputSet) {
  if (this.size < inputSet.size) {
    return false;
  } else {
    for (const item of this) {
      if (!inputSet.has(item)) {
        return false;
      }
    }
    return true;
  }
}

export default Set;
