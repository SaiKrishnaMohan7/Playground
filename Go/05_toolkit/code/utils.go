// Package utils is a custom package
package utils

// Add adds together multiple integers
// In Go, variables (?) or functions that start with a capital letter are exported automatically
// and by convention requires a comment
func Add(nums ...int) int {
	total := 0
	for _, num := range nums {
		total += num
	}

	return total
}
