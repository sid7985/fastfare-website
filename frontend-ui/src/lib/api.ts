const API_BASE_URL = 'http://localhost:3000/api';

// Get token from localStorage
const getToken = () => localStorage.getItem('token');

// API request helper
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
    const token = getToken();

    const config: RequestInit = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers,
        },
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'API request failed');
    }

    return data;
};

// Auth API
export const authApi = {
    register: async (userData: {
        businessName: string;
        gstin: string;
        businessType: string;
        contactPerson: string;
        email: string;
        phone: string;
        password: string;
    }) => {
        const data = await apiRequest('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
        if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
        }
        return data;
    },

    login: async (email: string, password: string) => {
        const data = await apiRequest('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
        if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
        }
        return data;
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getCurrentUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    isAuthenticated: () => {
        return !!getToken();
    },

    getMe: async () => {
        return apiRequest('/auth/me');
    },
};

// Shipments API
export const shipmentsApi = {
    create: async (shipmentData: any) => {
        return apiRequest('/shipments', {
            method: 'POST',
            body: JSON.stringify(shipmentData),
        });
    },

    getAll: async (params?: { status?: string; page?: number; limit?: number; search?: string }) => {
        const query = new URLSearchParams();
        if (params?.status) query.append('status', params.status);
        if (params?.page) query.append('page', params.page.toString());
        if (params?.limit) query.append('limit', params.limit.toString());
        if (params?.search) query.append('search', params.search);

        return apiRequest(`/shipments?${query.toString()}`);
    },

    getById: async (id: string) => {
        return apiRequest(`/shipments/${id}`);
    },

    update: async (id: string, updates: any) => {
        return apiRequest(`/shipments/${id}`, {
            method: 'PUT',
            body: JSON.stringify(updates),
        });
    },

    cancel: async (id: string) => {
        return apiRequest(`/shipments/${id}/cancel`, {
            method: 'POST',
        });
    },

    getDashboardStats: async () => {
        return apiRequest('/shipments/stats/dashboard');
    },
};

// Tracking API
export const trackingApi = {
    track: async (awb: string) => {
        return apiRequest(`/tracking/${awb}`);
    },

    getProofOfDelivery: async (awb: string) => {
        return apiRequest(`/tracking/${awb}/pod`);
    },
};

// User API
export const userApi = {
    updateProfile: async (profileData: any) => {
        const data = await apiRequest('/users/profile', {
            method: 'PUT',
            body: JSON.stringify(profileData),
        });
        if (data.user) {
            localStorage.setItem('user', JSON.stringify(data.user));
        }
        return data;
    },

    getAddresses: async () => {
        return apiRequest('/users/addresses');
    },

    addAddress: async (address: any) => {
        return apiRequest('/users/addresses', {
            method: 'POST',
            body: JSON.stringify(address),
        });
    },

    deleteAddress: async (id: string) => {
        return apiRequest(`/users/addresses/${id}`, {
            method: 'DELETE',
        });
    },

    changePassword: async (currentPassword: string, newPassword: string) => {
        return apiRequest('/users/password', {
            method: 'PUT',
            body: JSON.stringify({ currentPassword, newPassword }),
        });
    },
};

// GSTIN API
export const gstinApi = {
    verify: async (gstin: string) => {
        return apiRequest('/gstin/verify', {
            method: 'POST',
            body: JSON.stringify({ gstin }),
        });
    },
};

// Payment API
export const paymentApi = {
    createOrder: async (amount: number) => {
        return apiRequest('/payment/create-order', {
            method: 'POST',
            body: JSON.stringify({ amount }),
        });
    },

    verifyPayment: async (paymentData: {
        razorpay_order_id: string;
        razorpay_payment_id: string;
        razorpay_signature: string;
    }) => {
        return apiRequest('/payment/verify', {
            method: 'POST',
            body: JSON.stringify(paymentData),
        });
    },
};

export default {
    auth: authApi,
    shipments: shipmentsApi,
    tracking: trackingApi,
    user: userApi,
    gstin: gstinApi,
    payment: paymentApi,
};
