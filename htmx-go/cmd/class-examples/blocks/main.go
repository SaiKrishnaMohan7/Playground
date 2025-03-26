package main

import (
	"html/template"
	"io"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type Template struct {
    tmpl *template.Template
}

func newTemplate() *Template {
    return &Template{
        tmpl: template.Must(template.ParseGlob("views/*.html")),
    }
}

func (t *Template) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
    return t.tmpl.ExecuteTemplate(w, name, data)
}

type Count struct {
    Count int
}

func main() {

    server := echo.New()

    count := Count{Count: 0}

    server.Renderer = newTemplate()
    server.Use(middleware.Logger())

    server.GET("/", func(c echo.Context) error {
        count.Count++
        return c.Render(200, "index", count)
    });

    server.Logger.Fatal(server.Start(":42069"))
}