import React, { useEffect, useState, useRef } from "react";
import { Plus, Trash2, Edit, X, Eye, EyeOff, Terminal, Calendar, Code, Link2, Loader2, CheckCircle2, AlertTriangle, HelpCircle, AlertCircle, GripVertical, ArrowUpDown } from "lucide-react";
import { api } from "../../../server/api";
import type { Project } from "../../types/project";

const ProjectManager = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isSavingOrder, setIsSavingOrder] = useState(false);

  // Drag-and-drop state
  const dragIndexRef = useRef<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // Styled Dialog & Toast States
  const [submitLoading, setSubmitLoading] = useState(false);
  const [toasts, setToasts] = useState<{ id: string; type: "success" | "error" | "warning"; text: string }[]>([]);
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    loading?: boolean;
  }>({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });

  const showToast = (text: string, type: "success" | "error" | "warning" = "success") => {
    const id = Math.random().toString();
    setToasts((prev) => [...prev, { id, type, text }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const [formData, setFormData] = useState<Project>({
    id: "",
    title: "",
    description: "",
    image: "",
    tags: [],
    liveDemo: "",
    sourceCode: "",
    isVisible: true,
    titleEn: "",
    descriptionEn: "",
    startDate: "",
    endDate: "",
  });

  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const result = await api.getProjects();
      setProjects(result);
    } catch (err) {
      console.error("Lỗi tải danh sách dự án:", err);
    }
  };

  // ── Drag & Drop handlers ──────────────────────────────────────────────
  const handleDragStart = (index: number) => {
    dragIndexRef.current = index;
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDrop = async (dropIndex: number) => {
    const fromIndex = dragIndexRef.current;
    if (fromIndex === null || fromIndex === dropIndex) {
      dragIndexRef.current = null;
      setDragOverIndex(null);
      return;
    }

    // Reorder local list
    const reordered = [...projects];
    const [moved] = reordered.splice(fromIndex, 1);
    reordered.splice(dropIndex, 0, moved);
    setProjects(reordered);
    dragIndexRef.current = null;
    setDragOverIndex(null);

    // Persist order to backend
    setIsSavingOrder(true);
    try {
      const orderPayload = reordered.map((p, i) => ({ id: p.id, sort_order: i }));
      const ok = await api.reorderProjects(orderPayload);
      if (ok) {
        showToast("Đã lưu thứ tự dự án!", "success");
      } else {
        showToast("Không thể lưu thứ tự. Thử lại!", "error");
        loadProjects(); // revert
      }
    } finally {
      setIsSavingOrder(false);
    }
  };

  const handleDragEnd = () => {
    dragIndexRef.current = null;
    setDragOverIndex(null);
  };

  const handleAddNew = () => {
    setEditingProject(null);
    setFormData({
      id: "",
      title: "",
      description: "",
      image: "https://picsum.photos/seed/new/600/400",
      tags: [],
      liveDemo: "",
      sourceCode: "",
      isVisible: true,
      titleEn: "",
      descriptionEn: "",
      startDate: "",
      endDate: "Present",
    });
    setIsModalOpen(true);
  };

  const handleEdit = (p: Project) => {
    setEditingProject(p);
    setFormData({
      ...p,
      startDate: p.startDate || "",
      endDate: p.endDate || "Present",
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setConfirmDialog({
      isOpen: true,
      title: "XÁC NHẬN XÓA DỰ ÁN",
      message: "Hành động này không thể hoàn tác. Bạn có chắc chắn muốn xóa vĩnh viễn dự án này khỏi hệ thống?",
      onConfirm: async () => {
        setConfirmDialog((prev) => ({ ...prev, loading: true }));
        try {
          const result = await api.deleteProject(id);
          if (result) {
            loadProjects();
            showToast("Đã xóa dự án thành công!", "success");
          } else {
            showToast("Không thể hoàn tất yêu cầu xóa dự án!", "error");
          }
        } catch (err) {
          console.error("Lỗi xóa dự án:", err);
          showToast("Lỗi kết nối máy chủ!", "error");
        } finally {
          setConfirmDialog({
            isOpen: false,
            title: "",
            message: "",
            onConfirm: () => {},
          });
        }
      },
    });
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);
    try {
      let result;
      if (editingProject) {
        result = await api.updateProject(formData);
      } else {
        result = await api.createProject(formData);
      }

      if (result) {
        loadProjects();
        setIsModalOpen(false);
        showToast(editingProject ? "Cập nhật dự án thành công!" : "Thêm dự án mới thành công!", "success");
      } else {
        showToast("Có lỗi xảy ra trong quá trình lưu thông tin!", "error");
      }
    } catch (err) {
      console.error("Lỗi lưu dự án:", err);
      showToast("Lỗi kết nối máy chủ!", "error");
    } finally {
      setSubmitLoading(false);
    }
  };

  const toggleVisibility = async (p: Project) => {
    try {
      const updated = { ...p, isVisible: !p.isVisible };
      const result = await api.updateProject(updated);
      if (result) {
        loadProjects();
        showToast(updated.isVisible ? "Đã hiển thị dự án công khai!" : "Đã tạm ẩn hiển thị dự án!", "success");
      }
    } catch (err) {
      console.error("Lỗi cập nhật hiển thị dự án:", err);
      showToast("Lỗi kết nối máy chủ!", "error");
    }
  };

  const addTag = () => {
    if (!tagInput.trim()) return;
    setFormData({
      ...formData,
      tags: [...formData.tags, tagInput.trim()],
    });
    setTagInput("");
  };

  const removeTag = (i: number) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((_, idx) => idx !== i),
    });
  };

  return (
    <div className="space-y-6 select-none">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-zinc-800/80">
        <div>
          <span className="font-mono text-[10px] sm:text-xs text-blue-600 dark:text-blue-500 uppercase tracking-widest font-bold block mb-1">
            PROJECT MANAGER MODULE
          </span>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-800 dark:text-white">
            QUẢN LÝ DỰ ÁN
          </h2>
        </div>

        <div className="flex items-center gap-3">
          {isSavingOrder && (
            <span className="flex items-center gap-1.5 font-mono text-[10px] text-blue-600 dark:text-blue-400 uppercase">
              <Loader2 className="w-3 h-3 animate-spin" /> Đang lưu thứ tự...
            </span>
          )}
          <span className="hidden sm:flex items-center gap-1.5 font-mono text-[10px] text-slate-400 dark:text-zinc-500 uppercase">
            <ArrowUpDown className="w-3 h-3" /> Kéo để sắp xếp
          </span>
          <button
            onClick={handleAddNew}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-mono text-xs uppercase tracking-wider font-bold transition-all duration-300 flex items-center justify-center gap-2 rounded-none border border-blue-500/50 shadow-sm hover:shadow-md"
          >
            <Plus className="w-4 h-4" /> Thêm dự án mới
          </button>
        </div>
      </div>

      {/* Cyber Grid Table */}
      <div className="bg-white/70 dark:bg-zinc-950/45 backdrop-blur-md border border-slate-200 dark:border-zinc-800 rounded-none overflow-hidden relative shadow-sm dark:shadow-none">
        {/* Corner blueprint lines */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-slate-400 dark:border-zinc-700" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-slate-400 dark:border-zinc-700" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-slate-400 dark:border-zinc-700" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-slate-400 dark:border-zinc-700" />

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/40">
                <th className="px-3 py-4 w-10"></th>
                <th className="px-6 py-4 font-mono text-[10px] sm:text-xs uppercase text-slate-500 dark:text-zinc-400 tracking-wider">Tên dự án</th>
                <th className="px-6 py-4 font-mono text-[10px] sm:text-xs uppercase text-slate-500 dark:text-zinc-400 tracking-wider">Thời gian</th>
                <th className="px-6 py-4 font-mono text-[10px] sm:text-xs uppercase text-slate-500 dark:text-zinc-400 tracking-wider">Trạng thái</th>
                <th className="px-6 py-4 font-mono text-[10px] sm:text-xs uppercase text-slate-500 dark:text-zinc-400 tracking-wider text-right">Thao tác</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-zinc-900 font-sans">
              {projects.map((p, index) => (
                <tr
                  key={p.id}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDrop={() => handleDrop(index)}
                  onDragEnd={handleDragEnd}
                  className={`hover:bg-slate-50/50 dark:hover:bg-zinc-900/30 transition-colors group cursor-default
                    ${dragOverIndex === index && dragIndexRef.current !== index
                      ? "border-t-2 border-blue-500"
                      : ""
                    }
                    ${dragIndexRef.current === index ? "opacity-40" : "opacity-100"}
                  `}
                >
                  {/* Drag handle */}
                  <td className="px-3 py-4 w-10">
                    <div className="cursor-grab active:cursor-grabbing text-slate-300 dark:text-zinc-700 hover:text-slate-500 dark:hover:text-zinc-400 transition-colors flex justify-center">
                      <GripVertical className="w-4 h-4" />
                    </div>
                  </td>
                  {/* Title & tags */}
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {p.title}
                    </div>
                    {p.titleEn && (
                      <div className="text-xs text-slate-400 dark:text-zinc-500 font-mono mt-0.5">{p.titleEn}</div>
                    )}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {p.tags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 font-mono text-[9px] text-slate-500 dark:text-zinc-400 uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Start / End Date */}
                  <td className="px-6 py-4 font-mono text-xs text-slate-700 dark:text-zinc-350">
                    {p.startDate ? (
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500" />
                        <span className="inline-flex items-center gap-1">
                          <span>{p.startDate.split("-").reverse().join("/")}</span>
                          <span className="opacity-60 mx-0.5">—</span>
                          <span>
                            {p.endDate === "Present" ? (
                              <span className="text-base font-extrabold leading-none inline-block align-middle font-sans text-blue-500 dark:text-blue-400">∞</span>
                            ) : (
                              p.endDate?.split("-").reverse().join("/") || (
                                <span className="text-base font-extrabold leading-none inline-block align-middle font-sans text-blue-500 dark:text-blue-400">∞</span>
                              )
                            )}
                          </span>
                        </span>
                      </div>
                    ) : (
                      <span className="text-slate-400 dark:text-zinc-650">// N/A</span>
                    )}
                  </td>

                  {/* Public visibility toggle */}
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleVisibility(p)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 font-mono text-[10px] uppercase tracking-wider font-bold transition-all duration-300 border ${
                        p.isVisible
                          ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20 hover:border-emerald-500 dark:hover:border-emerald-400/50"
                          : "bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/20 hover:border-red-500 dark:hover:border-red-400/50"
                      }`}
                    >
                      {p.isVisible ? (
                        <>
                          <Eye className="w-3 h-3" /> Hiển thị
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3 h-3" /> Đã ẩn
                        </>
                      )}
                    </button>
                  </td>

                  {/* Actions (Edit / Delete) */}
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex gap-2">
                      <button
                        onClick={() => handleEdit(p)}
                        className="p-2 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 hover:bg-blue-50 dark:hover:bg-blue-950/20 hover:border-blue-500/50 text-slate-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
                        title="Sửa thông tin"
                      >
                        <Edit className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-2 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 hover:bg-red-50 dark:hover:bg-red-950/20 hover:border-red-500/50 text-slate-500 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 transition-all duration-300"
                        title="Xóa dự án"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {projects.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-10 font-mono text-slate-400 dark:text-zinc-500">
                    // Không tìm thấy dữ liệu dự án trên máy chủ.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cyber Blueprint Edit / Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 dark:bg-black/85 flex items-center justify-center z-50 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white dark:bg-[#09090b]/95 border border-slate-200 dark:border-zinc-800 w-full max-w-2xl relative rounded-none shadow-2xl flex flex-col max-h-[90vh]">
            
            {/* Modal Tech Brackets */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-blue-650" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-blue-650" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-blue-650" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-blue-650" />

            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-slate-200 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-blue-600 dark:text-blue-500" />
                <h3 className="font-mono text-sm uppercase tracking-wider font-extrabold text-slate-800 dark:text-white">
                  {editingProject ? "CẬP NHẬT DỰ ÁN" : "TẠO DỰ ÁN MỚI"}
                </h3>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-450 hover:text-slate-700 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={submitForm} className="p-6 space-y-5 overflow-y-auto flex-1 font-mono text-xs">
              
              {/* Form public visibility toggle */}
              <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-zinc-950 border border-slate-150 dark:border-zinc-900">
                <label className="flex items-center cursor-pointer gap-3 select-none">
                  <input
                    type="checkbox"
                    checked={formData.isVisible}
                    onChange={(e) =>
                      setFormData({ ...formData, isVisible: e.target.checked })
                    }
                    className="w-4 h-4 bg-slate-100 dark:bg-zinc-900 border-slate-200 dark:border-zinc-850 text-blue-655 focus:ring-0 focus:ring-offset-0 rounded-none cursor-pointer"
                  />
                  <span className="text-slate-700 dark:text-zinc-300 font-bold uppercase tracking-wider">CÔNG KHAI DỰ ÁN TRÊN PORTFOLIO</span>
                </label>
              </div>

              {/* Vietnamese Title */}
              <div className="space-y-1.5">
                <label className="block text-slate-500 dark:text-zinc-500 uppercase tracking-wider">Tên dự án (Tiếng Việt) *</label>
                <input
                  required
                  placeholder="Nhập tên dự án..."
                  className="w-full px-3 py-2.5 border border-slate-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950 text-slate-900 dark:text-white rounded-none focus:border-blue-500 dark:focus:border-cyan-500 focus:ring-1 focus:ring-blue-500/20 dark:focus:ring-cyan-500/20 outline-none transition-all duration-300"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              {/* English Title */}
              <div className="space-y-1.5">
                <label className="block text-slate-500 dark:text-zinc-500 uppercase tracking-wider">Tên dự án (Tiếng Anh)</label>
                <input
                  placeholder="Enter project name in English..."
                  className="w-full px-3 py-2.5 border border-slate-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950 text-slate-900 dark:text-white rounded-none focus:border-blue-500 dark:focus:border-cyan-500 focus:ring-1 focus:ring-blue-500/20 dark:focus:ring-cyan-500/20 outline-none transition-all duration-300"
                  value={formData.titleEn || ""}
                  onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                />
              </div>

              {/* Vietnamese Description */}
              <div className="space-y-1.5">
                <label className="block text-slate-500 dark:text-zinc-500 uppercase tracking-wider">Mô tả dự án (Tiếng Việt) *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Nhập chi tiết mô tả dự án..."
                  className="w-full px-3 py-2.5 border border-slate-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950 text-slate-900 dark:text-white rounded-none focus:border-blue-500 dark:focus:border-cyan-500 focus:ring-1 focus:ring-blue-500/20 dark:focus:ring-cyan-500/20 outline-none transition-all duration-300 resize-none"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>

              {/* English Description */}
              <div className="space-y-1.5">
                <label className="block text-slate-500 dark:text-zinc-500 uppercase tracking-wider">Mô tả dự án (Tiếng Anh)</label>
                <textarea
                  rows={3}
                  placeholder="Enter project description in English..."
                  className="w-full px-3 py-2.5 border border-slate-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950 text-slate-900 dark:text-white rounded-none focus:border-blue-500 dark:focus:border-cyan-500 focus:ring-1 focus:ring-blue-500/20 dark:focus:ring-cyan-500/20 outline-none transition-all duration-300 resize-none"
                  value={formData.descriptionEn || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, descriptionEn: e.target.value })
                  }
                />
              </div>

              {/* Links Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Image Link */}
                <div className="space-y-1.5">
                  <label className="block text-slate-500 dark:text-zinc-500 uppercase tracking-wider">URL Hình ảnh dự án *</label>
                  <div className="relative">
                    <input
                      required
                      placeholder="https://..."
                      className="w-full pl-9 pr-3 py-2.5 border border-slate-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950 text-slate-900 dark:text-white rounded-none focus:border-blue-500 dark:focus:border-cyan-500 focus:ring-1 focus:ring-blue-500/20 dark:focus:ring-cyan-500/20 outline-none transition-all duration-300"
                      value={formData.image}
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.value })
                      }
                    />
                    <Link2 className="absolute left-3 top-3 w-4 h-4 text-slate-400 dark:text-zinc-600" />
                  </div>
                </div>

                {/* Demo URL */}
                <div className="space-y-1.5">
                  <label className="block text-slate-500 dark:text-zinc-500 uppercase tracking-wider">URL Demo (Live Demo)</label>
                  <div className="relative">
                    <input
                      placeholder="https://..."
                      className="w-full pl-9 pr-3 py-2.5 border border-slate-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950 text-slate-900 dark:text-white rounded-none focus:border-blue-500 dark:focus:border-cyan-500 focus:ring-1 focus:ring-blue-500/20 dark:focus:ring-cyan-500/20 outline-none transition-all duration-300"
                      value={formData.liveDemo}
                      onChange={(e) =>
                        setFormData({ ...formData, liveDemo: e.target.value })
                      }
                    />
                    <Link2 className="absolute left-3 top-3 w-4 h-4 text-slate-400 dark:text-zinc-600" />
                  </div>
                </div>
              </div>

              {/* Source Code */}
              <div className="space-y-1.5">
                <label className="block text-slate-500 dark:text-zinc-500 uppercase tracking-wider">URL Mã nguồn (Source Code GitHub)</label>
                <div className="relative">
                  <input
                    placeholder="https://github.com/..."
                    className="w-full pl-9 pr-3 py-2.5 border border-slate-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950 text-slate-900 dark:text-white rounded-none focus:border-blue-500 dark:focus:border-cyan-500 focus:ring-1 focus:ring-blue-500/20 dark:focus:ring-cyan-500/20 outline-none transition-all duration-300"
                    value={formData.sourceCode}
                    onChange={(e) =>
                      setFormData({ ...formData, sourceCode: e.target.value })
                    }
                  />
                  <Code className="absolute left-3 top-3 w-4 h-4 text-slate-400 dark:text-zinc-600" />
                </div>
              </div>

              {/* Project duration settings */}
              <div className="border-t border-slate-200 dark:border-zinc-800/80 pt-4">
                <span className="block font-mono text-[10px] text-slate-500 dark:text-zinc-500 uppercase tracking-widest mb-3">DURATION SETTINGS</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Start Date */}
                  <div className="space-y-1.5">
                    <label className="block text-slate-500 dark:text-zinc-500 uppercase tracking-wider">Tháng bắt đầu *</label>
                    <input
                      type="month"
                      required
                      className="w-full px-3 py-2 border border-slate-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950 text-slate-900 dark:text-white rounded-none focus:border-blue-500 outline-none text-xs"
                      value={formData.startDate || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, startDate: e.target.value })
                      }
                    />
                  </div>

                  {/* End Date */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="block text-slate-500 dark:text-zinc-500 uppercase tracking-wider">Tháng kết thúc *</label>
                      <label className="flex items-center gap-1.5 cursor-pointer text-[10px] text-slate-500 dark:text-zinc-400 select-none">
                        <input
                          type="checkbox"
                          checked={formData.endDate === "Present"}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              endDate: e.target.checked ? "Present" : "",
                            })
                          }
                          className="w-3.5 h-3.5 bg-slate-50 dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 rounded-none cursor-pointer"
                        />
                        <span className="uppercase">Đang làm (Present)</span>
                      </label>
                    </div>

                    {formData.endDate !== "Present" && (
                      <input
                        type="month"
                        required
                        className="w-full px-3 py-2 border border-slate-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950 text-slate-900 dark:text-white rounded-none focus:border-blue-500 outline-none text-xs"
                        value={formData.endDate || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, endDate: e.target.value })
                        }
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Tags Manager */}
              <div className="border-t border-slate-200 dark:border-zinc-800/80 pt-4 space-y-3">
                <span className="block font-mono text-[10px] text-slate-500 dark:text-zinc-500 uppercase tracking-widest">TAGS // TECHNOLOGIES</span>
                
                <div className="flex gap-2">
                  <input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Thêm tag công nghệ (React, Node...)"
                    className="flex-1 px-3 py-2 border border-slate-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950 text-slate-900 dark:text-white rounded-none focus:border-blue-500 outline-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                  />

                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-2 border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-bold transition-all"
                  >
                    Thêm
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5 p-2 bg-slate-50 dark:bg-zinc-950 border border-slate-150 dark:border-zinc-900 min-h-[40px]">
                  {formData.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-800/40 text-blue-650 dark:text-blue-400 font-mono text-[10px] uppercase flex items-center gap-1.5"
                    >
                      {tag}
                      <button 
                        type="button" 
                        onClick={() => removeTag(i)}
                        className="text-slate-400 hover:text-red-500 dark:text-zinc-500 dark:hover:text-red-400 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  {formData.tags.length === 0 && (
                    <span className="text-slate-400 dark:text-zinc-600 italic">// Chưa có nhãn tag nào.</span>
                  )}
                </div>
              </div>

              {/* Submit / Cancel Footer buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-zinc-800/80">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 dark:border-zinc-800 bg-transparent hover:bg-slate-50 dark:hover:bg-zinc-900 text-slate-500 hover:text-slate-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors uppercase tracking-wider font-bold"
                >
                  Hủy
                </button>

                 <button
                  type="submit"
                  disabled={submitLoading}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white uppercase tracking-wider font-bold transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {submitLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      ĐANG LƯU...
                    </>
                  ) : (
                    "Lưu dự án"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Cyber Confirm Dialog */}
      {confirmDialog.isOpen && (
        <div className="fixed inset-0 bg-slate-900/60 dark:bg-[#000000bd] backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 p-6 max-w-md w-full relative select-none shadow-xl dark:shadow-none">
            {/* Blueprint Frame corner indicators */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-slate-400 dark:border-zinc-650" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-slate-400 dark:border-zinc-650" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-slate-400 dark:border-zinc-650" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-slate-400 dark:border-zinc-650" />

            <div className="flex items-start gap-4 mb-5">
              <div className="p-3 border border-red-100 dark:border-red-900/30 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-500 rounded-none">
                <AlertCircle className="w-6 h-6 animate-pulse" />
              </div>
              <div className="space-y-1">
                <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-red-605 dark:text-red-400">
                  {confirmDialog.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-zinc-400 font-sans leading-relaxed">
                  {confirmDialog.message}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 font-mono text-xs">
              <button
                onClick={() => setConfirmDialog((prev) => ({ ...prev, isOpen: false }))}
                className="px-4 py-2 border border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-900 text-slate-500 dark:text-zinc-400 font-bold transition-all"
                disabled={confirmDialog.loading}
              >
                HỦY BỎ
              </button>
              <button
                onClick={confirmDialog.onConfirm}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold transition-all flex items-center gap-2"
                disabled={confirmDialog.loading}
              >
                {confirmDialog.loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    ĐANG XÓA...
                  </>
                ) : (
                  "XÁC NHẬN XÓA"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Cyber Toasts Container */}
      <div className="fixed bottom-6 right-6 z-[9999] space-y-3 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`p-4 border font-mono text-xs uppercase tracking-wider backdrop-blur-md min-w-[280px] shadow-lg flex items-center gap-3 animate-fade-in pointer-events-auto rounded-none relative ${
              t.type === "success"
                ? "bg-emerald-50/95 dark:bg-emerald-950/80 border-emerald-300 dark:border-emerald-500 text-emerald-700 dark:text-emerald-400"
                : t.type === "error"
                ? "bg-red-50/95 dark:bg-red-950/80 border-red-300 dark:border-red-500 text-red-700 dark:text-red-400"
                : "bg-amber-50/95 dark:bg-amber-950/80 border-amber-300 dark:border-amber-500 text-amber-700 dark:text-amber-400"
            }`}
          >
            {/* Vertical neon accent indicator */}
            <div
              className={`absolute left-0 top-0 bottom-0 w-1 ${
                t.type === "success"
                  ? "bg-emerald-500"
                  : t.type === "error"
                  ? "bg-red-500"
                  : "bg-amber-500"
              }`}
            />
            {t.type === "success" && <CheckCircle2 className="w-5 h-5 flex-shrink-0 animate-bounce text-emerald-600 dark:text-emerald-400" />}
            {t.type === "error" && <AlertTriangle className="w-5 h-5 flex-shrink-0 text-red-600 dark:text-red-400 animate-ping" />}
            {t.type === "warning" && <HelpCircle className="w-5 h-5 flex-shrink-0 text-amber-600 dark:text-amber-400" />}
            <span>{t.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectManager;
