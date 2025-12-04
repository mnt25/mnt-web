import type { Project } from '../src/types/project';
import type { ContactMessage } from '../src/types/contact';

const API_URL = 'http://localhost:5000/api';

// Lấy token từ localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  };
};
// api.ts
export const api = {
  login: async (username: string, password: string) => {
    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    return {
      success: data.success,
      token: data.token ?? null
    };
  },

  getProjects: async (): Promise<Project[]> => {
    try {
      const res = await fetch(`${API_URL}/projects`);
      return await res.json();
    } catch (error) {
      console.error('Fetch projects error:', error);
      return [];
    }
  },

  createProject: async (project: Omit<Project, 'id'>): Promise<Project | null> => {
    try {
      const res = await fetch(`${API_URL}/projects`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(project),
      });
      return await res.json();
    } catch (error) {
      console.error('Create project error:', error);
      return null;
    }
  },

  updateProject: async (project: Project): Promise<Project | null> => {
    try {
      const res = await fetch(`${API_URL}/projects/${project.id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(project),
      });
      return await res.json();
    } catch (error) {
      console.error('Update project error:', error);
      return null;
    }
  },

  deleteProject: async (id: string): Promise<boolean> => {
    try {
      await fetch(`${API_URL}/projects/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      return true;
    } catch (error) {
      console.error('Delete project error:', error);
      return false;
    }
  },


  getMessages: async (): Promise<ContactMessage[]> => {
    try {
      const res = await fetch(`${API_URL}/messages`, {
        headers: getAuthHeaders(),
      });
      return await res.json();
    } catch (error) {
      console.error('Fetch messages error:', error);
      return [];
    }
  },

  sendMessage: async (data: { name: string; email: string; message: string }): Promise<boolean> => {
    try {
      const res = await fetch(`${API_URL}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return res.ok;
    } catch (error) {
      console.error('Send message error:', error);
      return false;
    }
  },

  deleteMessage: async (id: string): Promise<boolean> => {
    try {
      await fetch(`${API_URL}/messages/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      return true;
    } catch (error) {
      console.error('Delete message error:', error);
      return false;
    }
  },


  getCVLink: async (): Promise<string> => {
    try {
      const res = await fetch(`${API_URL}/settings/cv`);
      const data = await res.json();
      return data.link;
    } catch (error) {
      return '#';
    }
  },

  updateCVLink: async (link: string): Promise<boolean> => {
    try {
      await fetch(`${API_URL}/settings/cv`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ link }),
      });
      return true;
    } catch (error) {
      return false;
    }
  }
};
