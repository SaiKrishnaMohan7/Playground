const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

function walk(maze: string[], wall: string, curr: Point, end: Point, seen: boolean[][], path: Point[]): boolean {
  // Base case
  // 1. does the current point lie outside of the maze?
  if (curr.x < 0 || curr.y >= maze[0].length || curr.y < 0 || curr.y > maze.length) {
    return false;
  }

  // 2. The curr coordinates are that of a wall
  if (maze[curr.x][curr.y] === wall) {
    return false;
  }

  // 3. We have reached the end of the maze! Success
  if (curr.x === end.x && curr.y === end.y) {
    path.push(end); // push this as it doesn't get added
    return true;
  }

  // 4. We have already been through this path, i.e. we have already seen it
  if (seen[curr.x][curr.y]) {
    return true;
  }

  // Recurse
  // pre
  seen[curr.y][curr.x] = true;
  path.push(curr);
  // recurse
  for (let i = 0; i < directions.length; i++) {
    const [x, y] = directions[i];
    if (walk(maze, wall, {
      x: curr.x + x,
      y: curr.y + y,
    }, end, seen, path)) {
      return true;
    }

  }

  // post
  path.pop();

  return false;
}

export default function solve(maze: string[], wall: string, start: Point, end: Point): Point[] {
  const seen: boolean[][] = [];
  const path: Point[] = [];

  for (let i = 0; i < maze.length; i++) {
    seen.push(new Array(maze[0].length).fill(false));
  }

  walk(maze, wall, start, end, seen, path);
  return path;
}