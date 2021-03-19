import axios from "axios";

const dataFetch = {
    async dataFetch(url, options = {}) {
        let res;
        try{
            res = await axios(url, options);
        }catch(err){
            const message = `An error has occured: ${res.status}: ${res.message}`;
            throw new Error(message);
        }
        return res.data;
    },
    getAllTodos() {
        return this.dataFetch(dataUrls.base, {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
        });
    },
    getTodo(todoId) {
        return this.dataFetch(dataUrls.withId(todoId), {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
        });
    },
    createTodo(todo) {
        return this.dataFetch(dataUrls.withId(todo.id), {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
            data: todo,
        });
    },
    updateTodo(todo) {
        return this.dataFetch(dataUrls.withId(todo.id), {
            method: "PATCH",
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
            data: todo,
        });
    },
    deleteTodo(todoId) {
        return this.dataFetch(dataUrls.withId(todoId), {
            method: "DELETE",
            mode: "cors",
            cache: "no-cache",
        });
    },
};

const dataUrls = {
    base: "/api/todos/",
    withId(todoId) {
        return this.base + todoId;
    },
};

export default dataFetch;
