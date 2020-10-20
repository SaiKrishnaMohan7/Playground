package main

import "fmt"

func main() {
	var mySentence string = "Ek lola aur chaar golae"
	// mySentence := "blah" // will only work if within a scope

	// _ can be used as a throwaway var like python
	for index, value := range mySentence {
		if index%2 == 0 {
			fmt.Println(string(value))
		}
	}

}
