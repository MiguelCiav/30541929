## Cómo ejecutar la web en docker

1. Teniendo instalado docker, se debe descargar el archivo `Dockerfile` de este repositorio, colocarlo en una carpeta, y dentro de dicha carpeta ejecutar el siguiente comando:

   ```bash
   docker build -t 30541929 .
   ```

2. Una vez construido el contenedor, se debe ejecutar el siguiente comando:

   ```bash
   docker run -tid --name 30541929 -p 8080:80 30541929
    ```
3. Una vez ejecutado el contenedor, se puede acceder a la web desde el navegador en la dirección `http://localhost:8080`.

4. Si se desea detener el contenedor, se puede ejecutar el siguiente comando:

   ```bash
   docker stop 30541929
   ```

5. Si se quiere volver a iniciar el contenedor, se puede ejecutar el siguiente comando:

   ```bash
   docker start 30541929
   ```