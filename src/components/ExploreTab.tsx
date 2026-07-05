import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, BookOpen, Clock, Star, ArrowRight, ShieldCheck, 
  HelpCircle, CheckCircle, Flame, Check, Sparkles, Building2
} from "lucide-react";
import { Course, UserProfile } from "../types";

interface ExploreTabProps {
  courses: Course[];
  userProfile: UserProfile;
  onEnroll: (courseId: string) => void;
  setActiveTab: (tab: string) => void;
  triggerAd: (callback: () => void) => void;
}

export default function ExploreTab({
  courses,
  userProfile,
  onEnroll,
  setActiveTab,
  triggerAd
}: ExploreTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [selectedLevel, setSelectedLevel] = useState<string>("Todos");

  const categories = ["Todos", "Tecnologia", "Negócios", "Idiomas", "Desenvolvimento Pessoal", "Marketing"];
  const levels = ["Todos", "Iniciante", "Intermediário", "Avançado"];

  // Filter logic
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (course.sponsor?.name || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || course.category === selectedCategory;
    const matchesLevel = selectedLevel === "Todos" || course.level === selectedLevel;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  const handleEnrollAndStart = (courseId: string) => {
    // If not enrolled yet, enroll first
    if (userProfile.enrolledCourses[courseId] === undefined) {
      onEnroll(courseId);
    }
    
    // Smoothly transition after an ad
    triggerAd(() => {
      setActiveTab("inicio");
      // Delay slightly so that parent can trigger state changes
      setTimeout(() => {
        const streamBtn = document.getElementById("microlearning-video-stream");
        if (streamBtn) streamBtn.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    });
  };

  return (
    <div id="explore-tab" className="flex flex-col h-full bg-slate-950 text-slate-100 overflow-y-auto pb-20 p-4 space-y-4 custom-scrollbar">
      {/* Header */}
      <div>
        <h2 className="text-base font-black text-white tracking-tight">Explorar Conhecimento</h2>
        <p className="text-[11px] text-slate-400">Educação democrática 100% gratuita patrocinada por marcas</p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          id="explore-search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar cursos ou patrocinadores..."
          className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs placeholder-slate-500 text-slate-100 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all font-sans"
        />
      </div>

      {/* Category Filter Pills (Horizontal scrollable row) */}
      <div className="space-y-1.5">
        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Categorias</span>
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar -mx-4 px-4">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  isSelected 
                    ? "bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/10" 
                    : "bg-slate-900 text-slate-400 border border-slate-850 hover:bg-slate-800"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Level Selector Filters */}
      <div className="grid grid-cols-4 gap-1 bg-slate-900 p-1 rounded-xl">
        {levels.map((lvl) => {
          const isSelected = selectedLevel === lvl;
          return (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`py-1 text-[9px] font-bold rounded-lg text-center transition-all cursor-pointer ${
                isSelected 
                  ? "bg-slate-800 text-cyan-400 shadow-sm" 
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {lvl}
            </button>
          );
        })}
      </div>

      {/* Course List Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Cursos Disponíveis ({filteredCourses.length})
          </span>
        </div>

        {filteredCourses.length === 0 ? (
          <div className="p-8 text-center border border-dashed border-slate-850 rounded-2xl bg-slate-900/30">
            <BookOpen size={24} className="mx-auto text-slate-700 mb-2" />
            <p className="text-xs font-semibold text-slate-400">Nenhum curso encontrado</p>
            <p className="text-[10px] text-slate-500">Tente ajustar seus termos de busca ou mudar os filtros de nível.</p>
          </div>
        ) : (
          <div className="space-y-3.5">
            {filteredCourses.map((course) => {
              const isEnrolled = userProfile.enrolledCourses[course.id] !== undefined;
              const isFinished = userProfile.completedCourses.includes(course.id);
              
              return (
                <motion.div
                  id={`course-card-${course.id}`}
                  key={course.id}
                  layout
                  className="p-4 bg-slate-900 border border-slate-850 hover:border-cyan-500/20 rounded-2xl transition-all space-y-3 hover:shadow-lg hover:shadow-cyan-500/5"
                >
                  {/* Sponsor Head Badge */}
                  <div className="flex items-center justify-between gap-2">
                    {course.sponsor ? (
                      <div className="flex items-center gap-1.5">
                        <Building2 size={12} className="text-cyan-400" />
                        <span className="text-[10px] text-slate-400 font-semibold truncate">
                          Oferecido por <strong className="text-cyan-400">{course.sponsor.name}</strong>
                        </span>
                      </div>
                    ) : (
                      <span className="text-[9px] text-slate-500">Parceria Social CLS</span>
                    )}

                    {course.sponsor?.recruiting && (
                      <span className="text-[8px] font-black uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-500/20 px-1.5 py-0.5 rounded-sm animate-pulse shrink-0">
                        Vagas Abertas
                      </span>
                    )}
                  </div>

                  {/* Course Details */}
                  <div>
                    <span className="px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider bg-slate-800 text-cyan-400 rounded">
                      {course.category}
                    </span>
                    <h3 className="text-sm font-extrabold text-white mt-1.5 leading-snug">
                      {course.title}
                    </h3>
                  </div>

                  {/* Badges Row */}
                  <div className="flex items-center gap-3 text-[10px] text-slate-400 pt-1">
                    <div className="flex items-center gap-1 font-mono">
                      <Clock size={12} />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={12} className="text-amber-500 fill-amber-500" />
                      <span className="font-semibold text-white">{course.rating}</span>
                    </div>
                    <span className="text-slate-600">•</span>
                    <span className="text-[9px] uppercase font-bold text-slate-400">
                      {course.level}
                    </span>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-2 border-t border-slate-850 flex items-center justify-between gap-2">
                    <span className="text-[9px] text-slate-500">
                      {course.lessons.length} micro-aulas + Avaliação
                    </span>

                    <button
                      id={`enroll-course-${course.id}-btn`}
                      onClick={() => handleEnrollAndStart(course.id)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-xl flex items-center gap-1 transition-all cursor-pointer ${
                        isFinished
                          ? "bg-emerald-500/10 text-emerald-400"
                          : isEnrolled
                            ? "bg-slate-800 hover:bg-slate-750 text-cyan-400 border border-cyan-500/10"
                            : "bg-cyan-400 hover:bg-cyan-300 text-slate-950"
                      }`}
                    >
                      {isFinished ? (
                        <>Ver Certificado <Check size={12} /></>
                      ) : isEnrolled ? (
                        <>Continuar <ArrowRight size={12} /></>
                      ) : (
                        <>Estudar Grátis <ArrowRight size={12} /></>
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
