// src/components/Sidebar.tsx
'use client';

import Link from "next/link";
import Image from 'next/image';
import { usePathname } from "next/navigation"; // ✅ ADD THIS IMPORT
import { BarChart, Building, GanttChartSquare, Home, Package, Settings, Users } from "lucide-react";
import Logo from '../../../public/Bull_MANTRA.jpg'
const navItems = [
  // { name: 'Dashboard', href: '/dashboard', icon: Home },
  // { name: 'CRM', href: '/crm', icon: Users, count: 3 },
  // { name: 'Projects', href: '/projects', icon: GanttChartSquare },
  { name: 'Banners', href: '/inventory', icon: Package },
  { name: 'Courses', href: '/tasks', icon: Building},
  { name: 'Testimonials', href: '/reports', icon: BarChart },
  {name: 'Blogs', href: '/teams', icon: Users}
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 bg-brand-surface border-r border-brand-border flex flex-col">
      <div className="h-20 flex items-center px-6">
        
        <Image alt="" src={Logo} 
    className="object-cover" style={{height:90,width:'auto'}} />
       
        
      </div>
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
              ${pathname.startsWith(item.href)
                ? 'bg-brand-nav_active_bg text-brand-primary'
                : 'text-brand-text_secondary hover:bg-brand-nav_active_bg hover:text-brand-primary'
              }`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
            {item.count && (
              <span className="ml-auto bg-gray-200 text-brand-primary text-xs font-semibold px-2 py-0.5 rounded-full">
                {item.count}
              </span>
            )}
          </Link>
        ))}
      </nav>
      <div className="p-4 mt-auto">
        <Link 
          href="/settings" 
          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
            ${pathname === '/settings'
              ? 'bg-brand-nav_active_bg text-brand-primary'
              : 'text-brand-text_secondary hover:bg-brand-nav_active_bg hover:text-brand-primary'
            }`}
        >
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
}