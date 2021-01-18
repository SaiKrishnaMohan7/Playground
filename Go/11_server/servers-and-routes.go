package main

import (
	"fmt"
	"html/template"
	"log"
	"net/http"
)

// Must contain the the objects accessed in the template in todo.html

// Todo struct models Todos
type Todo struct {
	Title   string
	Content string
}

// PageVariables struct models page varibles
type PageVariables struct {
	PageTitle string
	PageTodos []Todo
}

var todos []Todo

func rootHandler(responseWriter http.ResponseWriter, req *http.Request) {
	fmt.Println("Root")
}

func getTodos(responseWriter http.ResponseWriter, req *http.Request) {
	pageVariables := PageVariables{
		PageTitle: "Get Todos",
		PageTodos: todos,
	}
	// fmt.Fprint(responseWriter, "todos") // This shows in the browser, kinda like res.send() in express
	template, err := template.ParseFiles("todos.html") // returns the template that was parsed and err

	if err != nil {
		http.Error(responseWriter, err.Error(), http.StatusBadRequest)
		log.Print("Error parsing Template: ", err)
	}

	err = template.Execute(responseWriter, pageVariables) // Ewww, why re-assign err
}

func addTodo(responseWriter http.ResponseWriter, req *http.Request) {
	err := req.ParseForm()

	if err != nil {
		http.Error(responseWriter, err.Error(), http.StatusBadRequest)
		log.Print("Error parsing request")
	}

	todo := Todo{
		Title:   req.FormValue("title"),
		Content: req.FormValue("content"),
	}

	todos = append(todos, todo)

	// refresh page
	http.Redirect(responseWriter, req, "/todos/", http.StatusSeeOther)
}

func main() {
	http.HandleFunc("/", rootHandler)
	http.HandleFunc("/todos/", getTodos)
	http.HandleFunc("/add-todo/", addTodo)
	fmt.Println("Server running on port 8080")

	// We wrap this in log.Fatal since http.ListenAndServe returns a non-nil error, log.Fatal is to handle that
	log.Fatal(http.ListenAndServe(":8080", nil))
}
