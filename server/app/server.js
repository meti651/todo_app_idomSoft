const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const history = require("connect-history-api-fallback");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const cors = require('cors')

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "IdomSoft teszt feladat",
            version: "1.0.0",
        },
    },
    apis: ["server/app/server.js"],
};

const swaggerJsDoc = swaggerJsdoc(options);
let todos = [];

module.exports = (host, port) => {
    const app = express();
    app.use(cors());

    const router = new express.Router();
    app.use("/", router);

    // Router config
    router.use(
        bodyParser.urlencoded({ extended: true }), // Parse application/x-www-form-urlencoded
        bodyParser.json() // Parse application/json
    );
    router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc));

    /**
     * @openapi
     * /api/todos:
     *  get:
     *   summary: Az osszes todo lekerdezese
     *   description: Visszaad egy listat todo objektumokkal.
     *   responses:
     *    200:
     *     description: OK
     *     content:
     *      application/json:
     *       schema:
     *        type: array
     *        items:
     *         type: object
     *         properties:
     *          id:
     *           type: integer
     *           description: The todo ID
     *          description:
     *           type: string
     *           description: The todo's description
     *          time:
     *           type: string
     *           description: The date the todo will happen
     *          isDone:
     *           type: boolean
     *           description: A boolean wheter the todo is done or not
     */
    router.get("/api/todos", function (req, res) {
        todos.sort((a, b) => a.time > b.time ? 1 : -1);
        res.status(200).json(todos);
    });

    /**
     * @openapi
     * /api/todos/{todoId}:
     *  get:
     *   summary: Todo lekerdezese id alapjan
     *   description: Visszaadja a todo objektumot az url-ben megadott todoId alapj??n
     *   parameters:
     *      - name: todoId
     *        in: path
     *        description: The todo ID
     *        required: true
     *        schema:
     *          type: integer
     *          format: int64
     *   responses:
     *    200:
     *     description: OK
     *     content:
     *      application/json:
     *          schema:
     *              type: object
     *              properties:
     *                  id:
     *                      type: integer
     *                      description: The todo ID
     *                  description:
     *                      type: string
     *                      description: The todo's description
     *                  time:
     *                      type: string
     *                      description: The date the todo will happen
     *                  isDone:
     *                      type: boolean
     *                      description: A boolean wheter the todo is done or not
     *    400:
     *      description: Bad request. There is no todo with the requested ID
     */
    router.get("/api/todos/:todoId", function (req, res) {
        const todo = todos.filter(item => item.id === req.params.todoId).shift();
        if(!todo) res.status(400).send(`There is no todo with the id: ${req.params.todoId}`);
        else res.status(200).json(todo);
    });

    /**
     * @openapi
     * /api/todos/{todoId}:
     *  post:
     *   summary: Todo letrehozasa
     *   description: L??trehoz egy todo objektumot hozz??adja a list??hoz ??s visszaadja a kre??lt objektumot.
     *   parameters:
     *      - name: todoId
     *        in: path
     *        description: The todo ID
     *        required: true
     *        schema:
     *          type: integer
     *          format: int64
     *   requestBody:
     *      description: The todo object that is added to the list of todos.
     *      required: true
     *      content:
     *          application/json:
     *              schema:
     *                  type: object
     *                  properties:
     *                            id:
     *                                type: integer
     *                                description: The todo ID
     *                            description:
     *                                type: string
     *                                description: The todo's description
     *                            time:
     *                                type: string
     *                                description: The date the todo will happen
     *                            isDone:
     *                                type: boolean
     *                                description: A boolean wheter the todo is done or not
     *   responses:
     *    200:
     *     description: OK
     *     content:
     *      application/json:
     *          schema:
     *              type: object
     *              properties:
     *                  id:
     *                      type: integer
     *                      description: The todo ID
     *                  description:
     *                      type: string
     *                      description: The todo's description
     *                  time:
     *                      type: string
     *                      description: The date the todo will happen
     *                  isDone:
     *                      type: boolean
     *                      description: A boolean wheter the todo is done or not
     *    400:
     *      description: Bad request. There is already a todo with the requested ID.
     */
    router.post("/api/todos/:todoId", function (req, res) {
        let todo = todos.filter(item => item.id === req.params.todoId).shift();
        if(todo) {
            res.status(400).send(`There is already a todo with the id: ${todo.id}`)
            return;
        }
        if(Object.keys(req.body).length === 0){
            res.status(400).send("There is no properties in the request body");
        }
        todo = {...req.body};
        todos.push(todo);
        res.status(201).json(todo);
    });

    /**
     * @openapi
     * /api/todos/{todoId}:
     *  patch:
     *   summary: Todo modositasa
     *   description: M??dos??tja a todo objektumot az urlben megadott todoId alapj??n. Visszaadja a m??dos??tott todo objektumot.
     *   parameters:
     *      - name: todoId
     *        in: path
     *        description: The todo ID
     *        required: true
     *        schema:
     *          type: integer
     *          format: int64
     *   responses:
     *    200:
     *     description: Returns a todo objects
     *     content:
     *      applications/json:
     *          schema:
     *              type: object
     *              properties:
     *                  id:
     *                      type: integer
     *                      description: The todo ID
     *                  description:
     *                      type: string
     *                      description: The todo's description
     *                  time:
     *                      type: string
     *                      description: The date the todo will happen
     *                  isDone:
     *                      type: boolean
     *                      description: A boolean wheter the todo is done or not
     *    400:
     *      description: Bad request. There is no todo with the requested ID.
     */
    router.patch("/api/todos/:todoId", function (req, res) {
        let todo = todos.filter(item => item.id === req.params.todoId).shift();
        if(!todo) {
            res.status(400).send(`There is no todo with the id: ${req.params.todoId}`);
            return;
        }
        todo.description = req.body.description;
        todo.time = req.body.time;
        todo.isDone = req.body.isDone;
        res.status(200).json(todo);
    });

    /**
     * @openapi
     * /api/todos/{todoId}:
     *  delete:
     *   summary: Todo torlese
     *   description: T??rli a todo objektumot az urlben megadott todoId alapj??n. Visszaadja a t??r??lt todo objektumot.
     *   parameters:
     *      - name: todoId
     *        in: path
     *        description: The todo ID
     *        required: true
     *        schema:
     *          type: integer
     *          format: int64
     *   responses:
     *    200:
     *     description: Returns a todo objects
     *     content:
     *      applications/json:
     *          schema:
     *              type: object
     *              properties:
     *                  id:
     *                      type: integer
     *                      description: The todo ID
     *                  description:
     *                      type: string
     *                      description: The todo's description
     *                  time:
     *                      type: string
     *                      description: The date the todo will happen
     *                  isDone:
     *                      type: boolean
     *                      description: A boolean wheter the todo is done or not
     *     400:
     *      description: Bad request. There is no todo with the requested ID.
     */
    router.delete("/api/todos/:todoId", function (req, res) {
        let todo = todos.filter(item => item.id === req.params.todoId).shift();
        if(!todo){
            res.status(400).send(`There is no todo with the id: ${req.params.todoId}`);
            return;
        }
        todos = todos.filter(item => item.id !== req.params.todoId);
        res.status(202).json(todo);
    });

    // History fallback api
    router.use(history());
    // Kliens kod bundle betoltese, ha van
    router.use("/", express.static(path.join(__dirname, "../../client/dist"))); // History fallback utan kell megadni

    return app.listen(port, host, () => {
        console.info(`IdomSoft test web server started on ${host}:${port}`);
    });
};
