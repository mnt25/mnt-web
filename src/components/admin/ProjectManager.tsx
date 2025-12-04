import React, { useEffect, useState } from "react";
import { Plus, Trash2, Edit, X } from "lucide-react";
import { api } from "../../../server/api";
import type { Project } from "../../types/project";

const ProjectManager = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [formData, setFormData] = useState<Project>({
    id: "",
    title: "",
    description: "",
    image: "",
    tags: [],
    liveDemo: "",
    sourceCode: "",
  });

  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const result = await api.getProjects();
    setProjects(result);
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
    });
    setIsModalOpen(true);
  };

  const handleEdit = (p: Project) => {
    setEditingProject(p);
    setFormData(p);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Bạn có chắc muốn xóa dự án này?")) {
      const result = await api.deleteProject(id);
      if (result) loadProjects();
    }
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    let result;

    if (editingProject) {
      result = await api.updateProject(formData);
    } else {
      result = await api.createProject(formData);
    }

    if (result) {
      loadProjects();
      setIsModalOpen(false);
    } else {
      alert("Lỗi trong quá trình lưu!");
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
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Danh sách Dự án
        </h2>

        <button
          onClick={handleAddNew}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Thêm mới
        </button>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-700/50">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold">Tên dự án</th>
              <th className="px-6 py-4 text-sm font-semibold">Mô tả</th>
              <th className="px-6 py-4 text-sm font-semibold">Thao tác</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {projects.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                <td className="px-6 py-4 font-medium">{p.title}</td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-400 truncate max-w-md">
                  {p.description}
                </td>

                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <Edit className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDelete(p.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {projects.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-6 text-slate-500">
                  Không có dự án nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 w-full max-w-2xl rounded-xl shadow-xl overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b dark:border-slate-700">
              <h3 className="text-xl font-bold">
                {editingProject ? "Sửa dự án" : "Thêm dự án"}
              </h3>

              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-500 hover:text-slate-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={submitForm} className="p-6 space-y-4">
              {/* Title */}
              <input
                required
                placeholder="Tên dự án"
                className="w-full px-3 py-2 border rounded-lg bg-transparent"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />

              {/* Description */}
              <textarea
                required
                rows={3}
                placeholder="Mô tả..."
                className="w-full px-3 py-2 border rounded-lg bg-transparent"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />

              {/* Image + Demo */}
              <div className="grid grid-cols-2 gap-4">
                <input
                  required
                  placeholder="Link Ảnh"
                  className="px-3 py-2 border rounded-lg bg-transparent w-full"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                />

                <input
                  placeholder="Demo URL"
                  className="px-3 py-2 border rounded-lg bg-transparent w-full"
                  value={formData.liveDemo}
                  onChange={(e) =>
                    setFormData({ ...formData, liveDemo: e.target.value })
                  }
                />
              </div>

              {/* Source Code */}
              <input
                placeholder="Source Code URL"
                className="px-3 py-2 border rounded-lg bg-transparent w-full"
                value={formData.sourceCode}
                onChange={(e) =>
                  setFormData({ ...formData, sourceCode: e.target.value })
                }
              />

              {/* Tags */}
              <div>
                <div className="flex gap-2 mb-2">
                  <input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Thêm tag..."
                    className="flex-1 px-3 py-2 border rounded-lg bg-transparent"
                  />

                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                  >
                    Thêm
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded flex items-center gap-1"
                    >
                      {tag}
                      <button type="button" onClick={() => removeTag(i)}>
                        <X className="w-3 h-3 hover:text-red-500" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg"
                >
                  Hủy
                </button>

                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  Lưu dự án
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProjectManager;
