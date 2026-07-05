import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Award, Trophy, Settings, ShieldCheck, Heart, Sparkles, Edit2, Check,
  Download, QrCode, Share2, Compass, AlertCircle, FileText, CheckCircle2, ChevronRight
} from "lucide-react";
import { UserProfile, Achievement, Certificate } from "../types";

interface ProfileTabProps {
  userProfile: UserProfile;
  achievements: Achievement[];
  onUpdateName: (newName: string) => void;
  onOpenPlusModal: () => void;
  onViewCertificate: (cert: Certificate) => void;
  setActiveTab: (tab: string) => void;
}

export default function ProfileTab({
  userProfile,
  achievements,
  onUpdateName,
  onOpenPlusModal,
  onViewCertificate,
  setActiveTab
}: ProfileTabProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(userProfile.name);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  const handleSaveName = () => {
    if (tempName.trim()) {
      onUpdateName(tempName.trim());
      setIsEditingName(false);
    }
  };

  return (
    <div id="profile-tab" className="flex flex-col h-full bg-slate-950 text-slate-100 overflow-y-auto pb-20 p-4 space-y-4 custom-scrollbar">
      {/* Header Profile Info card */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-blue-950/40 border border-slate-800 flex items-center gap-4 relative overflow-hidden">
        {/* Abstract decorative circuit background */}
        <div className="absolute right-0 top-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl pointer-events-none" />

        {/* Avatar block */}
        <div className="relative shrink-0">
          <img
            id="user-profile-avatar-img"
            src={userProfile.avatarUrl}
            alt="Seu Avatar"
            className={`w-14 h-14 rounded-2xl object-cover border-2 ${
              userProfile.isPlus ? "border-cyan-400 ring-2 ring-cyan-400/30" : "border-slate-700"
            }`}
          />
          {userProfile.isPlus && (
            <span className="absolute -bottom-1 -right-1 p-0.5 bg-cyan-400 text-slate-950 rounded-lg text-[8px] font-black">
              PLUS
            </span>
          )}
        </div>

        {/* Stats details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {isEditingName ? (
              <div className="flex items-center gap-1 w-full">
                <input
                  id="profile-name-edit-input"
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="bg-slate-950 text-xs border border-slate-700 rounded px-1.5 py-0.5 text-white w-2/3 outline-none"
                />
                <button
                  id="profile-name-save-btn"
                  onClick={handleSaveName}
                  className="p-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded"
                >
                  <Check size={10} strokeWidth={3} />
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-sm font-extrabold text-white truncate">{userProfile.name}</h2>
                <button
                  id="profile-name-edit-toggle-btn"
                  onClick={() => setIsEditingName(true)}
                  className="text-slate-400 hover:text-white"
                >
                  <Edit2 size={10} />
                </button>
              </>
            )}
          </div>

          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-[10px] text-cyan-400 font-mono font-bold bg-cyan-950/80 px-2 py-0.5 rounded">
              {userProfile.xp} XP acumulados
            </span>
            <span className="text-[10px] text-slate-500 font-medium">Level 3</span>
          </div>
        </div>
      </div>

      {/* Sustainable subscription trigger (if not Plus yet) */}
      {!userProfile.isPlus && (
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-500/20 flex items-center justify-between gap-3">
          <div className="space-y-0.5">
            <span className="text-[9px] font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1">
              <Sparkles size={10} /> CLS Sustentabilidade
            </span>
            <h3 className="text-xs font-bold text-white">Ajude a manter as aulas grátis</h3>
            <p className="text-[10px] text-slate-400">Remova anúncios e baixe cursos sem limites por R$ 9,90/mês.</p>
          </div>
          <button
            id="profile-plus-subscribe-btn"
            onClick={onOpenPlusModal}
            className="px-3 py-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-[10px] rounded-xl shrink-0 transition-all shadow-md shadow-cyan-400/10 cursor-pointer"
          >
            Seja Plus
          </button>
        </div>
      )}

      {/* Certificates Section */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Award size={14} className="text-emerald-400" /> Meus Certificados ({userProfile.certificates.length})
        </h3>

        {userProfile.certificates.length === 0 ? (
          <div className="p-6 text-center border border-slate-850 bg-slate-900/20 rounded-2xl">
            <FileText size={20} className="mx-auto text-slate-600 mb-1" />
            <p className="text-xs font-semibold text-slate-400">Nenhum certificado emitido</p>
            <p className="text-[10px] text-slate-500">Conclua 100% de uma trilha e passe na avaliação final para emiti-lo gratuitamente!</p>
            <button
              onClick={() => setActiveTab("explorar")}
              className="mt-3 px-3 py-1 bg-slate-850 hover:bg-slate-800 text-[10px] text-cyan-400 rounded-lg transition-colors cursor-pointer"
            >
              Iniciar uma Trilha
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {userProfile.certificates.map((cert) => (
              <div
                id={`cert-item-${cert.id}`}
                key={cert.id}
                onClick={() => onViewCertificate(cert)}
                className="p-3 bg-slate-900 border border-slate-850 hover:border-emerald-500/20 rounded-xl flex items-center justify-between gap-3 cursor-pointer group transition-all"
              >
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-white truncate group-hover:text-emerald-400 transition-colors">
                    {cert.courseTitle}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[9px] text-emerald-400 bg-emerald-950/40 px-1.5 py-0.2 rounded font-mono">
                      {cert.verificationCode}
                    </span>
                    <span className="text-[9px] text-slate-500">Emitido em {cert.issueDate}</span>
                  </div>
                </div>

                <ChevronRight size={16} className="text-slate-500 group-hover:text-white transition-colors" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Badges / Achievements section */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Trophy size={14} className="text-amber-400" /> Medalhas & Conquistas
        </h3>

        <div className="grid grid-cols-5 gap-2">
          {achievements.map((ach) => {
            return (
              <div
                id={`badge-item-${ach.id}`}
                key={ach.id}
                onClick={() => setSelectedAchievement(ach)}
                className={`p-2 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition-all border ${
                  ach.unlocked 
                    ? "bg-slate-900 border-amber-500/20 hover:border-amber-400/40" 
                    : "bg-slate-950/40 border-slate-900 opacity-60 hover:opacity-100"
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-1.5 ${
                  ach.unlocked 
                    ? "bg-amber-500/10 text-amber-500 shadow-inner" 
                    : "bg-slate-900 text-slate-600"
                }`}>
                  <Trophy size={20} className={ach.unlocked ? "fill-amber-500/10" : ""} />
                </div>
                <span className="text-[8px] text-slate-300 font-bold leading-tight line-clamp-1 w-full">
                  {ach.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievement Detail Overlay Modal */}
      <AnimatePresence>
        {selectedAchievement && (
          <div id="achievement-modal-backdrop" className="absolute inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              id="achievement-modal-box"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xs bg-slate-900 border border-slate-800 rounded-2xl p-4 text-center space-y-3 shadow-xl"
            >
              <div className={`mx-auto w-12 h-12 rounded-xl flex items-center justify-center ${
                selectedAchievement.unlocked ? "bg-amber-500/10 text-amber-500" : "bg-slate-950 text-slate-700"
              }`}>
                <Trophy size={28} />
              </div>

              <div>
                <h4 className="text-sm font-bold text-white">{selectedAchievement.title}</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{selectedAchievement.description}</p>
              </div>

              <div className="space-y-1.5 pt-1.5 border-t border-slate-800">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-500">Progresso</span>
                  <span className={selectedAchievement.unlocked ? "text-amber-500 font-bold" : "text-slate-300"}>
                    {selectedAchievement.progress}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${selectedAchievement.unlocked ? "bg-amber-500" : "bg-slate-700"}`}
                    style={{ width: `${selectedAchievement.progress}%` }}
                  />
                </div>
                {selectedAchievement.unlocked && selectedAchievement.unlockedAt && (
                  <span className="text-[9px] text-amber-500 font-medium block">Desbloqueado {selectedAchievement.unlockedAt}!</span>
                )}
              </div>

              <button
                id="close-achievement-modal-btn"
                onClick={() => setSelectedAchievement(null)}
                className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-xs text-white font-semibold rounded-lg cursor-pointer"
              >
                Fechar
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
