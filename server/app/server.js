const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const history = require("connect-history-api-fallback");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

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

module.exports = (host, port) => {
    const todos = [];
    const app = express();

    const router = new express.Router();
    app.use("/", router);

    // Router config
    router.use(
        bodyParser.urlencoded({ extended: true }), // Parse application/x-www-form-urlencoded
        bodyParser.json() // Parse application/json
    );
    router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc));

    router.get("/", function (req, res) {
        res.status(200).send("If you want to learn about the API, go to the <a href='/docs'>docs</a>");
    })

    /**
     * @openapi
     * /api/todos:
     *  get:
     *   summary: Az osszes todo lekerdezese
     *   description: Visszaad egy listat todo objektumokkal.
     *   responses:
     *    200:
     *     description: Returns an array of todo objects
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
        res.status(200).json(todos);
    });

    /**
     * @openapi
     * /api/todos/{todoId}:
     *  get:
     *   summary: Todo lekerdezese id alapjan
     *   description: Visszaadja a todo objektumot az url-ben megadott todoId alapján
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
     */
    router.get("/api/todos/:todoId", function (req, res) {
        let todo = todos.filter(todo => todo.id === req.params.todoId).shift();
        res.status(200).json(todo);
    });

    /**
     * @openapi
     * /api/todos/{todoId}:
     *  post:
     *   summary: Todo letrehozasa
     *   description: Létrehoz egy todo objektumot hozzáadja a listához és visszaadja a kreált objektumot.
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
     *                      todo:
     *                          type: object
     *                          properties:
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
     *     description: Returns a todo objects
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
     */
    router.post("/api/todos/:todoId", function (req, res) {
        let todo = {...req.body.todo};
        res.status(201).json(todo);
    });

    /**
     * @openapi
     * /api/todos/{todoId}:
     *  patch:
     *   summary: Todo modositasa
     *   description: Módosítja a todo objektumot az urlben megadott todoId alapján. Visszaadja a módosított todo objektumot.
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
     */
    router.patch("/api/todos/:todoId", function (req, res) {
        let todo = todos.filter(todo => todo.id === req.params.todoId).shift();
        todo = {...req.body.todo};
        res.status(200).json(todo);
    });

    /**
     * @openapi
     * /api/todos/{todoId}:
     *  delete:
     *   summary: Todo torlese
     *   description: Törli a todo objektumot az urlben megadott todoId alapján. Visszaadja a törölt todo objektumot.
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
     */
    router.delete("/api/todos/:todoId", function (req, res) {
        let todo = todos.filter(todo => todo.id === req.params.todoId).shift();
        todos = todos.filter(todo => todo.id !== req.params.todoId);
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
