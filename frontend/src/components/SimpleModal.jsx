import React from "react";

const SimpleModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 max-w-xs w-full relative transform scale-100 transition-all duration-300">
        <div className="absolute top-3 right-3">
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 w-8 h-8 rounded-xl flex items-center justify-center transition-all text-xl"
          >
            &times;
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default SimpleModal;