
# Manual do Usuário - Sistema POS/Restaurant Management

## Índice
1. [Introdução](#introdução)
2. [Primeiros Passos](#primeiros-passos)
3. [Dashboard Principal](#dashboard-principal)
4. [Gestão de Produtos](#gestão-de-produtos)
5. [Sistema POS](#sistema-pos)
6. [Gestão de Pedidos](#gestão-de-pedidos)
7. [Cozinha (KDS)](#cozinha-kds)
8. [Caixa e Pagamentos](#caixa-e-pagamentos)
9. [Relatórios](#relatórios)
10. [Configurações](#configurações)
11. [Dicas e Atalhos](#dicas-e-atalhos)
12. [Solução de Problemas](#solução-de-problemas)

---

## Introdução

Bem-vindo ao Sistema POS/Restaurant Management! Este manual vai guiá-lo através de todas as funcionalidades do sistema, desde o básico até recursos avançados.

### O que é o Sistema POS?

O Sistema POS (Point of Sale) é uma solução completa para gerenciamento de restaurantes que inclui:

- **POS (Ponto de Venda)**: Para criar e processar pedidos
- **KDS (Kitchen Display System)**: Para gerenciar o preparo na cozinha
- **Gestão de Estoque**: Controle de produtos e inventário
- **Relatórios**: Análises de vendas e performance
- **Multi-estabelecimento**: Para redes de restaurantes

---

## Primeiros Passos

### Acessando o Sistema

1. **Abra seu navegador** (Chrome, Firefox, Safari, Edge)
2. **Digite o endereço**: `https://seusistema.com`
3. **Faça login** com suas credenciais

### Interface Principal

A interface é dividida em:

```
┌─────────────────────────────────────────────┐
│ [☰] Logo do Sistema            [👤] Perfil │
├─────────────────────────────────────────────┤
│ [📊] │                                     │
│ [🛍️] │                                     │
│ [📋] │          Área Principal             │
│ [🍳] │                                     │
│ [💰] │                                     │
│ [📈] │                                     │
│ [⚙️] │                                     │
└─────────────────────────────────────────────┘
```

**Menu Lateral:**
- 📊 **Dashboard**: Visão geral do negócio
- 🛍️ **Produtos**: Gerenciar cardápio e estoque
- 📋 **Pedidos**: Visualizar e gerenciar pedidos
- 🍳 **Cozinha**: Interface para preparo (KDS)
- 💰 **Caixa**: Processar pagamentos
- 📈 **Relatórios**: Análises e estatísticas
- ⚙️ **Configurações**: Ajustes do sistema

---

## Dashboard Principal

O Dashboard oferece uma visão geral em tempo real do seu restaurante.

### Métricas Principais

**Cards de Resumo:**
```
┌─────────────┬─────────────┬─────────────┬─────────────┐
│ Vendas Hoje │ Pedidos     │ Ticket      │ Produtos    │
│ R$ 2.450,00 │ Ativos: 8   │ Médio:      │ Baixos: 3   │
│ ↗️ +15%     │ Total: 45   │ R$ 54,44    │             │
└─────────────┴─────────────┴─────────────┴─────────────┘
```

### Gráficos Interativos

- **Vendas por Hora**: Mostra o movimento ao longo do dia
- **Produtos Mais Vendidos**: Ranking dos itens populares
- **Status dos Pedidos**: Distribuição por status

### Alertas Importantes

🔴 **Urgente**: Produtos em falta no estoque
🟡 **Atenção**: Pedidos com tempo elevado
🟢 **Normal**: Sistema funcionando corretamente

---

## Gestão de Produtos

### Visualizando Produtos

1. **Clique em "Produtos"** no menu lateral
2. **Visualize a lista** com todos os produtos cadastrados
3. **Use os filtros** para encontrar produtos específicos:
   - Por categoria (Lanches, Pizzas, Bebidas, etc.)
   - Por status (Ativo/Inativo)
   - Por estoque (Normal/Baixo)

### Cadastrando um Novo Produto

1. **Clique no botão "Novo Produto"** (canto superior direito)
2. **Preencha os campos obrigatórios**:
   - **Nome**: Nome do produto (ex: "Hambúrguer Artesanal")
   - **Categoria**: Selecione a categoria apropriada
   - **Preço**: Valor de venda (ex: 25,90)
   - **Estoque**: Quantidade inicial disponível
3. **Campos opcionais**:
   - **Descrição**: Detalhes do produto
   - **Imagem**: Upload de foto do produto
4. **Clique em "Salvar"** para confirmar

### Editando Produtos

1. **Localize o produto** na lista
2. **Clique no ícone de edição** (✏️)
3. **Modifique os campos** desejados
4. **Clique em "Atualizar"** para salvar

### Gerenciando Estoque

**Entrada de Estoque:**
1. **Clique em "Movimentação de Estoque"**
2. **Selecione "Entrada"**
3. **Escolha o produto**
4. **Informe a quantidade**
5. **Adicione o motivo** (ex: "Compra de fornecedor")

**Saída de Estoque:**
- **Automática**: Quando um pedido é finalizado
- **Manual**: Para perdas, vencimentos, etc.

### Alertas de Estoque Baixo

O sistema alerta quando produtos atingem o estoque mínimo:

```
⚠️ ALERTA: Estoque Baixo
🍔 Hambúrguer Artesanal: 3 unidades
🍕 Pizza Margherita: 1 unidade
🥤 Refrigerante 350ml: 5 unidades
```

---

## Sistema POS

O POS é onde você cria e processa pedidos de clientes.

### Tipos de Pedido

**1. Pedido de Mesa**
- Para clientes que consomem no local
- Requer apenas o número da mesa

**2. Pedido de Retirada**
- Para clientes que buscam no balcão
- Requer nome e telefone do cliente

**3. Pedido de Delivery**
- Para entregas
- Requer nome, telefone, endereço completo e taxa de entrega

### Criando um Pedido

1. **Acesse "Caixa"** no menu lateral
2. **Escolha o tipo de pedido** (Mesa/Retirada/Delivery)
3. **Preencha os dados do cliente**

**Para Mesa:**
```
┌─────────────────────────┐
│ Número da Mesa: [  5  ] │
└─────────────────────────┘
```

**Para Retirada/Delivery:**
```
┌────────────────────────────────────┐
│ Nome: [João Silva               ]  │
│ Telefone: [(11) 99999-9999      ]  │
│ (Para delivery)                    │
│ Endereço: [Rua das Flores, 123  ]  │
│ Referência: [Próximo ao mercado  ]  │
│ Taxa de Entrega: [R$ 5,00       ]  │
└────────────────────────────────────┘
```

### Adicionando Produtos

1. **Navegue pelas categorias** na aba superior
2. **Use a busca** para encontrar produtos rapidamente
3. **Clique no produto** desejado
4. **Configure no popup**:
   - Quantidade
   - Observações especiais (ex: "sem cebola")
5. **Clique em "Adicionar ao Pedido"**

### Resumo do Pedido

No lado direito da tela, você verá:

```
┌─────────────────────────────────────┐
│ 📋 Resumo do Pedido                 │
├─────────────────────────────────────┤
│ 🍔 2x Hambúrguer Artesanal          │
│     Obs: Sem cebola                 │
│     R$ 25,90 cada                   │
│                                     │
│ 🍟 1x Batata Frita                  │
│     R$ 12,00                        │
├─────────────────────────────────────┤
│ Subtotal:             R$ 63,80      │
│ Taxa de Entrega:      R$  5,00      │
│ TOTAL:                R$ 68,80      │
├─────────────────────────────────────┤
│ [    Finalizar Pedido    ]          │
└─────────────────────────────────────┘
```

### Finalizando o Pedido

1. **Revise todos os itens** no resumo
2. **Confirme o total** está correto
3. **Clique em "Finalizar Pedido"**
4. **Aguarde a confirmação** do sistema

---

## Gestão de Pedidos

### Visualizando Pedidos

A tela de pedidos mostra todos os pedidos organizados por status:

```
┌─── AGUARDANDO ───┬─── EM PREPARO ───┬──── PRONTO ────┬── ENTREGUE ──┐
│ #001 Mesa 5      │ #003 Balcão      │ #007 Mesa 2    │ #010 Mesa 8  │
│ 14:30 - 2 min    │ 14:25 - 7 min    │ 14:20 - 12min  │ 14:15        │
│ R$ 68,80         │ R$ 45,50         │ R$ 32,00       │ R$ 78,90     │
└──────────────────┴──────────────────┴────────────────┴──────────────┘
```

### Detalhes do Pedido

Clique em um pedido para ver detalhes:

```
┌─────────────────────────────────────────────────┐
│ Pedido #001 - Mesa 5                            │
│ Cliente: Mesa 5 | Criado em: 14:30             │
├─────────────────────────────────────────────────┤
│ Itens:                                          │
│ • 2x Hambúrguer Artesanal (R$ 25,90)          │
│   Obs: Sem cebola                              │
│ • 1x Batata Frita (R$ 12,00)                  │
│                                                 │
│ Total: R$ 63,80                                │
│ Status: Em preparo                              │
├─────────────────────────────────────────────────┤
│ [Editar] [Marcar como Pronto] [Cancelar]       │
└─────────────────────────────────────────────────┘
```

### Editando Pedidos

1. **Clique no ícone de edição** (✏️) no card do pedido
2. **Modifique itens** conforme necessário:
   - Adicionar novos produtos
   - Alterar quantidades
   - Modificar observações
   - Remover itens
3. **Clique em "Atualizar Pedido"**

### Alterando Status

**Fluxo Normal:**
`Aguardando` → `Em preparo` → `Pronto` → `Entregue`

**Ações Disponíveis:**
- **Aguardando**: Iniciar preparo
- **Em preparo**: Marcar como pronto
- **Pronto**: Marcar como entregue
- **Qualquer status**: Cancelar pedido

---

## Cozinha (KDS)

O Kitchen Display System é a interface dedicada para a cozinha gerenciar o preparo dos pedidos.

### Interface da Cozinha

```
┌─────────────────────────────────────────────────────────────┐
│ 🍳 Cozinha (KDS)                     📊 3 Pedidos em Preparo │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐             │
│ │ #001 Mesa 5 │ │ #003 Balcão │ │ #007 Mesa 2 │             │
│ │ ⏰ 5 min    │ │ ⏰ 8 min    │ │ ⏰ 3 min    │             │
│ │ 🔴 Urgente  │ │ 🔵 Normal   │ │ 🔵 Normal   │             │
│ │             │ │             │ │             │             │
│ │ Itens:      │ │ Itens:      │ │ Itens:      │             │
│ │ ☐ 2x Hambúr │ │ ☑ 1x Pizza  │ │ ☐ 1x Salada │             │
│ │ ☐ 1x Batata │ │ ☐ 1x Refri  │ │ ☑ 1x Suco   │             │
│ │             │ │             │ │             │             │
│ │ [✅ Pronto] │ │ [✅ Pronto] │ │ [✅ Pronto] │             │
│ │ [⏱️ + Tempo]│ │ [⏱️ + Tempo]│ │ [⏱️ + Tempo]│             │
│ └─────────────┘ └─────────────┘ └─────────────┘             │
└─────────────────────────────────────────────────────────────┘
```

### Usando o KDS

**Marcar Item como Preparado:**
1. **Clique na checkbox** ao lado do item
2. **Item fica marcado** com ✅
3. **Cor muda** para indicar conclusão

**Marcar Pedido como Pronto:**
1. **Certifique-se** que todos os itens estão preparados
2. **Clique em "Pronto"**
3. **Pedido sai da tela** da cozinha

**Solicitar Mais Tempo:**
1. **Clique em "+ Tempo"**
2. **Sistema notifica** o sistema principal
3. **Útil para** pratos mais complexos

### Códigos de Cores

- 🔴 **Vermelho**: Pedidos urgentes (>10 min)
- 🟡 **Amarelo**: Atenção necessária (>5 min)
- 🔵 **Azul**: Tempo normal (<5 min)

---

## Caixa e Pagamentos

### Processando Pagamentos

Quando um pedido está pronto, você pode processar o pagamento:

1. **Acesse "Caixa"** no menu
2. **Localize o pedido** na lista de "Pendentes de Pagamento"
3. **Clique em "Processar Pagamento"**

### Métodos de Pagamento

```
┌─────────────────────────────────────┐
│ 💳 Método de Pagamento              │
├─────────────────────────────────────┤
│ 💵 [ ] Dinheiro                     │
│ 💳 [ ] Cartão de Crédito/Débito     │
│ 📱 [ ] PIX                          │
├─────────────────────────────────────┤
│ Total: R$ 68,80                     │
│                                     │
│ [     Confirmar Pagamento     ]     │
└─────────────────────────────────────┘
```

### Pagamento em Dinheiro

Para pagamentos em dinheiro:

1. **Selecione "Dinheiro"**
2. **Informe o valor recebido**
3. **Sistema calcula o troco** automaticamente
4. **Confirme o pagamento**

```
┌─────────────────────────────────────┐
│ 💵 Pagamento em Dinheiro            │
├─────────────────────────────────────┤
│ Total: R$ 68,80                     │
│ Valor Recebido: R$ [80,00]          │
│ Troco: R$ 11,20                     │
├─────────────────────────────────────┤
│ [     Confirmar Pagamento     ]     │
└─────────────────────────────────────┘
```

### Controle de Caixa

**Abertura do Caixa:**
- Faça sempre no início do dia
- Informe o valor inicial em dinheiro

**Fechamento do Caixa:**
- Realize no final do expediente
- Sistema mostra resumo das vendas
- Confira valores físicos com o sistema

**Sangria:**
- Para retirar dinheiro durante o dia
- Sempre documente o motivo
- Mantenha controle de segurança

---

## Relatórios

### Tipos de Relatórios

**1. Vendas por Período**
- Vendas por dia, semana ou mês
- Gráficos de evolução
- Comparação com períodos anteriores

**2. Produtos Mais Vendidos**
- Ranking dos produtos
- Quantidade vendida
- Receita por produto

**3. Relatório de Caixa**
- Resumo diário de vendas
- Métodos de pagamento utilizados
- Movimentações de caixa

**4. Análise de Performance**
- Tempo médio de preparo
- Eficiência da cozinha
- Satisfação do cliente

### Visualizando Relatórios

1. **Acesse "Relatórios"** no menu
2. **Selecione o tipo** de relatório
3. **Escolha o período** (hoje, semana, mês)
4. **Visualize os dados** em gráficos e tabelas

### Exportando Relatórios

```
┌─────────────────────────────────────┐
│ 📊 Exportar Relatório               │
├─────────────────────────────────────┤
│ Formato:                            │
│ 📄 [ ] PDF                          │
│ 📊 [ ] Excel (XLSX)                 │
│ 📋 [ ] CSV                          │
├─────────────────────────────────────┤
│ [      Baixar Relatório      ]      │
└─────────────────────────────────────┘
```

### Interpretando os Dados

**Vendas por Hora:**
- Identifique picos de movimento
- Otimize escalas de funcionários
- Prepare estoque adequadamente

**Produtos Mais Vendidos:**
- Foque em produtos populares
- Considere promoções para itens menos vendidos
- Ajuste estoque baseado na demanda

**Tempo de Preparo:**
- Monitore eficiência da cozinha
- Identifique gargalos no processo
- Melhore experiência do cliente

---

## Configurações

### Configurações Gerais

**Informações do Estabelecimento:**
```
┌─────────────────────────────────────┐
│ 🏪 Dados do Estabelecimento         │
├─────────────────────────────────────┤
│ Nome: [Restaurante São Paulo     ]  │
│ CNPJ: [12.345.678/0001-90       ]  │
│ Endereço: [Rua das Flores, 123  ]  │
│ Telefone: [(11) 3333-4444       ]  │
│ Email: [contato@restaurante.com  ]  │
└─────────────────────────────────────┘
```

**Configurações Fiscais:**
- Taxa de serviço (%)
- Impostos aplicáveis
- Configurações de cupom fiscal

**Configurações de Operação:**
- Horário de funcionamento
- Tempo limite para pedidos
- Alertas de estoque mínimo

### Gestão de Usuários

**Níveis de Acesso:**
- **Administrador**: Acesso total
- **Gerente**: Relatórios e configurações básicas
- **Operador**: POS e pedidos
- **Cozinha**: Apenas KDS

**Adicionando Usuário:**
1. **Vá em "Configurações" > "Usuários"**
2. **Clique em "Novo Usuário"**
3. **Preencha os dados**:
   - Nome completo
   - Email
   - Nível de acesso
   - Senha temporária
4. **Salve as configurações**

### Backup e Segurança

**Backup Automático:**
- Sistema faz backup diário automático
- Dados armazenados com segurança
- Possibilidade de restauração

**Segurança:**
- Senhas criptografadas
- Acesso via HTTPS
- Logs de auditoria

---

## Dicas e Atalhos

### Atalhos de Teclado

**Navegação Geral:**
- `Ctrl + D`: Ir para Dashboard
- `Ctrl + P`: Abrir POS
- `Ctrl + O`: Visualizar Pedidos
- `Ctrl + K`: Abrir KDS

**No POS:**
- `F1`: Novo pedido de mesa
- `F2`: Novo pedido de retirada
- `F3`: Novo pedido de delivery
- `Enter`: Finalizar pedido
- `Esc`: Cancelar operação atual

**Na Cozinha (KDS):**
- `Espaço`: Marcar item como preparado
- `P`: Marcar pedido como pronto
- `T`: Solicitar mais tempo

### Dicas de Produtividade

**Para Operadores:**
1. **Memorize produtos populares** para agilizar pedidos
2. **Use códigos de produto** se disponível
3. **Configure observações padrão** para acelerar
4. **Mantenha sempre produtos em ordem alfabética**

**Para Cozinha:**
1. **Organize por prioridade** (urgente primeiro)
2. **Marque itens** conforme finaliza
3. **Comunique problemas** imediatamente
4. **Use "mais tempo"** quando necessário

**Para Gestores:**
1. **Monitore relatórios** diariamente
2. **Configure alertas** de estoque
3. **Analise padrões** de venda
4. **Treine equipe** regularmente

### Configurações Recomendadas

**Estoque Mínimo:**
- Ingredientes básicos: 20 unidades
- Bebidas: 50 unidades
- Produtos especiais: 10 unidades

**Tempo Limite:**
- Pedidos simples: 15 minutos
- Pedidos complexos: 25 minutos
- Delivery: 45 minutos

**Backup:**
- Frequência: Diária
- Retenção: 30 dias
- Verificação: Semanal

---

## Solução de Problemas

### Problemas Comuns

**❌ Produto não aparece no POS**
- **Causa**: Produto inativo ou sem estoque
- **Solução**: Verificar status em "Produtos" e ativar/repor estoque

**❌ Pedido não aparece na cozinha**
- **Causa**: Status diferente de "Aguardando" ou "Em preparo"
- **Solução**: Verificar status do pedido e alterar se necessário

**❌ Erro ao finalizar pedido**
- **Causa**: Dados incompletos ou problema de conexão
- **Solução**: Verificar todos os campos obrigatórios

**❌ Relatório não carrega**
- **Causa**: Período muito amplo ou problema de performance
- **Solução**: Reduzir período ou aguardar alguns minutos

### Procedimentos de Emergência

**Sistema Lento:**
1. **Feche abas desnecessárias** do navegador
2. **Limpe cache** (Ctrl + F5)
3. **Reinicie navegador**
4. **Contacte suporte** se persistir

**Perda de Dados:**
1. **Não panic** - sistema tem backup automático
2. **Anote problemas** enfrentados
3. **Contacte suporte** imediatamente
4. **Aguarde orientações** técnicas

**Falha de Internet:**
1. **Sistema continua funcionando** localmente
2. **Dados são sincronizados** quando conexão voltar
3. **Evite operações críticas** até normalizar
4. **Use backup offline** se disponível

### Contato com Suporte

**Suporte Técnico:**
- 📞 Telefone: (11) 3333-4444
- 📧 Email: suporte@sistema.com
- 💬 Chat: Disponível no sistema
- 🕐 Horário: 24/7 para clientes Premium

**Informações Necessárias:**
- Nome do estabelecimento
- Descrição detalhada do problema
- Horário que ocorreu
- Passos que levaram ao erro
- Screenshots se possível

**SLA de Atendimento:**
- **Crítico**: 2 horas
- **Alto**: 4 horas
- **Médio**: 24 horas
- **Baixo**: 72 horas

---

## Glossário

**API**: Interface de programação que permite integração entre sistemas

**KDS**: Kitchen Display System - Sistema de exibição para cozinha

**POS**: Point of Sale - Ponto de venda

**SKU**: Stock Keeping Unit - Código de produto único

**Dashboard**: Painel de controle principal

**Backup**: Cópia de segurança dos dados

**Cache**: Armazenamento temporário para melhorar performance

**SSL**: Protocolo de segurança para conexões

**SaaS**: Software as a Service - Software como serviço

**Multi-tenant**: Sistema que atende múltiplos clientes

---

**Final do Manual**

*Para dúvidas adicionais, consulte nosso suporte técnico ou acesse nossa base de conhecimento online.*

*Manual atualizado em: $(date)*
*Versão do sistema: 1.0.0*
