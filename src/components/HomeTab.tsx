import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Flame, Award, BookOpen, Play, Pause, Download, CheckCircle2, 
  ArrowRight, Sparkles, AlertTriangle, ShieldCheck, RefreshCw,
  QrCode, Share2, ExternalLink, HelpCircle, Check, ArrowLeft, Trophy
} from "lucide-react";
import { Course, Lesson, QuizQuestion, UserProfile, Certificate } from "../types";

interface HomeTabProps {
  courses: Course[];
  userProfile: UserProfile;
  offlineMode: boolean;
  onEnroll: (courseId: string) => void;
  onCompleteLesson: (courseId: string, lessonId: string) => void;
  onCompleteCourse: (courseId: string) => void;
  onToggleDownloadCourse: (courseId: string) => void;
  setActiveTab: (tab: string) => void;
  triggerAd: (callback: () => void) => void;
}

export default function HomeTab({
  courses,
  userProfile,
  offlineMode,
  onEnroll,
  onCompleteLesson,
  onCompleteCourse,
  onToggleDownloadCourse,
  setActiveTab,
  triggerAd
}: HomeTabProps) {
  // Current active course being studied inside the microlearning player
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  
  // Custom video player simulation states
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [downloadingCourseId, setDownloadingCourseId] = useState<string | null>(null);

  // Quiz evaluation states
  const [quizActive, setQuizActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  
  // Certificate view state (the specific certificate being displayed)
  const [viewingCertificate, setViewingCertificate] = useState<Certificate | null>(null);
  const [isCopying, setIsCopying] = useState(false);
  const [customStudentName, setCustomStudentName] = useState(userProfile.name);

  // Filter courses user is enrolled in
  const enrolledList = courses.filter(c => userProfile.enrolledCourses[c.id] !== undefined);

  // Simulate video playback ticking
  useEffect(() => {
    let interval: any;
    if (isPlaying && activeCourseId && activeLessonId) {
      interval = setInterval(() => {
        setVideoProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            // Auto complete the lesson when video ends!
            const currentCourse = courses.find(c => c.id === activeCourseId);
            if (currentCourse && activeLessonId) {
              onCompleteLesson(activeCourseId, activeLessonId);
            }
            return 100;
          }
          return prev + (3 * playbackSpeed); // progress rate
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, activeCourseId, activeLessonId, playbackSpeed]);

  // Handle opening a course
  const handleOpenCourse = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    // Ad transition B2C model integration (simulate banner or short interstitial if not plus)
    triggerAd(() => {
      setActiveCourseId(courseId);
      // Pick first uncompleted lesson, or the first lesson
      const completedIds = userProfile.enrolledCourses[courseId] || [];
      const firstUncompleted = course.lessons.find(l => !completedIds.includes(l.id));
      setActiveLessonId(firstUncompleted ? firstUncompleted.id : course.lessons[0].id);
      setVideoProgress(0);
      setIsPlaying(false);
      setQuizActive(false);
      setQuizFinished(false);
    });
  };

  const handleSelectLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setVideoProgress(0);
    setIsPlaying(false);
  };

  // Simulated Download process
  const handleDownload = (e: React.MouseEvent, courseId: string) => {
    e.stopPropagation();
    if (downloadingCourseId) return;
    
    setDownloadingCourseId(courseId);
    setTimeout(() => {
      onToggleDownloadCourse(courseId);
      setDownloadingCourseId(null);
    }, 2000); // 2 second mock download
  };

  // Quiz submission actions
  const handleStartQuiz = () => {
    setQuizActive(true);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setQuizScore(0);
    setQuizFinished(false);
  };

  const handleAnswerQuiz = (optionIdx: number) => {
    setSelectedOption(optionIdx);
  };

  const handleNextQuestion = (quizQuestions: QuizQuestion[]) => {
    if (selectedOption === null) return;

    const isCorrect = selectedOption === quizQuestions[currentQuestionIndex].correctIndex;
    if (isCorrect) setQuizScore(prev => prev + 1);

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
    } else {
      setQuizFinished(true);
    }
  };

  const handleFinishQuiz = (courseId: string) => {
    const totalQuestions = courses.find(c => c.id === courseId)?.quiz.length || 3;
    const passed = quizScore >= Math.ceil(totalQuestions * 0.6); // 60% to pass

    if (passed) {
      onCompleteCourse(courseId);
    }
    setQuizActive(false);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setIsCopying(true);
    setTimeout(() => setIsCopying(false), 2000);
  };

  return (
    <div id="home-tab" className="flex flex-col h-full bg-slate-950 text-slate-100 overflow-y-auto pb-20 custom-scrollbar">
      <AnimatePresence mode="wait">
        {!activeCourseId ? (
          /* MAIN HOME VIEW */
          <motion.div
            key="home-main"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 space-y-4"
          >
            {/* Header / Brand */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                  <span className="text-xs font-black tracking-tighter text-slate-950">CLS</span>
                </div>
                <div>
                  <h1 className="text-sm font-bold tracking-tight text-white leading-none">CLS.com</h1>
                  <span className="text-[10px] text-cyan-400 font-medium">Educação Democrática</span>
                </div>
              </div>
              
              {userProfile.isPlus && (
                <span className="px-2 py-0.5 text-[9px] font-semibold text-slate-950 bg-cyan-400 rounded-full flex items-center gap-0.5 animate-pulse">
                  <Sparkles size={10} /> PLUS
                </span>
              )}
            </div>

            {/* Offline Alert Ribbon */}
            {offlineMode && (
              <div className="flex items-center gap-2 px-3 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-xl text-[11px] text-yellow-300">
                <AlertTriangle size={14} className="shrink-0" />
                <span><strong>Modo Offline Ativo.</strong> Exibindo apenas cursos salvos localmente.</span>
              </div>
            )}

            {/* Daily Streak Burner Widget */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/40 border border-cyan-500/15 shadow-xl shadow-cyan-500/5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-amber-500/10 text-amber-500 rounded-xl">
                    <Flame size={20} className="fill-amber-500 animate-bounce" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-white">Sua Ofensiva</h3>
                    <p className="text-[11px] text-slate-400">Estude 10 min por dia</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-amber-500 tracking-tight">
                    {userProfile.streak}
                  </span>
                  <span className="text-xs text-amber-500 font-medium ml-1">Dias</span>
                </div>
              </div>

              {/* Day tracker capsules */}
              <div className="grid grid-cols-7 gap-1.5 mb-3">
                {["D", "2ª", "3ª", "4ª", "5ª", "6ª", "S"].map((day, i) => {
                  const isCompleted = i < userProfile.streak % 7 || (userProfile.streak > 0 && i === 4); // mock days
                  return (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <span className="text-[9px] text-slate-500 font-medium">{day}</span>
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                        isCompleted 
                          ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20" 
                          : "bg-slate-800 text-slate-500 border border-slate-700/50"
                      }`}>
                        {isCompleted ? <Check size={14} strokeWidth={3} /> : <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Daily Progress Goal */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                <div className="text-slate-400">
                  Progresso diário: <strong className="text-cyan-400">{userProfile.minutesStudiedToday} de 10 min</strong>
                </div>
                <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-cyan-400 rounded-full" 
                    style={{ width: `${Math.min(100, (userProfile.minutesStudiedToday / 10) * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Enrolled Courses / Continuation Section */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Seus Estudos</h2>
                <span className="text-[11px] text-cyan-400 font-medium">{enrolledList.length} em andamento</span>
              </div>

              {enrolledList.length === 0 ? (
                <div className="p-6 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-900/40">
                  <BookOpen size={24} className="mx-auto text-slate-600 mb-2" />
                  <p className="text-xs font-semibold text-slate-400 mb-1">Nenhum curso iniciado ainda</p>
                  <p className="text-[11px] text-slate-500 mb-3">Explore nosso catálogo gratuito patrocinado por marcas incríveis!</p>
                  <button
                    onClick={() => setActiveTab("explorar")}
                    className="px-4 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    Ver Catálogo
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {enrolledList.map(course => {
                    const completedIds = userProfile.enrolledCourses[course.id] || [];
                    const percent = Math.round((completedIds.length / course.lessons.length) * 100);
                    const isFullyCompleted = userProfile.completedCourses.includes(course.id);

                    // Offline filter logic
                    if (offlineMode && !course.downloaded) return null;

                    return (
                      <div
                        key={course.id}
                        onClick={() => handleOpenCourse(course.id)}
                        className="p-3 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/20 rounded-2xl transition-all cursor-pointer group flex items-center justify-between gap-3"
                      >
                        <div className="flex-1 min-w-0">
                          {course.sponsor && (
                            <div className="flex items-center gap-1 mb-1">
                              <span className="text-[9px] text-cyan-400 font-semibold bg-cyan-950/80 px-1.5 py-0.5 rounded-sm">
                                Patrocinado por {course.sponsor.name}
                              </span>
                              {course.sponsor.recruiting && (
                                <span className="text-[8px] text-amber-400 bg-amber-950/60 px-1 py-0.5 rounded-sm font-semibold uppercase tracking-wider animate-pulse">
                                  Contratando
                                </span>
                              )}
                            </div>
                          )}

                          <h3 className="text-xs font-bold text-white truncate group-hover:text-cyan-400 transition-colors">
                            {course.title}
                          </h3>

                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
                              <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${percent}%` }} />
                            </div>
                            <span className="text-[10px] text-slate-400 shrink-0">{percent}%</span>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-1 shrink-0">
                          {isFullyCompleted ? (
                            <span className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-xl">
                              <CheckCircle2 size={16} />
                            </span>
                          ) : (
                            <span className="p-1.5 bg-cyan-500/10 text-cyan-400 rounded-xl group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                              <Play size={14} className="fill-current" />
                            </span>
                          )}

                          {/* Download badge indicator */}
                          <button
                            onClick={(e) => handleDownload(e, course.id)}
                            disabled={course.downloaded}
                            className={`p-1 rounded-md text-[10px] ${
                              course.downloaded 
                                ? "text-emerald-400 bg-emerald-950/30" 
                                : "text-slate-500 hover:text-white"
                            }`}
                          >
                            <Download size={11} className={downloadingCourseId === course.id ? "animate-spin text-cyan-400" : ""} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* B2B Hiring Showcase Widget */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <h3 className="text-xs font-bold text-white mb-1 flex items-center gap-1.5">
                <Trophy size={14} className="text-amber-400" /> Vagas & Contratações CLS
              </h3>
              <p className="text-[11px] text-slate-400 mb-3">
                Empresas parceiras buscam talentos que se destacam nas trilhas de Tecnologia e Negócios. Complete os cursos para ficar elegível!
              </p>
              
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[9px] text-amber-400 font-semibold block uppercase">Aura Tech Solutions</span>
                  <span className="text-xs font-bold text-white">Desenvolvedor React Jr</span>
                </div>
                <button
                  onClick={() => handleOpenCourse("js-logic")}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] text-white font-semibold rounded-lg flex items-center gap-1 transition-colors"
                >
                  Ver Trilha <ArrowRight size={10} />
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          /* MICROLEARNING PLAYER VIEW */
          (() => {
            const course = courses.find(c => c.id === activeCourseId)!;
            const activeLesson = course.lessons.find(l => l.id === activeLessonId) || course.lessons[0];
            const completedLessons = userProfile.enrolledCourses[course.id] || [];
            const isFinishedAllLessons = completedLessons.length === course.lessons.length;
            const hasPassedQuiz = userProfile.completedCourses.includes(course.id);

            return (
              <motion.div
                key="home-player"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col h-full bg-slate-950"
              >
                {/* Header Navbar */}
                <div className="p-3 border-b border-slate-900 flex items-center justify-between shrink-0 bg-slate-900/50">
                  <button
                    onClick={() => setActiveCourseId(null)}
                    className="p-1 text-slate-400 hover:text-white rounded-lg flex items-center gap-1 text-[11px]"
                  >
                    <ArrowLeft size={16} /> Voltar
                  </button>

                  <div className="text-center max-w-[150px] truncate">
                    <h2 className="text-[11px] font-bold text-white truncate">{course.title}</h2>
                    <span className="text-[9px] text-slate-400">Patrocínio: {course.sponsor?.name || "Democrático"}</span>
                  </div>

                  <button
                    onClick={(e) => handleDownload(e, course.id)}
                    className={`p-1.5 rounded-lg text-xs ${
                      course.downloaded ? "text-emerald-400 bg-emerald-950/25" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <Download size={14} className={downloadingCourseId === course.id ? "animate-spin text-cyan-400" : ""} />
                  </button>
                </div>

                {/* Simulated Video Player */}
                <div className="relative aspect-video w-full bg-slate-900 border-b border-slate-950 shrink-0 overflow-hidden flex items-center justify-center group">
                  {offlineMode && !course.downloaded ? (
                    /* Offline Lock Screen */
                    <div className="absolute inset-0 bg-slate-950/90 z-10 p-6 flex flex-col items-center justify-center text-center">
                      <AlertTriangle className="text-yellow-400 mb-2 animate-pulse" size={28} />
                      <h4 className="text-xs font-bold text-white mb-1">Conteúdo Indisponível Offline</h4>
                      <p className="text-[10px] text-slate-400 leading-relaxed max-w-[200px]">
                        Você precisa baixar este curso no Wi-Fi antes de estudar sem internet.
                      </p>
                      <button
                        onClick={(e) => handleDownload(e, course.id)}
                        className="mt-3 py-1 px-3 bg-cyan-400 text-slate-950 font-bold text-[10px] rounded-lg flex items-center gap-1"
                      >
                        <Download size={12} /> Baixar Agora
                      </button>
                    </div>
                  ) : (
                    /* Active Stream / Video */
                    <>
                      <video
                        id="microlearning-video-stream"
                        src={activeLesson.videoUrl}
                        className="w-full h-full object-cover opacity-60 pointer-events-none"
                        loop
                        muted
                        autoPlay={isPlaying}
                      />
                      
                      {/* Video Center HUD Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40 opacity-100 transition-opacity">
                        <button
                          id="video-play-pause-center-btn"
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="p-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-full transition-transform active:scale-95 shadow-lg shadow-cyan-500/20"
                        >
                          {isPlaying ? <Pause size={20} className="fill-slate-950" /> : <Play size={20} className="fill-slate-950 ml-0.5" />}
                        </button>
                      </div>

                      {/* Video Bottom Progress Bar Controls */}
                      <div className="absolute bottom-0 inset-x-0 p-2 bg-gradient-to-t from-slate-950/80 to-transparent flex flex-col gap-1.5">
                        <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden cursor-pointer">
                          <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${videoProgress}%` }} />
                        </div>
                        
                        <div className="flex items-center justify-between text-[10px] text-slate-300">
                          <span className="font-mono">
                            {Math.floor((videoProgress / 100) * activeLesson.duration)}:
                            {String(Math.floor(((videoProgress % 100) / 100) * 60)).padStart(2, "0")} / {activeLesson.duration}:00
                          </span>

                          <div className="flex items-center gap-2">
                            <button
                              id="video-speed-toggle-btn"
                              onClick={() => setPlaybackSpeed(prev => prev === 1 ? 1.5 : prev === 1.5 ? 2 : 1)}
                              className="px-1.5 py-0.5 bg-slate-900/95 border border-slate-800 rounded font-semibold hover:text-white"
                            >
                              {playbackSpeed}x Speed
                            </button>
                            <span className="text-[9px] bg-slate-900 px-1 py-0.5 rounded text-cyan-400 uppercase font-bold tracking-wider">
                              Microlearning
                            </span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Course Player Internal Dashboard */}
                <div className="p-3 flex-1 overflow-y-auto space-y-3 custom-scrollbar">
                  {/* Quiz triggers/state views */}
                  {quizActive ? (
                    /* ACTIVE INTERACTIVE EVALUATION QUIZ */
                    <div id="quiz-panel" className="p-3.5 bg-slate-900 border border-cyan-500/30 rounded-2xl space-y-3 shadow-lg">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-cyan-400 font-semibold uppercase tracking-wider">Avaliação Final</span>
                        <span className="text-slate-400">Questão {currentQuestionIndex + 1} de {course.quiz.length}</span>
                      </div>

                      {!quizFinished ? (
                        <>
                          <h4 className="text-xs font-bold text-white">
                            {course.quiz[currentQuestionIndex].question}
                          </h4>

                          <div className="space-y-2">
                            {course.quiz[currentQuestionIndex].options.map((option, idx) => {
                              const isSelected = selectedOption === idx;
                              return (
                                <button
                                  key={idx}
                                  onClick={() => handleAnswerQuiz(idx)}
                                  className={`w-full text-left p-2.5 rounded-xl text-xs transition-all border ${
                                    isSelected 
                                      ? "bg-cyan-500/10 border-cyan-400 text-cyan-300" 
                                      : "bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700"
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    <span className={`w-5 h-5 rounded-full flex items-center justify-center border text-[10px] ${
                                      isSelected ? "border-cyan-400 bg-cyan-400 text-slate-950 font-bold" : "border-slate-700"
                                    }`}>
                                      {String.fromCharCode(65 + idx)}
                                    </span>
                                    <span>{option}</span>
                                  </div>
                                </button>
                              );
                            })}
                          </div>

                          <button
                            id="quiz-next-question-btn"
                            disabled={selectedOption === null}
                            onClick={() => handleNextQuestion(course.quiz)}
                            className="w-full mt-2 py-2 bg-cyan-400 disabled:bg-slate-800 text-slate-950 disabled:text-slate-500 font-bold text-xs rounded-xl transition-all cursor-pointer"
                          >
                            Responder & Avançar
                          </button>
                        </>
                      ) : (
                        /* QUIZ SUMMARY SCREEN */
                        <div className="text-center space-y-3 py-2">
                          <div className="mx-auto w-12 h-12 bg-cyan-500/10 text-cyan-400 rounded-full flex items-center justify-center">
                            <Trophy size={24} />
                          </div>
                          
                          <div>
                            <h4 className="text-xs font-bold text-white">Avaliação Finalizada!</h4>
                            <p className="text-[10px] text-slate-400 mt-1">
                              Você acertou <strong className="text-cyan-400">{quizScore} de {course.quiz.length}</strong> questões.
                            </p>
                          </div>

                          {quizScore >= Math.ceil(course.quiz.length * 0.6) ? (
                            <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-[10px] text-emerald-400">
                              🎉 Parabéns! Você passou na avaliação e emitiu o certificado de conclusão 100% gratuito!
                            </div>
                          ) : (
                            <div className="p-2 bg-red-500/10 border border-red-500/30 rounded-xl text-[10px] text-red-400">
                              ⚠️ Pontuação insuficiente. Estude os materiais e tente novamente para liberar seu certificado.
                            </div>
                          )}

                          <button
                            id="quiz-finish-action-btn"
                            onClick={() => handleFinishQuiz(course.id)}
                            className="w-full py-2 bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl cursor-pointer"
                          >
                            {quizScore >= Math.ceil(course.quiz.length * 0.6) ? "Resgatar Certificado" : "Tentar Novamente"}
                          </button>
                        </div>
                      )}
                    </div>
                  ) : hasPassedQuiz ? (
                    /* CERTIFICATE GRANTED BANNER */
                    <div className="p-4 bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/30 rounded-2xl space-y-2 shadow-lg">
                      <div className="flex items-center gap-2">
                        <span className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-xl">
                          <Award size={20} />
                        </span>
                        <div>
                          <h4 className="text-xs font-bold text-white">Trilha Concluída!</h4>
                          <span className="text-[10px] text-emerald-400 font-medium">Certificado Digital Disponível</span>
                        </div>
                      </div>
                      
                      <p className="text-[11px] text-slate-400">
                        Seu certificado digital gratuito foi emitido com chave de validação QR e está pronto para exportação!
                      </p>

                      <div className="pt-1 flex gap-2">
                        <button
                          id="view-certificate-internal-btn"
                          onClick={() => {
                            // Find or mock certificate
                            const existingCert = userProfile.certificates.find(c => c.courseId === course.id) || {
                              id: `CERT-${course.id}`,
                              courseId: course.id,
                              courseTitle: course.title,
                              studentName: customStudentName,
                              issueDate: new Date().toLocaleDateString("pt-BR"),
                              verificationCode: `CLS-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
                              sponsorName: course.sponsor?.name
                            };
                            setViewingCertificate(existingCert);
                          }}
                          className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          Visualizar Certificado
                        </button>
                        <button
                          onClick={() => setActiveTab("perfil")}
                          className="px-3 py-1.5 bg-slate-850 hover:bg-slate-800 text-slate-300 font-semibold text-xs rounded-lg transition-colors"
                        >
                          Ver no Perfil
                        </button>
                      </div>
                    </div>
                  ) : isFinishedAllLessons ? (
                    /* UNLOCKED EVALUATION READY */
                    <div className="p-4 bg-gradient-to-r from-cyan-950/40 to-slate-900 border border-cyan-500/30 rounded-2xl space-y-2 shadow-lg">
                      <div className="flex items-center gap-2">
                        <span className="p-1.5 bg-cyan-500/10 text-cyan-400 rounded-xl">
                          <HelpCircle size={20} className="animate-pulse" />
                        </span>
                        <div>
                          <h4 className="text-xs font-bold text-white">Avaliação Liberada!</h4>
                          <span className="text-[10px] text-cyan-400 font-medium">Demonstre seus conhecimentos</span>
                        </div>
                      </div>
                      
                      <p className="text-[11px] text-slate-400">
                        Conclua as perguntas baseadas no conteúdo das micro-aulas para certificar sua trilha e abrir oportunidades!
                      </p>

                      <button
                        id="start-evaluation-quiz-btn"
                        onClick={handleStartQuiz}
                        className="w-full mt-1 py-2 bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all hover:bg-cyan-300"
                      >
                        Começar Avaliação Final
                      </button>
                    </div>
                  ) : null}

                  {/* Microlearning Material Content Reader */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Apoio Escrito</span>
                      <span className="text-[10px] text-slate-400 font-mono">Duração: {activeLesson.duration} mins</span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800/80 space-y-2">
                      <h3 className="text-xs font-bold text-white">{activeLesson.title}</h3>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans">{activeLesson.summary}</p>
                      
                      {/* Check-in / mark complete button */}
                      <div className="pt-2 flex justify-end">
                        <button
                          id="mark-lesson-completed-btn"
                          disabled={completedLessons.includes(activeLesson.id)}
                          onClick={() => onCompleteLesson(course.id, activeLesson.id)}
                          className={`px-3 py-1.5 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all ${
                            completedLessons.includes(activeLesson.id)
                              ? "bg-slate-800 text-slate-500"
                              : "bg-cyan-500 hover:bg-cyan-400 text-slate-950 hover:shadow-lg hover:shadow-cyan-400/10"
                          }`}
                        >
                          <CheckCircle2 size={14} />
                          {completedLessons.includes(activeLesson.id) ? "Concluída" : "Marcar Conclusão (+20 XP)"}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Lesson Tracks List inside the Player */}
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Módulos da Trilha</h4>
                    
                    <div className="space-y-2">
                      {course.lessons.map((lesson) => {
                        const isSelected = lesson.id === activeLessonId;
                        const isCompleted = completedLessons.includes(lesson.id);

                        return (
                          <div
                            key={lesson.id}
                            onClick={() => handleSelectLesson(lesson.id)}
                            className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                              isSelected 
                                ? "bg-slate-900/90 border-cyan-500/30 shadow-md shadow-cyan-500/5" 
                                : "bg-slate-950 border-slate-850 hover:border-slate-800"
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <span className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                                isCompleted 
                                  ? "bg-emerald-500/10 text-emerald-400" 
                                  : isSelected 
                                    ? "bg-cyan-500/10 text-cyan-400" 
                                    : "bg-slate-900 text-slate-500"
                              }`}>
                                {isCompleted ? <CheckCircle2 size={14} /> : <Play size={10} className="fill-current" />}
                              </span>

                              <div className="min-w-0">
                                <h5 className={`text-[11px] font-semibold truncate ${
                                  isSelected ? "text-cyan-400" : "text-slate-300"
                                }`}>
                                  {lesson.title}
                                </h5>
                                <span className="text-[9px] text-slate-500 font-mono">{lesson.duration} minutos</span>
                              </div>
                            </div>

                            {isCompleted && (
                              <span className="text-[9px] font-semibold text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded">
                                Completo
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })()
        )}
      </AnimatePresence>

      {/* RENDER CERTIFICATE PREVIEW MODAL */}
      <AnimatePresence>
        {viewingCertificate && (
          <div id="cert-modal-backdrop" className="absolute inset-0 z-50 bg-slate-950/90 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              id="cert-modal-card"
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

                {/* Student name field (editable!) */}
                <div className="py-1">
                  <input
                    id="cert-student-name-input"
                    type="text"
                    value={customStudentName}
                    onChange={(e) => setCustomStudentName(e.target.value)}
                    placeholder="Seu Nome Completo"
                    className="w-full text-center bg-transparent border-b border-dashed border-slate-700 focus:border-emerald-400 text-sm font-black text-white px-2 py-1 outline-none font-sans"
                  />
                  <span className="text-[8px] text-slate-500 block mt-1">Clique acima para editar o nome no certificado</span>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] text-slate-400">concluiu com êxito a trilha de microlearning de</p>
                  <h4 className="text-xs font-black text-white uppercase tracking-tight">{viewingCertificate.courseTitle}</h4>
                </div>

                {/* Sponsoring / Digital details */}
                <div className="pt-2 border-t border-slate-800/60 grid grid-cols-2 gap-2 text-[9px] text-left">
                  <div>
                    <span className="text-slate-500 block">Emissor:</span>
                    <span className="text-white font-medium">CLS Educação</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Patrocinador:</span>
                    <span className="text-emerald-400 font-medium truncate block">{viewingCertificate.sponsorName || "CLS Democrático"}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Data de Emissão:</span>
                    <span className="text-white font-medium">{viewingCertificate.issueDate}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Código Único:</span>
                    <span className="text-white font-mono">{viewingCertificate.verificationCode}</span>
                  </div>
                </div>

                {/* Validation and QR Section */}
                <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between gap-3 bg-slate-950/50 p-2 rounded-xl">
                  <div className="text-left">
                    <span className="text-[8px] font-semibold text-emerald-400 uppercase tracking-widest block">Validação Digital</span>
                    <p className="text-[8px] text-slate-400 leading-tight">Escaneie o código QR ao lado para validar a autenticidade deste certificado.</p>
                  </div>
                  <div className="p-1 bg-white rounded-lg shrink-0">
                    <QrCode size={36} className="text-slate-950" />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <button
                  id="copy-validation-hash-btn"
                  onClick={() => handleCopyCode(viewingCertificate.verificationCode)}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {isCopying ? <Check size={14} className="text-emerald-400" /> : <RefreshCw size={12} />}
                  {isCopying ? "Código Copiado!" : "Copiar Código de Validação"}
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    id="simulate-pdf-download-btn"
                    onClick={() => {
                      alert("Simulação de PDF: Seu certificado foi salvo na galeria de downloads com o código de registro!");
                    }}
                    className="py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  >
                    <Download size={14} /> Baixar PDF
                  </button>
                  <button
                    id="close-cert-modal-btn"
                    onClick={() => {
                      // Apply name updates back to profiles
                      userProfile.name = customStudentName;
                      setViewingCertificate(null);
                    }}
                    className="py-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs font-semibold rounded-xl cursor-pointer"
                  >
                    Fechar
                  </button>
                </div>

                <div className="text-center">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[9px] text-cyan-400 hover:underline flex items-center justify-center gap-1"
                  >
                    Compartilhar conquistas no LinkedIn <ExternalLink size={8} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
