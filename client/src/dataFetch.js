const dataFetch = {
    async dataFetch(url, options = {}) {
        const res = await fetch(url, options);

        if(!res.ok) {
            const message = ```
                An error has occured: ${res.status}
                ${res.text}
                ```
            throw new Error(message);
        }

        const data = await res.json();
        return data;
    },
    getAllTodos() {
         return this.dataFetch(dataUrls.base, {
            method: "GET",
            mode: "cors",
            cache: "no-cache"
        })
    },
    getTodo(todoId) {
        return this.dataFetch(dataUrls.withId(todoId), {
            method: "GET",
            mode: "cors",
            cache: "no-cache"
        })
    },
    createTodo(todo) {
        return this.dataFetch(dataUrls.withId(todo.id), {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(todo)
        })
    },
    updateTodo(todo) {
        return this.dataFetch(dataUrls.withId(todo.id), {
            method: "PATCH",
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(todo)
        })
    },
    deleteTodo(todoId) {
        return this.dataFetch(dataUrls.withId(todoId), {
            method: "DELETE",
            mode: "cors",
            cache: "no-cache"
        })
    } 
}

const dataUrls = {
    base: "http://localhost:8080/api/todos/",
    withId(todoId) {
        return this.base + todoId
    } 
}

export default dataFetch;