export interface Lesson {
  id: string;
  title: string;
  duration: number; // in minutes
  videoUrl: string; // simulation placeholder
  summary: string;
  completed?: boolean;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface Course {
  id: string;
  title: string;
  category: "Tecnologia" | "Negócios" | "Idiomas" | "Desenvolvimento Pessoal" | "Marketing";
  level: "Iniciante" | "Intermediário" | "Avançado";
  duration: string; // e.g. "2h 30m"
  rating: number;
  lessons: Lesson[];
  quiz: QuizQuestion[];
  sponsor?: {
    name: string;
    logoUrl?: string;
    recruiting?: boolean;
  };
  downloaded?: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  xp: number;
  streak: number;
  lastStudyDate: string; // ISO date
  minutesStudiedToday: number;
  isPlus: boolean;
  enrolledCourses: { [courseId: string]: string[] }; // courseId -> list of completed lessonIds
  completedCourses: string[]; // list of courseIds
  certificates: Certificate[];
  avatarUrl: string;
}

export interface Certificate {
  id: string;
  courseId: string;
  courseTitle: string;
  studentName: string;
  issueDate: string;
  verificationCode: string;
  sponsorName?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconName: string; // corresponding to a lucide-react icon
  unlocked: boolean;
  progress: number; // 0 to 100
  unlockedAt?: string;
}

export interface LeaderboardUser {
  id: string;
  name: string;
  avatarUrl: string;
  xp: number;
  streak: number;
  isCurrentUser?: boolean;
}

export interface Post {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorBadge?: string;
  content: string;
  likes: number;
  commentsCount: number;
  hasLiked?: boolean;
  timeAgo: string;
  courseTag?: string;
}
