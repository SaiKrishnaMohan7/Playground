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

    app := echo.New()

    count := Count{Count: 0}

    app.Renderer = newTemplate()
    app.Use(middleware.Logger())

    app.GET("/", func(c echo.Context) error {
        return c.Render(200, "index", count)
    });

    app.POST("/count", func(c echo.Context) error {
        count.Count++
        return c.Render(200, "count", count)
    });


    app.Logger.Fatal(app.Start(":42069"))
}