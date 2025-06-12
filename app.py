import json
import os

def application(environ, start_response):
    path = environ['PATH_INFO']
    method = environ['REQUEST_METHOD']
    
    # Convertir la ruta a una ruta relativa dentro de /ATI
    if path.startswith('/ATI'):
        path = path[5:]  # Eliminar '/ATI' del inicio
    
    # Servir archivos estáticos (JSON, HTML, JS, CSS)
    if path.endswith(('.json', '.js', '.css', '.html')):
        file_path = f"/var/www/html/ATI{path}"
        
        if os.path.isfile(file_path):
            # Determinar tipo MIME
            if path.endswith('.json'):
                content_type = 'application/json'
            elif path.endswith('.js'):
                content_type = 'application/javascript'
            elif path.endswith('.css'):
                content_type = 'text/css'
            elif path.endswith('.html'):
                content_type = 'text/html'
            else:
                content_type = 'text/plain'
            
            with open(file_path, 'rb') as f:
                content = f.read()
            
            headers = [
                ('Content-Type', content_type),
                ('Content-Length', str(len(content)))
            ]
            start_response('200 OK', headers)
            return [content]
        else:
            start_response('404 Not Found', [('Content-Type', 'text/plain')])
            return [b'File not found']

    # Endpoint para modificar JSON (ejemplo POST)
    elif path == '/api/update' and method == 'POST':
        try:
            # Leer datos del request
            content_length = int(environ.get('CONTENT_LENGTH', 0))
            request_body = environ['wsgi.input'].read(content_length)
            data = json.loads(request_body)
            
            # Actualizar archivo JSON
            cedula = data['cedula']
            file_path = f"/var/www/html/ATI/api/{cedula}/perfil.json"
            
            with open(file_path, 'w') as f:
                json.dump(data['content'], f)
            
            response = json.dumps({'status': 'success'}).encode('utf-8')
            headers = [
                ('Content-Type', 'application/json'),
                ('Content-Length', str(len(response)))
            ]
            start_response('200 OK', headers)
            return [response]
        
        except Exception as e:
            error = json.dumps({'error': str(e)}).encode('utf-8')
            start_response('500 Internal Server Error', [('Content-Type', 'application/json')])
            return [error]

    # Para todas las demás rutas, servir index.html (SPA)
    else:
        with open('/var/www/html/ATI/index.html', 'rb') as f:
            content = f.read()
        
        headers = [
            ('Content-Type', 'text/html'),
            ('Content-Length', str(len(content)))
        ]
        start_response('200 OK', headers)
        return [content]