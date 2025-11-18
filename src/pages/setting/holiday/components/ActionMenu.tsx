import { useState, useRef, useEffect } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import classNames from 'classnames';

type ActionMenuProps = {
  onEdit: () => void;
  onDelete: () => void;
};

const ActionMenu = ({ onEdit, onDelete }: ActionMenuProps) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={() => setOpen(!open)} className="text-[#8F9BB3] hover:text-black p-4 ">
        ⋮
      </button>

      {open && (
        <div className="absolute top-4  right-2 mt-2 w-32 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
          <div
            onClick={() => {
              setOpen(false);
              onEdit();
            }}
            className={classNames(
              'flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-t-xl'
            )}
          >
            <Pencil size={16} className="text-gray-600" />
            <span className="text-sm text-gray-700">Edit</span>
          </div>
          <div
            onClick={() => {
              setOpen(false);
              onDelete();
            }}
            className={classNames(
              'flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-b-xl'
            )}
          >
            <Trash2 size={16} className="text-gray-600" />
            <span className="text-sm text-gray-700">Delete</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionMenu;
