import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Users, Trophy, Flame, MessageSquare, Heart, Send, Sparkles, Check, CheckCircle2,
  ChevronRight, Smile, Megaphone, HelpCircle
} from "lucide-react";
import { LeaderboardUser, Post, UserProfile } from "../types";

interface CommunityTabProps {
  userProfile: UserProfile;
  leaderboard: LeaderboardUser[];
  posts: Post[];
  onLikePost: (postId: string) => void;
  onAddPost: (content: string, courseTag?: string) => void;
  onAddComment: (postId: string, commentContent: string) => void;
  onCheerFriend: (friendName: string) => void;
}

export default function CommunityTab({
  userProfile,
  leaderboard,
  posts,
  onLikePost,
  onAddPost,
  onAddComment,
  onCheerFriend
}: CommunityTabProps) {
  const [activeSubTab, setActiveSubTab] = useState<"ranking" | "feed">("ranking");
  
  // Create Post States
  const [newPostContent, setNewPostContent] = useState("");
  const [selectedTag, setSelectedTag] = useState("Geral");
  
  // Comment States (postId -> current typing input)
  const [typingComments, setTypingComments] = useState<{ [postId: string]: string }>({});
  const [expandedComments, setExpandedComments] = useState<{ [postId: string]: boolean }>({});

  const tags = ["Geral", "Tecnologia", "Negócios", "Marketing", "Dúvidas"];

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    onAddPost(newPostContent.trim(), selectedTag === "Geral" ? undefined : selectedTag);
    setNewPostContent("");
  };

  const handlePostComment = (postId: string) => {
    const commentText = typingComments[postId] || "";
    if (!commentText.trim()) return;

    onAddComment(postId, commentText.trim());
    setTypingComments(prev => ({ ...prev, [postId]: "" }));
  };

  return (
    <div id="community-tab" className="flex flex-col h-full bg-slate-950 text-slate-100 overflow-y-auto pb-20 p-4 space-y-4 custom-scrollbar">
      {/* Tab toggle buttons */}
      <div className="grid grid-cols-2 gap-1 bg-slate-900 p-1 rounded-xl shrink-0">
        <button
          id="com-subtab-ranking-btn"
          onClick={() => setActiveSubTab("ranking")}
          className={`py-1.5 text-xs font-bold rounded-lg text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeSubTab === "ranking" 
              ? "bg-slate-800 text-cyan-400 shadow-sm" 
              : "text-slate-500 hover:text-slate-300"
          }`}
        >
          <Trophy size={14} /> Ranking Semanal
        </button>
        <button
          id="com-subtab-feed-btn"
          onClick={() => setActiveSubTab("feed")}
          className={`py-1.5 text-xs font-bold rounded-lg text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeSubTab === "feed" 
              ? "bg-slate-800 text-cyan-400 shadow-sm" 
              : "text-slate-500 hover:text-slate-300"
          }`}
        >
          <MessageSquare size={14} /> Mural de Alunos
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeSubTab === "ranking" ? (
          /* WEEKLY leaderboard RANKING VIEW */
          <motion.div
            key="ranking-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Amigos & Colegas</span>
              <span className="text-[9px] text-cyan-400 font-medium bg-cyan-950/40 px-1.5 py-0.5 rounded">Reinicia em 3 dias</span>
            </div>

            {/* Leaderboard list container */}
            <div className="space-y-2">
              {leaderboard.map((user, index) => {
                const isUser = user.isCurrentUser;
                // Compute placement icon or color
                const placementColor = 
                  index === 0 ? "border-amber-500 text-amber-400 font-extrabold" : 
                  index === 1 ? "border-slate-300 text-slate-300 font-extrabold" : 
                  index === 2 ? "border-amber-700 text-amber-700 font-extrabold" : 
                  "border-slate-800 text-slate-500";

                return (
                  <div
                    id={`leaderboard-user-${user.id}`}
                    key={user.id}
                    className={`p-3 rounded-2xl flex items-center justify-between gap-3 border transition-all ${
                      isUser 
                        ? "bg-gradient-to-r from-cyan-950/20 to-slate-900 border-cyan-500/35 shadow-md shadow-cyan-500/5" 
                        : "bg-slate-900 border-slate-850"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Numeric position badge */}
                      <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-[10px] shrink-0 ${placementColor}`}>
                        {index + 1}
                      </span>

                      {/* Avatar */}
                      <div className="relative shrink-0">
                        <img
                          src={isUser ? userProfile.avatarUrl : user.avatarUrl}
                          alt={user.name}
                          className={`w-9 h-9 rounded-xl object-cover border ${
                            isUser 
                              ? "border-cyan-400" 
                              : userProfile.isPlus && index === 0 
                                ? "border-cyan-400" 
                                : "border-slate-800"
                          }`}
                        />
                        {isUser && userProfile.isPlus && (
                          <span className="absolute -top-1 -right-1 bg-cyan-400 text-slate-950 p-0.5 rounded-sm text-[6px] font-black">
                            PLUS
                          </span>
                        )}
                      </div>

                      <div className="min-w-0">
                        <h4 className={`text-xs font-bold truncate ${isUser ? "text-cyan-400" : "text-white"}`}>
                          {isUser ? userProfile.name : user.name}
                        </h4>
                        
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                          <span className="flex items-center gap-0.5 font-mono text-cyan-400">
                            <strong>{isUser ? userProfile.xp : user.xp}</strong> XP
                          </span>
                          <span className="text-slate-700">•</span>
                          <span className="flex items-center gap-0.5 font-mono text-amber-500">
                            <Flame size={10} /> {isUser ? userProfile.streak : user.streak}d
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Interaction Button */}
                    {!isUser ? (
                      <button
                        id={`cheer-${user.id}-btn`}
                        onClick={() => onCheerFriend(user.name)}
                        className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-[9px] rounded-lg transition-colors flex items-center gap-0.5 cursor-pointer active:scale-95"
                      >
                        <Smile size={10} /> Incentivar
                      </button>
                    ) : (
                      <span className="text-[9px] text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded font-black uppercase tracking-wider">
                        Você
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          /* MURAL / SOCIAL DISCUSSION FEED VIEW */
          <motion.div
            key="feed-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {/* Create Post Form */}
            <form onSubmit={handleCreatePost} className="p-3 bg-slate-900 rounded-2xl border border-slate-850 space-y-3">
              <div className="flex items-start gap-2.5">
                <img
                  src={userProfile.avatarUrl}
                  alt="Avatar"
                  className="w-8 h-8 rounded-lg object-cover border border-slate-800"
                />
                <textarea
                  id="community-post-textarea"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="Compartilhe suas conquistas ou tire dúvidas..."
                  className="flex-1 bg-slate-950 text-slate-100 rounded-xl p-2 text-xs border border-slate-800 focus:outline-none focus:border-cyan-500/40 resize-none h-14 font-sans"
                />
              </div>

              <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-850">
                <div className="flex gap-1 overflow-x-auto max-w-[170px] no-scrollbar">
                  {tags.map(t => {
                    const isSelected = selectedTag === t;
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setSelectedTag(t)}
                        className={`px-2 py-0.5 rounded text-[8px] font-bold shrink-0 transition-colors cursor-pointer ${
                          isSelected ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" : "bg-slate-950 text-slate-500"
                        }`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>

                <button
                  id="submit-community-post-btn"
                  type="submit"
                  disabled={!newPostContent.trim()}
                  className="px-3 py-1 bg-cyan-400 disabled:bg-slate-800 text-slate-950 disabled:text-slate-500 font-bold text-[10px] rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Send size={10} /> Publicar
                </button>
              </div>
            </form>

            {/* List of Mural Posts */}
            <div className="space-y-3.5">
              {posts.map((post) => {
                const isTyping = typingComments[post.id] || "";
                
                return (
                  <div
                    id={`post-card-${post.id}`}
                    key={post.id}
                    className="p-3 bg-slate-900 border border-slate-850 rounded-2xl space-y-3.5"
                  >
                    {/* Post Author Info */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={post.authorAvatar}
                          alt={post.authorName}
                          className="w-8 h-8 rounded-lg object-cover border border-slate-800"
                        />
                        <div>
                          <div className="flex items-center gap-1">
                            <h4 className="text-xs font-bold text-white">{post.authorName}</h4>
                            {post.authorBadge && (
                              <span className="px-1 text-[7px] font-bold text-cyan-400 bg-cyan-950 rounded uppercase">
                                {post.authorBadge}
                              </span>
                            )}
                          </div>
                          <span className="text-[9px] text-slate-500 font-medium">{post.timeAgo}</span>
                        </div>
                      </div>

                      {post.courseTag && (
                        <span className="px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider bg-slate-950 text-slate-400 rounded">
                          {post.courseTag}
                        </span>
                      )}
                    </div>

                    {/* Post Content Body */}
                    <p className="text-[11px] text-slate-300 leading-relaxed font-sans">{post.content}</p>

                    {/* Likes & Comments Action counters */}
                    <div className="flex items-center gap-4 text-[10px] text-slate-400 pt-1 border-t border-slate-850">
                      <button
                        id={`like-post-${post.id}-btn`}
                        onClick={() => onLikePost(post.id)}
                        className={`flex items-center gap-1 hover:text-white transition-colors cursor-pointer ${
                          post.hasLiked ? "text-rose-500 hover:text-rose-400 font-bold" : ""
                        }`}
                      >
                        <Heart size={12} className={post.hasLiked ? "fill-current" : ""} />
                        <span>{post.likes}</span>
                      </button>

                      <button
                        id={`toggle-comments-${post.id}-btn`}
                        onClick={() => setExpandedComments(prev => ({ ...prev, [post.id]: !prev[post.id] }))}
                        className="flex items-center gap-1 hover:text-white transition-colors"
                      >
                        <MessageSquare size={12} />
                        <span>Ver Respostas</span>
                      </button>
                    </div>

                    {/* Expandable comments zone */}
                    {expandedComments[post.id] && (
                      <div className="pt-2 border-t border-slate-850/50 space-y-2.5">
                        <div className="space-y-1.5 bg-slate-950/40 p-2 rounded-xl border border-slate-950">
                          <div className="flex items-center justify-between">
                            <span className="text-[8px] font-bold uppercase text-slate-500">Comentários</span>
                          </div>
                          {/* Simulated single nested comment */}
                          <div className="text-[10px] space-y-1">
                            <span className="text-cyan-400 font-semibold">Suporte CLS</span>
                            <p className="text-slate-400">Arrasou demais! É isso que nos move a deixar tudo de graça! ❤️</p>
                          </div>
                        </div>

                        {/* Comment typing form */}
                        <div className="flex items-center gap-2">
                          <input
                            id={`comment-input-${post.id}`}
                            type="text"
                            value={isTyping}
                            onChange={(e) => setTypingComments(prev => ({ ...prev, [post.id]: e.target.value }))}
                            placeholder="Escreva uma resposta de apoio..."
                            className="flex-1 bg-slate-950 border border-slate-800 rounded-lg p-1.5 text-[10px] text-slate-200 focus:outline-none focus:border-cyan-500/40 font-sans"
                          />
                          <button
                            id={`send-comment-${post.id}-btn`}
                            onClick={() => handlePostComment(post.id)}
                            className="p-1.5 bg-cyan-500 text-slate-950 rounded-lg transition-transform active:scale-95 cursor-pointer"
                          >
                            <Send size={10} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
