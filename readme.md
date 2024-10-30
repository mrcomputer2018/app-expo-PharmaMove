# PharmaMove

## Descrição do Projeto

O PharmaMove é um aplicativo desenvolvido para otimizar a movimentação de produtos entre filiais de uma rede de farmácias. Ele visa facilitar a gestão de transferências de produtos, permitindo maior controle sobre a logística interna e a organização do fluxo de mercadorias, desde a coleta até a entrega, além de permitir o gerenciamento de usuários envolvidos no processo.
Problema que o Projeto Resolve

A movimentação de produtos entre filiais de grandes redes de farmácias pode ser um processo desafiador, com muitos pontos de controle que precisam ser acompanhados manualmente. Este aplicativo simplifica essa logística interna ao permitir:

    Gestão de Usuários: Permite o cadastro e gerenciamento de diferentes perfis de usuários, como motoristas e filiais.
    Movimentação de Produtos: Acompanhar o status de movimentações entre diferentes filiais, incluindo o monitoramento de coleta, trânsito e entrega.
    Facilidade para Motoristas: Motoristas podem iniciar e finalizar entregas, inclusive capturando fotos como evidências durante o processo.

Com uma interface amigável, funcionalidades específicas para cada perfil e o uso de tecnologias atuais, o PharmaMove melhora a organização e a transparência no fluxo de produtos entre filiais.
Tecnologias Utilizadas

O projeto foi desenvolvido com as seguintes tecnologias e ferramentas:

    React Native: Utilizado para o desenvolvimento da interface mobile nativa.
    Typescript: Linguagem de programação usada para garantir maior segurança tipográfica e clareza no código.
    Expo: Framework que simplifica o desenvolvimento de aplicativos React Native.
    React Navigation: Biblioteca utilizada para a navegação entre telas.
    Zod: Utilizado para validação de dados, especialmente em formulários.
    React Hook Form: Gerenciador de formulários que facilita a manipulação de inputs, integrações e validações.
    picker: Usado para criar dropdowns personalizáveis e integrados ao sistema de formulários.
    GitHub: Controle de versão e repositório do código.
    Google Drive: Para armazenamento de vídeos demonstrativos.
    Trello: Para gerenciamento de tarefas e planejamento do desenvolvimento.

## Como Executar o Projeto
### Pré-requisitos

    Node.js: Certifique-se de ter o Node.js instalado (v14 ou superior).
    Expo CLI: Instale a CLI do Expo globalmente executando o comando npm install -g expo-cli.
    Git: Para clonar o repositório e versionar o código.

### Passos para Execução

    Clonar o Repositório

    bash

git clone https://github.com/mrcomputer2018/app-expo-PharmaMove

cd app-expo-PharmaMove

Instalar Dependências

Execute o comando abaixo para instalar todas as dependências do projeto:

bash

npm install

Iniciar o Servidor Expo

Após instalar as dependências, inicie o servidor do Expo:

bash

    expo start

    Rodar em um Emulador ou Dispositivo

    Você pode rodar o aplicativo no seu dispositivo físico utilizando o aplicativo Expo Go, disponível na Play Store ou App Store, ou então emulá-lo através do Android Studio ou Xcode.

    Escaneie o QR Code que aparecerá no terminal para rodar o aplicativo no dispositivo.

Estrutura do Projeto

A estrutura do projeto está organizada da seguinte forma:

bash

/src
  /components     # Componentes reutilizáveis como formulários e botões
  /screens        # Telas do aplicativo (Login, Home, Cadastro, etc.)
  /navigation     # Configuração das rotas
  /services       # Funções que fazem chamadas à API
  /styles         # Arquivos de estilo global e específicos
  /contexts       # Gerenciamento de estados globais da aplicação

## Melhorias Futuras

    Publicação na Play Store: Publicar o aplicativo oficialmente para uso mais amplo, facilitando o acesso por parte de motoristas e gerentes de filiais.

    Integração com Mapas: Implementar uma funcionalidade de exibição de rotas em tempo real para motoristas, incluindo previsão de chegada e instruções de direção.

    Notificações Push: Adicionar notificações para atualizar os usuários sobre novas movimentações ou status de entregas.

    Autenticação Biometrica: Implementar login por impressão digital ou reconhecimento facial para aumentar a segurança.

    Monitoramento em Tempo Real: Implementar uma funcionalidade de rastreamento em tempo real da posição dos motoristas durante o trânsito das entregas.

## Como Contribuir

Sinta-se à vontade para contribuir com este projeto! Para isso, basta seguir os seguintes passos:

    Faça um fork do repositório
    Crie uma nova branch para suas alterações: git checkout -b minha-feature
    Envie suas alterações: git commit -m 'Minha nova feature'
    Submeta um pull request.

## Contato

Em caso de dúvidas ou sugestões, entre em contato com o desenvolvedor:

    Nome: Marcelo Ribeiro
    E-mail: marcelo.ribeiro@proeja.com