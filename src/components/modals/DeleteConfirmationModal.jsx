import React from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Loader2 } from 'lucide-react';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, isDeleting }) => {
    return ReactDOM.createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }} 
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100]" 
                        onClick={onClose} 
                    />
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        exit={{ opacity: 0, scale: 0.95 }} 
                        className="fixed inset-0 flex items-center justify-center z-[101] p-4 pointer-events-none"
                    >
                        <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl pointer-events-auto p-6 text-center">
                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <AlertTriangle className="w-6 h-6 text-red-600" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-800 mb-2">Cancel Complaint?</h3>
                            <p className="text-sm text-slate-500 mb-6">
                                Are you sure you want to cancel this grievance? This action cannot be undone.
                            </p>
                            <div className="flex gap-3 justify-center">
                                <button 
                                    onClick={onClose} 
                                    disabled={isDeleting}
                                    className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-50 rounded-lg transition-colors"
                                >
                                    Keep it
                                </button>
                                <button 
                                    onClick={onConfirm}
                                    disabled={isDeleting}
                                    className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 disabled:opacity-70"
                                >
                                    {isDeleting && <Loader2 className="w-4 h-4 animate-spin" />}
                                    Yes, Cancel it
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default DeleteConfirmationModal;