package main

import (
	"errors"
	"fmt"
)

func isGreaterThanTen(num int) error {
	if num < 10 {
		return errors.New("something bad happened")
	}
	return nil
}

// func openFile() error {
// 	f, err := os.Open("missingFile.txt")
// 	if err != nil {
// 		return err
// 	}
// 	defer f.Close()
// 	return nil
// }

func main() {
	num := 9
	// err := isGreaterThanTen(num)
	if err := isGreaterThanTen(num); err != nil {
		// err, we can still continue to execute the program
		fmt.Println(fmt.Errorf("%d is NOT GREATER THAN TEN", num))
		// panic(err) stops the execution after this line
		fmt.Println(err)
		// log.Fatalln(err)
	}

	// err := openFile() line 37 scopes err to the if block, makes for convenient, scoped, error handling

	// if err := openFile(); err != nil {
	// 	fmt.Println(fmt.Errorf("%v", err))
	// }
}

// TAKE A MINUTE TO REFACTOR THE ABOVE CODE TO SCOPE THE ERROR VARIABLE INTO THE IF BLOCK

// ****************************************************

// PANIC & DEFER SLIDE

// ****************************************************

// package main

// import (
// 	"fmt"
// )

// `defer` works like a LIFO list, Last defer would be the first to happen
// func doThings() {
// 	defer fmt.Println("First Line but do this last!")
// 	defer fmt.Println("Do this second to last!")
// 	fmt.Println("Things And Stuff should happen first")
// }

// func main() {
// 	doThings()
// }

// ****************************************************

// RECOVER SLIDE

// ****************************************************

// package main

// import (
// 	"fmt"
// )

// `recover()` what to do if your application panics (say close a file or write to a log file about the error), that is a runtime error occured and the program is fatally killed
// When `panic` happens, it checks for a `defer`
// Will be called iff panic happens
// func recoverFromPanic()  {
// 	if r := recover(); r != nil {
// 		fmt.Println("Panic was called, fatal error happend");
// 		// r will be what you supplied to panic()
// 		fmt.Println(r)
// 	}
// }
// func doThings() {
//  defer recoverFromPanic()
// 	for i := 0; i < 5; i++ {
// 		fmt.Println(i)
// 		if i == 2 {
// 			panic("PANIC!")
// 		}
// 	}
// }

// func main() {
// 	doThings()
// }

// ****************************************************

// package main

// import (
// 	"fmt"
// )

// func handlePanic() string {
// 	return "HANDLING THE PANIC"
// }

// func recoverFromPanic() {
// recover() will only return a value if there has been a panic
// 	if r := recover(); r != nil {
// 		fmt.Println("We panicked but everything is fine.")
// 		fmt.Println("Panic instructions received:", r)
// 	}
// }

// func doThings() {
// 	defer recoverFromPanic()
// 	for i := 0; i < 5; i++ {
// 		fmt.Println(i)
// 		if i == 2 {
// 			panic(handlePanic())
// 		}
// 	}
// }

// func main() {
// 	doThings()
// }
