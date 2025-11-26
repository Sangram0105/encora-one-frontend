import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, AlertCircle, CheckCircle, Plus, CheckSquare, MessageSquare, Search, Filter, Eye, Pencil, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import StatusBadge from '../components/ui/StatusBadge';
import CreateComplaintModal from '../components/modals/CreateComplaintModal';
import EditComplaintModal from '../components/modals/EditComplaintModal';
import UpdateStatusModal from '../components/modals/UpdateStatusModal';
import ViewComplaintModal from '../components/modals/ViewComplaintModal';
import DeleteConfirmationModal from '../components/modals/DeleteConfirmationModal';

const Dashboard = () => {
    const { user } = useAuth();
    
    // Modal States
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [complaintToDelete, setComplaintToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const [complaints, setComplaints] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    const isManager = user?.role === 'Manager';
    const isAdmin = user?.role === 'Admin';
    const canManage = isManager || isAdmin;

    const fetchComplaints = async () => {
        if (!user) return;
        
        try {
            let endpoint = '/Complaint/my-complaints';

            if (isAdmin) {
                endpoint = '/Complaint/all';
            } else if (isManager) {
                const deptId = user.deptId || 0;
                endpoint = `/Complaint/department/${deptId}`;
            }

            const res = await api.get(endpoint);
            setComplaints(res.data);
        } catch (error) {
            console.error("Failed to load complaints", error);
        }
    };

    useEffect(() => {
        fetchComplaints();
    }, [user]);

    const handleAction = () => fetchComplaints();

    // Handlers
    const openUpdateModal = (c) => { setSelectedComplaint(c); setIsUpdateModalOpen(true); };
    const openViewModal = (c) => { setSelectedComplaint(c); setIsViewModalOpen(true); };
    const openEditModal = (c) => { setSelectedComplaint(c); setIsEditModalOpen(true); };
    const initiateCancel = (id) => { setComplaintToDelete(id); setIsDeleteModalOpen(true); };

    const confirmDelete = async () => {
        if (!complaintToDelete) return;
        setIsDeleting(true);
        try {
            await api.delete(`/Complaint/${complaintToDelete}`);
            fetchComplaints();
            setIsDeleteModalOpen(false);
            setComplaintToDelete(null);
        } catch (error) {
            alert("Failed to cancel: " + (error.response?.data?.message || "Unknown error"));
        } finally {
            setIsDeleting(false);
        }
    };

    const filteredComplaints = complaints.filter(c => {
        const matchesSearch = 
            c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.complaintId.toString().includes(searchTerm);

        const normalize = (str) => str?.replace(/\s/g, '').toLowerCase() || '';
        const matchesStatus = statusFilter === 'All' || normalize(c.status) === normalize(statusFilter);

        return matchesSearch && matchesStatus;
    });

    // Calculate Stats for Overview Section
    const stats = [
        { label: 'Total', val: complaints.length, color: 'blue', icon: FileText },
        { label: 'Pending', val: complaints.filter(c => c.status === 'Pending').length, color: 'orange', icon: AlertCircle },
        { label: 'Resolved', val: complaints.filter(c => c.status === 'Resolved').length, color: 'emerald', icon: CheckCircle }
    ];

    return (
        <div className="space-y-8">
            {/* SECTION 1: OVERVIEW & STATS */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-800 mb-1">Dashboard</h2>
                        <p className="text-slate-500">Welcome back, {user?.fullName}.</p>
                    </div>
                    {!canManage && (
                        <button onClick={() => setIsCreateModalOpen(true)} className="px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-xl shadow-lg shadow-violet-500/25 transition-all flex items-center gap-2">
                            <Plus className="w-5 h-5" /> Raise Complaint
                        </button>
                    )}
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
                                    <h3 className="text-4xl font-bold text-slate-800 tracking-tight">{stat.val}</h3>
                                </div>
                                <div className={`p-3 bg-${stat.color}-50 text-${stat.color}-600 rounded-xl`}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* SECTION 2: FILTERS & LIST */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                    <h3 className="text-xl font-bold text-slate-800">
                        {isAdmin ? "System-Wide Grievances" : isManager ? "Department Grievances" : "My Recent Grievances"}
                    </h3>
                    
                    {/* Search & Filter Bar */}
                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search grievances..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
                            />
                        </div>
                        <div className="relative min-w-[140px]">
                            <Filter className="absolute left-3 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
                            <select 
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 cursor-pointer appearance-none"
                            >
                                <option value="All">All Status</option>
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Resolved">Resolved</option>
                                <option value="Returned">Returned</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* List */}
                <div className="space-y-3">
                    {filteredComplaints.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
                            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <FileText className="w-6 h-6 text-slate-400" />
                            </div>
                            <h3 className="text-base font-medium text-slate-900">No complaints found</h3>
                            <p className="text-sm text-slate-500 mt-1">Try adjusting filters or create a new one.</p>
                        </div>
                    ) : (
                        filteredComplaints.map((c) => (
                            <motion.div 
                                key={c.complaintId} 
                                initial={{ opacity: 0 }} 
                                animate={{ opacity: 1 }}
                                className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all group"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    {/* ID & Title Info */}
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500 font-bold text-xs flex-shrink-0">
                                            #{c.complaintId}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-800 group-hover:text-violet-600 transition-colors">
                                                {c.title}
                                            </h4>
                                            <p className="text-xs text-slate-500 mt-0.5">
                                                {canManage ? `By ${c.employeeName || 'Unknown'}` : c.departmentName} • {new Date(c.createdAt).toLocaleDateString()}
                                            </p>
                                            <p className="text-sm text-slate-600 mt-1 line-clamp-1">
                                                {c.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Status & Actions */}
                                    <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-50">
                                        <StatusBadge status={c.status} />
                                        
                                        <div className="flex items-center gap-1">
                                            <button onClick={() => openViewModal(c)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                                                <Eye className="w-4 h-4" />
                                            </button>

                                            {!canManage && c.status === 'Pending' && (
                                                <>
                                                    <button onClick={() => openEditModal(c)} className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Edit">
                                                        <Pencil className="w-4 h-4" />
                                                    </button>
                                                    <button onClick={() => initiateCancel(c.complaintId)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </>
                                            )}

                                            {canManage && (
                                                <button onClick={() => openUpdateModal(c)} className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ml-1">
                                                    <CheckSquare className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                
                                {c.managerRemarks && (
                                    <div className="mt-3 pl-14 text-xs text-slate-500 flex items-start gap-2">
                                        <MessageSquare className="w-3 h-3 mt-0.5" />
                                        <span className="italic">"{c.managerRemarks}"</span>
                                    </div>
                                )}
                            </motion.div>
                        ))
                    )}
                </div>
            </motion.div>
            
            {/* Modals */}
            <CreateComplaintModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} onComplaintCreated={handleAction} />
            <UpdateStatusModal isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)} complaint={selectedComplaint} onUpdate={handleAction} />
            <ViewComplaintModal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} complaint={selectedComplaint} />
            <EditComplaintModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} complaint={selectedComplaint} onUpdate={handleAction} />
            <DeleteConfirmationModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={confirmDelete} isDeleting={isDeleting} />
        </div>
    );
};

export default Dashboard;