// src/app/(main)/team/page.tsx
import { 
  Plus,
  Users,
  CheckCircle2,
  Clock,
  Star,
  Mail,
  Phone,
  MapPin,
  Calendar
} from 'lucide-react';
import type { FC } from 'react';

// --- Mock Data ---
const teamData = [
  {
    initials: 'SJ',
    name: 'Sarah Johnson',
    role: 'Admin',
    status: 'Active',
    email: 'sarah@dazzlestaging.com',
    phone: '(555) 123-4567',
    location: 'Main Office',
    completed: 156,
    active: 8,
    rating: 4.9,
    memberSince: '1/15/2022',
  },
  {
    initials: 'MC',
    name: 'Mike Chen',
    role: 'Designer',
    status: 'Busy',
    email: 'mike@dazzlestaging.com',
    phone: '(555) 234-5678',
    location: 'Client Site',
    completed: 89,
    active: 5,
    rating: 4.7,
    memberSince: '3/20/2022',
  },
  {
    initials: 'ED',
    name: 'Emily Davis',
    role: 'Ops Manager',
    status: 'Active',
    email: 'emily@dazzlestaging.com',
    phone: '(555) 345-6789',
    location: 'Warehouse',
    completed: 134,
    active: 6,
    rating: 4.8,
    memberSince: '11/10/2021',
  },
];

const activityData = [
    { text: 'Sarah assigned a task to Mike', detail: 'Design consultation for Wilson residence', time: '2 hours ago' },
    { text: 'Emily completed inventory audit', detail: 'Warehouse A-12 monthly audit finished', time: '4 hours ago' },
    { text: 'David updated project status', detail: '45 Elm Street staging moved to ‘Complete’', time: '6 hours ago' },
    { text: 'Team meeting scheduled', detail: 'Weekly project review - Friday 10:00 AM', time: '1 day ago' },
];

// --- Helper Component for Team Member Cards ---
interface TeamMember {
  initials: string;
  name: string;
  role: string;
  status: string;
  email: string;
  phone: string;
  location: string;
  completed: number;
  active: number;
  rating: number;
  memberSince: string;
}

const TeamMemberCard: FC<{ member: TeamMember }> = ({ member }) => {
  const roleStyles: { [key: string]: string } = {
    Admin: 'bg-purple-100 text-purple-700',
    Designer: 'bg-blue-100 text-blue-700',
    'Ops Manager': 'bg-orange-100 text-orange-700',
  };
  const statusStyles: { [key: string]: string } = {
    Active: 'bg-green-100 text-green-700',
    Busy: 'bg-red-100 text-red-700',
  };

  return (
    <div className="bg-brand-surface p-6 rounded-lg border border-brand-border shadow-sm flex flex-col gap-4">
      {/* Card Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-brand-nav_active_bg text-brand-primary rounded-full flex items-center justify-center font-bold text-xl">
            {member.initials}
          </div>
          <div>
            <h3 className="font-bold text-lg text-brand-text_primary">{member.name}</h3>
            <span className={`text-xs font-semibold px-2 py-1 rounded-full mt-1 inline-block ${roleStyles[member.role]}`}>
              {member.role}
            </span>
          </div>
        </div>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusStyles[member.status]}`}>
          {member.status}
        </span>
      </div>
      {/* Contact Info */}
      <div className="text-sm text-brand-text_secondary space-y-2 border-t border-brand-border pt-4">
        <div className="flex items-center gap-2"><Mail size={14} /> {member.email}</div>
        <div className="flex items-center gap-2"><Phone size={14} /> {member.phone}</div>
        <div className="flex items-center gap-2"><MapPin size={14} /> {member.location}</div>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 border-t border-brand-border pt-4">
        <div className="text-center">
          <p className="text-2xl font-bold">{member.completed}</p>
          <p className="text-xs text-brand-text_secondary">Completed</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">{member.active}</p>
          <p className="text-xs text-brand-text_secondary">Active</p>
        </div>
      </div>
      {/* Rating */}
      <div className="flex items-center justify-center gap-2 border-t border-brand-border pt-4">
        <Star size={16} className="text-yellow-500" />
        <span className="font-bold">{member.rating}</span>
        <span className="text-sm text-brand-text_secondary">Since {member.memberSince}</span>
      </div>
    </div>
  );
};


// --- Main Page Component ---
export default function TeamPage() {
  return (
    <div className="p-8 bg-brand-background min-h-full">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-brand-text_primary">Team & Collaboration</h1>
          <p className="text-brand-text_secondary mt-1">Manage team members, roles, and permissions</p>
        </div>
        <button className="bg-brand-primary text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-opacity-90 transition-colors">
          <Plus size={16} /> Add Team Member
        </button>
      </header>

      <main>
        {/* Stats Cards */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-brand-surface p-5 rounded-lg border border-brand-border flex items-center gap-4">
                <Users className="text-blue-500" size={24} /><div><p className="text-3xl font-bold">4</p><h3 className="text-sm font-medium text-brand-text_secondary">Team Members</h3></div>
            </div>
            <div className="bg-brand-surface p-5 rounded-lg border border-brand-border flex items-center gap-4">
                <CheckCircle2 className="text-green-500" size={24} /><div><p className="text-3xl font-bold">2</p><h3 className="text-sm font-medium text-brand-text_secondary">Active Now</h3></div>
            </div>
            <div className="bg-brand-surface p-5 rounded-lg border border-brand-border flex items-center gap-4">
                <Clock className="text-orange-500" size={24} /><div><p className="text-3xl font-bold">22</p><h3 className="text-sm font-medium text-brand-text_secondary">Active Tasks</h3></div>
            </div>
            <div className="bg-brand-surface p-5 rounded-lg border border-brand-border flex items-center gap-4">
                <Star className="text-yellow-500" size={24} /><div><p className="text-3xl font-bold">4.7</p><h3 className="text-sm font-medium text-brand-text_secondary">Avg Rating</h3></div>
            </div>
        </section>

        {/* Team Member Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {teamData.map(member => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </section>

        {/* Recent Collaboration Activity */}
        <section className="bg-brand-surface p-6 rounded-lg border border-brand-border shadow-sm">
            <h2 className="text-xl font-bold text-brand-text_primary mb-2 flex items-center gap-2"><Calendar size={20}/> Recent Collaboration Activity</h2>
            <div className="divide-y divide-brand-border">
                {activityData.map(activity => (
                    <div key={activity.text} className="flex justify-between items-center py-4">
                        <div>
                            <p className="font-semibold text-brand-text_primary">{activity.text}</p>
                            <p className="text-sm text-brand-text_secondary">{activity.detail}</p>
                        </div>
                        <p className="text-sm text-brand-text_secondary flex-shrink-0">{activity.time}</p>
                    </div>
                ))}
            </div>
        </section>
      </main>
    </div>
  );
}