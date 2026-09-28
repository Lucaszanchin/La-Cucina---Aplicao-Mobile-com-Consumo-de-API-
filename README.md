# 🍝 La Cucina

## 📱 Sobre o projeto

**La Cucina** é um aplicativo mobile desenvolvido para facilitar a busca e descoberta de receitas de diferentes tipos de culinária.

O aplicativo permite que o usuário encontre receitas, visualize informações sobre os pratos e consulte seus ingredientes e modo de preparo de forma simples e organizada.

O projeto utiliza uma **API pública de receitas** para obter os dados, permitindo que as informações sejam carregadas dinamicamente no aplicativo.

---

## 🎯 Objetivo

O objetivo do **La Cucina** é desenvolver uma aplicação mobile que consuma uma API pública e apresente seus dados de maneira intuitiva e agradável para o usuário.

Além disso, o projeto tem como finalidade colocar em prática conceitos de:

* Desenvolvimento mobile;
* React Native;
* Expo;
* Consumo de APIs;
* Requisições HTTP;
* Manipulação de dados JSON;
* Componentização;
* Navegação entre telas;
* Interface e experiência do usuário.

---

## 🚀 Funcionalidades

O aplicativo contará com funcionalidades como:

* 🔎 Busca de receitas;
* 🍽️ Listagem de receitas;
* 🖼️ Visualização das imagens dos pratos;
* 📖 Visualização dos ingredientes;
* 👨‍🍳 Modo de preparo;
* 🏷️ Categorias de receitas;
* ❤️ Sistema de favoritos;
* 📱 Interface adaptada para dispositivos móveis.

---

## 🌐 API utilizada

Para obter as informações das receitas, o **La Cucina** utiliza a **TheMealDB**, uma API pública de receitas.

A API fornece informações como:

* Nome das receitas;
* Imagens;
* Ingredientes;
* Categorias;
* Área/origem da receita;
* Instruções de preparo.

### 🔗 Documentação

[TheMealDB API](https://www.themealdb.com/api.php)

### Exemplo de requisição

```text
https://www.themealdb.com/api/json/v1/1/search.php?s=chicken
```

Essa requisição permite buscar receitas pelo nome.

---

## 🛠️ Tecnologias utilizadas

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![API](https://img.shields.io/badge/API-TheMealDB-orange?style=for-the-badge)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)

* **React Native**
* **Expo**
* **JavaScript**
* **TheMealDB API**
* **Git**
* **GitHub**

---

## 📂 Estrutura do projeto

```text
La-Cucina/
│
├── assets/
├── docs/
│
├── src/
│   ├── components/
│   ├── screens/
│   ├── services/
│   ├── styles/
│   ├── routes/
│   └── navigation/
│
├── App.jsx
├── package.json
└── README.md
```

---

## 🌿 Organização das branches

O desenvolvimento do projeto será organizado utilizando branches do Git:

```text
main
│
└── develop
    │
    ├── feature/home
    ├── feature/detalhes-receita
    ├── feature/busca
    ├── feature/favoritos
    └── feature/design
```

### Branches principais

**main**
Versão estável e final do projeto.

**develop**
Branch utilizada para integração das funcionalidades desenvolvidas pela equipe.

### Branches de funcionalidades

* `feature/home` — desenvolvimento da tela inicial;
* `feature/receitas` — listagem e consumo das receitas;
* `feature/detalhes-receita` — detalhes das receitas;
* `feature/busca` — sistema de pesquisa;
* `feature/favoritos` — sistema de favoritos;
* `feature/design` — desenvolvimento da interface visual.

---

## 🔄 Funcionamento da aplicação

O funcionamento básico do aplicativo ocorre da seguinte maneira:

```text
Usuário
   ↓
La Cucina
   ↓
Busca / Seleção de receita
   ↓
Requisição para a TheMealDB
   ↓
API retorna os dados em JSON
   ↓
Aplicativo processa os dados
   ↓
Receita exibida na tela
```

---

## 🎨 Interface

O **La Cucina** busca oferecer uma interface simples, moderna e intuitiva, permitindo que o usuário encontre suas receitas de maneira rápida e fácil.

A aplicação será desenvolvida pensando na experiência do usuário em dispositivos móveis.

---

## 👥 Equipe

**Projeto:** La Cucina

**Curso:** Técnico em Desenvolvimento de Sistemas

**Instituição:** SENAI

### Integrantes

* Akina Maria da Silva Vicente
* Lucas Campos Zanchin

---

## 📌 Status do projeto

🚧 **Finalizado**

Novas funcionalidades e melhorias serão adicionadas durante o desenvolvimento do projeto.

---

## 📄 Licença

Este projeto foi desenvolvido para fins **educacionais e acadêmicos**.
