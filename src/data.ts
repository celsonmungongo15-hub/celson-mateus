import { Course, Achievement, LeaderboardUser, Post } from "./types";

export const INITIAL_COURSES: Course[] = [
  {
    id: "js-logic",
    title: "Lógica de Programação com JavaScript",
    category: "Tecnologia",
    level: "Iniciante",
    duration: "25m",
    rating: 4.8,
    sponsor: {
      name: "Aura Tech Solutions",
      recruiting: true,
    },
    lessons: [
      {
        id: "js-1",
        title: "1. O que são Variáveis?",
        duration: 3,
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-his-computer-34281-large.mp4",
        summary: "Variáveis são contêineres que guardam informações na memória do computador. No JavaScript, usamos let, const e var para declará-las. Dica: use const sempre que o valor não for mudar."
      },
      {
        id: "js-2",
        title: "2. Condicionais (if/else)",
        duration: 4,
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-programmer-typing-on-a-keyboard-41712-large.mp4",
        summary: "As estruturas de decisão (se/senão) guiam o fluxo de execução do sistema. Usamos operadores lógicos como ===, !==, > e < para avaliar expressões booleanas de forma inteligente."
      },
      {
        id: "js-3",
        title: "3. Laços de Repetição",
        duration: 5,
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hacker-typing-code-on-a-dark-screen-41716-large.mp4",
        summary: "Estruturas de repetição como 'for' e 'while' permitem rodar um bloco de código repetidas vezes. Útil para varrer arrays ou repetir uma tarefa até uma condição ser atingida."
      }
    ],
    quiz: [
      {
        question: "Qual palavra-chave declara uma variável cujo valor NÃO pode ser reatribuído?",
        options: ["let", "const", "var", "define"],
        correctIndex: 1
      },
      {
        question: "Qual operador no JavaScript verifica igualdade estrita de tipo e valor?",
        options: ["==", "=", "===", "equal"],
        correctIndex: 2
      },
      {
        question: "O que faz o laço 'for'?",
        options: [
          "Limpa a memória RAM", 
          "Executa uma instrução condicional", 
          "Repete um bloco de instruções de forma controlada", 
          "Termina a execução do script"
        ],
        correctIndex: 2
      }
    ]
  },
  {
    id: "ia-practice",
    title: "IA Generativa e Prompt Engineering",
    category: "Tecnologia",
    level: "Intermediário",
    duration: "20m",
    rating: 4.9,
    sponsor: {
      name: "Google Cloud Partner",
      recruiting: true,
    },
    lessons: [
      {
        id: "ia-1",
        title: "1. Introdução aos LLMs",
        duration: 4,
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-neon-light-glowing-on-server-cabinets-41713-large.mp4",
        summary: "Modelos de Linguagem de Grande Porte (LLMs) são redes neurais treinadas em enormes volumes de texto. Eles conseguem prever o próximo termo em um texto de forma probabilística coerente."
      },
      {
        id: "ia-2",
        title: "2. Estrutura de um Bom Prompt",
        duration: 4,
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-cloud-icon-animation-on-screen-41708-large.mp4",
        summary: "Um prompt exemplar possui: Instrução Clara, Contexto de Fundo, Dados de Entrada, e o Formato da Saída esperada. Definir papéis (ex: 'Aja como um sênior') otimiza a qualidade."
      },
      {
        id: "ia-3",
        title: "3. Técnicas de Few-Shot",
        duration: 5,
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-futuristic-motherboard-with-glowing-blue-and-red-lights-41710-large.mp4",
        summary: "A técnica Few-shot baseia-se em oferecer exemplos de entrada-saída no prompt. Isso ensina a IA a seguir padrões complexos de formatação e análise lógica sem re-treinar o modelo."
      }
    ],
    quiz: [
      {
        question: "O que significa LLM?",
        options: ["Light Logic Model", "Large Language Model", "Liquid Latency Module", "Long Line Memory"],
        correctIndex: 1
      },
      {
        question: "Qual componente NÃO é considerado essencial em um prompt estruturado?",
        options: ["Instrução direta", "Formatos esperados", "Chave privada do sistema", "Contexto complementar"],
        correctIndex: 2
      },
      {
        question: "Como funciona a técnica Few-Shot?",
        options: [
          "Fornecendo exemplos práticos no prompt", 
          "Mudando a taxa de aprendizado da IA", 
          "Enviando dados criptografados", 
          "Excluindo termos indesejados"
        ],
        correctIndex: 0
      }
    ]
  },
  {
    id: "marketing-social",
    title: "Marketing Digital & Criação de Conteúdo",
    category: "Marketing",
    level: "Iniciante",
    duration: "18m",
    rating: 4.7,
    sponsor: {
      name: "Agência Fluência",
      recruiting: false,
    },
    lessons: [
      {
        id: "mkt-1",
        title: "1. Definindo sua Persona",
        duration: 4,
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-vlogger-recording-with-camera-on-tripod-41711-large.mp4",
        summary: "Persona é a representação fictícia do seu cliente ideal. Baseada em dados reais e demográficos, ajuda a alinhar o tom de voz e as dores reais que seu produto cura."
      },
      {
        id: "mkt-2",
        title: "2. O Funil de Conteúdo",
        duration: 4,
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-smartphone-scrolling-social-feed-41715-large.mp4",
        summary: "Dividido em Topo (Atração/Descoberta), Meio (Consideração/Dúvida) e Fundo (Conversão/Decisão). Crie posts específicos para o momento da jornada de compra de cada visitante."
      }
    ],
    quiz: [
      {
        question: "O que é uma Persona no Marketing?",
        options: [
          "Um ator contratado para anúncios", 
          "A representação do cliente ideal com base em dados", 
          "Um perfil falso em mídias sociais", 
          "O fundador da marca"
        ],
        correctIndex: 1
      },
      {
        question: "Qual conteúdo é mais apropriado para o 'Topo do Funil'?",
        options: ["Oferta direta de cupom", "Depoimento de cliente", "Dicas educativas amplas", "Contrato de adesão"],
        correctIndex: 2
      }
    ]
  },
  {
    id: "personal-oratory",
    title: "Oratória e Comunicação de Alto Impacto",
    category: "Desenvolvimento Pessoal",
    level: "Iniciante",
    duration: "15m",
    rating: 4.9,
    lessons: [
      {
        id: "ora-1",
        title: "1. Vencendo o Medo de Falar",
        duration: 3,
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-delivering-speech-at-podium-41714-large.mp4",
        summary: "O medo de falar em público é biológico. Controlar a respiração diafragmática e visualizar o sucesso da apresentação ajudam a estabilizar os batimentos cardíacos antes de subir ao palco."
      },
      {
        id: "ora-2",
        title: "2. Expressão Corporal e Tom",
        duration: 4,
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-businesswoman-giving-a-presentation-in-office-41709-large.mp4",
        summary: "Gesticular de forma aberta, manter contato visual direto com diferentes setores da plateia e dosar silêncios estratégicos (pausas dramáticas) aumentam a retenção da mensagem em 60%."
      }
    ],
    quiz: [
      {
        question: "Qual técnica ajuda a controlar o nervosismo antes de uma oratória?",
        options: ["Beber café em excesso", "Gritar alto", "Respiração diafragmática lenta", "Evitar olhar para o público"],
        correctIndex: 2
      },
      {
        question: "Como os silêncios (pausas) beneficiam uma fala?",
        options: [
          "Demonstram esquecimento", 
          "Aumentam o suspense e dão tempo para o cérebro processar ideias", 
          "Deixam a palestra entediante", 
          "Devem ser totalmente evitados"
        ],
        correctIndex: 1
      }
    ]
  },
  {
    id: "business-finance",
    title: "Finanças Pessoais e Investimentos",
    category: "Negócios",
    level: "Avançado",
    duration: "22m",
    rating: 4.6,
    sponsor: {
      name: "EducaBank",
      recruiting: true,
    },
    lessons: [
      {
        id: "fin-1",
        title: "1. Reserva de Emergência",
        duration: 4,
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-coins-falling-on-glass-table-41707-large.mp4",
        summary: "A reserva de emergência deve equivaler a 6 meses do seu custo de vida mensal fixo. Deve ser guardada em investimentos com liquidez diária e alta segurança (ex: Tesouro Selic)."
      },
      {
        id: "fin-2",
        title: "2. Alocação Diversificada de Ativos",
        duration: 4,
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-growth-chart-on-a-digital-screen-41706-large.mp4",
        summary: "Não coloque todos os ovos na mesma cesta. Divida seu capital entre renda fixa (segurança), ações (crescimento), fundos imobiliários (dividendos passivos) e ativos globais."
      }
    ],
    quiz: [
      {
        question: "Quantos meses de custo de vida são recomendados para a reserva de emergência?",
        options: ["1 mês", "3 meses", "6 meses", "24 meses"],
        correctIndex: 2
      },
      {
        question: "Onde deve ser mantido o dinheiro de uma reserva emergencial?",
        options: ["Ações de alto risco", "Criptomoedas instáveis", "Investimentos seguros com alta liquidez diária", "Bens imobiliários"],
        correctIndex: 2
      }
    ]
  }
];

export const INITIAL_LEADERBOARD: LeaderboardUser[] = [
  { id: "1", name: "Gabriel Santos", avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80", xp: 1420, streak: 12 },
  { id: "2", name: "Letícia Lima", avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80", xp: 1250, streak: 8 },
  { id: "3", name: "Você (Estudante)", avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80", xp: 450, streak: 5, isCurrentUser: true },
  { id: "4", name: "Rodrigo Costa", avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80", xp: 410, streak: 3 },
  { id: "5", name: "Juliana Souza", avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80", xp: 380, streak: 4 }
];

export const INITIAL_POSTS: Post[] = [
  {
    id: "post-1",
    authorName: "Marcos Silva",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
    authorBadge: "Mestre JavaScript",
    content: "Acabei de tirar meu certificado em Lógica de Programação com o apoio do pessoal da Aura Tech! Super prático o conteúdo de microlearning de 5 minutos. Recomendo demais pra quem tem a rotina corrida no metrô! 🚀",
    likes: 24,
    commentsCount: 5,
    hasLiked: false,
    timeAgo: "Há 2 horas",
    courseTag: "Tecnologia"
  },
  {
    id: "post-2",
    authorName: "Carolina Menezes",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80",
    authorBadge: "Focada",
    content: "Como vocês estão gerindo a reserva de emergência nesse cenário? O curso do EducaBank abriu meus olhos sobre diversificação! Já garanti minha ofensiva de 10 dias seguidos estudando!",
    likes: 18,
    commentsCount: 3,
    hasLiked: true,
    timeAgo: "Há 5 horas",
    courseTag: "Negócios"
  },
  {
    id: "post-3",
    authorName: "Beatriz Ribeiro",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
    authorBadge: "Exploradora",
    content: "Dica de ouro pra galera do Prompt Engineering: a técnica Few-Shot mudou meus resultados no trabalho de redação. Dediquem 10 minutinhos hoje pra não perder o streak!",
    likes: 31,
    commentsCount: 12,
    hasLiked: false,
    timeAgo: "Há 1 dia",
    courseTag: "Tecnologia"
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "streak-3",
    title: "Primeiros Passos",
    description: "Estude por 3 dias seguidos mantendo sua Ofensiva ativa.",
    iconName: "Flame",
    unlocked: true,
    progress: 100,
    unlockedAt: "Ontem"
  },
  {
    id: "first-cert",
    title: "Profissional Validado",
    description: "Conclua um curso completo e emita seu primeiro certificado.",
    iconName: "Award",
    unlocked: false,
    progress: 0
  },
  {
    id: "b2b-scouted",
    title: "Na Mira dos Talentos",
    description: "Inicie um curso patrocinado com aviso de contratação ativa.",
    iconName: "Briefcase",
    unlocked: true,
    progress: 100,
    unlockedAt: "Há 3 dias"
  },
  {
    id: "comm-member",
    title: "Cidadão Ativo",
    description: "Compartilhe uma conquista ou dê um like no feed da comunidade.",
    iconName: "Users",
    unlocked: false,
    progress: 50
  },
  {
    id: "offline-traveler",
    title: "Estudante Errante",
    description: "Baixe seu primeiro conteúdo de aula para estudar offline.",
    iconName: "Download",
    unlocked: false,
    progress: 0
  }
];
