package main

import "fmt"

func updateEmail(user *User, email string) {
	user.Email = email
}

// User struct tries things
type User struct {
	ID                         int
	FirstName, LastName, Email string
}

func main() {
	user := User{ID: 1, FirstName: "Thitla", Email: "hello@challo.com"}
	fmt.Println("User: ", user)
	updateEmail(&user, "challo@aao.com")
	fmt.Println("User", user)
}
