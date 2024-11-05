package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "access rights")
	})

	log.Fatal(http.ListenAndServe(":8181", nil))
}
