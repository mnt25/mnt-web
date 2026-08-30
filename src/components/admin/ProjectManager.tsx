import React, { useEffect, useState, useRef } from "react";
import {
  Plus,
  Trash2,
  Edit,
  X,
  Eye,
  EyeOff,
  Calendar,
  Code,
  Link2,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  AlertCircle,
  GripVertical,
  ArrowUpDown,
  Sparkles,
  FolderKanban,
} from "lucide-react";
import { api } from "../../../server/api";
import type { Project } from "../../types/project";
import AdminSkeletonLoader from "./AdminSkeletonLoader";

const ProjectManager = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isSavingOrder, setIsSavingOrder] = useState(false);
  const [togglingVisibilityId, setTogglingVisibilityId] = useState<string | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);

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
    } finally {
      setInitialLoading(false);
    }
  };

  // Drag & Drop handlers
  const handleDragStart = (index: number) => {
    dragIndexRef.current = index;
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDrop = async (dropIndex: number) => {
    const dragIndex = dragIndexRef.current;
    if (dragIndex === null || dragIndex === dropIndex) return;

    const reordered = [...projects];
    const [moved] = reordered.splice(dragIndex, 1);
    reordered.splice(dropIndex, 0, moved);

    setProjects(reordered);
    dragIndexRef.current = null;
    setDragOverIndex(null);

    setIsSavingOrder(true);
    try {
      const orderPayload = reordered.map((p, idx) => ({ id: p.id, sort_order: idx + 1 }));
      const ok = await api.reorderProjects(orderPayload);
      if (ok) {
        showToast("Đã lưu thứ tự dự án thành công!", "success");
      } else {
        showToast("Không thể lưu thứ tự. Vui lòng thử lại!", "error");
        loadProjects();
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
      title: "Xác Nhận Xóa Dự Án",
      message: "Hành động này sẽ xóa vĩnh viễn dự án khỏi danh mục hiển thị trên website.",
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
    if (togglingVisibilityId) return;
    setTogglingVisibilityId(p.id);
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
    } finally {
      setTogglingVisibilityId(null);
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

  if (initialLoading) {
    return (
      <AdminSkeletonLoader
        title="Đang"
        italicWord="nạp"
        endWord="dự án"
        subtitle="Đang chạy danh mục dự án qua hệ thống — từng dự án một, kiên nhẫn nhé!"
        cardsCount={6}
      />
    );
  }

  return (
    <div className="space-y-6 select-none font-sans">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/[0.06] dark:border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DANH MỤC SẢN PHẨM & DỰ ÁN</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
            Quản Lý Dự Án
          </h2>
          <p className="text-xs sm:text-sm font-mono text-zinc-500 dark:text-zinc-400 mt-1">
            Thêm mới, chỉnh sửa nội dung song ngữ, kéo thả sắp xếp thứ tự hiển thị
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {isSavingOrder && (
            <span className="flex items-center gap-1.5 font-mono text-xs text-cyan-600 dark:text-cyan-400">
              <Loader2 className="w-3.5 h-3.5 animate-spin" /> Đang lưu thứ tự...
            </span>
          )}
          <span className="hidden sm:flex items-center gap-1.5 font-mono text-xs text-zinc-400 dark:text-zinc-500">
            <ArrowUpDown className="w-3.5 h-3.5" /> Kéo hàng để đổi vị trí
          </span>
          <button
            onClick={handleAddNew}
            className="px-5 py-2.5 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 font-mono text-xs font-semibold rounded-full shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-cyan-400 dark:text-cyan-600" /> Thêm dự án mới
          </button>
        </div>
      </div>

      {/* Modern Card Table */}
      <div className="bg-white dark:bg-zinc-900/60 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.08] rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-black/[0.06] dark:border-white/[0.08] bg-zinc-50/80 dark:bg-zinc-900/80">
                <th className="px-3 py-4 w-10"></th>
                <th className="px-6 py-4 font-mono text-xs uppercase text-zinc-500 dark:text-zinc-400 font-semibold">Tên dự án</th>
                <th className="px-6 py-4 font-mono text-xs uppercase text-zinc-500 dark:text-zinc-400 font-semibold">Thời gian</th>
                <th className="px-6 py-4 font-mono text-xs uppercase text-zinc-500 dark:text-zinc-400 font-semibold">Trạng thái</th>
                <th className="px-6 py-4 font-mono text-xs uppercase text-zinc-500 dark:text-zinc-400 font-semibold text-right">Thao tác</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.04] font-sans">
              {projects.map((p, index) => (
                <tr
                  key={p.id}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDrop={() => handleDrop(index)}
                  onDragEnd={handleDragEnd}
                  className={`hover:bg-zinc-50/60 dark:hover:bg-zinc-800/40 transition-colors group cursor-default ${
                    dragOverIndex === index && dragIndexRef.current !== index
                      ? "border-t-2 border-cyan-500"
                      : ""
                  } ${dragIndexRef.current === index ? "opacity-40" : "opacity-100"}`}
                >
                  {/* Drag handle */}
                  <td className="px-3 py-4 w-10">
                    <div className="cursor-grab active:cursor-grabbing text-zinc-300 dark:text-zinc-600 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors flex justify-center">
                      <GripVertical className="w-4 h-4" />
                    </div>
                  </td>

                  {/* Title & tags */}
                  <td className="px-6 py-4">
                    <div className="font-bold text-zinc-950 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      {p.title}
                    </div>
                    {p.titleEn && (
                      <div className="text-xs text-zinc-400 dark:text-zinc-500 font-mono mt-0.5">{p.titleEn}</div>
                    )}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {p.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-mono text-[10px]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Start / End Date */}
                  <td className="px-6 py-4 font-mono text-xs text-zinc-600 dark:text-zinc-300">
                    {p.startDate ? (
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-cyan-500" />
                        <span>
                          {p.startDate.split("-").reverse().join("/")} —{" "}
                          {p.endDate === "Present" ? (
                            <span className="font-bold text-cyan-600 dark:text-cyan-400">Hiện tại</span>
                          ) : (
                            p.endDate?.split("-").reverse().join("/") || "Hiện tại"
                          )}
                        </span>
                      </div>
                    ) : (
                      <span className="text-zinc-400 dark:text-zinc-600">—</span>
                    )}
                  </td>

                  {/* Public visibility toggle */}
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleVisibility(p)}
                      disabled={togglingVisibilityId === p.id}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-xs font-semibold transition-all border cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                        p.isVisible
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20"
                          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 border-black/5 dark:border-white/10 hover:bg-zinc-200"
                      }`}
                    >
                      {togglingVisibilityId === p.id ? (
                        <>
                          <Loader2 className="w-3 h-3 animate-spin text-cyan-500" />
                          <span>Đang lưu...</span>
                        </>
                      ) : p.isVisible ? (
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
                    <div className="inline-flex gap-1.5">
                      <button
                        onClick={() => handleEdit(p)}
                        disabled={togglingVisibilityId !== null || isSavingOrder}
                        className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 hover:bg-cyan-500/10 text-zinc-600 dark:text-zinc-300 hover:text-cyan-600 dark:hover:text-cyan-400 border border-black/5 dark:border-white/5 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                        title="Sửa thông tin"
                      >
                        <Edit className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDelete(p.id)}
                        disabled={togglingVisibilityId !== null || isSavingOrder}
                        className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 hover:bg-rose-500/10 text-zinc-600 dark:text-zinc-300 hover:text-rose-600 dark:hover:text-rose-400 border border-black/5 dark:border-white/5 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
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
                  <td colSpan={5} className="text-center py-12 font-mono text-zinc-400 dark:text-zinc-500 text-sm">
                    Chưa có dự án nào trong hệ thống. Hãy bấm nút "Thêm dự án mới" để bắt đầu.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white dark:bg-zinc-950 border border-black/10 dark:border-white/10 w-full max-w-2xl relative rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Top gradient accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-teal-400 to-blue-500 shrink-0" />

            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-black/5 dark:border-white/10 bg-zinc-50/70 dark:bg-zinc-900/70">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                  <FolderKanban className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-zinc-950 dark:text-white">
                  {editingProject ? "Cập Nhật Thông Tin Dự Án" : "Thêm Dự Án Mới"}
                </h3>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={submitForm} className="p-6 sm:p-7 space-y-5 overflow-y-auto flex-1 font-sans text-xs sm:text-sm">
              {/* Form public visibility toggle */}
              <div className="flex items-center gap-2 p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-black/5 dark:border-white/5">
                <label className="flex items-center cursor-pointer gap-3 select-none w-full">
                  <input
                    type="checkbox"
                    checked={formData.isVisible}
                    onChange={(e) =>
                      setFormData({ ...formData, isVisible: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-500/20 cursor-pointer"
                  />
                  <span className="text-zinc-800 dark:text-zinc-200 font-semibold font-mono text-xs">
                    Công khai dự án này trên trang Portfolio
                  </span>
                </label>
              </div>

              {/* Vietnamese Title */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300">
                  Tên dự án (Tiếng Việt) *
                </label>
                <input
                  required
                  placeholder="Ví dụ: AI Real Estate Assistant..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-zinc-800/60 text-zinc-900 dark:text-white outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all font-mono text-xs"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              {/* English Title */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300">
                  Tên dự án (Tiếng Anh)
                </label>
                <input
                  placeholder="English title..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-zinc-800/60 text-zinc-900 dark:text-white outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all font-mono text-xs"
                  value={formData.titleEn || ""}
                  onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                />
              </div>

              {/* Vietnamese Description */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300">
                  Mô tả chi tiết (Tiếng Việt) *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Mô tả công nghệ, tính năng cốt lõi của dự án..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-zinc-800/60 text-zinc-900 dark:text-white outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all font-mono text-xs resize-none"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>

              {/* English Description */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300">
                  Mô tả chi tiết (Tiếng Anh)
                </label>
                <textarea
                  rows={3}
                  placeholder="English description..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-zinc-800/60 text-zinc-900 dark:text-white outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all font-mono text-xs resize-none"
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
                  <label className="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300">
                    URL Ảnh bìa dự án *
                  </label>
                  <div className="relative">
                    <input
                      required
                      placeholder="https://..."
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-zinc-800/60 text-zinc-900 dark:text-white outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 font-mono text-xs transition-all"
                      value={formData.image}
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.value })
                      }
                    />
                    <Link2 className="absolute left-3 top-3 w-4 h-4 text-zinc-400" />
                  </div>
                </div>

                {/* Demo URL */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300">
                    URL Trải nghiệm (Live Demo)
                  </label>
                  <div className="relative">
                    <input
                      placeholder="https://..."
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-zinc-800/60 text-zinc-900 dark:text-white outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 font-mono text-xs transition-all"
                      value={formData.liveDemo}
                      onChange={(e) =>
                        setFormData({ ...formData, liveDemo: e.target.value })
                      }
                    />
                    <Link2 className="absolute left-3 top-3 w-4 h-4 text-zinc-400" />
                  </div>
                </div>
              </div>

              {/* Source Code */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300">
                  URL Mã nguồn GitHub
                </label>
                <div className="relative">
                  <input
                    placeholder="https://github.com/..."
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-zinc-800/60 text-zinc-900 dark:text-white outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 font-mono text-xs transition-all"
                    value={formData.sourceCode}
                    onChange={(e) =>
                      setFormData({ ...formData, sourceCode: e.target.value })
                    }
                  />
                  <Code className="absolute left-3 top-3 w-4 h-4 text-zinc-400" />
                </div>
              </div>

              {/* Project duration settings */}
              <div className="pt-2">
                <span className="block font-mono text-xs text-zinc-500 font-semibold mb-3 uppercase">
                  Thời Gian Thực Hiện Dự Án
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Start Date */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-zinc-600 dark:text-zinc-400">Tháng bắt đầu *</label>
                    <input
                      type="month"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-zinc-800/60 text-zinc-900 dark:text-white outline-none focus:border-cyan-500 font-mono text-xs"
                      value={formData.startDate || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, startDate: e.target.value })
                      }
                    />
                  </div>

                  {/* End Date */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="block text-xs font-mono text-zinc-600 dark:text-zinc-400">Tháng kết thúc *</label>
                      <label className="flex items-center gap-1.5 cursor-pointer text-xs font-mono text-zinc-500 select-none">
                        <input
                          type="checkbox"
                          checked={formData.endDate === "Present"}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              endDate: e.target.checked ? "Present" : "",
                            })
                          }
                          className="w-3.5 h-3.5 rounded text-cyan-500 cursor-pointer"
                        />
                        <span>Đang làm (Hiện tại)</span>
                      </label>
                    </div>

                    {formData.endDate !== "Present" && (
                      <input
                        type="month"
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-zinc-800/60 text-zinc-900 dark:text-white outline-none focus:border-cyan-500 font-mono text-xs"
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
              <div className="pt-2 space-y-3">
                <span className="block font-mono text-xs text-zinc-500 font-semibold uppercase">
                  Nhãn Công Nghệ (Tags)
                </span>
                
                <div className="flex gap-2">
                  <input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Nhập tên tag (React, FastAPI, Docker...)"
                    className="flex-1 px-3.5 py-2 rounded-xl border border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-zinc-800/60 text-zinc-900 dark:text-white outline-none focus:border-cyan-500 font-mono text-xs"
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
                    className="px-4 py-2 rounded-xl bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-mono text-xs font-semibold hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-all cursor-pointer"
                  >
                    Thêm
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5 p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-black/5 dark:border-white/5 min-h-[44px]">
                  {formData.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-mono text-xs flex items-center gap-1.5 border border-cyan-500/20"
                    >
                      {tag}
                      <button 
                        type="button" 
                        onClick={() => removeTag(i)}
                        className="text-zinc-400 hover:text-rose-500 transition-colors cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  {formData.tags.length === 0 && (
                    <span className="text-zinc-400 dark:text-zinc-600 font-mono text-xs italic">Chưa có tag nào được thêm.</span>
                  )}
                </div>
              </div>

              {/* Submit / Cancel Footer buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-black/5 dark:border-white/5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-black/10 dark:border-white/10 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-xs font-mono font-medium transition-colors cursor-pointer"
                >
                  Hủy bỏ
                </button>

                <button
                  type="submit"
                  disabled={submitLoading}
                  className="px-6 py-2.5 rounded-full bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-xs font-mono font-semibold transition-all shadow-md active:scale-95 disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                >
                  {submitLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-cyan-500" />
                      <span>Đang lưu...</span>
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

      {/* Modern Confirm Dialog */}
      {confirmDialog.isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-950 border border-black/10 dark:border-white/10 p-6 sm:p-7 rounded-3xl max-w-md w-full relative select-none shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start gap-4 mb-5">
              <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-500 shrink-0">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-zinc-950 dark:text-white">
                  {confirmDialog.title}
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 font-mono leading-relaxed">
                  {confirmDialog.message}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 font-mono text-xs">
              <button
                onClick={() => setConfirmDialog((prev) => ({ ...prev, isOpen: false }))}
                className="px-4 py-2 rounded-full border border-black/10 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-medium transition-all cursor-pointer"
                disabled={confirmDialog.loading}
              >
                Hủy bỏ
              </button>
              <button
                onClick={confirmDialog.onConfirm}
                className="px-5 py-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-semibold transition-all flex items-center gap-2 shadow-md cursor-pointer"
                disabled={confirmDialog.loading}
              >
                {confirmDialog.loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Đang xóa...</span>
                  </>
                ) : (
                  "Xác nhận xóa"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toasts Container */}
      <div className="fixed bottom-6 right-6 z-50 space-y-3 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`p-4 rounded-2xl border font-mono text-xs shadow-xl flex items-center gap-3 backdrop-blur-xl pointer-events-auto animate-in slide-in-from-bottom-5 duration-200 ${
              t.type === "success"
                ? "bg-emerald-50/95 dark:bg-emerald-950/90 border-emerald-500/30 text-emerald-800 dark:text-emerald-300"
                : t.type === "error"
                ? "bg-rose-50/95 dark:bg-rose-950/90 border-rose-500/30 text-rose-800 dark:text-rose-300"
                : "bg-amber-50/95 dark:bg-amber-950/90 border-amber-500/30 text-amber-800 dark:text-amber-300"
            }`}
          >
            {t.type === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
            {t.type === "error" && <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />}
            {t.type === "warning" && <HelpCircle className="w-5 h-5 text-amber-500 shrink-0" />}
            <span>{t.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectManager;
