// src/data/mocks.js

export const mockAnuncios = [
  {
    id: 1,
    tipo: "Apuntes",
    titulo: "Resumen para examen de Análisis de Algoritmos",
    descripcion: "Apuntes completos del ciclo de Ingeniería de Sistemas. Incluye ejercicios resueltos paso a paso de notación Big O, algoritmos de ordenamiento como Bubble Sort e Insertion Sort, e invariantes de bucle.",
    precio: 0,
    imagen: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=500&auto=format&fit=crop&q=60",
    rating: 4.8,
    autor: { 
      idAutor: "u_001", 
      nombre: "Juan", 
      carrera: "Sistemas" 
    },
    fechaPublicacion: "2026-05-20"
  },
  {
    id: 2,
    tipo: "Libros",
    titulo: "Sistemas Operativos Modernos - 4ta Edición",
    descripcion: "Libro físico original de Andrew S. Tanenbaum. En perfecto estado, sin rayones ni apuntes. Entrega presencial dentro del campus universitario.",
    precio: 45.00,
    imagen: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60",
    rating: 4.5,
    autor: { 
      idAutor: "u_002", 
      nombre: "María Lopez", 
      carrera: "Sistemas" 
    },
    fechaPublicacion: "2026-05-21"
  },
  {
    id: 3,
    tipo: "Servicios",
    titulo: "Soporte técnico y mantenimiento de PC",
    descripcion: "Servicio técnico para laptops y computadoras de escritorio. Limpieza física, cambio de pasta térmica, optimización de sistema operativo y diagnóstico de hardware (fuentes de poder, placas, etc.).",
    precio: 25.00, 
    imagen: "https://images.unsplash.com/photo-1588508065123-287b28e013da?w=500&auto=format&fit=crop&q=60",
    rating: 4.9,
    autor: { 
      idAutor: "u_003", 
      nombre: "Carlos Mendoza", 
      carrera: "Electrónica" 
    },
    fechaPublicacion: "2026-05-22"
  },
  {
    id: 4,
    tipo: "Libros",
    titulo: "Cálculo de una variable - Transcendentes Tempranas",
    descripcion: "Libro de James Stewart, 7ma edición. Ideal para los primeros ciclos de ingeniería. Desgastado en los bordes pero completamente legible en su interior.",
    precio: 35.00,
    imagen: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=500&auto=format&fit=crop&q=60",
    rating: 4.2,
    autor: { 
      idAutor: "u_004", 
      nombre: "Ana Torres", 
      carrera: "Industrial" 
    },
    fechaPublicacion: "2026-05-23"
  },
  {
    id: 5,
    tipo: "Apuntes",
    titulo: "Balotario Resuelto - Arquitectura de Computadoras",
    descripcion: "Guía completa con 50 preguntas resueltas sobre diseño de procesadores, segmentación (pipeline), mapas de Karnaugh y direccionamiento de memoria. Éxito asegurado para la PC2.",
    precio: 5.00,
    imagen: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500&auto=format&fit=crop&q=60",
    rating: 4.7,
    autor: { 
      idAutor: "u_002", 
      nombre: "María Lopez", 
      carrera: "Sistemas" 
    },
    fechaPublicacion: "2026-05-24"
  },
  {
    id: 6,
    tipo: "Servicios",
    titulo: "Asesoría personalizada en Programación Web (React/Tailwind)",
    descripcion: "Te ayudo a destrabar los proyectos de tus cursos. Explicación paso a paso de hooks (useState, useEffect, useContext), React Router Dom y maquetación responsiva con clases de Tailwind CSS.",
    precio: 15.00,
    imagen: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop&q=60",
    rating: 5.0,
    autor: { 
      idAutor: "u_005", 
      nombre: "Kevin Castro", 
      carrera: "Software" 
    },
    fechaPublicacion: "2026-05-25"
  },
  {
    id: 7,
    tipo: "Otros",
    titulo: "Calculadora Científica Casio ClassWiz fx-991LAX",
    descripcion: "Calculadora en perfecto estado, cuenta con todas las funciones para estadística, matrices y cálculo numérico. Incluye su tapa protectora original.",
    precio: 60.00,
    imagen: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&auto=format&fit=crop&q=60",
    rating: 4.6,
    autor: { 
      idAutor: "u_006", 
      nombre: "Luis Alberto", 
      carrera: "Civil" 
    },
    fechaPublicacion: "2026-05-26"
  }
];

export const mockUsuarioActual = {
  id: "u_001",
  nombre: "Juan",
  correo: "juan@universidad.edu.pe",
  favoritos: [2] 
};