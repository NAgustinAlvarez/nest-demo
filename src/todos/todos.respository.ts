import { Injectable } from "@nestjs/common";
@Injectable()
export class TodosRepository {
  private todos = [
    {
      id: 1,
      title: "Comprar leche",
      description: "Ir al supermercado y comprar leche.",
      completed: false,
    },
    {
      id: 2,
      title: "Hacer ejercicio",
      description: "Ir al gimnasio a hacer 30 minutos de cardio.",
      completed: true,
    },
    {
      id: 3,
      title: "Llamar a mamá",
      description: "Llamar a mamá para saber cómo está.",
      completed: false,
    },
    {
      id: 4,
      title: "Leer un libro",
      description: "Leer un capítulo del libro que estoy empezando.",
      completed: true,
    },
  ];

  // eslint-disable-next-line @typescript-eslint/require-await
  async getTodos() {
    return this.todos;
  }
}
