FROM ubuntu:22.04

# Establecemos variables de entorno para evitar prompts
ENV DEBIAN_FRONTEND=noninteractive \
    PYTHONUNBUFFERED=1 \
    VIRTUAL_ENV=/opt/venv

# Instalación de Apache, Python y dependencias WSGI
RUN apt-get update && apt-get install -y \
    apache2 \
    apache2-utils \
    ssl-cert \
    libapache2-mod-wsgi-py3 \
    python3 \
    python3-pip \
    python3-venv \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Crear y activar entorno virtual
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

# Instalar paquetes pip en el entorno virtual
RUN pip install --no-cache-dir --upgrade pip setuptools

# Habilitar módulos REQUERIDOS
RUN a2enmod wsgi rewrite && \
    a2enmod headers && \
    a2dissite 000-default && \
    a2ensite 000-default

# Eliminar el archivo index.html por defecto de Apache y crear directorio para la aplicación
RUN rm /var/www/html/index.html
RUN mkdir -p /var/www/html/ATI

# Configurar Apache para WSGI
RUN echo "<VirtualHost *:80>\n\
    ServerAdmin webmaster@localhost\n\
    DocumentRoot /var/www/html\n\n\
    WSGIDaemonProcess app python-home=/opt/venv python-path=/var/www/html/ATI\n\
    WSGIScriptAlias /ATI /var/www/html/ATI/app.py\n\n\
    <Directory /var/www/html/ATI>\n\
        WSGIProcessGroup app\n\
        WSGIApplicationGroup %{GLOBAL}\n\
        Require all granted\n\
        Options FollowSymLinks\n\
    </Directory>\n\n\
    # Servir archivos estáticos directamente\n\
    Alias /ATI/api/ /var/www/html/ATI/api/\n\
    <Directory /var/www/html/ATI/api>\n\
        Require all granted\n\
    </Directory>\n\
</VirtualHost>" > /etc/apache2/sites-available/000-default.conf

COPY . /var/www/html/ATI/

# Habilitar módulo WSGI
RUN a2enmod wsgi

# Permisos y propiedad de archivos
RUN chown -R www-data:www-data /var/www/html && \
    chmod -R 755 /var/www/html/

# Exponer puerto y ejecutar Apache
EXPOSE 80
CMD ["apache2ctl", "-D", "FOREGROUND"]