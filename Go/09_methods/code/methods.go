package main

import "fmt"

// User is a user type
type User struct {
	ID                         int
	FirstName, LastName, Email string
}

// This is a function
// func describeUser(u User) string {
// 	desc := fmt.Sprintf("Name: %s %s, Email: %s", u.FirstName, u.LastName, u.Email)
// 	return desc
// }

// This is a method; Instead of accepting an argument (like a function does), it gets the instance of what you passed in the parans after `func`
// The parans after `func` indicate what this method will be invoked on
// This seems like adding methods to the prototype of an object in JS; Go seems to be folowing fucntional paradigm
// Go allows you to define multiple methods with the same name accpeting (being invoked on) differentr objects
func (u *User) describe() string {
	desc := fmt.Sprintf("Name: %s %s, Email: %s", u.FirstName, u.LastName, u.Email)
	return desc
}

func main() {
	user := User{ID: 1, FirstName: "Marilyn", LastName: "Monroe", Email: "marilyn.monroe@gmail.com"}

	// desc := describeUser(user)
	desc := user.describe()
	fmt.Println(desc)
}
