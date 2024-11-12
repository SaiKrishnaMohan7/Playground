# DFT

## Rule of Thumb

- Use **recursive** solutions for problems where:
  - The recursion depth is manageable
    - Enough stack memory is available
  - The problem is naturally recursive (e.g., divide-and-conquer, tree traversals).
  - Readability and ease of implementation are priorities.

- Use **iterative** solutions for:
  - Performance-critical applications.
  - Problems with deep recursion that may exceed stack limits.
  - Scenarios where maintaining explicit state improves clarity or functionality.

## In practice

developers often prototype with recursion for simplicity and switch to an iterative approach for production systems if performance or resource constraints require it.