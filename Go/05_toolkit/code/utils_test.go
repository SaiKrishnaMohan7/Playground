package utils

import "testing"

func TestAdd(t *testing.T) {
	expected := 4
	actual := utils.Add(1, 2, 3)

	if actual != expected {
		t.Errorf("Incorrect, Actual: %d BUT Expected: %d", actual, expected)
	}
}
