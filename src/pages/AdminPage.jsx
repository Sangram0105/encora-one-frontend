import React, { useState, useEffect } from 'react';
import { UserPlus, UserCog, UserX, Trash2, Edit, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
<<<<<<< HEAD
 
=======

>>>>>>> b9af88de4cf77664ceb02d6e91d3861f62d6deb1
// --- Configuration Constant ---
// NOTE: For local development, ensure your backend server (e.g., ASP.NET Core) is running on this port.
const API_BASE_URL = 'https://localhost:7001';
const TOKEN_STORAGE_KEY = 'token';
<<<<<<< HEAD
 
=======

>>>>>>> b9af88de4cf77664ceb02d6e91d3861f62d6deb1
// --- Department Configuration ---
// Map of Role ID (from the backend) to Role Name
const ROLE_OPTIONS = [
    { id: 3, name: 'Employee' },
    { id: 2, name: 'Manager' },
    { id: 1, name: 'Admin' }
];
<<<<<<< HEAD
 
=======

>>>>>>> b9af88de4cf77664ceb02d6e91d3861f62d6deb1
// Map of Department ID to Department Name, used for the Manager's dropdown
const DEPARTMENT_OPTIONS = [
    { id: 1, name: 'Administration' },
    { id: 2, name: 'Human Resources' },
    { id: 3, name: 'IT Support' }
];
<<<<<<< HEAD
 
=======

>>>>>>> b9af88de4cf77664ceb02d6e91d3861f62d6deb1
// const DEPARTMENT_OPTIONS = [
//     { id: 1,},
//     { id: 2,},
//     { id: 3,}
// ];
<<<<<<< HEAD
 
// --- Helper Components ---
 
=======

// --- Helper Components ---

>>>>>>> b9af88de4cf77664ceb02d6e91d3861f62d6deb1
// Simple Input Helper Component
const Input = ({ label, ...props }) => (
    <div>
        <label htmlFor={props.name} className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
        <input
            {...props}
            id={props.name}
            className="w-full bg-white text-slate-800 border border-slate-300 rounded-xl p-3 focus:ring-violet-600 focus:border-violet-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 shadow-sm"
        />
    </div>
);
<<<<<<< HEAD
 
=======

>>>>>>> b9af88de4cf77664ceb02d6e91d3861f62d6deb1
// Simple Tab Button Helper Component
const TabButton = ({ icon, label, tabId, activeTab, setActiveTab, disabled }) => (
    <button
        onClick={() => setActiveTab(tabId)}
        className={`flex items-center px-6 py-4 text-base font-semibold transition-colors duration-200 ${
            activeTab === tabId
                ? 'border-b-4 border-violet-600 text-violet-700'
                : 'text-slate-500 hover:text-slate-800 hover:border-slate-400/50'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={disabled}
    >
        {icon}
        {label}
    </button>
);
<<<<<<< HEAD
 
=======

>>>>>>> b9af88de4cf77664ceb02d6e91d3861f62d6deb1
// Warning component for protected tabs when token is missing
const ProtectedWarning = ({ message }) => (
    <div className="p-8 text-center border border-red-300 rounded-2xl bg-red-100">
        <h3 className="text-2xl font-bold text-red-700 mb-2 flex items-center justify-center">
             <AlertTriangle className="w-6 h-6 mr-2"/> Access Denied
        </h3>
        <p className="text-red-600">{message}</p>
        <p className="mt-4 text-sm text-red-500">The Update and Remove features require a valid Admin JWT.</p>
    </div>
);
<<<<<<< HEAD
 
=======

>>>>>>> b9af88de4cf77664ceb02d6e91d3861f62d6deb1
// Inline component for the User Form
const UserForm = ({ onSubmit, submitButtonText, formData, handleChange, activeTab }) => {
    // Determine if the password field is required based on the tab
    const isPasswordRequired = activeTab === 'add';
    const isManagerRole = formData.role === '2';
<<<<<<< HEAD
 
=======

>>>>>>> b9af88de4cf77664ceb02d6e91d3861f62d6deb1
    return (
        <form onSubmit={onSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input type="text" name="fullName" label="Full Name" value={formData.fullName} onChange={handleChange} required />
<<<<<<< HEAD
                <Input
                    type="email"
                    name="email"
                    label="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    // FIX 1: Removed readOnly={activeTab === 'update'} to allow email update/search.
                    // NOTE: If your backend uses Email as a unique key for lookup/update, changing it requires special logic.
                />
                <Input
                    type="password"
                    name="password"
                    label={`Password ${activeTab === 'update' ? '(Leave blank to keep current)' : ''}`}
                    value={formData.password}
                    onChange={handleChange}
                    required={isPasswordRequired}
                />
                <Input type="text" name="jobTitle" label="Job Title" value={formData.jobTitle} onChange={handleChange} required />
            </div>
 
=======
                <Input 
                    type="email" 
                    name="email" 
                    label="Email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                    // FIX 1: Removed readOnly={activeTab === 'update'} to allow email update/search.
                    // NOTE: If your backend uses Email as a unique key for lookup/update, changing it requires special logic.
                />
                <Input 
                    type="password" 
                    name="password" 
                    label={`Password ${activeTab === 'update' ? '(Leave blank to keep current)' : ''}`} 
                    value={formData.password} 
                    onChange={handleChange} 
                    required={isPasswordRequired} 
                />
                <Input type="text" name="jobTitle" label="Job Title" value={formData.jobTitle} onChange={handleChange} required />
            </div>

>>>>>>> b9af88de4cf77664ceb02d6e91d3861f62d6deb1
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-1">
                    <label htmlFor="role" className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                    <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full bg-white text-slate-800 border border-slate-300 rounded-xl p-3 focus:ring-violet-600 focus:border-violet-600 transition-all duration-150 shadow-sm"
                        required
                    >
                        {ROLE_OPTIONS.map(role => (
                            <option key={role.id} value={role.id}>{role.name}</option>
                        ))}
                    </select>
                </div>
<<<<<<< HEAD
               
=======
                
>>>>>>> b9af88de4cf77664ceb02d6e91d3861f62d6deb1
                {/* FIX 4: Conditional Department ID dropdown for Manager role */}
                {isManagerRole && (
                    <div className="col-span-2">
                        <label htmlFor="departmentId" className="block text-sm font-medium text-slate-700 mb-1">Department (Required for Manager)</label>
                        <select
                            id="departmentId"
                            name="departmentId"
                            value={formData.departmentId}
                            onChange={handleChange}
                            className="w-full bg-white text-slate-800 border border-slate-300 rounded-xl p-3 focus:ring-violet-600 focus:border-violet-600 transition-all duration-150 shadow-sm"
                            required
                        >
                            <option value="">Select Department...</option>
                            {DEPARTMENT_OPTIONS.map(dept => (
                                <option key={dept.id} value={dept.id}>{dept.name}</option>
                            ))}
                        </select>
                    </div>
                )}
            </div>
<<<<<<< HEAD
           
            <button
                type="submit"
=======
            
            <button 
                type="submit" 
>>>>>>> b9af88de4cf77664ceb02d6e91d3861f62d6deb1
                className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-200 shadow-xl shadow-violet-300 hover:shadow-violet-400/70 transform hover:scale-[1.01]"
            >
                {submitButtonText}
            </button>
        </form>
    );
}
<<<<<<< HEAD
 
=======

>>>>>>> b9af88de4cf77664ceb02d6e91d3861f62d6deb1
// Inline component for the Search functionality
const UserSearch = ({ handleSearch, searchEmail, setSearchEmail, isProtected }) => (
    <div className="flex space-x-4">
        <div className="flex-grow">
<<<<<<< HEAD
            <Input
                type="email"
                label="Search User by Email"
                name="searchEmail"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                required
            />
        </div>
        <button
            onClick={handleSearch}
            type="button"
=======
            <Input 
                type="email" 
                label="Search User by Email" 
                name="searchEmail" 
                value={searchEmail} 
                onChange={(e) => setSearchEmail(e.target.value)} 
                required
            />
        </div>
        <button 
            onClick={handleSearch}
            type="button" 
>>>>>>> b9af88de4cf77664ceb02d6e91d3861f62d6deb1
            className={`mt-6 px-6 py-3 h-[52px] rounded-2xl transition-all duration-200 font-medium ${isProtected ? 'bg-violet-600 hover:bg-violet-700 shadow-lg shadow-violet-400/40 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-90'} `}
            disabled={!isProtected}
        >
            Search
        </button>
    </div>
);
<<<<<<< HEAD
 
 
// --- Main Component ---
const AdminPage = () => {
    const [adminToken, setAdminToken] = useState(null);
    const [isTokenLoading, setIsTokenLoading] = useState(true);
 
=======


// --- Main Component ---
const AdminPage = () => {
    const [adminToken, setAdminToken] = useState(null); 
    const [isTokenLoading, setIsTokenLoading] = useState(true);

>>>>>>> b9af88de4cf77664ceb02d6e91d3861f62d6deb1
    const [activeTab, setActiveTab] = useState('add');
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        role: ROLE_OPTIONS[0].id.toString(), // Default to Employee (3)
<<<<<<< HEAD
        departmentId: '',
        jobTitle: ''
    });
   
    const [statusMessage, setStatusMessage] = useState({ message: '', type: '' });
    const [searchEmail, setSearchEmail] = useState('');
    const [userToManage, setUserToManage] = useState(null);
   
=======
        departmentId: '', 
        jobTitle: ''
    });
    
    const [statusMessage, setStatusMessage] = useState({ message: '', type: '' });
    const [searchEmail, setSearchEmail] = useState('');
    const [userToManage, setUserToManage] = useState(null); 
    
>>>>>>> b9af88de4cf77664ceb02d6e91d3861f62d6deb1
    useEffect(() => {
        const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
        if (storedToken) {
            setAdminToken(storedToken);
        } else {
            displayStatus('No Admin token found. Protected features require login on the main page.', 'warning');
        }
        setIsTokenLoading(false);
    }, []);
<<<<<<< HEAD
   
=======
    
>>>>>>> b9af88de4cf77664ceb02d6e91d3861f62d6deb1
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const newState = { ...prev, [name]: value };
            // Clear departmentId if role is no longer Manager
            if (name === 'role' && value !== '2') {
                 newState.departmentId = '';
            }
            // For departmentId, if it's not manager role, ensure it's null for API if empty string
            if (name === 'departmentId' && value === '') {
                 // Keep it as an empty string in the state for the select default
            } else if (name === 'departmentId' && newState.role === '2' && !value) {
                // Do nothing if Manager role and selecting the 'Select Department...' option
            }
            return newState;
        });
    };
<<<<<<< HEAD
   
=======
    
>>>>>>> b9af88de4cf77664ceb02d6e91d3861f62d6deb1
    const clearFormAndStatus = () => {
        setFormData({
            fullName: '', email: '', password: '', role: ROLE_OPTIONS[0].id.toString(), departmentId: '', jobTitle: ''
        });
        setStatusMessage({ message: '', type: '' });
        setUserToManage(null);
        setSearchEmail('');
    };
<<<<<<< HEAD
   
    useEffect(() => {
        clearFormAndStatus();
    }, [activeTab]);
 
=======
    
    useEffect(() => {
        clearFormAndStatus(); 
    }, [activeTab]);

>>>>>>> b9af88de4cf77664ceb02d6e91d3861f62d6deb1
    const displayStatus = (message, type, timeout = 7000) => {
        setStatusMessage({ message, type });
        setTimeout(() => setStatusMessage({ message: '', type: '' }), timeout);
    };
<<<<<<< HEAD
   
=======
    
>>>>>>> b9af88de4cf77664ceb02d6e91d3861f62d6deb1
    const checkToken = () => {
        if (!adminToken) {
            displayStatus('Admin token is missing. Please log in on the main page to enable protected features.', 'error');
            return false;
        }
        return true;
    };
<<<<<<< HEAD
   
    // --- CRUD API Calls ---
 
=======
    
    // --- CRUD API Calls ---

>>>>>>> b9af88de4cf77664ceb02d6e91d3861f62d6deb1
    // 1. REGISTER
    const handleRegister = async (e) => {
        e.preventDefault();
        setStatusMessage({ message: 'Registering user...', type: 'info' });
<<<<<<< HEAD
 
=======

>>>>>>> b9af88de4cf77664ceb02d6e91d3861f62d6deb1
        const dataToSend = {
            fullName: formData.fullName,
            email: formData.email,
            password: formData.password,
            role: parseInt(formData.role, 10),
            // Pass null for departmentId if not a manager or if the field is empty (to satisfy required field only for manager)
            departmentId: formData.role === '2' && formData.departmentId ? parseInt(formData.departmentId, 10) : null,
            jobTitle: formData.jobTitle
        };
<<<<<<< HEAD
       
=======
        
>>>>>>> b9af88de4cf77664ceb02d6e91d3861f62d6deb1
        // Final check for Manager role and departmentId
        if (dataToSend.role === 2 && !dataToSend.departmentId) {
            displayStatus('Manager role requires a Department to be selected.', 'error');
            return;
        }
<<<<<<< HEAD
 
        try {
            const response = await fetch(`${API_BASE_URL}/api/Auth/register`, {
=======

        try {
            const response = await fetch(`${API_BASE_URL}/api/Auth/register`, { 
>>>>>>> b9af88de4cf77664ceb02d6e91d3861f62d6deb1
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSend)
            });
<<<<<<< HEAD
 
=======

>>>>>>> b9af88de4cf77664ceb02d6e91d3861f62d6deb1
            if (response.ok) {
                displayStatus('User registered successfully! 🎉', 'success');
                clearFormAndStatus();
            } else {
                const errorData = await response.json();
<<<<<<< HEAD
                const errorMessages = errorData.errors ?
                    Object.values(errorData.errors).flat().join('; ') :
=======
                const errorMessages = errorData.errors ? 
                    Object.values(errorData.errors).flat().join('; ') : 
>>>>>>> b9af88de4cf77664ceb02d6e91d3861f62d6deb1
                    errorData.message || 'Server error.';
                displayStatus(`Registration failed: ${errorMessages}`, 'error');
            }
        } catch (error) {
            displayStatus(`Network error: ${error.message}. Ensure the backend is running at ${API_BASE_URL}`, 'error', 10000);
        }
    };
<<<<<<< HEAD
 
=======

>>>>>>> b9af88de4cf77664ceb02d6e91d3861f62d6deb1
    // 2. SEARCH (for Update/Remove)
    const handleSearch = async () => {
        if (!checkToken() || !searchEmail) {
            if (!searchEmail) displayStatus('Please enter an email address to search.', 'warning');
            return;
        }
        setUserToManage(null);
        setStatusMessage({ message: 'Searching for user...', type: 'info' });
<<<<<<< HEAD
       
        try {
            const response = await fetch(`${API_BASE_URL}/api/Admin/user/${searchEmail}`, {
=======
        
        try {
            const response = await fetch(`${API_BASE_URL}/api/Admin/user/${searchEmail}`, { 
>>>>>>> b9af88de4cf77664ceb02d6e91d3861f62d6deb1
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${adminToken}`
                }
            });
<<<<<<< HEAD
 
            if (response.ok) {
                const userData = await response.json();
                setUserToManage(userData);
               
=======

            if (response.ok) {
                const userData = await response.json();
                setUserToManage(userData);
                
>>>>>>> b9af88de4cf77664ceb02d6e91d3861f62d6deb1
                if (activeTab === 'update') {
                    // Pre-fill form with found user data
                    setFormData({
                        fullName: userData.fullName || '',
                        email: userData.email || '',
<<<<<<< HEAD
                        password: '',
                        role: userData.role?.toString() || ROLE_OPTIONS[0].id.toString(),
=======
                        password: '', 
                        role: userData.role?.toString() || ROLE_OPTIONS[0].id.toString(), 
>>>>>>> b9af88de4cf77664ceb02d6e91d3861f62d6deb1
                        // departmentId needs to be an empty string for the select to show 'Select Department...' if null/undefined
                        departmentId: userData.departmentId?.toString() || '',
                        jobTitle: userData.jobTitle || ''
                    });
                }
                displayStatus('User found. Ready to modify.', 'success');
            } else if (response.status === 404) {
                 displayStatus('User not found.', 'error');
            } else if (response.status === 403) {
                 displayStatus('Permission denied (403): Your user token does not have the Admin role.', 'error');
            } else if (response.status === 401) {
                 displayStatus('Unauthorized (401): Your token is invalid or expired.', 'error');
            } else {
                const errorData = await response.json();
                displayStatus(`Search failed: ${errorData.message || 'Server error.'}`, 'error');
            }
        } catch (error) {
            displayStatus(`Network error: ${error.message}`, 'error', 10000);
        }
    };
<<<<<<< HEAD
 
    // 3. UPDATE
    const handleUpdate = async (e) => {
        e.preventDefault();
       
=======

    // 3. UPDATE
    const handleUpdate = async (e) => {
        e.preventDefault();
        
>>>>>>> b9af88de4cf77664ceb02d6e91d3861f62d6deb1
        if (!checkToken() || !userToManage) {
            if (!userToManage) displayStatus('Please search for a user before updating.', 'warning');
            return;
        }
<<<<<<< HEAD
       
        setStatusMessage({ message: 'Updating user...', type: 'info' });
 
=======
        
        setStatusMessage({ message: 'Updating user...', type: 'info' });

>>>>>>> b9af88de4cf77664ceb02d6e91d3861f62d6deb1
        const dataToSend = {
            fullName: formData.fullName,
            email: formData.email,
            password: formData.password,
            jobTitle: formData.jobTitle,
            id: userToManage.id,
            role: parseInt(formData.role, 10),
            // Pass null for departmentId if not a manager or if the field is empty (to satisfy required field only for manager)
            departmentId: formData.role === '2' && formData.departmentId ? parseInt(formData.departmentId, 10) : null,
        };
<<<<<<< HEAD
       
=======
        
>>>>>>> b9af88de4cf77664ceb02d6e91d3861f62d6deb1
        // Only include password in the payload if the user entered one
        if (!dataToSend.password) {
            delete dataToSend.password;
        }
<<<<<<< HEAD
 
=======

>>>>>>> b9af88de4cf77664ceb02d6e91d3861f62d6deb1
        // Final check for Manager role and departmentId
        if (dataToSend.role === 2 && !dataToSend.departmentId) {
            displayStatus('Manager role requires a Department to be selected.', 'error');
            return;
        }
<<<<<<< HEAD
       
=======
        
>>>>>>> b9af88de4cf77664ceb02d6e91d3861f62d6deb1
        try {
             const response = await fetch(`${API_BASE_URL}/api/Admin/user`, {
                 method: 'PUT',
                 headers: {
                     'Content-Type': 'application/json',
                     'Authorization': `Bearer ${adminToken}`
                 },
                 body: JSON.stringify(dataToSend)
               });
<<<<<<< HEAD
 
=======

>>>>>>> b9af88de4cf77664ceb02d6e91d3861f62d6deb1
            if (response.ok) {
                // FIX 2: Added success popup
                displayStatus('User updated successfully! ✅', 'success');
                clearFormAndStatus();
            } else if (response.status === 403) {
                 displayStatus('Permission denied (403): Your user token does not have the Admin role.', 'error');
            } else if (response.status === 401) {
                 displayStatus('Unauthorized (401): Your token is invalid or expired.', 'error');
            } else {
                const errorData = await response.json();
                displayStatus(`Update failed: ${errorData.message || 'Server error.'}`, 'error');
            }
        } catch (error) {
            displayStatus(`Network error: ${error.message}`, 'error', 10000);
        }
    };
<<<<<<< HEAD
   
=======
    
>>>>>>> b9af88de4cf77664ceb02d6e91d3861f62d6deb1
    // 4. DELETE
    const handleDelete = async () => {
        if (!checkToken() || !userToManage) {
            if (!userToManage) displayStatus('Please search for a user before deleting.', 'warning');
            return;
        }
<<<<<<< HEAD
       
        setStatusMessage({ message: 'Deleting user...', type: 'info' });
 
=======
        
        setStatusMessage({ message: 'Deleting user...', type: 'info' });

>>>>>>> b9af88de4cf77664ceb02d6e91d3861f62d6deb1
        try {
            const response = await fetch(`${API_BASE_URL}/api/Admin/user/${userToManage.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${adminToken}`
                }
            });
<<<<<<< HEAD
 
=======

>>>>>>> b9af88de4cf77664ceb02d6e91d3861f62d6deb1
            if (response.ok) {
                // FIX 3: Added success popup
                displayStatus('User deleted successfully. 🗑️', 'success');
                clearFormAndStatus();
            } else if (response.status === 403) {
                 displayStatus('Permission denied (403): Your user token does not have the Admin role.', 'error');
            } else if (response.status === 401) {
                 displayStatus('Unauthorized (401): Your token is invalid or expired.', 'error');
            } else {
                const errorData = await response.json();
                displayStatus(`Deletion failed: ${errorData.message || 'Server error.'}`, 'error');
            }
        } catch (error) {
            displayStatus(`Network error: ${error.message}`, 'error', 10000);
        }
    };
<<<<<<< HEAD
 
 
=======


>>>>>>> b9af88de4cf77664ceb02d6e91d3861f62d6deb1
    const getStatusClass = () => {
        switch (statusMessage.type) {
            case 'success': return 'bg-emerald-100 text-emerald-700 border-emerald-300 rounded-xl';
            case 'error': return 'bg-red-100 text-red-700 border-red-300 rounded-xl';
            case 'warning': return 'bg-amber-100 text-amber-700 border-amber-300 rounded-xl';
            case 'info':
            default: return 'bg-blue-100 text-blue-700 border-blue-300 rounded-xl';
        }
    };
<<<<<<< HEAD
   
    const renderContent = () => {
        const isProtected = !!adminToken;
        // UserForm props are adapted for each tab's functionality via activeTab prop and specific onSubmit handlers
       
        switch (activeTab) {
            case 'add':
                return <UserForm onSubmit={handleRegister} submitButtonText="Register New User" formData={formData} handleChange={handleChange} activeTab={activeTab} />;
 
=======
    
    const renderContent = () => {
        const isProtected = !!adminToken;
        // UserForm props are adapted for each tab's functionality via activeTab prop and specific onSubmit handlers
        
        switch (activeTab) {
            case 'add':
                return <UserForm onSubmit={handleRegister} submitButtonText="Register New User" formData={formData} handleChange={handleChange} activeTab={activeTab} />;

>>>>>>> b9af88de4cf77664ceb02d6e91d3861f62d6deb1
            case 'update':
                if (!isProtected) {
                    return <ProtectedWarning message="Protected: Please log in as an Admin on the main application page to enable this feature." />;
                }
                return (
                    <>
                        <UserSearch handleSearch={handleSearch} searchEmail={searchEmail} setSearchEmail={setSearchEmail} isProtected={isProtected} />
                        {userToManage ? (
                            <div className="mt-8 border border-slate-200 p-8 rounded-2xl bg-slate-50 shadow-md">
                                <h3 className="text-xl font-semibold text-violet-700 flex items-center mb-6">
                                    <Edit className="w-5 h-5 mr-3 text-violet-700" /> Update User: {userToManage.fullName}
                                </h3>
<<<<<<< HEAD
                                <UserForm
                                    onSubmit={handleUpdate}
                                    submitButtonText="Save Changes"
                                    formData={formData}
                                    handleChange={handleChange}
=======
                                <UserForm 
                                    onSubmit={handleUpdate} 
                                    submitButtonText="Save Changes" 
                                    formData={formData} 
                                    handleChange={handleChange} 
>>>>>>> b9af88de4cf77664ceb02d6e91d3861f62d6deb1
                                    activeTab={activeTab}
                                />
                            </div>
                        ) : (
                            // Only show search prompt if not currently searching and an email has been entered
                            searchEmail && statusMessage.type !== 'info' && <p className="mt-4 text-slate-500 italic">Search for a user by email to begin updating.</p>
                        )}
                    </>
                );
<<<<<<< HEAD
 
=======

>>>>>>> b9af88de4cf77664ceb02d6e91d3861f62d6deb1
            case 'remove':
                if (!isProtected) {
                    return <ProtectedWarning message="Protected: Please log in as an Admin on the main application page to enable this feature." />;
                }
                 return (
                    <>
                        <UserSearch handleSearch={handleSearch} searchEmail={searchEmail} setSearchEmail={setSearchEmail} isProtected={isProtected} />
                        {userToManage && (
                            <div className="mt-8 border border-red-300 p-8 rounded-2xl bg-red-50 shadow-md">
                                <h3 className="text-2xl font-semibold text-red-700 flex items-center mb-6">
                                    <Trash2 className="w-6 h-6 mr-3" /> Confirm Permanent Deletion
                                </h3>
                                <p className="text-slate-700 mb-8 font-medium">
                                    You are about to delete **{userToManage.fullName}** ({userToManage.email}, ID: {userToManage.id}). **This action cannot be undone.**
                                </p>
<<<<<<< HEAD
                                <button
=======
                                <button 
>>>>>>> b9af88de4cf77664ceb02d6e91d3861f62d6deb1
                                    onClick={handleDelete}
                                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-6 rounded-2xl transition-colors shadow-lg shadow-red-300/70 transform hover:scale-[1.01]"
                                >
                                    Permanently Delete User
                                </button>
                            </div>
                        )}
                    </>
                );
            default:
                return null;
        }
    };
<<<<<<< HEAD
   
=======
    
>>>>>>> b9af88de4cf77664ceb02d6e91d3861f62d6deb1
    // Main Render
    return (
        <div className="p-4 sm:p-8 bg-gray-50 min-h-screen text-slate-800 font-inter rounded-xl">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-extrabold mb-4 text-slate-900 tracking-tight">👤 User Management Hub</h1>
                <p className="text-slate-600 mb-8">Admin interface for user registration, updates, and deletion.</p>
<<<<<<< HEAD
               
=======
                
>>>>>>> b9af88de4cf77664ceb02d6e91d3861f62d6deb1
                {statusMessage.message && (
                    <div className={`p-4 border mb-6 text-sm font-semibold flex items-center ${getStatusClass()}`}>
                        {statusMessage.type === 'success' && <CheckCircle className="w-5 h-5 mr-3"/>}
                        {statusMessage.type === 'error' && <XCircle className="w-5 h-5 mr-3"/>}
                        {statusMessage.type === 'warning' && <AlertTriangle className="w-5 h-5 mr-3"/>}
                        {statusMessage.message}
                    </div>
                )}
<<<<<<< HEAD
               
=======
                
>>>>>>> b9af88de4cf77664ceb02d6e91d3861f62d6deb1
                {!adminToken && !isTokenLoading && (
                    <div className="p-4 bg-red-100 text-red-700 border border-red-300 rounded-xl mb-6 text-sm font-semibold">
                        ⚠️ AUTHENTICATION REQUIRED: Protected tabs require an Admin JWT. Please log in on the main application page (`localhost:5173/login`) to enable full functionality.
                    </div>
                )}
<<<<<<< HEAD
               
                <>
                    <div className="flex border-b border-slate-200 mb-8 overflow-x-auto">
                        <TabButton
                            icon={<UserPlus className="w-5 h-5 mr-3" />}
                            label="Add New User"
                            tabId="add"
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />
                        <TabButton
                            icon={<UserCog className="w-5 h-5 mr-3" />}
                            label="Update User"
                            tabId="update"
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            disabled={!adminToken}
                        />
                        <TabButton
                            icon={<UserX className="w-5 h-5 mr-3" />}
                            label="Remove User"
                            tabId="remove"
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            disabled={!adminToken}
                        />
                    </div>
 
=======
                
                <>
                    <div className="flex border-b border-slate-200 mb-8 overflow-x-auto">
                        <TabButton 
                            icon={<UserPlus className="w-5 h-5 mr-3" />} 
                            label="Add New User" 
                            tabId="add" 
                            activeTab={activeTab} 
                            setActiveTab={setActiveTab} 
                        />
                        <TabButton 
                            icon={<UserCog className="w-5 h-5 mr-3" />} 
                            label="Update User" 
                            tabId="update" 
                            activeTab={activeTab} 
                            setActiveTab={setActiveTab} 
                            disabled={!adminToken}
                        />
                        <TabButton 
                            icon={<UserX className="w-5 h-5 mr-3" />} 
                            label="Remove User" 
                            tabId="remove" 
                            activeTab={activeTab} 
                            setActiveTab={setActiveTab} 
                            disabled={!adminToken}
                        />
                    </div>

>>>>>>> b9af88de4cf77664ceb02d6e91d3861f62d6deb1
                    <div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200 border border-slate-100">
                        {isTokenLoading ? (
                            <p className="text-center py-12 text-slate-500 animate-pulse">Loading authentication status...</p>
                        ) : (
                            renderContent()
                        )}
                    </div>
                </>
            </div>
        </div>
    );
};
<<<<<<< HEAD
 
=======

>>>>>>> b9af88de4cf77664ceb02d6e91d3861f62d6deb1
export default AdminPage;