// src/app/(main)/settings/page.tsx
'use client';

import { useState } from 'react';
import { Settings, User, Bell, Shield, Palette } from 'lucide-react';
import type { FC, ReactNode } from 'react';

// --- Reusable Helper Components ---
const ToggleSwitch = () => (
  <label className="relative inline-flex items-center cursor-pointer">
    <input type="checkbox" value="" className="sr-only peer" />
    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
  </label>
);

const SettingsCard: FC<{ title: string; icon: ReactNode; children: ReactNode }> = ({ title, icon, children }) => (
  <div className="bg-brand-surface p-6 rounded-lg border border-brand-border shadow-sm">
    <h2 className="text-xl font-bold text-brand-text_primary mb-6 flex items-center gap-2">
      {icon} {title}
    </h2>
    {children}
  </div>
);

// --- Tab Content Components ---
const ProfileSettings = () => (
  <SettingsCard title="Profile Settings" icon={<User size={20} />}>
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-brand-text_secondary">First Name</label>
          <input type="text" defaultValue="Sarah" className="mt-1 block w-full bg-brand-background border border-brand-border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-brand-primary" />
        </div>
        <div>
          <label className="text-sm font-medium text-brand-text_secondary">Last Name</label>
          <input type="text" defaultValue="Johnson" className="mt-1 block w-full bg-brand-background border border-brand-border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-brand-primary" />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-brand-text_secondary">Email</label>
        <input type="email" defaultValue="sarah@dazzlestaging.com" className="mt-1 block w-full bg-brand-background border border-brand-border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-brand-primary" />
      </div>
       <div>
        <label className="text-sm font-medium text-brand-text_secondary">Phone</label>
        <input type="tel" defaultValue="(555) 123-4567" className="mt-1 block w-full bg-brand-background border border-brand-border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-brand-primary" />
      </div>
      <div className="pt-2">
        <button className="bg-brand-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  </SettingsCard>
);

const NotificationSettings = () => (
  <SettingsCard title="Notification Preferences" icon={<Bell size={20} />}>
    <div className="divide-y divide-brand-border">
      <div className="py-4 flex justify-between items-center"><div className='max-w-md'>
          <h3 className="font-semibold text-brand-text_primary">New Client Inquiries</h3><p className="text-sm text-brand-text_secondary">Get notified when new clients submit contact forms</p></div><ToggleSwitch /></div>
      <div className="py-4 flex justify-between items-center"><div className='max-w-md'>
          <h3 className="font-semibold text-brand-text_primary">Task Deadlines</h3><p className="text-sm text-brand-text_secondary">Receive reminders 24 hours before task deadlines</p></div><ToggleSwitch /></div>
      <div className="py-4 flex justify-between items-center"><div className='max-w-md'>
          <h3 className="font-semibold text-brand-text_primary">Project Updates</h3><p className="text-sm text-brand-text_secondary">Get notified when project status changes</p></div><ToggleSwitch /></div>
      <div className="py-4 flex justify-between items-center"><div className='max-w-md'>
          <h3 className="font-semibold text-brand-text_primary">Team Activity</h3><p className="text-sm text-brand-text_secondary">Receive updates on team member actions</p></div><ToggleSwitch /></div>
      <div className="py-4 flex justify-between items-center"><div className='max-w-md'>
          <h3 className="font-semibold text-brand-text_primary">Inventory Alerts</h3><p className="text-sm text-brand-text_secondary">Get notified when inventory is low or needs maintenance</p></div><ToggleSwitch /></div>
    </div>
  </SettingsCard>
);

const SecuritySettings = () => (
  <SettingsCard title="Security Settings" icon={<Shield size={20} />}>
     <div className="space-y-4 max-w-md">
        <div>
          <label className="text-sm font-medium text-brand-text_secondary">Current Password</label>
          <input type="password" className="mt-1 block w-full bg-brand-background border border-brand-border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-brand-primary" />
        </div>
        <div>
          <label className="text-sm font-medium text-brand-text_secondary">New Password</label>
          <input type="password" className="mt-1 block w-full bg-brand-background border border-brand-border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-brand-primary" />
        </div>
        <div>
          <label className="text-sm font-medium text-brand-text_secondary">Confirm New Password</label>
          <input type="password" className="mt-1 block w-full bg-brand-background border border-brand-border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-brand-primary" />
        </div>
        <div className="pt-4 pb-4 border-t border-brand-border flex justify-between items-center">
            <div><h3 className="font-semibold text-brand-text_primary">Two-Factor Authentication</h3><p className="text-sm text-brand-text_secondary">Add an extra layer of security</p></div><ToggleSwitch />
        </div>
        <div className="pt-2">
            <button className="bg-brand-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors">
            Update Password
            </button>
      </div>
    </div>
  </SettingsCard>
);

const AppearanceSettings = () => (
  <SettingsCard title="Appearance Settings" icon={<Palette size={20} />}>
    <div className="divide-y divide-brand-border">
        <div className="py-4 flex justify-between items-center"><div>
          <h3 className="font-semibold text-brand-text_primary">Dark Mode</h3><p className="text-sm text-brand-text_secondary">Toggle between light and dark themes</p></div><ToggleSwitch /></div>
        <div className="py-4 flex justify-between items-center"><div>
          <h3 className="font-semibold text-brand-text_primary">Compact View</h3><p className="text-sm text-brand-text_secondary">Show more content in less space</p></div><ToggleSwitch /></div>
    </div>
  </SettingsCard>
);

// --- Main Page Component ---
export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('Profile');
  const tabs = ['Profile', 'Notifications', 'Security', 'Appearance'];

  const renderContent = () => {
    switch (activeTab) {
      case 'Profile': return <ProfileSettings />;
      case 'Notifications': return <NotificationSettings />;
      case 'Security': return <SecuritySettings />;
      case 'Appearance': return <AppearanceSettings />;
      default: return null;
    }
  };

  return (
    <div className="p-8 bg-brand-background min-h-full">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-brand-text_primary flex items-center gap-2">
          <Settings /> Settings
        </h1>
      </header>

      <nav className="flex items-center gap-2 mb-8 border-b border-brand-border">
        {tabs.map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)} 
            className={`font-semibold px-4 py-2 transition-colors border-b-2
              ${activeTab === tab 
                ? 'border-brand-primary text-brand-primary' 
                : 'border-transparent text-brand-text_secondary hover:text-brand-primary'
              }`}
          >
            {tab}
          </button>
        ))}
      </nav>

      <main>{renderContent()}</main>
    </div>
  );
}