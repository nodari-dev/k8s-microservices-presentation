package main

import (
	"fmt"
	"github.com/google/uuid"
	"io"
	"log"
	"net/http"
	"strings"
	"time"
)

const service_name = "Storage"

func main() {
	log_client := &http.Client{}
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		t := time.Now().Format("2006/01/02/15/04/05")
		req_id := r.Header.Get("X-Request-ID")
		if req_id == "" {
			req_id = uuid.NewString()
		}
		req_message := t + " " + r.Method + " " + service_name + " " + r.URL.Path + " " + req_id + "\n" + "storage request"
		req, err := http.NewRequest("POST", "http://localhost:7979/log", strings.NewReader(req_message))
		if err != nil {
			fmt.Println("error while creating new request, ", err)
		}
		req.Header = r.Header
		resp, err := log_client.Do(req)
		if err != nil {
			fmt.Println("err: ", err)
		}

		body, err := io.ReadAll(resp.Body)
		if err != nil {
			fmt.Println("Error reading response body:", err)
			return
		}
		log.Println(string(body), "\n\n\n\n")

		log.Println(r)
		fmt.Fprintf(w, "storage response")
	})

	log.Fatal(http.ListenAndServe(":6969", nil))
}
