import axios from 'axios';

const loginUser = async (username, password) => {
    try {
        const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
        const { token } = res.data;
        
        // Store the token (e.g., in localStorage or state)
        localStorage.setItem('token', token);

        console.log('Login successful:', token);
    } catch (error) {
        console.error('Login failed:', error);
    }
};

const fetchUserProfile = async () => {
    const token = localStorage.getItem('token');
    try {
        const res = await axios.get('http://localhost:5000/api/user/profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log('User Profile:', res.data);
    } catch (error) {
        console.error('Error fetching profile:', error);
    }
};

