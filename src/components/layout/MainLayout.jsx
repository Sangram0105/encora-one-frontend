import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const MainLayout = () => {
    const { logout } = useAuth();

    return (
        <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
            {/* Common Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Mobile Header (Common for all pages) */}
                <header className="lg:hidden bg-white border-b border-slate-200 p-4 flex justify-between items-center shadow-sm z-10">
                    <div className="font-bold text-lg text-slate-800">EncoraOne</div>
                    <button onClick={logout}>
                        <LogOut className="w-5 h-5 text-slate-600" />
                    </button>
                </header>

                {/* Page Content (Injected here) */}
                <main className="flex-1 overflow-y-auto p-4 lg:p-10 bg-slate-50/50">
                    <div className="max-w-6xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MainLayout;