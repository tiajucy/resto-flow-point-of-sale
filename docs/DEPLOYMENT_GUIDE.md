
# Guia de Deploy - Sistema POS/Restaurant Management

## Índice
1. [Pré-requisitos](#pré-requisitos)
2. [Configuração do Ambiente](#configuração-do-ambiente)
3. [Build de Produção](#build-de-produção)
4. [Deploy em Diferentes Plataformas](#deploy-em-diferentes-plataformas)
5. [Configuração de SSL](#configuração-de-ssl)
6. [Monitoramento](#monitoramento)
7. [Backup e Recuperação](#backup-e-recuperação)
8. [Troubleshooting](#troubleshooting)

---

## Pré-requisitos

### Ambiente de Desenvolvimento
- **Node.js**: >= 18.0.0
- **Bun**: >= 1.0.0 (package manager)
- **Git**: Para controle de versão
- **Docker**: Para containerização (opcional)

### Ferramentas Necessárias
```bash
# Instalar Bun
curl -fsSL https://bun.sh/install | bash

# Verificar versões
node --version
bun --version
git --version
```

### Dependências do Sistema
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install -y curl wget git build-essential

# CentOS/RHEL
sudo yum install -y curl wget git gcc-c++ make

# macOS
brew install node git
```

---

## Configuração do Ambiente

### Variáveis de Ambiente

#### Desenvolvimento (`.env.development`)
```bash
# Configurações da aplicação
VITE_APP_TITLE="POS System - Development"
VITE_APP_VERSION="1.0.0"
VITE_NODE_ENV="development"

# URLs da API
VITE_API_BASE_URL="http://localhost:3001"
VITE_WEBSOCKET_URL="ws://localhost:3001"

# Configurações de debug
VITE_DEBUG_MODE="true"
VITE_LOG_LEVEL="debug"

# Mock API (para desenvolvimento)
VITE_USE_MOCK_API="true"
```

#### Produção (`.env.production`)
```bash
# Configurações da aplicação
VITE_APP_TITLE="Sistema POS"
VITE_APP_VERSION="1.0.0"
VITE_NODE_ENV="production"

# URLs da API (produção)
VITE_API_BASE_URL="https://api.restaurante.com"
VITE_WEBSOCKET_URL="wss://api.restaurante.com"

# Configurações de segurança
VITE_DEBUG_MODE="false"
VITE_LOG_LEVEL="error"

# Integrações externas
VITE_STRIPE_PUBLIC_KEY="pk_live_..."
VITE_SUPABASE_URL="https://projeto.supabase.co"
VITE_SUPABASE_ANON_KEY="eyJ..."

# Analytics
VITE_GA_TRACKING_ID="G-XXXXXXXXXX"
VITE_SENTRY_DSN="https://..."

# Feature flags
VITE_ENABLE_PWA="true"
VITE_ENABLE_ANALYTICS="true"
```

#### Homologação (`.env.staging`)
```bash
# Configurações da aplicação
VITE_APP_TITLE="POS System - Staging"
VITE_NODE_ENV="staging"

# URLs da API (homologação)
VITE_API_BASE_URL="https://staging-api.restaurante.com"

# Configurações de teste
VITE_DEBUG_MODE="true"
VITE_LOG_LEVEL="info"

# Chaves de teste
VITE_STRIPE_PUBLIC_KEY="pk_test_..."
```

### Configuração do Build

#### `vite.config.ts` (Produção)
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.restaurante\.com\//,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 // 24 horas
              }
            }
          }
        ]
      },
      manifest: {
        name: 'Sistema POS',
        short_name: 'POS',
        description: 'Sistema de Ponto de Venda para Restaurantes',
        theme_color: '#000000',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: process.env.NODE_ENV !== 'production',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-tabs'
          ],
          charts: ['recharts'],
          forms: ['react-hook-form', '@hookform/resolvers'],
          query: ['@tanstack/react-query']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  server: {
    port: 3000,
    host: true
  },
  preview: {
    port: 4173,
    host: true
  }
})
```

---

## Build de Produção

### Scripts de Build

#### `package.json`
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "build:staging": "tsc && vite build --mode staging",
    "build:production": "tsc && vite build --mode production",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "type-check": "tsc --noEmit",
    "test": "vitest",
    "test:coverage": "vitest --coverage",
    "analyze": "npx vite-bundle-analyzer dist"
  }
}
```

### Processo de Build

```bash
# 1. Instalar dependências
bun install

# 2. Verificar tipos TypeScript
bun run type-check

# 3. Executar linting
bun run lint

# 4. Executar testes
bun run test

# 5. Build de produção
bun run build:production

# 6. Verificar o build
bun run preview
```

### Otimizações de Build

#### Análise de Bundle
```bash
# Instalar analisador
bun add -D vite-bundle-analyzer

# Analisar bundle
bun run analyze
```

#### Compressão de Assets
```bash
# Instalar plugin de compressão
bun add -D vite-plugin-compression

# Adicionar ao vite.config.ts
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    // ... outros plugins
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz'
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br'
    })
  ]
})
```

---

## Deploy em Diferentes Plataformas

### 1. Vercel (Recomendado)

#### Configuração (`vercel.json`)
```json
{
  "framework": "vite",
  "buildCommand": "bun run build:production",
  "devCommand": "bun run dev",
  "installCommand": "bun install",
  "outputDirectory": "dist",
  "functions": {
    "app/api/**/*.ts": {
      "runtime": "nodejs18.x"
    }
  },
  "rewrites": [
    {
      "source": "/((?!api).*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

#### Deploy
```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### 2. Netlify

#### Configuração (`netlify.toml`)
```toml
[build]
  command = "bun run build:production"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.js"
  [headers.values]
    Content-Type = "application/javascript; charset=utf-8"

[[headers]]
  for = "/*.css"
  [headers.values]
    Content-Type = "text/css; charset=utf-8"
```

#### Deploy
```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=dist
```

### 3. AWS S3 + CloudFront

#### Script de Deploy (`deploy-aws.sh`)
```bash
#!/bin/bash

# Variáveis
BUCKET_NAME="restaurante-pos-app"
DISTRIBUTION_ID="E1234567890123"
REGION="us-east-1"

# Build
echo "🏗️  Building application..."
bun run build:production

# Upload para S3
echo "📤 Uploading to S3..."
aws s3 sync dist/ s3://$BUCKET_NAME --delete --region $REGION

# Configurar headers de cache
aws s3 cp dist/ s3://$BUCKET_NAME --recursive --region $REGION \
  --exclude "*" --include "assets/*" \
  --cache-control "public, max-age=31536000, immutable"

# Invalidar CloudFront
echo "🔄 Invalidating CloudFront..."
aws cloudfront create-invalidation \
  --distribution-id $DISTRIBUTION_ID \
  --paths "/*"

echo "✅ Deploy completed!"
```

### 4. DigitalOcean App Platform

#### Configuração (`.do/app.yaml`)
```yaml
name: restaurante-pos
services:
- name: web
  source_dir: /
  github:
    repo: user/restaurante-pos
    branch: main
  run_command: bun run preview
  build_command: bun install && bun run build:production
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  routes:
  - path: /
  envs:
  - key: NODE_ENV
    value: production
  - key: VITE_API_BASE_URL
    value: https://api.restaurante.com
```

### 5. Docker

#### `Dockerfile`
```dockerfile
# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Instalar Bun
RUN npm install -g bun

# Copiar package files
COPY package.json bun.lockb ./

# Instalar dependências
RUN bun install --frozen-lockfile

# Copiar código fonte
COPY . .

# Build da aplicação
RUN bun run build:production

# Production stage
FROM nginx:alpine

# Copiar configuração do Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copiar arquivos buildados
COPY --from=build /app/dist /usr/share/nginx/html

# Expor porta
EXPOSE 80

# Comando de inicialização
CMD ["nginx", "-g", "daemon off;"]
```

#### `nginx.conf`
```nginx
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;
    
    sendfile        on;
    keepalive_timeout  65;
    
    # Compressão
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/xml+rss
        application/atom+xml
        image/svg+xml;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        # Cache para assets estáticos
        location /assets/ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }

        # SPA fallback
        location / {
            try_files $uri $uri/ /index.html;
        }

        # Security headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header Referrer-Policy "no-referrer-when-downgrade" always;
        add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    }
}
```

#### `docker-compose.yml`
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
    restart: unless-stopped

  # Opcional: Base de dados
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: restaurante
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: senha123
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

---

## Configuração de SSL

### Let's Encrypt com Certbot

```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-nginx

# Obter certificado
sudo certbot --nginx -d restaurante.com -d www.restaurante.com

# Auto-renovação
sudo crontab -e
# Adicionar linha:
0 12 * * * /usr/bin/certbot renew --quiet
```

### Configuração Nginx com SSL

```nginx
server {
    listen 80;
    server_name restaurante.com www.restaurante.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name restaurante.com www.restaurante.com;

    ssl_certificate /etc/letsencrypt/live/restaurante.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/restaurante.com/privkey.pem;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    ssl_prefer_server_ciphers off;
    
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## Monitoramento

### 1. Logs de Aplicação

#### Winston Logger
```typescript
// src/lib/logger.ts
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

export default logger;
```

### 2. Sentry (Error Tracking)

```typescript
// src/lib/sentry.ts
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.VITE_NODE_ENV,
  integrations: [
    new Sentry.BrowserTracing(),
  ],
  tracesSampleRate: 1.0,
});
```

### 3. Health Check

```typescript
// src/api/health.ts
export const healthCheck = async () => {
  const checks = {
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    status: 'ok',
    services: {
      database: await checkDatabase(),
      redis: await checkRedis(),
      external_apis: await checkExternalAPIs()
    }
  };
  
  return checks;
};
```

### 4. Métricas de Performance

```typescript
// src/lib/analytics.ts
export const trackPerformance = () => {
  // Core Web Vitals
  getCLS(sendToAnalytics);
  getFID(sendToAnalytics);
  getFCP(sendToAnalytics);
  getLCP(sendToAnalytics);
  getTTFB(sendToAnalytics);
};

const sendToAnalytics = (metric: any) => {
  gtag('event', metric.name, {
    value: Math.round(metric.value),
    event_category: 'Web Vitals',
    non_interaction: true,
  });
};
```

---

## Backup e Recuperação

### 1. Backup Automatizado

#### Script de Backup (`backup.sh`)
```bash
#!/bin/bash

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/restaurante"

# Criar diretório de backup
mkdir -p $BACKUP_DIR

# Backup do banco de dados
pg_dump -h localhost -U admin restaurante > $BACKUP_DIR/db_$DATE.sql

# Backup de arquivos de configuração
tar -czf $BACKUP_DIR/config_$DATE.tar.gz /etc/nginx/ /var/www/

# Upload para S3
aws s3 cp $BACKUP_DIR/ s3://restaurante-backups/ --recursive

# Limpar backups antigos (manter apenas 30 dias)
find $BACKUP_DIR -type f -mtime +30 -delete

echo "Backup completed: $DATE"
```

#### Cron Job
```bash
# Executar backup diário às 3:00 AM
0 3 * * * /usr/local/bin/backup.sh >> /var/log/backup.log 2>&1
```

### 2. Procedimento de Recuperação

```bash
# 1. Parar serviços
sudo systemctl stop nginx
sudo systemctl stop postgresql

# 2. Restaurar banco de dados
psql -h localhost -U admin -d restaurante < backup_file.sql

# 3. Restaurar arquivos
tar -xzf config_backup.tar.gz -C /

# 4. Reiniciar serviços
sudo systemctl start postgresql
sudo systemctl start nginx

# 5. Verificar status
sudo systemctl status nginx
sudo systemctl status postgresql
```

---

## Troubleshooting

### Problemas Comuns

#### 1. Build Failures

```bash
# Limpar cache do Bun
bun install --force

# Verificar tipos TypeScript
bun run type-check

# Verificar dependências
bun audit

# Rebuild node modules
rm -rf node_modules bun.lockb
bun install
```

#### 2. Performance Issues

```bash
# Analisar bundle size
bun run analyze

# Verificar memory leaks
node --inspect-brk=0.0.0.0:9229 dist/server.js

# Profiling
node --prof dist/server.js
node --prof-process isolate-*.log > profile.txt
```

#### 3. SSL Issues

```bash
# Verificar certificado
openssl x509 -in /etc/letsencrypt/live/domain.com/cert.pem -text -noout

# Testar SSL
curl -I https://domain.com

# Renovar certificado
sudo certbot renew --dry-run
```

#### 4. Nginx Issues

```bash
# Testar configuração
sudo nginx -t

# Verificar logs
sudo tail -f /var/log/nginx/error.log

# Reload configuração
sudo nginx -s reload
```

### Logs Úteis

```bash
# Logs da aplicação
tail -f /var/log/restaurante/app.log

# Logs do Nginx
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

# Logs do sistema
journalctl -u nginx -f
journalctl -u postgresql -f

# Logs do Docker
docker logs container_name -f
```

### Comandos de Diagnóstico

```bash
# Verificar portas abertas
netstat -tlnp

# Verificar uso de memória
free -h

# Verificar uso de disco
df -h

# Verificar processos
ps aux | grep nginx
ps aux | grep node

# Verificar conectividade
curl -I https://api.restaurante.com/health
```

---

## Checklist de Deploy

### Pré-Deploy
- [ ] **Testes passando**: Todos os testes unitários e de integração
- [ ] **Build sem erros**: `bun run build` executado com sucesso
- [ ] **Linting clean**: Sem warnings do ESLint
- [ ] **Type checking**: TypeScript sem erros
- [ ] **Performance check**: Bundle size analisado
- [ ] **Security scan**: Dependências auditadas

### Deploy
- [ ] **Variáveis de ambiente**: Configuradas corretamente
- [ ] **Banco de dados**: Migrations aplicadas
- [ ] **SSL certificado**: Configurado e válido
- [ ] **DNS configurado**: Apontando para o servidor correto
- [ ] **CDN configurado**: Para assets estáticos
- [ ] **Monitoramento ativo**: Logs e métricas funcionando

### Pós-Deploy
- [ ] **Health check**: Endpoint de saúde respondendo
- [ ] **Funcionalidades testadas**: Fluxos críticos verificados
- [ ] **Performance monitorada**: Tempos de resposta OK
- [ ] **Erro logs**: Verificados por problemas
- [ ] **Backup agendado**: Sistema de backup ativo
- [ ] **Documentação atualizada**: Deploy documentado

---

*Guia de Deploy atualizado em: $(date)*
*Versão do sistema: 1.0.0*
