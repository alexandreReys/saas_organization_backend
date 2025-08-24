# Checklist Backend NestJS/Prisma

## 1. Validação e Documentação

-       PENDENTE    Adicionar decorators do Swagger (`@ApiProperty`, `@ApiResponse`, etc.) nos DTOs
-       PENDENTE    Usar `class-validator` e `class-transformer` para validação automática dos DTOs

## 2. Tratamento de Erros

-       PENDENTE    Implementar filtro global de exceções (`ExceptionFilter`) para padronizar respostas de erro

## 3. Segurança

- OK Configurar CORS
- Adicionar rate limiting
-       PENDENTE    Usar Helmet para headers de segurança
-       PENDENTE    Garantir que variáveis sensíveis estão no `.env`
-       PENDENTE    Revisar permissões e roles (se multi-usuário)

## 4. Testes

-       PENDENTE    Criar testes unitários para services, use-cases e controllers
-       PENDENTE    Expandir testes e2e para cobrir todos os fluxos principais

## 5. Logs e Monitoramento

-       PENDENTE    Adicionar logging estruturado (ex: `winston`)
-       PENDENTE    Configurar health check endpoints (`@nestjs/terminus`)

## 6. Melhorias de API

-       PENDENTE    Implementar paginação, ordenação e filtros nos endpoints de listagem
-       PENDENTE    Adicionar versionamento de API (se necessário)

## 7. Deploy e Configuração

-       PENDENTE    Criar Dockerfile e revisar docker-compose
-       PENDENTE    Configurar variáveis de ambiente para produção
-       PENDENTE    Adicionar scripts de build/start para produção

## 8. Documentação

-       PENDENTE    Escrever README detalhado com exemplos de uso, setup e deploy
