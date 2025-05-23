
# API Reference - Sistema POS/Restaurant Management

## Introdução

Esta documentação detalha todos os endpoints da API do sistema, incluindo parâmetros, respostas e exemplos de uso.

## Base URL
```
https://api.restaurante.com/v1
```

## Autenticação
```http
Authorization: Bearer <token>
Content-Type: application/json
```

## Status Codes

| Código | Descrição |
|--------|-----------|
| 200 | OK - Requisição bem-sucedida |
| 201 | Created - Recurso criado com sucesso |
| 400 | Bad Request - Parâmetros inválidos |
| 401 | Unauthorized - Token inválido ou expirado |
| 403 | Forbidden - Sem permissão para o recurso |
| 404 | Not Found - Recurso não encontrado |
| 500 | Internal Server Error - Erro interno do servidor |

---

## Products API

### Listar Produtos
```http
GET /api/products
```

**Parâmetros de Query:**
- `category` (string, opcional): Filtrar por categoria
- `status` (string, opcional): "Ativo" ou "Inativo"
- `limit` (number, opcional): Limite de resultados (padrão: 50)
- `offset` (number, opcional): Offset para paginação (padrão: 0)

**Resposta:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Hambúrguer Artesanal",
      "category": "Lanches",
      "price": 25.90,
      "status": "Ativo",
      "image": "/uploads/hamburger.jpg",
      "description": "Hambúrguer artesanal com queijo e bacon",
      "stock": 20,
      "created_at": "2024-01-01T10:00:00Z",
      "updated_at": "2024-01-01T10:00:00Z"
    }
  ],
  "meta": {
    "total": 150,
    "limit": 50,
    "offset": 0,
    "has_more": true
  }
}
```

### Buscar Produto por ID
```http
GET /api/products/{id}
```

**Resposta:**
```json
{
  "data": {
    "id": 1,
    "name": "Hambúrguer Artesanal",
    "category": "Lanches",
    "price": 25.90,
    "status": "Ativo",
    "image": "/uploads/hamburger.jpg",
    "description": "Hambúrguer artesanal com queijo e bacon",
    "stock": 20,
    "created_at": "2024-01-01T10:00:00Z",
    "updated_at": "2024-01-01T10:00:00Z"
  }
}
```

### Criar Produto
```http
POST /api/products
```

**Body:**
```json
{
  "name": "Pizza Margherita",
  "category": "Pizzas",
  "price": 35.50,
  "description": "Pizza com molho de tomate, mussarela e manjericão",
  "stock": 15,
  "status": "Ativo"
}
```

**Resposta:**
```json
{
  "data": {
    "id": 2,
    "name": "Pizza Margherita",
    "category": "Pizzas",
    "price": 35.50,
    "status": "Ativo",
    "image": null,
    "description": "Pizza com molho de tomate, mussarela e manjericão",
    "stock": 15,
    "created_at": "2024-01-01T11:00:00Z",
    "updated_at": "2024-01-01T11:00:00Z"
  }
}
```

### Atualizar Produto
```http
PUT /api/products/{id}
```

**Body:**
```json
{
  "name": "Pizza Margherita Grande",
  "price": 42.90,
  "stock": 10
}
```

### Excluir Produto
```http
DELETE /api/products/{id}
```

**Resposta:**
```json
{
  "message": "Produto excluído com sucesso"
}
```

### Produtos em Baixa
```http
GET /api/products/low-stock
```

**Parâmetros de Query:**
- `threshold` (number, opcional): Limite de estoque baixo (padrão: 10)

---

## Orders API

### Listar Pedidos
```http
GET /api/orders
```

**Parâmetros de Query:**
- `status` (string, opcional): Filtrar por status
- `date_from` (string, opcional): Data inicial (YYYY-MM-DD)
- `date_to` (string, opcional): Data final (YYYY-MM-DD)
- `customer` (string, opcional): Filtrar por cliente
- `limit` (number, opcional): Limite de resultados

**Resposta:**
```json
{
  "data": [
    {
      "id": "#001",
      "customer": "Mesa 5",
      "items": [
        {
          "id": 1,
          "name": "Hambúrguer Artesanal",
          "quantity": 2,
          "notes": "Sem cebola",
          "price": 25.90,
          "prepared": false,
          "productId": 1
        }
      ],
      "status": "Em preparo",
      "time": "14:30",
      "elapsedTime": "5 min",
      "priority": "Normal",
      "total": 51.80,
      "paid": false,
      "paymentMethod": null,
      "created_at": "2024-01-01T14:30:00Z",
      "updated_at": "2024-01-01T14:35:00Z"
    }
  ]
}
```

### Criar Pedido
```http
POST /api/orders
```

**Body:**
```json
{
  "customer": "Mesa 8",
  "items": [
    {
      "productId": 1,
      "name": "Hambúrguer Artesanal",
      "quantity": 1,
      "notes": "Mal passado",
      "price": 25.90
    },
    {
      "productId": 3,
      "name": "Refrigerante",
      "quantity": 1,
      "notes": "Gelado",
      "price": 5.00
    }
  ],
  "status": "Aguardando",
  "time": "15:00",
  "priority": "Normal",
  "total": 30.90
}
```

### Atualizar Status do Pedido
```http
PATCH /api/orders/{id}/status
```

**Body:**
```json
{
  "status": "Pronto"
}
```

### Pedidos da Cozinha
```http
GET /api/orders/kitchen
```

Retorna apenas pedidos com status "Aguardando" ou "Em preparo".

### Marcar Item como Preparado
```http
PATCH /api/orders/{orderId}/items/{itemIndex}/toggle-prepared
```

---

## Inventory API

### Listar Transações de Estoque
```http
GET /api/inventory
```

**Parâmetros de Query:**
- `product_id` (number, opcional): Filtrar por produto
- `type` (string, opcional): "entrada" ou "saida"
- `date_from` (string, opcional): Data inicial
- `date_to` (string, opcional): Data final

**Resposta:**
```json
{
  "data": [
    {
      "id": 1,
      "productId": 1,
      "type": "entrada",
      "quantity": 50,
      "reason": "Compra inicial",
      "date": "2024-01-01T08:00:00Z",
      "userId": "user123"
    }
  ]
}
```

### Adicionar Transação
```http
POST /api/inventory/transaction
```

**Body:**
```json
{
  "productId": 1,
  "type": "entrada",
  "quantity": 20,
  "reason": "Reposição de estoque"
}
```

### Histórico por Produto
```http
GET /api/inventory/product/{productId}
```

---

## Reports API

### Vendas por Período
```http
GET /api/reports/sales/{period}
```

**Períodos disponíveis:** `day`, `week`, `month`

**Resposta:**
```json
{
  "data": {
    "labels": ["00:00", "01:00", "02:00", "..."],
    "data": [0, 0, 0, 5, 12, 25, "..."],
    "total": 142,
    "period": "day"
  }
}
```

### Receita por Período
```http
GET /api/reports/revenue/{period}
```

**Resposta:**
```json
{
  "data": {
    "labels": ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
    "data": [1250.50, 2100.30, 1890.00, 2350.80, 2890.45, 3200.00, 2100.25],
    "total": 15781.30,
    "period": "week"
  }
}
```

### Produtos Mais Vendidos
```http
GET /api/reports/top-products/{period}
```

**Resposta:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Hambúrguer Artesanal",
      "quantity": 124,
      "revenue": 3211.60,
      "percentage": 25.5
    }
  ]
}
```

### Estatísticas de Pedidos
```http
GET /api/reports/order-stats/{period}
```

**Resposta:**
```json
{
  "data": {
    "total": 342,
    "completed": 325,
    "canceled": 17,
    "average": 67.50,
    "byStatus": [
      {"status": "Concluído", "count": 325},
      {"status": "Cancelado", "count": 17}
    ]
  }
}
```

---

## Establishments API (SaaS)

### Listar Estabelecimentos
```http
GET /api/establishments
```

**Resposta:**
```json
{
  "data": [
    {
      "id": "est-001",
      "name": "Restaurante São Paulo",
      "currentPlanId": 2,
      "status": "active",
      "createdAt": "2023-10-01",
      "settings": {
        "theme": "light",
        "timezone": "America/Sao_Paulo",
        "currency": "BRL",
        "tax_rate": 0.1
      }
    }
  ]
}
```

### Criar Estabelecimento
```http
POST /api/establishments
```

**Body:**
```json
{
  "name": "Pizzaria Centro",
  "currentPlanId": 1,
  "settings": {
    "timezone": "America/Sao_Paulo",
    "currency": "BRL"
  }
}
```

### Plano Atual
```http
GET /api/establishments/{id}/current-plan
```

**Resposta:**
```json
{
  "data": {
    "id": 2,
    "name": "Profissional",
    "price": 99.90,
    "features": ["Produtos ilimitados", "3 terminais PDV"],
    "nextPaymentDate": "2024-03-15",
    "renewalType": "Automática"
  }
}
```

### Atualizar Plano
```http
PATCH /api/establishments/{id}/update-plan
```

**Body:**
```json
{
  "planId": 3
}
```

### Histórico de Pagamentos
```http
GET /api/establishments/{id}/payments
```

**Resposta:**
```json
{
  "data": [
    {
      "id": 1,
      "planName": "Profissional",
      "amount": 99.90,
      "status": "Pago",
      "paymentMethod": "Cartão de crédito",
      "date": "2024-01-15",
      "period": "15/01/2024 - 14/02/2024",
      "invoiceUrl": "/invoices/001.pdf"
    }
  ]
}
```

---

## Plans API

### Listar Planos
```http
GET /api/plans
```

**Resposta:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Básico",
      "price": 49.90,
      "period": "mês",
      "features": [
        "Até 100 produtos",
        "1 terminal PDV",
        "Relatórios básicos"
      ],
      "maxProducts": 100,
      "maxTerminals": 1
    },
    {
      "id": 2,
      "name": "Profissional",
      "price": 99.90,
      "period": "mês",
      "features": [
        "Produtos ilimitados",
        "3 terminais PDV",
        "KDS completo"
      ],
      "popular": true,
      "maxProducts": null,
      "maxTerminals": 3
    }
  ]
}
```

---

## Error Responses

### Formato Padrão
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Dados inválidos fornecidos",
    "details": {
      "field": "price",
      "issue": "Deve ser um número positivo"
    },
    "timestamp": "2024-01-01T15:30:00Z"
  }
}
```

### Códigos de Erro Comuns

| Código | Descrição |
|--------|-----------|
| `VALIDATION_ERROR` | Dados de entrada inválidos |
| `NOT_FOUND` | Recurso não encontrado |
| `UNAUTHORIZED` | Token inválido ou ausente |
| `FORBIDDEN` | Sem permissão para o recurso |
| `INSUFFICIENT_STOCK` | Estoque insuficiente |
| `DUPLICATE_ENTRY` | Tentativa de criar recurso duplicado |
| `PLAN_LIMIT_EXCEEDED` | Limite do plano excedido |

---

## Rate Limiting

A API implementa rate limiting para prevenir abuso:

- **Limite padrão**: 1000 requisições por hora por IP
- **Limite autenticado**: 5000 requisições por hora por usuário
- **Headers de resposta**:
  ```
  X-RateLimit-Limit: 1000
  X-RateLimit-Remaining: 995
  X-RateLimit-Reset: 1640995200
  ```

---

## Versionamento

- **Versão atual**: v1
- **Suporte**: Versões anteriores são suportadas por 12 meses
- **Breaking changes**: Comunicados com 30 dias de antecedência
- **Header de versão**: `API-Version: 1.0`

---

## SDKs e Bibliotecas

### JavaScript/TypeScript
```bash
npm install @restaurante/api-client
```

```typescript
import { RestauranteAPI } from '@restaurante/api-client';

const api = new RestauranteAPI({
  baseURL: 'https://api.restaurante.com/v1',
  token: 'your-jwt-token'
});

const products = await api.products.list();
```

### Webhook Support

Para eventos em tempo real, a API suporta webhooks:

```http
POST /api/webhooks
```

**Eventos disponíveis:**
- `order.created`
- `order.status_changed`
- `payment.completed`
- `inventory.low_stock`

---

*Documentação da API atualizada em: $(date)*
*Versão da API: 1.0*
