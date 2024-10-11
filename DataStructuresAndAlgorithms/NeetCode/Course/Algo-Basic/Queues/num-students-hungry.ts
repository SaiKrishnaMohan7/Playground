// https://leetcode.com/problems/number-of-students-unable-to-eat-lunch/

function countStudents(students: number[], sandwiches: number[]): number {
  // The rotations counter tracks how many students have been unsuccessfully moved to the back of the line.
  let rotations = 0;

  // The loop runs until either all students get sandwiches (students.length = 0) or
  // after a complete rotation where no match happens (indicated by rotations < students.length)
  // If the number of rotations equals the number of students, it means no one can take the current sandwich, and the loop terminates.
  while(students.length > 0 && rotations < students.length) {
      if(students[0] === sandwiches[0]) {
          students.shift();
          sandwiches.shift();
          rotations = 0;
      } else {
          students.push(students.shift()!);
          rotations++;
      }
  }

  return students.length;
};