package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/log", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == "POST" {
			body, err := io.ReadAll(r.Body)
			if err != nil {
				fmt.Println("Error reading response body:", err)
				return
			}
			fmt.Println(string(body))
			fmt.Fprintf(w, "Log saved successfull")
		} else {
			w.WriteHeader(http.StatusMethodNotAllowed)
			fmt.Fprintf(w, "only POST is allowed, dummy")
		}
	})

	log.Fatal(http.ListenAndServe(":7979", nil))
}
