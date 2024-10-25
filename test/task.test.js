const request = require("supertest");
const chai = require("chai");
const sinon = require("sinon");

const app = require("../app");

const expect = chai.expect;

// describe("1- Test de la ruta /usuarios/register", () => {
//     it("Debería devolver un mensaje de éxito", async () => {
//         const response = await request(app).post("/usuarios/register").send({
//             username: "Test1",
//             password: "Test1"
//         });
//         expect(response.status).to.equal(201);
//         expect(response.body).to.be.an("object");
//         expect(response.body).to.have.property("username");
//         expect(response.body).to.have.property("apikey");

//         console.log(response.body);
//     });
// });

// describe("2- Test de la ruta /usuarios/login", () => {
//     it("Debería devolver un mensaje de éxito", async () => {
//         const response = await request(app).post("/usuarios/login").send({
//             username: "Test1",
//             password: "Test1"
//         });
//         expect(response.status).to.equal(200);
//         expect(response.body).to.be.an("object");
//         expect(response.body).to.have.property("username");
//         expect(response.body).to.have.property("apikey");

//         console.log(response.body);
//     });
// });

// describe("3- Test de la ruta /tasks/all", () => {
//     it("Debería devolver un array con todas las tareas", async () => {
//         const response = await request(app)
//             .post("/tasks/all")
//             .send({ apikey: "WW9zZWZoOllvc2VmaA==" });

//         expect(response.status).to.equal(200);
//         expect(response.body).to.be.an("array");

//         console.log(response.body);
//     });
// });

// describe("4- Test de la ruta /tasks/ para crear una tarea", () => {
//     it("Debería devolver un mensaje de éxito", async () => {
//         const response = await request(app).post("/tasks").send({
//             title: "Tarea 777",
//             description: "Descripción detallada de la nueva tarea.",
//             startDate: "2024-10-22",
//             endDate: "2024-12-31",
//             estatus: "No terminada",
//             apikey: "WW9zZWZoOllvc2VmaA=="
//         });

//         expect(response.status).to.equal(200);
//         expect(response.body).to.be.an("object");
//         expect(response.body).to.have.property("title");
//         expect(response.body).to.have.property("description");
//         expect(response.body).to.have.property("startDate");
//         expect(response.body).to.have.property("endDate");
//         expect(response.body).to.have.property("estatus");

//         console.log(response.body);

//     });
// });

// describe("5- Test de la ruta /tasks/:id para actualizar una tarea", () => {
//     it("Debería devolver un mensaje de éxito", async () => {
//         const response = await request(app).put("/tasks/6719522d279ac3c7634f7f8a").send({
//             title: "Tarea 1 Actualizada",
//             description: "Descripción detallada de la nueva Tarea.",
//             startDate: "2024-10-22",
//             endDate: "2024-12-31",
//             estatus: "Terminada",
//             apikey: "WW9zZWZoOllvc2VmaA=="
//         });

//         expect(response.status).to.equal(200);
//         expect(response.body).to.be.an("object");
//         expect(response.body).to.have.property("title");
//         expect(response.body).to.have.property("description");
//         expect(response.body).to.have.property("startDate");
//         expect(response.body).to.have.property("endDate");
//         expect(response.body).to.have.property("estatus");

//         console.log(response.body);

//     });
// });

// describe("6- Test de la ruta /tasks/:id/terminada para actualizar el estatus de una tarea a terminada", () => {
//     it("Debería devolver un mensaje de éxito", async () => {
//         const response = await request(app)
//             .patch("/tasks/6719522d279ac3c7634f7f8a/terminada")
//             .send({
//                 apikey: "WW9zZWZoOllvc2VmaA=="
//             });

//         expect(response.status).to.equal(200);
//         expect(response.body).to.be.an("object");
//         expect(response.body).to.have.property("title");
//         expect(response.body).to.have.property("description");
//         expect(response.body).to.have.property("startDate");
//         expect(response.body).to.have.property("endDate");
//         expect(response.body).to.have.property("estatus");

//         console.log(response.body);

//     });
// });

// describe("7- Test de la ruta /tasks/:id/terminada para actualizar el estatus de una tarea a No terminada", () => {
//     it("Debería devolver un mensaje de éxito", async () => {
//         const response = await request(app)
//             .patch("/tasks/6719522d279ac3c7634f7f8a/no-terminada")
//             .send({
//                 apikey: "WW9zZWZoOllvc2VmaA=="
//             });

//         expect(response.status).to.equal(200);
//         expect(response.body).to.be.an("object");
//         expect(response.body).to.have.property("title");
//         expect(response.body).to.have.property("description");
//         expect(response.body).to.have.property("startDate");
//         expect(response.body).to.have.property("endDate");
//         expect(response.body).to.have.property("estatus");

//         console.log(response.body);

//     });
// });

describe("8- Test de la ruta /tasks/:id para eliminar una tarea", () => {
    it("Debería devolver un mensaje de éxito", async () => {
        const response = await request(app)
            .delete("/tasks/6719522d279ac3c7634f7f8a")
            .send({
                apikey: "WW9zZWZoOllvc2VmaA=="
            });

        expect(response.status).to.equal(200);
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("mensaje");

        console.log(response.body);

    });
});