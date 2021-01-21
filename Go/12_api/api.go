package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)

// BaseURL is the base endpoint for the star wars API
const BaseURL = "https://swapi.dev/api/"

// Planet struct models the API response for planets
type Planet struct {
	Name       string `json:"name"`
	Population string `json:"population"`
	Terrain    string `json:"terrain"`
}

// Person struct models the API reponse for a Person
type Person struct {
	Name         string `json:"name"`
	HomeWorldURL string `json:"homeworld"`
	HomeWorld    Planet
}

func (person *Person) getHomeWorld() {
	getHomeWorldResponse, err := http.Get(person.HomeWorldURL)
	var bytes []byte

	if err != nil {
		log.Print("Error fetching HomeWorld", err)
	}

	if bytes, err = ioutil.ReadAll(getHomeWorldResponse.Body); err != nil {
		log.Print("Error parsing getHomeWorldResponse", err)
	}

	if err := json.Unmarshal(bytes, &person.HomeWorld); err != nil {
		log.Print("Error Unmarshalling getHomeWorldResponse body", err)
	}

}

// The key `People` does not exist in the API response, to bridge the gap between what we are calling this key in go and what is retuned from the API, we use JSON flag

// AllPeople struct models the API response for all the people in the star wars universe
type AllPeople struct {
	People []Person `json:"results"`
}

func getPeople(responseWriter http.ResponseWriter, request *http.Request) {
	// fmt.Fprint(responseWriter, "getPeople")

	getPeopleResponse, err := http.Get(BaseURL + "people")
	var bytes []byte

	if err != nil {
		http.Error(responseWriter, err.Error(), http.StatusBadRequest)
		log.Print("Error getting people from star wars universe")
	}

	fmt.Println(getPeopleResponse) // Can only see headers

	if bytes, err = ioutil.ReadAll(getPeopleResponse.Body); err != nil {
		http.Error(responseWriter, err.Error(), http.StatusBadRequest)
		log.Fatal("Error parsing getPeopleResponse body", err)
	}

	fmt.Println(bytes) // a []byte...

	var allPeople AllPeople

	// Marshalling - Manually controlling how an internal object (serializing the in-memory representation of a domain object) is represented in JSON (using JSON.stringify(obj), in JS, is a bad idea)
	// Convert to JSON and store in the allPeople var; since we want to actually modify the variable, pass in memory adrress
	if err := json.Unmarshal(bytes, &allPeople); err != nil {
		http.Error(responseWriter, err.Error(), http.StatusBadRequest)
		log.Fatal("Error marshalling response body", err)
	}

	fmt.Println(allPeople)

	for _, person := range allPeople.People {
		person.getHomeWorld()
		fmt.Println(person)
	}
}

func main() {
	fmt.Println(BaseURL)
	http.HandleFunc("/people", getPeople)

	fmt.Println("Server listening om port :8080")

	log.Fatal(http.ListenAndServe(":8080", nil))
}
