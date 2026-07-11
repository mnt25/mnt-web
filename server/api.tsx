import type { Project } from '../src/types/project';
import type { ContactMessage } from '../src/types/contact';

const _dec = (b64: string): string => {
  try {
    return atob(b64);
  } catch {
    return b64;
  }
};

const API_URL = _dec('L2FwaS92My9zeXMtdGVsZW1ldHJ5'); // /api/v3/sys-telemetry

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  };
};

export const api = {
  login: async (username: string, password: string) => {
    const res = await fetch(`${API_URL}${_dec('L3gtYXV0aC1zZXNzaW9uLWluaXQ=')}`, {
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

  getProjects: async (isPublic = false): Promise<Project[]> => {
    try {
      const path = isPublic 
        ? _dec('L2QtcGF5bG9hZC1oYXNoLXA5MDE/cHVibGljPXRydWU=') 
        : _dec('L2QtcGF5bG9hZC1oYXNoLXA5MDE=');
      const url = `${API_URL}${path}`;
      const res = await fetch(url);

      if (!res.ok) {
        console.error("API ERROR", res.status);
        return [];
      }

      const data = await res.json();
      return data.map((p: any) => ({
        ...p,
        liveDemo: p.live_demo,
        sourceCode: p.source_code,
        isVisible: p.is_visible,
        titleEn: p.title_en,
        descriptionEn: p.description_en,
        startDate: p.start_date,
        endDate: p.end_date,
      }));
    } catch (error) {
      console.error('Fetch projects error:', error);
      return [];
    }
  },

  createProject: async (project: Omit<Project, 'id'>): Promise<Project | null> => {
    try {
      const payload = {
        ...project,
        live_demo: project.liveDemo,
        source_code: project.sourceCode,
        is_visible: project.isVisible,
        title_en: project.titleEn,
        description_en: project.descriptionEn,
        start_date: project.startDate,
        end_date: project.endDate,
      };

      const res = await fetch(`${API_URL}${_dec('L2QtcGF5bG9hZC1oYXNoLXA5MDE=')}`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      return {
        ...data,
        liveDemo: data.live_demo,
        sourceCode: data.source_code,
        isVisible: data.is_visible,
        titleEn: data.title_en,
        descriptionEn: data.description_en,
        startDate: data.start_date,
        endDate: data.end_date,
      };
    } catch (error) {
      console.error('Create project error:', error);
      return null;
    }
  },

  updateProject: async (project: Project): Promise<Project | null> => {
    try {
      const payload = {
        ...project,
        live_demo: project.liveDemo,
        source_code: project.sourceCode,
        is_visible: project.isVisible,
        title_en: project.titleEn,
        description_en: project.descriptionEn,
        start_date: project.startDate,
        end_date: project.endDate,
      };

      const res = await fetch(`${API_URL}${_dec('L2QtcGF5bG9hZC1oYXNoLXA5MDEv')}${project.id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      return {
        ...data,
        liveDemo: data.live_demo,
        sourceCode: data.source_code,
        isVisible: data.is_visible,
        titleEn: data.title_en,
        descriptionEn: data.description_en,
        startDate: data.start_date,
        endDate: data.end_date,
      };
    } catch (error) {
      console.error('Update project error:', error);
      return null;
    }
  },

  deleteProject: async (id: string): Promise<boolean> => {
    try {
      await fetch(`${API_URL}${_dec('L2QtcGF5bG9hZC1oYXNoLXA5MDEv')}${id}`, {
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
      const res = await fetch(`${API_URL}${_dec('L21zZy1jaGFubmVsLXNlY3VyZS14Mzk=')}`, {
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
      const res = await fetch(`${API_URL}${_dec('L21zZy1jaGFubmVsLXNlY3VyZS14Mzk=')}`, {
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
      await fetch(`${API_URL}${_dec('L21zZy1jaGFubmVsLXNlY3VyZS14Mzkv')}${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      return true;
    } catch (error) {
      console.error('Delete message error:', error);
      return false;
    }
  },

  getAccountStatus: async (): Promise<{ enabled: boolean }> => {
    try {
      const res = await fetch(`${API_URL}${_dec('L3N5cy1zdGF0ZS12ZWN0b3ItczE1')}`);
      if (!res.ok) return { enabled: false };
      return await res.json();
    } catch (error) {
      return { enabled: false };
    }
  },

  updateAccountStatus: async (enabled: boolean): Promise<boolean> => {
    try {
      await fetch(`${API_URL}${_dec('L3N5cy1zdGF0ZS12ZWN0b3ItczE1L2NvbmZpZw==')}`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ enabled }),
      });
      return true;
    } catch (error) {
      return false;
    }
  },

  getCVLink: async (): Promise<{ link: string; enabled: boolean }> => {
    try {
      const res = await fetch(`${API_URL}${_dec('L2NvcmUtcmVzb3VyY2UtY3YtbGluay1lNDI=')}`);
      if (res.status === 403) {
        return { link: '#', enabled: false };
      }
      const data = await res.json();
      return { link: data.link, enabled: data.enabled };
    } catch (error) {
      return { link: '#', enabled: false };
    }
  },

  getAdminCVLink: async (): Promise<{ link: string }> => {
    try {
      const res = await fetch(`${API_URL}${_dec('L2NvcmUtcmVzb3VyY2UtY3YtbGluay1lNDIvYWRtaW4=')}`, {
        headers: getAuthHeaders(),
      });
      return await res.json();
    } catch (error) {
      return { link: '#' };
    }
  },

  updateCVLink: async (link: string): Promise<boolean> => {
    try {
      await fetch(`${API_URL}${_dec('L2NvcmUtcmVzb3VyY2UtY3YtbGluay1lNDI=')}`, {
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
