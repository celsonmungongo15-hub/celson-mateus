import { motion, AnimatePresence } from "motion/react";
import { Check, ShieldCheck, Sparkles, X, Heart } from "lucide-react";

interface PlusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: () => void;
}

export default function PlusModal({ isOpen, onClose, onSubscribe }: PlusModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div id="plus-modal-backdrop" className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <motion.div
            id="plus-modal-container"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-sm overflow-hidden border bg-slate-900 border-cyan-500/30 rounded-2xl shadow-xl shadow-cyan-500/10"
          >
            {/* Header Gradient */}
            <div className="relative p-6 bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border-b border-cyan-500/10">
              <button
                id="close-plus-modal-btn"
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 transition-colors rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X size={16} />
              </button>
              
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase bg-cyan-500 text-slate-950 rounded-full flex items-center gap-1">
                  <Sparkles size={10} /> PLUS
                </span>
                <span className="text-xs text-cyan-300 font-medium">Sustentabilidade</span>
              </div>
              
              <h3 className="text-xl font-bold tracking-tight text-white font-sans">
                CLS.com Premium
              </h3>
              <p className="mt-1 text-xs text-slate-300">
                Apoie nossa missão democrática e turbine sua rotina de estudos.
              </p>
            </div>

            {/* Content list */}
            <div className="p-6 space-y-4">
              <p className="text-xs text-slate-400 leading-relaxed">
                Nossos cursos são <strong className="text-cyan-400">100% gratuitos</strong> financiados por marcas parceiras. Ao assinar o Plus, você acelera nossa missão e garante benefícios exclusivos:
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="p-1 mt-0.5 bg-cyan-500/10 text-cyan-400 rounded-full">
                    <Check size={12} />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">Zero Anúncios</h4>
                    <p className="text-[11px] text-slate-400">Navegação contínua sem interrupções entre módulos.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 mt-0.5 bg-cyan-500/10 text-cyan-400 rounded-full">
                    <Check size={12} />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">Downloads Ilimitados</h4>
                    <p className="text-[11px] text-slate-400">Guarde quantos cursos quiser para estudar totalmente offline.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 mt-0.5 bg-cyan-500/10 text-cyan-400 rounded-full">
                    <Check size={12} />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">Selo de Apoiador</h4>
                    <p className="text-[11px] text-slate-400">Destaque neon especial no seu avatar no Ranking e Comunidade.</p>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="p-3 border rounded-lg bg-slate-950/50 border-cyan-500/20 text-center">
                <span className="text-xs text-slate-400 block line-through">R$ 19,90/mês</span>
                <div className="flex items-baseline justify-center gap-1 mt-0.5">
                  <span className="text-2xl font-bold text-white">R$ 9,90</span>
                  <span className="text-xs text-slate-400">/mês</span>
                </div>
                <span className="text-[9px] text-cyan-400 font-medium block mt-1 tracking-wider uppercase">
                  ⚡ Preço Promocional de Lançamento
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 pt-0 space-y-2">
              <button
                id="subscribe-confirm-btn"
                onClick={onSubscribe}
                className="w-full py-2.5 px-4 font-semibold text-xs text-center text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-cyan-400/20 active:scale-95 cursor-pointer"
              >
                <Heart size={14} className="fill-slate-950" /> Assinar por R$ 9,90/mês
              </button>
              
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500">
                <ShieldCheck size={12} /> Compra segura • Cancele quando quiser
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
