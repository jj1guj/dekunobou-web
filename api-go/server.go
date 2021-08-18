package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os/exec"
)

type Body struct {
	Board string `json:"board"`
	Turn  string `json:"turn"`
}

func handler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "PUT":
		defer r.Body.Close()
		var body Body

		json.NewDecoder(r.Body).Decode(&body)
		out, err := exec.Command("./dekunobou", body.Board, body.Turn).Output()

		if err != nil {
			fmt.Println(err)
		}
		fmt.Println(string(out))
		fmt.Fprint(w, string(out))
	}
}

func main() {
	http.HandleFunc("/put", handler)
	http.ListenAndServe(":5000", nil)
}
