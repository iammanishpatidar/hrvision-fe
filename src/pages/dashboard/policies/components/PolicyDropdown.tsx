// components/PolicyDropdown.tsx

import { useState, useRef, useEffect } from 'react';
import { MoreVertical, Download, Check, FileText } from 'lucide-react';

type PolicyDropdownProps = {
  onDownload?: () => void;
  onAcknowledge?: () => void;
  onViewDescription?: () => void;
};

const PolicyDropdown = ({ onDownload, onAcknowledge, onViewDescription }: PolicyDropdownProps) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div
        onClick={() => setOpen(!open)}
        className="cursor-pointer hover:bg-gray-100 p-1.5 rounded-full"
      >
        <MoreVertical className="w-5 h-5 text-gray-500" />
      </div>

      {open && (
        <div className="absolute right-0 z-10 mt-2 w-40 rounded-md bg-white shadow-lg ring-1 ring-black/5">
          <div className="py-1 text-sm text-gray-700">
            <button
              onClick={onDownload}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full"
            >
              <Download size={16} /> Download
            </button>
            <button
              onClick={onAcknowledge}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full"
            >
              <Check size={16} /> Acknowledge
            </button>
            <button
              onClick={onViewDescription}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full"
            >
              <FileText size={16} /> Description
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PolicyDropdown;
