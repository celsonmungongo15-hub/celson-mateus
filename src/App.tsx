import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Wifi, WifiOff, Smartphone, Sparkles, Heart, RefreshCw, Star, 
  Award, Trophy, HelpCircle, CheckCircle2, ChevronRight, Play, Check, 
  ShieldCheck, ArrowRight, BookOpen, ExternalLink, Download, Flame, Users
} from "lucide-react";

import { Course, UserProfile, Achievement, LeaderboardUser, Post, Certificate } from "./types";
import { INITIAL_COURSES, INITIAL_LEADERBOARD, INITIAL_POSTS, ACHIEVEMENTS } from "./data";

import PhoneFrame from "./components/PhoneFrame";
import HomeTab from "./components/HomeTab";
import ExploreTab from "./components/ExploreTab";
import ProfileTab from "./components/ProfileTab";
import CommunityTab from "./components/CommunityTab";
import PlusModal from "./components/PlusModal";

export default function App() {
  // Global State persistence via localStorage
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem("cls_courses");
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem("cls_profile");
    if (saved) return JSON.parse(saved);
    return {
      name: "Raphael Bonito",
      email: "bonitoraphael29@gmail.com",
      xp: 450,
      streak: 5,
      lastStudyDate: new Date().toISOString(),
      minutesStudiedToday: 7,
      isPlus: false,
      enrolledCourses: { "js-logic": ["js-1"] }, // start enrolled in JS course
      completedCourses: [],
      certificates: [],
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80"
    };
  });

  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>(() => {
    const saved = localStorage.getItem("cls_leaderboard");
    return saved ? JSON.parse(saved) : INITIAL_LEADERBOARD;
  });

  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem("cls_posts");
    return saved ? JSON.parse(saved) : INITIAL_POSTS;
  });

  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const saved = localStorage.getItem("cls_achievements");
    return saved ? JSON.parse(saved) : ACHIEVEMENTS;
  });

  // UI Navigation states
  const [activeTab, setActiveTab] = useState("inicio");
  const [offlineMode, setOfflineMode] = useState(false);
  const [isPlusModalOpen, setIsPlusModalOpen] = useState(false);
  const [activeCertificate, setActiveCertificate] = useState<Certificate | null>(null);

  // Simulated Interstitial Ad System
  const [isShowingAd, setIsShowingAd] = useState(false);
  const [adCountdown, setAdCountdown] = useState(2);
  const [adCallback, setAdCallback] = useState<(() => void) | null>(null);

  // Social Cheer toast alert state
  const [cheerMessage, setCheerMessage] = useState<string | null>(null);

  // Sync state with LocalStorage
  useEffect(() => {
    localStorage.setItem("cls_courses", JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem("cls_profile", JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem("cls_leaderboard", JSON.stringify(leaderboard));
  }, [leaderboard]);

  useEffect(() => {
    localStorage.setItem("cls_posts", JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem("cls_achievements", JSON.stringify(achievements));
  }, [achievements]);

  // Handle ad countdown timer
  useEffect(() => {
    let adInterval: any;
    if (isShowingAd && adCountdown > 0) {
      adInterval = setInterval(() => {
        setAdCountdown(prev => prev - 1);
      }, 1000);
    } else if (isShowingAd && adCountdown === 0) {
      setIsShowingAd(false);
      if (adCallback) {
        adCallback();
        setAdCallback(null);
      }
    }
    return () => clearInterval(adInterval);
  }, [isShowingAd, adCountdown, adCallback]);

  // Trigger non-intrusive interstitial ad simulation (democratization pillar!)
  const triggerAd = (callback: () => void) => {
    if (userProfile.isPlus) {
      callback(); // Plus members have instant, clean navigation
      return;
    }
    
    // Simulate beautiful 2-second ad transition
    setAdCountdown(2);
    setAdCallback(() => callback);
    setIsShowingAd(true);
  };

  // State update actions
  const handleEnrollCourse = (courseId: string) => {
    setUserProfile(prev => {
      if (prev.enrolledCourses[courseId]) return prev;
      return {
        ...prev,
        enrolledCourses: {
          ...prev.enrolledCourses,
          [courseId]: [] // start with empty completed lessons
        }
      };
    });
  };

  const handleCompleteLesson = (courseId: string, lessonId: string) => {
    setUserProfile(prev => {
      const completed = prev.enrolledCourses[courseId] || [];
      if (completed.includes(lessonId)) return prev;

      const updatedCompleted = [...completed, lessonId];
      const newXp = prev.xp + 20; // 20 XP per lesson!
      const newMinutes = prev.minutesStudiedToday + 3; // study minutes increase

      // Check achievement "Estudante Errante" if course is downloaded
      const isDownloaded = courses.find(c => c.id === courseId)?.downloaded;
      const updatedAchievements = achievements.map(ach => {
        if (ach.id === "offline-traveler" && isDownloaded && !ach.unlocked) {
          return { ...ach, unlocked: true, progress: 100, unlockedAt: "Agora" };
        }
        return ach;
      });
      setAchievements(updatedAchievements);

      return {
        ...prev,
        xp: newXp,
        minutesStudiedToday: newMinutes,
        enrolledCourses: {
          ...prev.enrolledCourses,
          [courseId]: updatedCompleted
        }
      };
    });
  };

  const handleCompleteCourse = (courseId: string) => {
    const course = courses.find(c => c.id === courseId)!;
    
    setUserProfile(prev => {
      if (prev.completedCourses.includes(courseId)) return prev;

      const newCert: Certificate = {
        id: `CERT-${courseId}`,
        courseId: courseId,
        courseTitle: course.title,
        studentName: prev.name,
        issueDate: new Date().toLocaleDateString("pt-BR"),
        verificationCode: `CLS-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        sponsorName: course.sponsor?.name
      };

      // Achievements trigger for first certificate
      const updatedAchievements = achievements.map(ach => {
        if (ach.id === "first-cert" && !ach.unlocked) {
          return { ...ach, unlocked: true, progress: 100, unlockedAt: "Agora" };
        }
        return ach;
      });
      setAchievements(updatedAchievements);

      return {
        ...prev,
        completedCourses: [...prev.completedCourses, courseId],
        xp: prev.xp + 100, // 100 bonus XP for completing a course!
        certificates: [...prev.certificates, newCert]
      };
    });
  };

  const handleToggleDownloadCourse = (courseId: string) => {
    setCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        return { ...c, downloaded: true };
      }
      return c;
    }));
  };

  const handleUpdateName = (newName: string) => {
    setUserProfile(prev => ({
      ...prev,
      name: newName,
      certificates: prev.certificates.map(c => ({ ...c, studentName: newName }))
    }));
  };

  const handleSubscribePlus = () => {
    setUserProfile(prev => ({
      ...prev,
      isPlus: true
    }));
    setIsPlusModalOpen(false);
  };

  const handleLikePost = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const hasLiked = !p.hasLiked;
        return {
          ...p,
          hasLiked,
          likes: hasLiked ? p.likes + 1 : p.likes - 1
        };
      }
      return p;
    }));

    // Unlock community achievement progress
    setAchievements(prev => prev.map(ach => {
      if (ach.id === "comm-member" && !ach.unlocked) {
        return { ...ach, unlocked: true, progress: 100, unlockedAt: "Agora" };
      }
      return ach;
    }));
  };

  const handleAddPost = (content: string, courseTag?: string) => {
    const newPost: Post = {
      id: `post-${Date.now()}`,
      authorName: userProfile.name,
      authorAvatar: userProfile.avatarUrl,
      authorBadge: userProfile.isPlus ? "Apoiador Plus" : "Aluno Ativo",
      content,
      likes: 0,
      commentsCount: 0,
      hasLiked: false,
      timeAgo: "Agora mesmo",
      courseTag
    };

    setPosts(prev => [newPost, ...prev]);
  };

  const handleAddComment = (postId: string, commentContent: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          commentsCount: p.commentsCount + 1
        };
      }
      return p;
    }));
  };

  const handleCheerFriend = (friendName: string) => {
    setCheerMessage(`Você enviou incentivos para ${friendName}! 👍🔥`);
    setTimeout(() => setCheerMessage(null), 3000);
  };

  const handleResetProgress = () => {
    if (confirm("Deseja realmente reiniciar todo o seu progresso no CLS.com?")) {
      localStorage.removeItem("cls_courses");
      localStorage.removeItem("cls_profile");
      localStorage.removeItem("cls_leaderboard");
      localStorage.removeItem("cls_posts");
      localStorage.removeItem("cls_achievements");
      window.location.reload();
    }
  };

  return (
    <div id="app-root-container" className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 md:p-8 font-sans">
      
      {/* Dynamic Glow effects in page border */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center justify-center">
        
        {/* DESKTOP SIDEBAR PANEL: MISSION, RECRUITING & MONETIZATION EXPLANATIONS */}
        <div className="lg:col-span-7 space-y-6 text-left hidden lg:block pr-4">
          
          {/* Main Logo Card aligned with the watermarked design */}
          <div className="flex items-center gap-4">
            {/* High-fidelity CSS Recreation of the Logo in the image */}
            <div className="relative w-16 h-16 rounded-[22px] bg-gradient-to-tr from-blue-900 to-cyan-500 p-[3px] shadow-2xl shadow-cyan-500/30 flex items-center justify-center overflow-hidden shrink-0 ring-1 ring-cyan-400/30">
              {/* Circuit background lines */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-cyan-500 to-transparent scale-150" />
              <div className="absolute w-12 h-12 border border-cyan-400/40 rounded-full animate-pulse opacity-30" />
              <div className="absolute w-8 h-8 border border-cyan-300/30 rounded-full opacity-20" />
              
              {/* Central text */}
              <div className="z-10 flex flex-col items-center justify-center">
                <span className="text-sm font-black tracking-tighter text-white leading-none">CLS</span>
                <span className="text-[7px] font-extrabold tracking-widest text-cyan-300 uppercase">.com</span>
              </div>
            </div>

            <div>
              <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                CLS.com <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-400/20">Democrático</span>
              </h1>
              <p className="text-xs text-slate-400 mt-1 max-w-md">
                Plataforma de educação democrática e acessível projetada para smartphones. Cursos gratuitos, gamificação de alto engajamento, e certificados digitais com validação QR.
              </p>
            </div>
          </div>

          {/* Quick interactive mock parameters */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Painel do Simulador</h3>
            
            <div className="grid grid-cols-2 gap-3">
              {/* Toggle offline simulation */}
              <div className="flex items-center justify-between p-2.5 bg-slate-950/80 rounded-xl border border-slate-800">
                <div>
                  <span className="text-[10px] font-bold text-white block">Estudo Offline</span>
                  <span className="text-[9px] text-slate-500">Simular falta de internet</span>
                </div>
                <button
                  id="simulate-offline-toggle"
                  onClick={() => setOfflineMode(!offlineMode)}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    offlineMode ? "bg-yellow-500/20 text-yellow-400" : "bg-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {offlineMode ? <WifiOff size={16} /> : <Wifi size={16} />}
                </button>
              </div>

              {/* Toggle Plus subscription */}
              <div className="flex items-center justify-between p-2.5 bg-slate-950/80 rounded-xl border border-slate-800">
                <div>
                  <span className="text-[10px] font-bold text-white block">Selo Plus Ativo</span>
                  <span className="text-[9px] text-slate-500">Remover propagandas</span>
                </div>
                <button
                  id="simulate-plus-toggle"
                  onClick={() => {
                    setUserProfile(p => ({ ...p, isPlus: !p.isPlus }));
                  }}
                  className={`px-2 py-1 text-[9px] font-bold rounded-lg transition-all cursor-pointer ${
                    userProfile.isPlus 
                      ? "bg-cyan-400 text-slate-950 font-black" 
                      : "bg-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {userProfile.isPlus ? "ATIVO" : "INATIVO"}
                </button>
              </div>
            </div>

            {/* Simulated advertisement actions */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px]">
              <span className="text-slate-400">Ver mecanismo de sustentabilidade de anúncios:</span>
              <div className="flex items-center gap-2">
                <button
                  id="trigger-mock-ad-btn"
                  onClick={() => triggerAd(() => alert("Callback do anúncio concluído! Sucesso na navegação."))}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded text-[10px] transition-colors cursor-pointer"
                >
                  Exibir Anúncio de Transição
                </button>
                <button
                  id="reset-progress-state-btn"
                  onClick={handleResetProgress}
                  className="px-2.5 py-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-semibold rounded text-[10px] transition-colors cursor-pointer"
                >
                  Reiniciar Progresso
                </button>
              </div>
            </div>
          </div>

          {/* Business Model Explanation Row */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Como mantemos a plataforma 100% gratuita?</h3>
            
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-850">
                <span className="text-[9px] font-bold uppercase tracking-widest text-cyan-400">Anúncios Leves</span>
                <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                  Propagandas não-invasivas de 2 segundos surgem organicamente apenas quando você transita entre módulos no plano grátis.
                </p>
              </div>

              <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-850">
                <span className="text-[9px] font-bold uppercase tracking-widest text-amber-400">Patrocínio B2B</span>
                <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                  Empresas financiam trilhas exclusivas e usam a plataforma para caçar talentos (recrutamento digital integrado).
                </p>
              </div>

              <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-850">
                <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-400">Assinatura Plus</span>
                <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                  Para quem deseja estudar offline de forma ilimitada e remover anúncios apoiando a educação acessível no país.
                </p>
              </div>
            </div>
          </div>

          {/* Quick link disclaimer */}
          <div className="text-[10px] text-slate-500">
            *Desenvolvido em conformidade com as diretrizes de visualização responsiva de smartphone para CLS.com.
          </div>
        </div>

        {/* SMARTPHONE VIEW CHASSIS FRAME CONTAINER */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          
          {/* Social Cheer Notification Toast overlay inside the layout */}
          <AnimatePresence>
            {cheerMessage && (
              <motion.div
                id="cheer-toast-notification"
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                className="absolute top-12 z-50 bg-cyan-950 border border-cyan-400 text-cyan-300 text-xs py-2 px-4 rounded-xl shadow-lg flex items-center gap-2"
              >
                <CheckCircle2 size={14} className="text-cyan-400" />
                <span>{cheerMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <PhoneFrame
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            offlineMode={offlineMode}
          >
            {/* RENDER CURRENT SMARTPHONE TAB CONTENT */}
            {activeTab === "inicio" && (
              <HomeTab
                courses={courses}
                userProfile={userProfile}
                offlineMode={offlineMode}
                onEnroll={handleEnrollCourse}
                onCompleteLesson={handleCompleteLesson}
                onCompleteCourse={handleCompleteCourse}
                onToggleDownloadCourse={handleToggleDownloadCourse}
                setActiveTab={setActiveTab}
                triggerAd={triggerAd}
              />
            )}

            {activeTab === "explorar" && (
              <ExploreTab
                courses={courses}
                userProfile={userProfile}
                onEnroll={handleEnrollCourse}
                setActiveTab={setActiveTab}
                triggerAd={triggerAd}
              />
            )}

            {activeTab === "comunidade" && (
              <CommunityTab
                userProfile={userProfile}
                leaderboard={leaderboard}
                posts={posts}
                onLikePost={handleLikePost}
                onAddPost={handleAddPost}
                onAddComment={handleAddComment}
                onCheerFriend={handleCheerFriend}
              />
            )}

            {activeTab === "perfil" && (
              <ProfileTab
                userProfile={userProfile}
                achievements={achievements}
                onUpdateName={handleUpdateName}
                onOpenPlusModal={() => setIsPlusModalOpen(true)}
                onViewCertificate={(cert) => setActiveCertificate(cert)}
                setActiveTab={setActiveTab}
              />
            )}

            {/* Simulated Interstitial Ad screen cover (Inside the Phone!) */}
            <AnimatePresence>
              {isShowingAd && (
                <motion.div
                  id="interstitial-ad-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-slate-950 z-50 flex flex-col justify-between p-6 text-center"
                >
                  <div className="pt-8">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">CLS Sustentabilidade</span>
                    <span className="text-[8px] text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/20 font-semibold inline-block mt-2">
                      Anúncio Patrocinado
                    </span>
                  </div>

                  {/* Ad Creative visual representation */}
                  <div className="p-4 rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-blue-900/30 to-slate-950 space-y-3 shadow-lg shadow-cyan-500/10">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500 flex items-center justify-center mx-auto shadow-md">
                      <Sparkles className="text-slate-950" size={20} />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-white">Google Cloud Partner</h4>
                      <p className="text-[10px] text-slate-400 mt-1">Acelere sua carreira tech com créditos grátis e trilhas oficiais exclusivas no CLS.com!</p>
                    </div>
                  </div>

                  {/* Ad countdown */}
                  <div className="pb-8 space-y-2">
                    <span className="text-xs font-bold text-white">Carregando seus estudos...</span>
                    <p className="text-[9px] text-slate-500 block">Este anúncio financia sua educação democrática gratuita.</p>
                    
                    <div className="inline-block px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-bold text-cyan-400">
                      Fechar em {adCountdown}s
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </PhoneFrame>
        </div>

        {/* MOBILE PARAMETERS & RESET SECTION: DISPLAYED ONLY ON MOBILE SCREENS SO MOBILE USERS CAN RESET */}
        <div className="block lg:hidden mt-4 space-y-3 w-full text-center">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-850 flex flex-col gap-3">
            <span className="text-xs font-bold text-white">Controles do Dispositivo</span>
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => setOfflineMode(!offlineMode)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${
                  offlineMode ? "bg-yellow-500/20 text-yellow-400" : "bg-slate-800 text-slate-300"
                }`}
              >
                {offlineMode ? <WifiOff size={14} /> : <Wifi size={14} />}
                Modo Offline
              </button>
              <button
                onClick={handleResetProgress}
                className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-semibold text-xs rounded-lg"
              >
                Reiniciar Progresso
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Sustainable plus modal */}
      <PlusModal
        isOpen={isPlusModalOpen}
        onClose={() => setIsPlusModalOpen(false)}
        onSubscribe={handleSubscribePlus}
      />

      {/* RENDER CERTIFICATE PREVIEW MODAL IF OPENED FROM PROFILE */}
      <AnimatePresence>
        {activeCertificate && (
          <div id="app-cert-modal-backdrop" className="absolute inset-0 z-50 bg-slate-950/90 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              id="app-cert-modal-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-sm bg-slate-900 border border-emerald-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-emerald-500/10 p-5 space-y-4"
            >
              {/* Certificate Inner Frame */}
              <div className="relative p-5 border border-dashed border-emerald-500/20 rounded-2xl bg-gradient-to-br from-slate-950 to-emerald-950/20 text-center space-y-4">
                
                {/* Logo top */}
                <div className="flex items-center justify-center gap-1.5">
                  <div className="w-6 h-6 rounded bg-gradient-to-tr from-emerald-500 to-cyan-400 flex items-center justify-center">
                    <span className="text-[10px] font-black text-slate-950">CLS</span>
                  </div>
                  <span className="text-xs font-black tracking-widest text-white uppercase">CLS.com</span>
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] text-emerald-400 font-semibold uppercase tracking-wider">Certificado de Conclusão</span>
                  <p className="text-[10px] text-slate-400">Certifica-se para todos os fins acadêmicos e profissionais que</p>
                </div>

                <div className="py-2">
                  <span className="text-base font-black text-white px-2 py-1 font-sans block">{activeCertificate.studentName}</span>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] text-slate-400">concluiu com êxito a trilha de microlearning de</p>
                  <h4 className="text-xs font-black text-white uppercase tracking-tight">{activeCertificate.courseTitle}</h4>
                </div>

                {/* Sponsoring / Digital details */}
                <div className="pt-2 border-t border-slate-800/60 grid grid-cols-2 gap-2 text-[9px] text-left">
                  <div>
                    <span className="text-slate-500 block">Emissor:</span>
                    <span className="text-white font-medium">CLS Educação</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Patrocinador:</span>
                    <span className="text-emerald-400 font-medium truncate block">{activeCertificate.sponsorName || "CLS Democrático"}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Data de Emissão:</span>
                    <span className="text-white font-medium">{activeCertificate.issueDate}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Código Único:</span>
                    <span className="text-white font-mono">{activeCertificate.verificationCode}</span>
                  </div>
                </div>

                {/* Validation and QR Section */}
                <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between gap-3 bg-slate-950/50 p-2 rounded-xl">
                  <div className="text-left">
                    <span className="text-[8px] font-semibold text-emerald-400 uppercase tracking-widest block">Validação Digital</span>
                    <p className="text-[8px] text-slate-400 leading-tight">Código autenticado registrado no currículo ou LinkedIn.</p>
                  </div>
                  <div className="p-1 bg-white rounded-lg shrink-0">
                    <div className="w-9 h-9 border-2 border-slate-950 bg-slate-950 flex items-center justify-center font-black text-[7px] text-white">QR</div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <button
                  id="app-simulate-pdf-download-btn"
                  onClick={() => {
                    alert("Simulação de PDF: Seu certificado foi salvo na galeria de downloads com o código de registro!");
                  }}
                  className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1 transition-colors cursor-pointer"
                >
                  <Download size={14} /> Baixar PDF
                </button>
                <button
                  id="app-close-cert-modal-btn"
                  onClick={() => setActiveCertificate(null)}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs font-semibold rounded-xl cursor-pointer"
                >
                  Fechar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
