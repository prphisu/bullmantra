'use client';

import { useState, useRef, useEffect } from 'react';
import { Bell, Plus, Search, UserPlus, Home, ClipboardList, Box, CircleUser, Settings, LogOut } from "lucide-react";
import Link from 'next/link';

export default function Header() {
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const quickAddRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (quickAddRef.current && !quickAddRef.current.contains(event.target as Node)) {
        setIsQuickAddOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [quickAddRef, profileRef]);

  return (
    <header className="flex-shrink-0 bg-brand-surface border-b border-brand-border p-4 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-text_secondary" size={18} />
          <input type="text" placeholder="Search..." className="bg-brand-background border border-brand-border rounded-lg py-2 pl-10 pr-4 w-96 focus:outline-none focus:ring-2 focus:ring-brand-primary" />
        </div>

        <div className="flex items-center gap-5">
          {/* Quick Add Dropdown */}
          <div className="relative" ref={quickAddRef}>
            <button
              onClick={() => setIsQuickAddOpen(!isQuickAddOpen)}
              className="bg-brand-primary text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-opacity-90 transition-colors"
            >
              <Plus size={16} /> Quick Add
            </button>
            {isQuickAddOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-brand-surface rounded-lg shadow-lg border border-brand-border z-20">
                <ul className="p-2 space-y-1">
                  <li><Link href="#" className="flex items-center gap-2 p-2 rounded-md hover:bg-brand-nav_active_bg text-sm font-medium text-brand-text_primary"><UserPlus size={16} /> New Client</Link></li>
                  <li><Link href="#" className="flex items-center gap-2 p-2 rounded-md hover:bg-brand-nav_active_bg text-sm font-medium text-brand-text_primary"><Home size={16} /> New Project</Link></li>
                  <li><Link href="#" className="flex items-center gap-2 p-2 rounded-md hover:bg-brand-nav_active_bg text-sm font-medium text-brand-text_primary"><ClipboardList size={16} /> New Task</Link></li>
                  <li><Link href="#" className="flex items-center gap-2 p-2 rounded-md hover:bg-brand-nav_active_bg text-sm font-medium text-brand-text_primary"><Box size={16} /> Add Inventory Item</Link></li>
                </ul>
              </div>
            )}
          </div>
          
          <div className="relative text-brand-text_secondary">
            <Bell size={22} />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white ring-2 ring-brand-surface">3</span>
          </div>
          
          {/* User Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <div
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="w-10 h-10 bg-brand-nav_active_bg text-brand-primary rounded-full flex items-center justify-center font-bold cursor-pointer"
            >
              SJ
            </div>
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-brand-surface rounded-lg shadow-lg border border-brand-border z-20">
                <div className="p-2 border-b border-brand-border">
                  <p className="font-semibold text-sm text-brand-text_primary">Sarah Johnson</p>
                  <p className="text-xs text-brand-text_secondary">sarah@dazzlestaging.com</p>
                </div>
                <ul className="p-2 space-y-1">
                  <li><Link href="#" className="flex items-center gap-2 p-2 rounded-md hover:bg-brand-nav_active_bg text-sm font-medium text-brand-text_primary"><CircleUser size={16} /> Profile</Link></li>
                  <li><Link href="/settings" className="flex items-center gap-2 p-2 rounded-md hover:bg-brand-nav_active_bg text-sm font-medium text-brand-text_primary"><Settings size={16} /> Settings</Link></li>
                  <li><button className="flex items-center gap-2 p-2 rounded-md hover:bg-brand-nav_active_bg text-sm font-medium text-brand-text_primary w-full text-left"><LogOut size={16} /> Log out</button></li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}