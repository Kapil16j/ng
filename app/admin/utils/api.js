
import axios from "axios";

// const API_BASE_URL = 'http://127.0.0.1:8000'
import { API_BASE_URL } from "@/app/store/utils";

// const API_BASE_URL = 'http://3.111.147.36:8000'

// const API_BASE_URL = 'http://43.205.209.115:8000'
// http://3.111.147.36:8000/


import Cookies from 'js-cookie'



export const login = (data) => {
    try {
        const response = axios.post(`${API_BASE_URL}/auth/login`, data);


        return response;

    } catch (error) {
        return error;
    }
}


export const verifyOtp = (data) => {
    try {
        const response = axios.post(`${API_BASE_URL}/auth/verify-otp`, data);


        return response;

    } catch (error) {

        return error;
    }
};



export const getUser = () => {
    try {
        const authToken = Cookies.get('accesstoken')

        console.log("authToken?", authToken)

        const response = axios.get(`${API_BASE_URL}/auth/me`,
            {
                headers: {
                    authorization: `Bearer ${authToken}`,
                },
            }
        );


        return response;

    } catch (error) {
        return error;
    }
};


export const getAllUser = () => {
    try {
        const authToken = Cookies.get('accesstoken')

        const response = axios.get(`${API_BASE_URL}/admin/users`,
            {
                headers: {
                    authorization: `Bearer ${authToken}`,
                },
            }
        );
        return response;
    } catch (error) {
        return error;
    }
};

export const BulkUsersCreate = (data) => {
    try {
        const authToken = Cookies.get('accesstoken')
  
        const response = axios.post(`${API_BASE_URL}/admin/users/bulkcreate`, data,
            {
                headers: {
                    authorization: `Bearer ${authToken}`,
                },
            }
        );
  
        return response;
  
    } catch (error) {
        return error;
    }
};

export const userCreate = (data) => {
    try {
        const authToken = Cookies.get('accesstoken')
  
        const response = axios.post(`${API_BASE_URL}/admin/users/`, data,
            {
                headers: {
                    authorization: `Bearer ${authToken}`,
                },
            }
        );
  
        return response;
  
    } catch (error) {
        return error;
    }
};

export const updateUser = (data,id) => {
  try {
      const authToken = Cookies.get('accesstoken')

      const response = axios.put(`${API_BASE_URL}/admin/users/${id}/`, data,
          {
              headers: {
                  authorization: `Bearer ${authToken}`,
              },
          }
      );

      return response;

  } catch (error) {
      return error;
  }
};

export const getUserById = (id) => {
    try {
        const authToken = Cookies.get('accesstoken')
  
        const response = axios.get(`${API_BASE_URL}/admin/users/${id}/`,
            {
                headers: {
                    authorization: `Bearer ${authToken}`,
                },
            }
        );
  
        return response;
  
    } catch (error) {
        return error;
    }
  };

export const getAllSupportForms = () => {
    try {
        const authToken = Cookies.get('accesstoken')

        const response = axios.get(`${API_BASE_URL}/admin/support-forms`,
            {
                headers: {
                    authorization: `Bearer ${authToken}`,
                },
            }
        );


        return response;

    } catch (error) {
        return error;
    }
};


export const supportFormsResolved = (data) => {
    try {
        const authToken = Cookies.get('accesstoken')

        const response = axios.post(`${API_BASE_URL}/admin/support-forms/${data.value}/${data.id}`, {},
            {
                headers: {
                    authorization: `Bearer ${authToken}`,
                },
            }
        );


        return response;

    } catch (error) {
        return error;
    }
};




export const getAllSubscription = () => {
    try {
        const authToken = Cookies.get('accesstoken')

        const response = axios.get(`${API_BASE_URL}/admin/subscriptions`,
            {
                headers: {
                    authorization: `Bearer ${authToken}`,
                },
            }
        );

        return response;

    } catch (error) {
        return error;
    }
};


export const createSubscription = (data) => {
    try {
        const authToken = Cookies.get('accesstoken')

        const response = axios.post(`${API_BASE_URL}/admin/subscriptions`, data,
            {
                headers: {
                    authorization: `Bearer ${authToken}`,
                },
            }
        );

        return response;

    } catch (error) {
        return error;
    }
};

export const deleteSubscription = (id) => {
    try {
        const authToken = Cookies.get('accesstoken')

        const response = axios.delete(`${API_BASE_URL}/admin/subscriptions/${id}`,
            {
                headers: {
                    authorization: `Bearer ${authToken}`,
                },
            }
        );

        return response;

    } catch (error) {
        return error;
    }
};


export const updateSubscription = (data) => {
    try {
        const authToken = Cookies.get('accesstoken')

        const response = axios.put(`${API_BASE_URL}/admin/subscriptions/${data.id}`, data,
            {
                headers: {
                    authorization: `Bearer ${authToken}`,
                },
            }
        );

        return response;

    } catch (error) {
        return error;
    }
};



export const activateDeactivateUser = (data) => {
    try {
        const authToken = Cookies.get('accesstoken')

        const response = axios.put(`${API_BASE_URL}/admin/users/${data.id}/${data.value}`, {},
            {
                headers: {
                    authorization: `Bearer ${authToken}`,
                },
            }
        );

        return response;

    } catch (error) {
        return error;
    }
};


export const updateTier = (data,id) => {
    try {
        const authToken = Cookies.get('accesstoken')

        const response = axios.put(`${API_BASE_URL}/admin/users/${id}/tier`, data,
            {
                headers: {
                    authorization: `Bearer ${authToken}`,
                },
            }
        );

        return response;

    } catch (error) {
        return error;
    }
};

export const changeUserRole = (data,id) => {
    try {
        const authToken = Cookies.get('accesstoken')

        const response = axios.put(`${API_BASE_URL}/superadmin/change-role/${id}`, data,
            {
                headers: {
                    authorization: `Bearer ${authToken}`,
                },
            }
        );

        return response;

    } catch (error) {
        return error;
    }
};

export const updateSubscriptionId = (sub_id,id) => {
    try {
        const authToken = Cookies.get('accesstoken')

        const response = axios.put(`${API_BASE_URL}/admin/users/${id}/${sub_id}`, {},
            {
                headers: {
                    authorization: `Bearer ${authToken}`,
                },
            }
        );

        return response;

    } catch (error) {
        return error;
    }
};



export const getAllOffers = () => {
    try {
        const authToken = Cookies.get('accesstoken')

        const response = axios.get(`${API_BASE_URL}/users/offers`,
            {
                headers: {
                    authorization: `Bearer ${authToken}`,
                },
            }
        );

        return response;

    } catch (error) {
        return error;
    }
};


export const createOffer = (data) => {
    try {
        const authToken = Cookies.get('accesstoken')

        const response = axios.post(`${API_BASE_URL}/admin/offers`, data,
            {
                headers: {
                    authorization: `Bearer ${authToken}`,
                },
            }
        );

        return response;

    } catch (error) {
        return error;
    }
};


export const updateOffer = (data, id) => {
    try {
        const authToken = Cookies.get('accesstoken')

        const response = axios.put(`${API_BASE_URL}/admin/offers/${id}`, data,
            {
                headers: {
                    authorization: `Bearer ${authToken}`,
                },
            }
        );

        return response;

    } catch (error) {
        return error;
    }
};


export const deleteOffer = (id) => {
    try {
        const authToken = Cookies.get('accesstoken')

        const response = axios.delete(`${API_BASE_URL}/admin/offers/${id}`,
            {
                headers: {
                    authorization: `Bearer ${authToken}`,
                },
            }
        );

        return response;

    } catch (error) {
        return error;
    }
};







export const getAllProposals = (id) => {
    try {
        const authToken = Cookies.get('accesstoken')

        const response = axios.get(`${API_BASE_URL}/users/all_sample_proposals`,
            {
                headers: {
                    authorization: `Bearer ${authToken}`,
                },
            }
        );

        return response;

    } catch (error) {
        return error;
    }
};

export const createProposals = (data) => {
    try {
        const authToken = Cookies.get('accesstoken')

        const response = axios.post(`${API_BASE_URL}/admin/sample-proposals`, data,
            {
                headers: {
                    authorization: `Bearer ${authToken}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return response;

    } catch (error) {
        return error;
    }
};

export const updateProposals = (data, id) => {
    try {
        const authToken = Cookies.get('accesstoken')

        const response = axios.put(`${API_BASE_URL}/admin/sample-proposals/${id}`, data,
            {
                headers: {
                    authorization: `Bearer ${authToken}`,
                },
            }
        );

        return response;

    } catch (error) {
        return error;
    }
};

export const deleteProposals = (id) => {
    try {
        const authToken = Cookies.get('accesstoken')

        const response = axios.delete(`${API_BASE_URL}/admin/sample-proposals/${id}`,
            {
                headers: {
                    authorization: `Bearer ${authToken}`,
                },
            }
        );

        return response;

    } catch (error) {
        return error;
    }
};







export const getAllPromoCodes = () => {
    try {
        const authToken = Cookies.get('accesstoken')

        const response = axios.get(`${API_BASE_URL}/users/promo-codes`,
            {
                headers: {
                    authorization: `Bearer ${authToken}`,
                },
            }
        );

        return response;

    } catch (error) {
        return error;
    }
};

export const cretatePromoCode = (data) => {
    try {
        const authToken = Cookies.get('accesstoken')

        const response = axios.post(`${API_BASE_URL}/admin/promo-codes`, data,
            {
                headers: {
                    authorization: `Bearer ${authToken}`,
                },
            }
        );

        return response;

    } catch (error) {
        return error;
    }
};


export const updatePromoCode = (data, id) => {
    try {
        const authToken = Cookies.get('accesstoken')

        const response = axios.put(`${API_BASE_URL}/admin/promo-codes/${id}`, data,
            {
                headers: {
                    authorization: `Bearer ${authToken}`,
                },
            }
        );

        return response;

    } catch (error) {
        return error;
    }
};

export const deletePromoCode = (id) => {
    try {
        const authToken = Cookies.get('accesstoken')

        const response = axios.delete(`${API_BASE_URL}/admin/promo-codes/${id}`,
            {
                headers: {
                    authorization: `Bearer ${authToken}`,
                },
            }
        );

        return response;

    } catch (error) {
        return error;
    }
};


export const getAllTransactions = () => {
    try {
        const authToken = Cookies.get('accesstoken')

        const response = axios.get(`${API_BASE_URL}/admin/transactions`,
            {
                headers: {
                    authorization: `Bearer ${authToken}`,
                },
            }
        );

        return response;

    } catch (error) {
        return error;
    }
};

export const getAdminStats = () => {
    try {
        const authToken = Cookies.get('accesstoken')

        const response = axios.get(`${API_BASE_URL}/admin/stats`,
            {
                headers: {
                    authorization: `Bearer ${authToken}`,
                },
            }
        );

        return response;

    } catch (error) {
        return error;
    }
};
