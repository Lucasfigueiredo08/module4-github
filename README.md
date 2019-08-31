# module4-github
Módulo 4 do curso de Adonis - API de Projetos e Tarefas

Comandos
AULA 1
Configuração do adonis
npm install -g @donisjs/cli
adonis new gonode --api-only
adonis serve --dev

AULA 2
configurando o eslint
npm install -D eslint
npx eslint --init

AULA 3
banco de dados
npm i --save pg
docker start database (pg)

AULA 4
adonis make:controller User
adonis route:list

AULA 5
autenticação JWT
adonis make:controller Session // attemp()

AULA 6
recuperação de senha
adonis make:controller ForgotPassword
adonis migration:rollback (token, token_created_at)

AULA 7
enviando e-mail
npm install @adonis/mail *edge (arquivo de view dentro do adonis)

AULA 8
resetando senha
npm install moment (ForgotPasswordController)

AULA 9
uploads de  arquivos
adonis make:model File -m -c //model and controller
adonis migration:run (path, helpers)

AULA 10
visualização de arquivo

AULA 11
criando models de  projeto e tarefas
adonis make:model Project Task -m -c

AULA 12
relacionamento
adonis make:model Project -m -c
adonis make:model Task -m -c

AULA 13
crud de projetos
parte de crud com relacionamento *tarefas/projetos } usuarios

AULA 14
crud de tarefas

AULA 15
validação
adonis install @adonisjs/validator
adonis make:validator User

AULA 16
lidando com excessões
adonis make:ahandler

AULA 17
validando rotas
adonis make:validator Session/ForgotPassword/ResetPassword/Task/Project

AULA 18
internacionalização
adonis install @adonisjs/antl 
@adonisjs/antl/providers/AntlProvider

AULA 19
paginação
.paginate(?)

AULA 20
criando hook de tarefas
adonis make:hook TaskHook 
enviando email

AULA 21
fila com redis
banco redis
docker run --name redis -p 6379:6379 -d redis:alpine
adonis install @adonisjs/redis
npm install adonis-kue(fila)
adonis make:job NewTaskMail
configuração de fila adonis kue:listen

AULA 22
configurando sentry
npm install @sentry/node@5.5.0
npm install raven / cliente node 

AULA 23
lidando cors

origin and methods

AULA 24
salvando relacionamentos
adonis make:model UserAddress -m
adonis migration:run

AULA 25
utilizando transations
database(trx)

FINISHED
