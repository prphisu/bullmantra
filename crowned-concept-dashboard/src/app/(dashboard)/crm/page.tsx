// src/components/ClientList.tsx
'use client';

import { useState, useEffect } from 'react';
import { Briefcase, Building, Home, MoreHorizontal, Plus } from 'lucide-react';

interface Client {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  role: 'Realtor' | 'Homeowner' | string; // 'Realtor' | 'Homeowner'
  property_address: string | null;
  property_type: string | null;
  budget: string | null;
  status: 'Consultation' | 'Quote Sent' | 'Won' | string;
  last_contact: string | null;
}

// Helper function to determine badge colors based on status
const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Won':
      return 'bg-green-100 text-green-700';
    case 'Quote Sent':
      return 'bg-yellow-100 text-yellow-700';
    case 'Consultation':
      return 'bg-blue-100 text-blue-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const getRoleBadge = (role: string) => {
  return role === 'Realtor' 
    ? 'bg-purple-100 text-purple-700' 
    : 'bg-indigo-100 text-indigo-700';
};

export default function ClientList() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  // MOCK DATA - Replace with API call later
  useEffect(() => {
    const mockClients: Client[] = [
      { id: '1', name: 'Sarah Johnson', email: 'sarah.johnson@email.com', phone: '(555) 123-4567', role: 'Realtor', property_address: '123 Maple Street', property_type: 'Detached', budget: '$3,000–$5,000', status: 'Consultation', last_contact: '1/10/2024' },
      { id: '2', name: 'Mike Chen', email: 'mike.chen@email.com', phone: '(555) 234-5678', role: 'Homeowner', property_address: '456 Oak Avenue', property_type: 'Condo', budget: '$1,500–$3,000', status: 'Quote Sent', last_contact: '1/12/2024' },
      { id: '3', name: 'Emily Davis', email: 'emily.davis@email.com', phone: '(555) 345-6789', role: 'Realtor', property_address: '789 Pine Road', property_type: 'Townhouse', budget: '$5,000–$9,000', status: 'Won', last_contact: '1/8/2024' },
    ];
    setClients(mockClients);
    setLoading(false);
  }, []);

  if (loading) return <p className="text-center">Loading clients...</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            CRM & Client Management
          </h1>
          <p className="text-sm text-gray-500">
            Manage clients, leads, and project relationships
          </p>
        </div>
        <button className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-700">
          <Plus size={16} />
          Add New Client
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200"><h3 className="text-gray-500 text-sm">Total Clients</h3><p className="text-2xl font-bold">24</p></div>
        <div className="bg-white p-4 rounded-lg border border-gray-200"><h3 className="text-gray-500 text-sm">New This Month</h3><p className="text-2xl font-bold">8</p></div>
        <div className="bg-white p-4 rounded-lg border border-gray-200"><h3 className="text-gray-500 text-sm">Conversion Rate</h3><p className="text-2xl font-bold">65%</p></div>
        <div className="bg-white p-4 rounded-lg border border-gray-200"><h3 className="text-gray-500 text-sm">Follow-ups due</h3><p className="text-2xl font-bold">12</p></div>
      </div>
      
      {/* Clients Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4">
          <h2 className="text-lg font-semibold">Clients</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left font-semibold text-gray-600">Client</th>
                <th className="p-3 text-left font-semibold text-gray-600">Type</th>
                <th className="p-3 text-left font-semibold text-gray-600">Property</th>
                <th className="p-3 text-left font-semibold text-gray-600">Budget</th>
                <th className="p-3 text-left font-semibold text-gray-600">Status</th>
                <th className="p-3 text-left font-semibold text-gray-600">Last Contact</th>
                <th className="p-3 text-left font-semibold text-gray-600"></th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-3">
                    <div className="font-bold">{client.name}</div>
                    <div className="text-xs text-gray-500">{client.email}</div>
                    <div className="text-xs text-gray-500">{client.phone}</div>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadge(client.role)}`}>
                      {client.role}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <Home size={16} className="text-gray-500" />
                      <div>
                        <div className="font-semibold">{client.property_address}</div>
                        <div className="text-xs text-gray-500">{client.property_type}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">{client.budget}</td>
                  <td className="p-3">
                     <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(client.status)}`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="p-3">{client.last_contact}</td>
                  <td className="p-3">
                    <button className="text-gray-500 hover:text-gray-800"><MoreHorizontal size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}