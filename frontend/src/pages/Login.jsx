import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Toast from '../components/Toast.jsx';
import '../css/Login.css';

function Login() {
    const navigate = useNavigate();
    const [showAccountForm, setShowAccountForm] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [toast, setToast] = useState(null);

    const handleGuestLogin = () => {
        localStorage.setItem('userType', 'guest');
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/home');
    };

    const handleAccountLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            let data;
            try {
                data = await response.json();
            } catch (jsonError) {
                console.error('JSON parsing error:', jsonError);
                alert(`Login failed: Server returned invalid response (${response.status})`);
                return;
            }

            if (response.ok) {
                localStorage.setItem('userType', 'account');
                localStorage.setItem('token', data.token);
                localStorage.setItem('userEmail', data.user.email);
                localStorage.setItem('isLoggedIn', 'true');
                setToast({ message: `Welcome back, ${data.user.email}!`, type: 'success' });
                setTimeout(() => navigate('/home'), 1500);
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed. Please check your connection and try again.');
        }
    };

    const handleAccountRegister = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }

        try {
            console.log('Making register request to:', '/api/auth/register');
            console.log('Request body:', { email, password });
            
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);
            console.log('Response type:', response.type);

            let data;
            try {
                const responseText = await response.text();
                console.log('Raw response text:', responseText);
                data = JSON.parse(responseText);
            } catch (jsonError) {
                console.error('JSON parsing error:', jsonError);
                alert(`Registration failed: Server returned invalid response (${response.status})`);
                return;
            }

            if (response.ok) {
                localStorage.setItem('userType', 'account');
                localStorage.setItem('token', data.token);
                localStorage.setItem('userEmail', data.user.email);
                localStorage.setItem('isLoggedIn', 'true');
                setToast({ message: `Welcome to Campers Hub, ${data.user.email}!`, type: 'success' });
                setTimeout(() => navigate('/home'), 1500);
            } else {
                alert(data.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert('Registration failed. Please check your connection and try again.');
        }
    };

    return (
        <div className="login-page">
            {toast && (
                <Toast 
                    message={toast.message} 
                    type={toast.type} 
                    onClose={() => setToast(null)}
                />
            )}
            <div className="login-container">
                <div className="login-header">
                    <h1>🏞 Welcome to Campers Hub</h1>
                    <p>Choose how you want to proceed</p>
                </div>

                {!showAccountForm ? (
                    <div className="login-options">
                        <button className="login-option guest-login" onClick={handleGuestLogin}>
                            <div className="option-icon">👤</div>
                            <div className="option-text">
                                <h2>Login as Guest</h2>
                                <p>Browse locations and equipments without an account</p>
                            </div>
                        </button>

                        <button className="login-option account-login" onClick={() => setShowAccountForm(true)}>
                            <div className="option-icon">🔐</div>
                            <div className="option-text">
                                <h2>Login With Account</h2>
                                <p>Access your saved favorites and wishlist across devices</p>
                            </div>
                        </button>
                    </div>
                ) : (
                    <form className="account-form" onSubmit={isRegister ? handleAccountRegister : handleAccountLogin}>
                        <button type="button" className="back-btn" onClick={() => setShowAccountForm(false)}>
                            ← Back
                        </button>

                        <div className="form-toggle">
                            <button
                                type="button"
                                className={`toggle-btn ${!isRegister ? 'active' : ''}`}
                                onClick={() => setIsRegister(false)}
                            >
                                Login
                            </button>
                            <button
                                type="button"
                                className={`toggle-btn ${isRegister ? 'active' : ''}`}
                                onClick={() => setIsRegister(true)}
                            >
                                Register
                            </button>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password"/>
                        </div>

                        <button type="submit" className="submit-btn">
                            {isRegister ? 'Register' : 'Login'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default Login;
