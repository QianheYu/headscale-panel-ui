如果你想要将前端与后端部署到同一个服务器上，建议你使用nginx或其他能够同时提供

```
server
{
    listen 80;
    listen [::]:80;
    server_name example.com;
    
    # headscale-panel
    location ~ ^/(api|\.well-known/openid-configuration) {
        proxy_pass http://localhost:8088;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
    
    # headscale
    location ~ ^/(health|oidc|windows|apple|key|register|drep|bootstrap-dns|swagger|ts2021) {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
    
    location / {
        root /path/to/your/static/files;
        index index.html;
    }
}
```