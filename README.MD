

### Organização do projeto
```
/
├─📁 .devcontainer          ->  Configurações do devcontainer
├─📁 .vscode                ->  Definições de ambiente para o VSCode
├─📁 docs                   ->  Artefatos para documentação do repo
├─📁 Api                    ->  Entrypoint da aplicação
│ │ ├─ 📁 config            ->  configurações usadas na api
│ │    ├─ 🇹 prisma.ts         ->  conexão com o prisma ORM
│ │    ├─ 🇹 serverconfig.ts   ->  configurações padrão para o servidor
│ │         ...
│ ├─ 🇹 server.ts            ->  Entrypoint server
│   ...
├─📁 tests                   ->  Testes da aplicação
│   ├─ 🇹 ....ts             -> test1
    ├─📄 ezemple.mp3         -> arquivo de exemplo para a rota de post de videos
    ├─🌐 routes.http         -> envia solicitações HTTP e visualiza a resposta diretamente no vscode
├─📄 .gitignore
├─📄 Makefile               ->  Automações para o ambiente
├─📄 package.json           ->  Definições para o projeto
├─📄 README.md

```

## Montando o ambiente

Este repositório esta organizando em um devcontainer.
E para instacia-lo no VSCODE é recomendado as seguintes configurações:

#### Extenções recomendadas

- Name: Remote Development
- Id: ms-vscode-remote.vscode-remote-extensionpack
- Description: An extension pack that lets you open any folder in a container, on a remote machine, or in WSL and take advantage of VS Code's full feature set.
- Version: 0.25.0
- Publisher: Microsoft
- VSCode Marketplace Link: https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack

#### Docker Engine

É obrigatório ter o Docker Engine já instalado e cunfigurado. Para mais informações de como instalar o Docker Engine em seu SO, ver em:

- Instruções para instalação do Docker Engine: [Ver o link](https://docs.docker.com/engine/install/)

#### Procedimento para instanciar o projeto no VSCODE
1. Com o pack de extenções instalado,
1. Realize o clone/fork deste repositório,
1. Abra o diretorio deste repositorio no VSCODE como um projeto,
1. Use o Comando _Dev Containers: Reopen in Container_ da paleta de comandos do VSCODE. _(F1, Ctrl+Shift+P)_.

Depois da compilação do container o VSCode abrirá o repositório em um ambiente encapsulado e executando diretamente de dentro do container como configurado nas definições do **/.devconainer**.

#### Procedimento para iniciar

```
$> npm run dev 
```
