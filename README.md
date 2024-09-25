
# Caju Front End Teste
Dashboard após aterações

![image](https://github.com/user-attachments/assets/31a1ee30-d595-447e-857f-8369054a5525)


## Apresentanção do problema
- Após análise do código recebido e entendimento da proposta solução necessária para implementação do desafio técnico, foi possível concluir a maioria das exigências. Ressalto que  os itens seguinte não foram implementados devido impossibilidade de dedcar mais tempo ao projeto. Entendo que é possivel melhora-lo mas estou encaminhando para análise. Me coloco a disposição, para esclarecimento de eventuais dúvidas;
- Implementar um loading na tela ao realizar requisições.
- Na pesquisa por CPF realizar a requisição automaticamente ao preencher um CPF válido (foi implementado um botão para acionar a pesquisa)
- End-to-End (E2E) e Integração
>>>>>>> main

## Especificações

### Tela Dashboard
  
✓ Implementar `GET` ao carregar a pagina e ao fazer pequisa por `CPF`
✓ Filtrar os cards por coluna, usando o status.
✓ Implementar `PUT` ao clicar em Reprovar e alterar o status para `REPROVED`
✓ Implementar `PUT` ao clicar em Aprovar e alterar o status para `APPROVED`
✓ Implementar `PUT` ao clicar em Revisar novamente e alterar o status para `REVIEW`
✓ Implementar `DELETE` ao clicar no lixeira no card.
✓O botão de `Reprovar` e `Aprovar` só deve aparecer em admissões com o status `REVIEW` 
✓ O botão `Revisar novamente` só deve aparecer em admissões com o status `REPROVED` ou `APPROVED`
- Implementar um loading na tela ao realizar requisições.
✓ Todas as ações devem ter modal de confirmação e uma notificação de sucesso ou erro
- Na pesquisa por CPF realizar a requisição automaticamente ao preencher um CPF válido
✓ Adicionar máscara de CPF no campo de pesquisa.
✓ Atualizar os dados (refetch) ao clicar no ícone de atualizar

### Tela Cadastro

✓ Implementar validação no campo de `email` para que aceite apenas emails válidos
✓ Implementar validação no campo `nome completo` para que aceite pelo menos um espaço, no mínimo duas letras, e que a primeira letra não seja um número.
✓ Implementar validação no campo CPF para aceitar apenas CPFs válidos e adicionar uma máscara de CPF ao campo.
✓ Implementar `POST` ao preencher todos os campos corretamentes.
✓ Redirecionar ao `/dashboard` ao criar uma nova admissão.

## API
Você consumirá uma API mockada localmente, que será executada utilizando o json-server. Para mais informações consulte a [documentação](https://github.com/typicode/json-server/).

Exemplo de Requisição:

```
POST http://localhost:3000/registrations
Content-Type: application/json

{
  "admissionDate": "23/10/2023",
  "email": "maria@caju.com.br",
  "employeeName": "Maria Silva",
  "status": "REVIEW",
  "cpf": "12345678901"
}
```

## Extras (opcional)

✓ Testes Unitários e de Integração `(Obrigátorio para Senior e Tech Lead)`
- End-to-End (E2E) 
✓ Configuração de CI/CD com deploy automatizado

## Iniciando o desenvolvimento

Realize o clone do repositório e instale as dependências

```shell
git clone https://github.com/caju-beneficios/caju-front-teste-1.git
cd caju-front-test-1
```

```shell
yarn install
```

Inicie o servidor do Json Web Server para consumir a API

```shell
yarn init:db
```

Execute a aplicação

```shell
yarn dev
```

Se tudo ocorreu bem os seguintes serviços estarão disponiveis em:
<br/>

Aplicação http://localhost:3001/
<br/>
Json Web Server http://localhost:3000/

Caso necessite executar a suíte de testes use o comando abaixo:

```shell
yarn test:dev
```