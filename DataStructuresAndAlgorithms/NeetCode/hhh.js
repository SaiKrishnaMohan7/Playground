function calPoints(operations) {
  const record = [];

  for (let i = 0; i < operations.length; i++) {
    switch (operations[i]) {
      case "C": {
        record.pop();
        break;
      }
      case "D": {
        const score = record.pop();
        const newScore = score * 2;
        record.push(score, newScore);
        break;
      }
      case "+": {
        const score1 = record.pop();
        const score2 = record.pop();
        const newScore = score1 + score2;
        record.push(score2, score1, newScore);
        break;
      }
      default: {
        record.push(parseInt(operations[i]));
        break;
      }
    }
    console.log(record, operations[i]);
  }

  if (record.length) {
    let sum = 0;
    for (let i = 0; i < record.length; i++) {
      sum = sum + record[i];
    }

    return sum;
  }

  return 0;
}

// console.log(calPoints(["5", "2", "C", "D", "+"]));
console.log(calPoints(["5", "-2", "4", "C", "D", "9", "+", "+"]));
