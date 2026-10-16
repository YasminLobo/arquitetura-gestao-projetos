# Arquitetura de Software e Impacto na Gestão de Projetos (SENAI EAD)

Site interativo e bilíngue (**Português / Inglês**) desenvolvido em **HTML5, CSS3 e JavaScript** para a Unidade Curricular de **Gestão de Projetos**, analisando três conceitos de arquitetura de software de **Martin Fowler** (um de cada eixo proposto) e demonstrando como cada decisão técnica afeta diretamente **Prazo, Custo, Equipe e Riscos**.

---

## Declaração de Uso de Inteligência Artificial (IA) e Verificação de Conteúdo

> **IMPORTANTE — DECLARAÇÃO EXPLÍCITA DE USO DE IA:**
> Este projeto utilizou **Inteligência Artificial (IA)** como ferramenta de apoio no desenvolvimento da estrutura HTML/CSS/JS, na criação dos diagramas vetoriais (SVG), na implementação da alternância de idiomas (Português/Inglês) e na síntese inicial dos textos.
>
> **Conferência com os Artigos Originais:** Todo o conteúdo conceitual, argumentos técnicos e relações com a gestão de projetos foram **integralmente revisados e conferidos diretamente com os artigos originais publicados no portal de Martin Fowler (`martinfowler.com`)**, garantindo fidelidade aos conceitos de *Microservice Premium*, *Lei de Conway*, *Squads Verticais* e *Modularização de Domínio acima das Camadas Técnicas*.

---

## Eixos e Posts Selecionados

| Eixo | Post Selecionado | Link Original | Ideia Central |
| :--- | :--- | :--- | :--- |
| **1 – Microsserviços** | **b) MonolithFirst** | [martinfowler.com/bliki/MonolithFirst.html](https://martinfowler.com/bliki/MonolithFirst.html) | Começar com um monólito bem estruturado para validar o produto e descobrir as fronteiras do domínio, extraindo microsserviços apenas quando a complexidade justificar o *Microservice Premium*. |
| **2 – Fronteiras e Evolução** | **h) Micro Frontends** | [martinfowler.com/articles/micro-frontends.html](https://martinfowler.com/articles/micro-frontends.html) | Dividir a interface web por capacidades verticais de negócio, permitindo que equipes multidisciplinares autônomas desenvolvam e publiquem de ponta a ponta (do banco de dados à UI). |
| **3 – Camadas e Execução** | **i) PresentationDomainDataLayering** | [martinfowler.com/bliki/PresentationDomainDataLayering.html](https://martinfowler.com/bliki/PresentationDomainDataLayering.html) | Separar responsabilidades em Apresentação (UI), Domínio (regras de negócio) e Fonte de Dados (persistência), agrupando módulos de alto nível por domínio em sistemas maiores. |

---

## Estrutura do Projeto

- `index.html`: Página inicial com os integrantes da equipe, acesso às 3 páginas de conteúdo, simulador interativo de complexidade arquitetural, matriz comparativa de gestão e texto pronto para LinkedIn.
- `eixo1-monolith-first.html`: Página dedicada ao Eixo 1 (*Monolith First*), com resumo autoral, gráfico SVG da curva de produtividade, vantagens/desvantagens e impacto em Prazo, Custo, Equipe e Riscos.
- `eixo2-micro-frontends.html`: Página dedicada ao Eixo 2 (*Micro Frontends*), com resumo autoral, diagrama SVG de equipes verticais vs. silos horizontais, vantagens/desvantagens e impacto na gestão.
- `eixo3-layering.html`: Página dedicada ao Eixo 3 (*PresentationDomainDataLayering*), com resumo autoral, diagrama SVG comparando camadas no topo vs. módulos de domínio no topo, vantagens/desvantagens e impacto na gestão.
- `styles.css`: Estilização responsiva com suporte a Tema Escuro e Tema Claro.
- `script.js`: Controle de internacionalização instantânea (**PT-BR / EN-US**), simulador de gestão e gerenciamento de integrantes.

---

## Integrantes e Links do GitHub Pages

- **Yasmin Lobo** — [https://yasminslobo.github.io/arquitetura-gestao-projetos/](https://yasminslobo.github.io/arquitetura-gestao-projetos/)

### Como outros integrantes da equipe podem publicar no seu próprio GitHub Pages em 1 minuto:
1. Acesse o repositório principal no GitHub e clique no botão **Fork** (no canto superior direito) para copiar o projeto para a sua própria conta do GitHub.
2. No seu repositório copiado, vá na aba **Settings** (Configurações) → menu lateral **Pages**.
3. Em **Build and deployment** > **Branch**, selecione a branch `main` (pasta `/ (root)`) e clique em **Save**.
4. Aguarde cerca de 1 minuto e seu link único estará ativo em: `https://SEU-USUARIO.github.io/arquitetura-gestao-projetos/`.

---

## Sugestão de Texto para o LinkedIn (Sem emojis e direto ao ponto)

> Na Unidade Curricular de Gestão de Projetos do SENAI, desenvolvemos uma aplicação web para analisar um ponto que muitas vezes passa despercebido no dia a dia de engenharia: decisões de arquitetura de software são, na prática, decisões de gestão de projetos.
>
> A partir da literatura técnica de Martin Fowler, selecionamos três conceitos de eixos distintos — Monolith First, Micro Frontends e Presentation-Domain-Data Layering — e mapeamos como cada escolha impacta quatro variáveis críticas de qualquer projeto: prazo, custo, organização de equipe e riscos.
>
> Quando uma equipe adota microsserviços cedo demais, sem que as fronteiras do domínio estejam claras, o projeto paga o que Fowler chama de Microservice Premium: o cronograma desacelera e o custo de infraestrutura sobe antes de o produto validar seu valor. Da mesma forma, adotar Micro Frontends ou separar camadas de apresentação, domínio e dados redefine diretamente a autonomia das equipes (Lei de Conway) e o custo de manutenção no longo prazo.
>
> O material completo, com diagramas e matrizes de impacto em português e inglês, está disponível em:
> https://yasminslobo.github.io/arquitetura-gestao-projetos/
