// src/app/(main)/projects/page.tsx
import { 
  FaMapMarkerAlt, 
  FaComments, 
  FaVideo, 
  FaFileInvoiceDollar, 
  FaPencilRuler, 
  FaCouch, 
  FaBoxes,
  FaRegCalendarAlt
} from 'react-icons/fa';

// Mock data for the project pipeline
const pipelineData = {
  consult: [
    { name: 'Sarah Johnson', address: '123 Maple Street', task: 'Initial Consultation', date: '1/15/2024', status: 'on track' },
    { name: 'Mike Chen', address: '456 Oak Avenue', task: 'Virtual Consultation', date: '1/16/2024', status: 'urgent' },
  ],
  quote: [
    { name: 'Emily Davis', address: '789 Pine Road', task: 'Staging Quote', date: '1/18/2024', status: 'on track' },
  ],
  design: [
    { name: 'Robert Wilson', address: '321 Cedar Lane', task: 'Design Planning', date: '1/20/2024', status: 'on track' },
  ],
  staged: [
    { name: 'Lisa Anderson', address: '654 Birch Street', task: 'Full Staging', date: '1/25/2024', status: 'on track' },
    { name: 'David Thompson', address: '987 Elm Drive', task: 'Partial Staging', date: '1/22/2024', status: 'delayed' },
  ],
};

const statusStyles = {
  'on track': 'bg-green-100 text-green-800',
  'urgent': 'bg-red-100 text-red-800',
  'delayed': 'bg-yellow-100 text-yellow-800',
};

const columnStyles = {
  consult: 'border-purple-200',
  quote: 'border-yellow-200',
  design: 'border-blue-200',
  staged: 'border-green-200',
}

const getIconForTask = (task: string) => {
  if (task.includes('Consultation')) return <FaComments />;
  if (task.includes('Quote')) return <FaFileInvoiceDollar />;
  if (task.includes('Planning')) return <FaPencilRuler />;
  if (task.includes('Full Staging')) return <FaCouch />;
  if (task.includes('Partial Staging')) return <FaBoxes />;
  return <FaComments />;
}

export default function ProjectsPage() {
  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-brand-text_primary">Project Management</h1>
        <p className="text-brand-text_secondary mt-1">Track staging projects from consultation to completion</p>
      </header>

      <main>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {Object.entries(pipelineData).map(([columnId, projects]) => (
            <div key={columnId} className={`bg-[#fcfcfc] rounded-lg p-4 border-2 border-dashed ${columnStyles[columnId as keyof typeof columnStyles]} flex flex-col gap-4`}>
              <div className="flex justify-between items-center">
                <h3 className="font-semibold capitalize">{columnId}</h3>
                <span className="bg-gray-200 text-brand-primary text-xs font-semibold px-2 py-0.5 rounded-full">
                  {projects.length}
                </span>
              </div>

              {projects.map(project => (
                <div key={project.name} className="bg-brand-surface p-4 rounded-lg border border-brand-border shadow-sm">
                  <h4 className="font-bold flex justify-between items-center">
                    {project.name}
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusStyles[project.status as keyof typeof statusStyles]}`}>
                      {project.status}
                    </span>
                  </h4>
                  <div className="text-sm text-brand-text_secondary mt-3 space-y-2">
                    <div className="flex items-center gap-2"><FaMapMarkerAlt/> {project.address}</div>
                    <div className="flex items-center gap-2">{getIconForTask(project.task)} {project.task}</div>
                    <div className="flex items-center gap-2"><FaRegCalendarAlt/> {project.date}</div>
                  </div>
                </div>
              ))}
            </div>
          ))}

        </div>
      </main>
    </div>
  );
}