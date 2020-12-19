package main

import "fmt"

// User struct, since it Capitalized, this will be eported from this package
// Custom types with member attributes
// So any variable of type User would have one of these members defined?
type User struct {
	ID        int
	FirstName string
	LastName  string
	Email     string
}

// Group struct
type Group struct {
	ID         int
	role       string
	users      []User // defining this member as a collection of items that are of type User
	latestUser User
	isFull     bool
}

// func sampleOfPassingAnObjectOfTypeStruct(u User)  string{

// }

func main() {
	u := User{ID: 1, FirstName: "Thitla"}
	g := Group{
		ID: 1,
		role: "shady",
		users: []User{u},
		latestUser u,
		isFull false // If this value needs to be changed programatically based on some condition, simply setting g.isFull = true will work in the fucntion (because the value is passed by value and not by reference)
								// where the operation is happening but the value will remain unchanged in memory... hence, pointers (hold memory refernce) in JS it is passed by reference
	}

	// fmt.Print(u.LastName) // nil
	fmt.Print(u) // Prints ugly ass object like thing.. with no keys
}
