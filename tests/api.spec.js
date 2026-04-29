import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { test } from '../src/API/helpers/index';
import { ToDosService } from '../src/API/services/index';
import { ToDoBuilder}   from "../src/API/helpers/builder";

let token;

test.describe('Challenge @api', () => {
    test.beforeAll(async ({ api }, testinfo) => {
        let r = await api.challenger.post(testinfo);
        const headers = r.headers();
        console.log(`${testinfo.project.use.apiURL}${headers.location}`);
        token = headers['x-challenger'];
    });

    test('Recive challenger token @GET @api', async ({ api }, testinfo) => {
        let resp = await api.challenges.get(token, testinfo);
        expect(Array.isArray(resp.challenges)).toBe(true);
        expect(resp.challenges.length).toBeGreaterThan(0);

    });

    test('3. Get/todos 200 @GET @api', async ({ api }, testinfo) => {
        let resp = await api.todos.get(token, testinfo);
        const respBody = await resp.json();
        const challengesArray = respBody.challenges || respBody.todos || respBody.items || [];
        expect(Array.isArray(challengesArray)).toBeTruthy();
        expect(challengesArray.length).toBeGreaterThan(0);
        console.log(`Found ${challengesArray.length} challenges`);
    });

    test('05 GET /todos/{id} (200) - получить todo по id @GET @api', async ({ api }, testinfo) => {
        const todosService = new ToDosService(api.request);
        let r = await api.todos.get(token, testinfo);
        expect(r.status()).toBe(200);
        const todos = await r.json();
        let size = todos.todos.length;
        let index = Math.floor(Math.random() * (size - 1) + 1);
        let idTodo = todos.todos[index].id;
        r = await todosService.getById(token, testinfo, idTodo);
        expect(r.status()).toBe(200);
    });

    test('07 GET/todos ? (200) -  filter todos @GET @api', async ({ api }, testinfo) => {
        const doneTodo = new ToDoBuilder(faker.string.alpha(10), true, faker.lorem.words()).generate();
        const notDoneTodo = new ToDoBuilder(
            faker.string.alpha(10),
            false,
            faker.lorem.words(),
        ).generate();
        let a = await api.todos.post(token, testinfo, doneTodo);
        const resp1 = await a.json();
        console.log(resp1);
        await api.todos.post(token, testinfo, notDoneTodo);
        let response = await api.todos.filterTodos(token, testinfo);
        const json = await response.json();
        const todos = json.todos[0];
        expect(response.status()).toBe(200);
        expect(todos.doneStatus).toBe(true);
    });

    test('10. POST/todos 400 - no doneStatus @POST @api', async ({ api }, testinfo) => {
        const todoData = new ToDoBuilder(
            faker.lorem.word,
            faker.number.int(),
            faker.lorem.word,
        ).generate();
        let r = await api.todos.post(token, testinfo, todoData);
        expect.soft(r.status()).toBe(400);
        const todoData2 = new ToDoBuilder(
            faker.lorem.word,
            faker.number.word,
            faker.lorem.word,
        ).generate();
        r = await api.todos.post(token, testinfo, todoData2);
        expect.soft(r.status()).toBe(400);
        expect(test.info().errors).toHaveLength(0);
    });

    test('09. POST/todos 201 -  create ToDO @POST @api', async ({ api }, testinfo) => {
        const todoData = new ToDoBuilder(faker.string.alpha(10), true, faker.lorem.words()).generate();
        let response = await api.todos.post(token, testinfo, todoData, false);
        const body = await response.json();
        expect(response.status()).toBe(201);
    });

    test('11. POST/todos 400 - title too long  @POST @api', async ({ api }, testinfo) => {
        const todoData = new ToDoBuilder(
            faker.lorem.sentence(13),
            true,
            faker.string.alpha(202),
        ).generate();
        let r = await api.todos.post(token, testinfo, todoData);
        const body = await r.json();
        expect(r.status()).toBe(400);
    });

    test('13. POST/todos 201 - max out content  @POST @api', async ({ api }, testinfo) => {
        const todoData = new ToDoBuilder(
            faker.string.alpha(50),
            true,
            faker.string.alpha(200),
        ).generate();
        let response = await api.todos.post(token, testinfo, todoData, false);
        const body = await response.json();
        expect(response.status()).toBe(201);
    });

    test('15. POST/todos 400 - non existing field  @POST @api', async ({ api }, testinfo) => {
        const todoData = new ToDoBuilder(
            faker.string.alpha(50),
            true,
            faker.string.alpha(200),
            'high',
        ).generate();
        let response = await api.todos.post(token, testinfo, todoData, false);
        const body = await response.json();
        expect(response.status()).toBe(400);
    });

    test('17. POST/todos{id} 200 -  update ToDO  by id @POST @api', async ({ api }, testinfo) => {
        const doneTodo = new ToDoBuilder(faker.string.alpha(10), true, faker.lorem.words()).generate();
        let createTodo = await api.todos.post(token, testinfo, doneTodo);
        const createdTodo = await createTodo.json();
        expect(createTodo.status()).toBe(201);
        let getResponse = await api.todos.getById(token, testinfo, createdTodo.id);
        console.log('GET response status:', getResponse.status());
        const updatedTodo = new ToDoBuilder(
            `UPDATED-${faker.string.alpha(5)}`,
            true,
            `UPDATED-${faker.lorem.words()}`,
        ).generate();
        let updateResponse = await api.todos.postById(token, testinfo, createdTodo.id, updatedTodo);
        expect(updateResponse.status()).toBe(200);
    });

    test('19 PUT /todos/{id} (200)  - full update @PUT @api', async ({ api }, testinfo) => {
        const notDoneTodo = new ToDoBuilder(
            faker.string.alpha(10),
            false,
            faker.lorem.words(),
        ).generate();
        let createTodo = await api.todos.post(token, testinfo, notDoneTodo);
        const createdTodo = await createTodo.json();
        expect(createTodo.status()).toBe(201);
        const putUpdate = new ToDoBuilder(
            `UPDATED-${faker.string.alpha(5)}`,
            true,
            `UPDATED-${faker.lorem.words()}`,
        ).generate();
        let response = await api.todos.putTodo(token, testinfo, createdTodo.id, putUpdate);
        expect(response.status()).toBe(200);
        const body = await response.json();
    });

    test('21 PUT /todos/{id} (400)  - error update @PUT @api', async ({ api }, testinfo) => {
        const notDoneTodo = new ToDoBuilder(
            faker.string.alpha(10),
            false,
            faker.lorem.words(),
        ).generate();
        let createTodo = await api.todos.post(token, testinfo, notDoneTodo);
        const createdTodo = await createTodo.json();
        expect(createTodo.status()).toBe(201);
        const putUpdate = new ToDoBuilder(
            `UPDATED-${faker.string.alpha(5)}`,
            true,
            `UPDATED-${faker.lorem.words()}`,
        ).generate();
        let response = await api.todos.putTodo(token, testinfo, 44, putUpdate);
        expect(response.status()).toBe(400);
    });

    test('23 DELETE/todos {id} @DELETE @api', async ({ api }, testinfo) => {
        const doneTodo = new ToDoBuilder(faker.string.alpha(10), true, faker.lorem.words()).generate();
        let createTodo = await api.todos.post(token, testinfo, doneTodo);
        const createdTodo = await createTodo.json();
        console.log(createTodo);
        expect(createTodo.status()).toBe(201);
        let getResponse = await api.todos.deleteTodo(token, testinfo, createdTodo.id);
        expect(getResponse.status()).toBe(200);
    });

    test('25 GET/todos (200) -  XML @api', async ({ api }, testinfo) => {
        const response = await api.todos.getApplication(token, testinfo, 'application/xml');
        console.log(api.todos.getApplication.body);
        expect(response.status()).toBe(200);
        let xml = await response.text();
        expect(xml).toContain('<todos>');
    });


    test('41 DELETE/heartbeat (405) - @DELETE @api', async ({ api }, testinfo) => {
        let getResponse = await api.todos.deleteHeartbeat(token, testinfo);
        expect(getResponse.status()).toBe(405);
    });

    test('47. POST/todos 501 - override TRACE @POST @api', async ({ api }, testinfo) => {
        const todoData = new ToDoBuilder(
            faker.string.alpha(50),
            true,
            faker.string.alpha(200),
            'high',
        ).generate();
        let response = await api.todos.heartbeat('TRACE', token, testinfo, todoData, false);
        expect(response.status()).toBe(501);
    });

    test('58 DELETE /todos/{id} (200) all - @DELETE @api ', async ({ api }, testinfo) => {
        const getAllTodos = await api.todos.get(token, testinfo);
        const body = await getAllTodos.json();
        const todos = body.todos;
        if (todos && todos.length > 0) {
            for (const todo of todos) {
                let deleteResponse = await api.todos.deleteTodo(token, testinfo, todo.id);
                expect(deleteResponse.status()).toBe(200);
            }
        }
        const deletedTodos = await api.todos.get(token, testinfo);
        expect(deletedTodos.status()).toBe(200);
        const deleteTodosBody = await deletedTodos.json();
        expect(deleteTodosBody.todos.length).toBe(0);
        console.log(deleteTodosBody.todos);
    });
});
