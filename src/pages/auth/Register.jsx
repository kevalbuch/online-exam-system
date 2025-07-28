import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  studentId: Yup.string().required('Student ID is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm your password'),
});

// Crystal Animation Component
const CrystalElement = ({ className, delay = 0, duration = 10, size = 'w-4 h-4', movementType = 'float' }) => {
  const getMovementStyle = () => {
    switch (movementType) {
      case 'float':
        return {
          animation: `float ${duration}s ease-in-out infinite`,
          animationDelay: `${delay}s`
        };
      case 'drift':
        return {
          animation: `drift ${duration}s ease-in-out infinite`,
          animationDelay: `${delay}s`
        };
      case 'sway':
        return {
          animation: `sway ${duration}s ease-in-out infinite`,
          animationDelay: `${delay}s`
        };
      default:
        return {
          animation: `float ${duration}s ease-in-out infinite`,
          animationDelay: `${delay}s`
        };
    }
  };

  return (
    <div 
      className={`${className} ${size} bg-gradient-to-br from-white/20 to-white/5 rounded-lg backdrop-blur-sm border border-white/10`}
      style={getMovementStyle()}
    />
  );
};

// Floating Crystal Elements
const FloatingCrystals = () => (
  <>
    {/* Large Crystals */}
    <CrystalElement 
      className="absolute top-20 left-20" 
      delay={0} 
      duration={8} 
      size="w-8 h-8"
      movementType="float"
    />
    <CrystalElement 
      className="absolute top-40 right-32" 
      delay={1} 
      duration={10} 
      size="w-6 h-6"
      movementType="drift"
    />
    <CrystalElement 
      className="absolute bottom-40 left-32" 
      delay={2} 
      duration={12} 
      size="w-7 h-7"
      movementType="sway"
    />
    <CrystalElement 
      className="absolute bottom-20 right-20" 
      delay={0.5} 
      duration={9} 
      size="w-5 h-5"
      movementType="float"
    />
    
    {/* Medium Crystals */}
    <CrystalElement 
      className="absolute top-1/3 left-1/4" 
      delay={1.5} 
      duration={11} 
      size="w-4 h-4"
      movementType="drift"
    />
    <CrystalElement 
      className="absolute top-1/2 right-1/4" 
      delay={2.5} 
      duration={7} 
      size="w-6 h-6"
      movementType="sway"
    />
    <CrystalElement 
      className="absolute bottom-1/3 right-1/3" 
      delay={0.8} 
      duration={13} 
      size="w-5 h-5"
      movementType="float"
    />
    
    {/* Small Crystals */}
    <CrystalElement 
      className="absolute top-1/4 right-1/6" 
      delay={3} 
      duration={15} 
      size="w-3 h-3"
      movementType="drift"
    />
    <CrystalElement 
      className="absolute bottom-1/4 left-1/6" 
      delay={1.2} 
      duration={14} 
      size="w-3 h-3"
      movementType="sway"
    />
    <CrystalElement 
      className="absolute top-2/3 left-1/3" 
      delay={2.8} 
      duration={16} 
      size="w-4 h-4"
      movementType="float"
    />
  </>
);

// Animated Background Pattern
const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Gradient Orbs */}
    <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
    <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-br from-purple-400/15 to-pink-500/15 rounded-full animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }}></div>
    <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 rounded-full animate-spin" style={{ animationDuration: '30s' }}></div>
    
    {/* Animated Lines */}
    <div className="absolute top-1/4 left-0 w-32 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" style={{ animationDuration: '4s' }}></div>
    <div className="absolute bottom-1/3 right-0 w-24 h-0.5 bg-gradient-to-l from-transparent via-white/15 to-transparent animate-pulse" style={{ animationDuration: '6s' }}></div>
    <div className="absolute top-1/2 left-1/4 w-20 h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" style={{ animationDuration: '5s' }}></div>
  </div>
);

export default function Register() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Google login success handler
  const handleGoogleLogin = async (credentialResponse) => {
    // You would send credentialResponse.credential to your backend for verification and login
    // For demo, just redirect to dashboard
    localStorage.setItem('token', credentialResponse.credential);
    navigate('/student');
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1E88E5] via-[#7B1FA2] to-[#2DD4BF] animate-gradient-x relative overflow-hidden">
        {/* Animated Background */}
        <AnimatedBackground />
        
        {/* Floating Crystals */}
        <FloatingCrystals />
        
        {/* Mouse Follow Effect */}
        <div 
          className="absolute w-[400px] h-[400px] bg-gradient-to-r from-white/5 to-transparent rounded-full blur-3xl pointer-events-none transition-all duration-1000 ease-out"
          style={{
            left: mousePosition.x - 200,
            top: mousePosition.y - 200,
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Logo */}
        <div className="absolute top-6 left-8 flex items-center gap-2 z-10">
          <span className="text-2xl font-extrabold text-white drop-shadow">EXAMINATION ONLINE</span>
        </div>

        {/* Main Form Card */}
        <div className="w-full max-w-lg py-3 px-8 rounded-3xl shadow-2xl bg-white/10 backdrop-blur-md border border-white/30 relative overflow-hidden my-2 flex flex-col items-center z-20">
          {/* Card Glow Effect */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#1E88E5] via-[#7B1FA2] to-[#2DD4BF] opacity-30 blur-lg animate-pulse -z-10" />
          
          {/* Card Crystal Decorations */}
          <CrystalElement 
            className="absolute top-4 right-4 animate-pulse" 
            delay={0} 
            duration={2} 
            size="w-3 h-3"
          />
          <CrystalElement 
            className="absolute bottom-4 left-4 animate-pulse" 
            delay={1} 
            duration={3} 
            size="w-2 h-2"
          />
          
          <h2 className="text-3xl font-extrabold text-white mb-3 text-center drop-shadow">Student Registration</h2>
          
          <div className="flex flex-col gap-3 mb-2 w-full">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => setError('Google login failed')}
              width="100%"
              theme="filled_blue"
              shape="pill"
              text="continue_with"
            />
            <div className="text-center text-white font-semibold">or</div>
          </div>
          
          <Formik
            initialValues={{ name: '', studentId: '', email: '', password: '', confirmPassword: '' }}
            validationSchema={RegisterSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              setError('');
              setSuccess('');
              try {
                await axios.post('/api/user/register', {
                  name: values.name,
                  studentId: values.studentId,
                  email: values.email,
                  password: values.password,
                });
                setSuccess('Registration successful! Please login.');
                resetForm();
                setTimeout(() => navigate('/login'), 1500);
              } catch (err) {
                setError(err.response?.data?.message || 'Registration failed');
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-2 w-full">
                <div className="relative">
                  <label className="block mb-2 font-medium text-white">Name</label>
                  <Field 
                    type="text" 
                    name="name" 
                    className="w-full p-3 border border-white/20 rounded-xl focus:ring-2 focus:ring-[#2DD4BF] focus:border-transparent bg-white/5 backdrop-blur-sm text-white placeholder-white/50 transition-all duration-300" 
                    placeholder="Enter your name"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-300 text-sm mt-1" />
                </div>
                
                <div className="relative">
                  <label className="block mb-2 font-medium text-white">Student ID</label>
                  <Field 
                    type="text" 
                    name="studentId" 
                    className="w-full p-3 border border-white/20 rounded-xl focus:ring-2 focus:ring-[#2DD4BF] focus:border-transparent bg-white/5 backdrop-blur-sm text-white placeholder-white/50 transition-all duration-300" 
                    placeholder="Enter your student ID"
                  />
                  <ErrorMessage name="studentId" component="div" className="text-red-300 text-sm mt-1" />
                </div>
                
                <div className="relative">
                  <label className="block mb-2 font-medium text-white">Email</label>
                  <Field 
                    type="email" 
                    name="email" 
                    className="w-full p-3 border border-white/20 rounded-xl focus:ring-2 focus:ring-[#2DD4BF] focus:border-transparent bg-white/5 backdrop-blur-sm text-white placeholder-white/50 transition-all duration-300" 
                    placeholder="Enter your email"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-300 text-sm mt-1" />
                </div>
                
                <div className="relative">
                  <label className="block mb-2 font-medium text-white">Password</label>
                  <Field 
                    type="password" 
                    name="password" 
                    className="w-full p-3 border border-white/20 rounded-xl focus:ring-2 focus:ring-[#2DD4BF] focus:border-transparent bg-white/5 backdrop-blur-sm text-white placeholder-white/50 transition-all duration-300" 
                    placeholder="Enter your password"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-300 text-sm mt-1" />
                </div>
                
                <div className="relative">
                  <label className="block mb-2 font-medium text-white">Confirm Password</label>
                  <Field 
                    type="password" 
                    name="confirmPassword" 
                    className="w-full p-3 border border-white/20 rounded-xl focus:ring-2 focus:ring-[#2DD4BF] focus:border-transparent bg-white/5 backdrop-blur-sm text-white placeholder-white/50 transition-all duration-300" 
                    placeholder="Confirm your password"
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-300 text-sm mt-1" />
                </div>
                
                {error && <div className="text-red-300 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">{error}</div>}
                {success && <div className="text-green-300 text-sm bg-green-500/10 p-3 rounded-lg border border-green-500/20">{success}</div>}
                
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#1E88E5] to-[#2DD4BF] text-white font-bold shadow-lg hover:from-[#7B1FA2] hover:to-[#1E88E5] transition-all duration-300 transform hover:scale-105 hover:shadow-xl relative overflow-hidden group"
                  disabled={isSubmitting}
                >
                  <span className="relative z-10">{isSubmitting ? 'Registering...' : 'Register'}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#2DD4BF] to-[#1E88E5] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </Form>
            )}
          </Formik>
          
          <p className="mt-2 text-sm text-white text-center">
            Already have an account?{' '}
            <a href="/login" className="text-[#2DD4BF] font-semibold hover:underline transition-colors duration-200">Login</a>
          </p>
        </div>

        {/* CSS for enhanced animations */}
        <style jsx>{`
          @keyframes gradient-x {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient-x 15s ease infinite;
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            25% { transform: translateY(-20px) rotate(5deg); }
            50% { transform: translateY(-10px) rotate(0deg); }
            75% { transform: translateY(-30px) rotate(-5deg); }
          }
          
          @keyframes drift {
            0%, 100% { transform: translateX(0px) translateY(0px); }
            25% { transform: translateX(15px) translateY(-15px); }
            50% { transform: translateX(30px) translateY(-5px); }
            75% { transform: translateX(15px) translateY(-25px); }
          }
          
          @keyframes sway {
            0%, 100% { transform: translateX(0px) rotate(0deg); }
            25% { transform: translateX(-10px) rotate(3deg); }
            50% { transform: translateX(-20px) rotate(0deg); }
            75% { transform: translateX(-10px) rotate(-3deg); }
          }
        `}</style>
      </div>
    </GoogleOAuthProvider>
  );
} 