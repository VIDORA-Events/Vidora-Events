import {
  Inquiry,
  InquiryStats,
  PortfolioProject,
  Service,
  Faq,
  AdminUser,
} from '../types/index.js';

const API_BASE = '/api';

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers || {});
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
    credentials: 'include', // Automatically send and receive cookies
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg = data.message || `Request failed with status ${response.status}`;
    const error: any = new Error(errorMsg);
    error.status = response.status;
    error.errors = data.errors;
    throw error;
  }

  return data;
}

// Public API
export async function submitInquiry(payload: any) {
  return request<{ success: boolean; message: string; data: any }>('/inquiries', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function fetchServices() {
  return request<{ success: boolean; data: { services: Service[] } }>('/services');
}

export async function fetchPortfolioProjects(category?: string) {
  const query = category && category !== 'All' ? `?category=${encodeURIComponent(category)}` : '';
  return request<{ success: boolean; data: { projects: PortfolioProject[] } }>(`/portfolio${query}`);
}

export async function fetchPortfolioProjectBySlug(slug: string) {
  return request<{ success: boolean; data: { project: PortfolioProject } }>(`/portfolio/${slug}`);
}

export async function fetchFaqs() {
  return request<{ success: boolean; data: { faqs: Faq[] } }>('/faqs');
}

// Admin Auth API
export async function adminLogin(credentials: { email: string; password: string }) {
  return request<{ success: boolean; data: { user: AdminUser; token?: string } }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

export async function adminLogout() {
  return request<{ success: boolean; message: string }>('/auth/logout', {
    method: 'POST',
  });
}

export async function adminGetMe() {
  return request<{ success: boolean; data: { user: AdminUser } }>('/auth/me');
}

// Admin Inquiries API
export async function adminGetInquiries(params?: { page?: number; limit?: number; status?: string; search?: string }) {
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.set('page', params.page.toString());
  if (params?.limit) searchParams.set('limit', params.limit.toString());
  if (params?.status && params.status !== 'ALL') searchParams.set('status', params.status);
  if (params?.search) searchParams.set('search', params.search);

  const query = searchParams.toString() ? `?${searchParams.toString()}` : '';
  return request<{
    success: boolean;
    data: {
      inquiries: Inquiry[];
      pagination: { total: number; page: number; limit: number; totalPages: number };
    };
  }>(`/inquiries${query}`);
}

export async function adminGetInquiryById(id: string) {
  return request<{ success: boolean; data: { inquiry: Inquiry } }>(`/inquiries/${id}`);
}

export async function adminGetInquiryStats() {
  return request<{ success: boolean; data: { stats: InquiryStats } }>('/inquiries/stats');
}

export async function adminUpdateInquiryStatus(id: string, status: string) {
  return request<{ success: boolean; data: { inquiry: Inquiry } }>(`/inquiries/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

export async function adminAddInquiryNote(id: string, content: string) {
  return request<{ success: boolean; data: { note: any } }>(`/inquiries/${id}/notes`, {
    method: 'POST',
    body: JSON.stringify({ content }),
  });
}

// Admin Portfolio API
export async function adminGetAllProjects() {
  return request<{ success: boolean; data: { projects: PortfolioProject[] } }>('/portfolio/admin/all');
}

export async function adminCreateProject(projectData: Partial<PortfolioProject>) {
  return request<{ success: boolean; data: { project: PortfolioProject } }>('/portfolio', {
    method: 'POST',
    body: JSON.stringify(projectData),
  });
}

export async function adminUpdateProject(id: string, projectData: Partial<PortfolioProject>) {
  return request<{ success: boolean; data: { project: PortfolioProject } }>(`/portfolio/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(projectData),
  });
}

export async function adminDeleteProject(id: string) {
  return request<{ success: boolean; message: string }>(`/portfolio/${id}`, {
    method: 'DELETE',
  });
}

