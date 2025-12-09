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
      const data = await res.json();
      // Map backend snake_case to frontend camelCase
      return data.map((p: any) => ({
        ...p,
        liveDemo: p.live_demo,
        sourceCode: p.source_code,
      }));
    } catch (error) {
      console.error('Fetch projects error:', error);
      return [];
    }
  },

  createProject: async (project: Omit<Project, 'id'>): Promise<Project | null> => {
    try {
      // Map frontend camelCase to backend snake_case
      const payload = {
        ...project,
        live_demo: project.liveDemo,
        source_code: project.sourceCode,
      };

      const res = await fetch(`${API_URL}/projects`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      // Map response back to camelCase
      return {
        ...data,
        liveDemo: data.live_demo,
        sourceCode: data.source_code,
      };
    } catch (error) {
      console.error('Create project error:', error);
      return null;
    }
  },

  updateProject: async (project: Project): Promise<Project | null> => {
    try {
      // Map frontend camelCase to backend snake_case
      const payload = {
        ...project,
        live_demo: project.liveDemo,
        source_code: project.sourceCode,
      };

      const res = await fetch(`${API_URL}/projects/${project.id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      // Map response back to camelCase
      return {
        ...data,
        liveDemo: data.live_demo,
        sourceCode: data.source_code,
      };
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


  getCVLink: async (): Promise<{ link: string; enabled: boolean }> => {
    try {
      const res = await fetch(`${API_URL}/settings/cv`);
      const data = await res.json();
      return { link: data.link, enabled: data.enabled };
    } catch (error) {
      return { link: '#', enabled: true };
    }
  },

  updateCVLink: async (link: string, enabled: boolean): Promise<boolean> => {
    try {
      await fetch(`${API_URL}/settings/cv`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ link, enabled }),
      });
      return true;
    } catch (error) {
      return false;
    }
  }
};
