import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
    stages: [
        { duration: "30s", target: 10 }, // Escala de 1 a 10 usuarios en 30 segundos
        { duration: "1m", target: 20 }, // Mantén 20 usuarios durante 1 minuto
        { duration: "30s", target: 0 }, // Baja a 0 usuarios en 30 segundos
    ],
};

export default function () {
    // Prueba 1: Obtener mascotas disponibles (GET)
    let getResponse = http.get(
        "https://petstore.swagger.io/v2/pet/findByStatus?status=available",
    );
    check(getResponse, { "status was 200 (GET)": (r) => r.status === 200 });

    // Prueba 2: Crear una mascota (POST)
    let payload = JSON.stringify({
        id: Math.floor(Math.random() * 1000000),
        name: "TestPet",
        status: "available",
    });
    let postHeaders = { "Content-Type": "application/json" };
    let postResponse = http.post(
        "https://petstore.swagger.io/v2/pet",
        payload,
        { headers: postHeaders },
    );
    check(postResponse, { "status was 200 (POST)": (r) => r.status === 200 });

    // Prueba 3: Actualizar una mascota (PUT)
    let putPayload = JSON.stringify({
        id: 12345,
        name: "UpdatedPet",
        status: "sold",
    });
    let putResponse = http.put(
        "https://petstore.swagger.io/v2/pet",
        putPayload,
        { headers: postHeaders },
    );
    check(putResponse, { "status was 200 (PUT)": (r) => r.status === 200 });

    // Prueba 4: Eliminar una mascota (DELETE)
    let deleteResponse = http.del("https://petstore.swagger.io/v2/pet/12345");
    check(deleteResponse, {
        "status was 200 (DELETE)": (r) => r.status === 200,
    });

    // Prueba 5: Stress Test (GET con gran volumen de solicitudes)
    for (let i = 0; i < 100; i++) {
        let stressResponse = http.get(
            "https://petstore.swagger.io/v2/pet/findByStatus?status=available",
        );
        check(stressResponse, {
            "status was 200 (Stress Test GET)": (r) => r.status === 200,
        });
    }

    sleep(1);
}
