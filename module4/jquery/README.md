<img src="https://res.cloudinary.com/boolean-spa/image/upload/v1591158800/logo_vayedu.svg" width=100> 

## Capítulo 4: Pruebas de integración

#### Contenidos :books:
👉🏻 &nbsp;Consideraciones al hacer pruebas de integración <br/>
👉🏻 &nbsp;Snapshot testing <br/>
👉🏻 &nbsp;Backend mocks y como mantener tus pruebas <br/>

Programa completo [aquí](https://drive.google.com/open?id=1pz9LCqUx2sgtuk0cekVucWc0lxEzoLXx)

#### Actividades de la clase 🧑🏻‍🏫

1) Aplicar las técnicas aprendidas en la clase para refactorizar el archivo `checkout.js` (incluido en la carpeta `src`) utilizando la [guía oficial de Jquery](https://learn.jquery.com/code-organization/concepts/#the-object-literal).


2) Crear un archivo `checkout.spec.js` en la carpeta test con las pruebas de integración para el archivo `checkout.js` utilizando snapshot testing.

3) Hacer cambios en la lógica del código para entender como mantener los snapshots en el repositorio.

#### Actividades para el alumno 👨🏻‍💻

El alumno debe resolver el siguiente ejercicio utilizando la información del siguiente Codepen:
  https://codepen.io/booleanchile/pen/MWKWqNx
y siguiendo las instrucciones creando archivos dentro de la carpeta `student`

- Crear un archivo `users-dashboard.js` con el contenido del archivo Javascript en Codepen
- Crear un archivo `users-dashboard.html` con el contenido del
archivo HTML en Codepen
- Re-factorizar el código Javascript para poder aplicarle pruebas
- Implementar Snapshot testing e implementar 2 pruebas en el archivo `users-dashboard.spec.js`

```javascript
  describe('Users Dashboard', () => {
    it('should set error on fields when try to submit without set fields', () => {
      /*
        Ejecuta las acciones necesarias para hacer submit del formulario sin agregar datos
        y luego utilizar el método aprendido para generar un snapshot
        Al revisar el snapshot creado deberiamos ver los input con la clase
        `validation-failed`
      */
    });

    it('should submit and add to the list the user', () => {
      /*
        Ejecuta las acciones necesarias para hacer submit del formulario agregando los datos necesarios y luego utilizar el método aprendido para generar un snapshot
        Al revisar el snapshot creado deberiamos ver el nuevo usuario en el div
        con la clase `users`
      */
    });
```
