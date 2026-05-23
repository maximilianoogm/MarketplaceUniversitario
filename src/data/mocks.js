// src/data/mocks.js

export const mockAnuncios = [
  {
    id: 1,
    tipo: "Apuntes",
    titulo: "Resumen para examen de Análisis de Algoritmos",
    descripcion: "Apuntes completos del ciclo. Incluye ejercicios resueltos paso a paso de notación Big O, Bubble Sort e Insertion Sort.",
    precio: 0,
    autor: { 
      idAutor: "u_001", 
      nombre: "Juan", 
      carrera: "Sistemas" 
    },
    fechaPublicacion: "2026-05-20"
  },
  {
    id: 2,
    tipo: "Libro",
    titulo: "Sistemas Operativos Modernos - 4ta Edición",
    descripcion: "Libro físico en perfecto estado. Entrega presencial en el campus.",
    precio: 45.00,
    autor: { 
      idAutor: "u_002", 
      nombre: "María Lopez", 
      carrera: "Sistemas" 
    },
    fechaPublicacion: "2026-05-21"
  },
  {
    id: 3,
    tipo: "Trabajo",
    titulo: "Soporte técnico part-time",
    descripcion: "Se busca estudiante para reparar y dar mantenimiento a las PCs del laboratorio central. Turno mañana.",
    precio: 0, 
    autor: { 
      idAutor: "u_003", 
      nombre: "Administración de Laboratorios", 
      carrera: "N/A" 
    },
    fechaPublicacion: "2026-05-22"
  }
];

export const mockUsuarioActual = {
  id: "u_001",
  nombre: "Juan",
  correo: "juan@universidad.edu.pe",
  favoritos: [2] 
};