// src/app/(dashboard)/dashboard/page.tsx
import { 
  FaPlus, FaBell, FaSearch, FaArrowUp, FaArrowDown, FaCalendarCheck, 
  FaUsers, FaBox, FaHome, FaMapMarkerAlt, FaVideo, FaFileInvoiceDollar, 
  FaPencilRuler, FaCouch, FaBoxes, FaCheck
} from 'react-icons/fa';

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-full bg-brand-background">
      {/* ===== HEADER ===== */}
      {/* <header className="flex-shrink-0 bg-brand-background p-5 border-b border-brand-border flex justify-between items-center sticky top-0 z-10">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-text_secondary" />
          <input type="text" placeholder="Search..." className="bg-brand-surface border border-brand-border rounded-lg py-2 pl-10 pr-4 w-96 focus:outline-none focus:ring-2 focus:ring-brand-primary" />
        </div>
        <div className="flex items-center gap-5">
          <button className="bg-brand-primary text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-opacity-90 transition-colors">
            <FaPlus /> Quick Add
          </button>
          <div className="relative text-brand-text_secondary">
            <FaBell size={22} />
            <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-brand-background"></div>
          </div>
          <div className="w-10 h-10 bg-brand-nav_active_bg text-brand-primary rounded-full flex items-center justify-center font-bold">
            SJ
          </div>
        </div>
      </header> */}
      
      {/* ===== PAGE CONTENT ===== */}
      <main className="flex-1 p-8 overflow-y-auto">
        <section className="mb-8">
          <h1 className="text-3xl font-bold text-brand-text_primary">Welcome back, Sarah!</h1>
          <p className="text-brand-text_secondary mt-1">You have 3 consultations this week and 5 active staging projects.</p>
        </section>

        {/* ===== STATS GRID ===== */}
        <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-brand-surface p-6 rounded-lg border border-brand-border shadow-sm"><h3 className="text-sm font-medium text-brand-text_secondary">Active Projects</h3><p className="text-3xl font-bold mt-2">12</p><p className="text-sm text-green-600 mt-2 flex items-center gap-1"><FaArrowUp/> +2 from last month</p></div>
          <div className="bg-brand-surface p-6 rounded-lg border border-brand-border shadow-sm"><h3 className="text-sm font-medium text-brand-text_secondary">Homes Staged This Month</h3><p className="text-3xl font-bold mt-2">8</p><p className="text-sm text-green-600 mt-2 flex items-center gap-1"><FaArrowUp/> +15% from last month</p></div>
          <div className="bg-brand-surface p-6 rounded-lg border border-brand-border shadow-sm"><h3 className="text-sm font-medium text-brand-text_secondary">Avg. Days on Market</h3><p className="text-3xl font-bold mt-2">18</p><p className="text-sm text-red-600 mt-2 flex items-center gap-1"><FaArrowDown/> -12% from last month</p></div>
          <div className="bg-brand-surface p-6 rounded-lg border border-brand-border shadow-sm"><h3 className="text-sm font-medium text-brand-text_secondary">Inventory in Use</h3><p className="text-3xl font-bold mt-2">65%</p><p className="text-sm text-brand-text_secondary mt-2">15 items available</p></div>
          <div className="bg-brand-surface p-6 rounded-lg border border-brand-border shadow-sm"><h3 className="text-sm font-medium text-brand-text_secondary">Revenue This Month</h3><p className="text-3xl font-bold mt-2">$28,450</p><p className="text-sm text-green-600 mt-2 flex items-center gap-1"><FaArrowUp/> +22% from last month</p></div>
        </section>
        
        {/* ===== QUICK ACTIONS ===== */}
        <section className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <button className="bg-brand-surface p-6 rounded-lg border border-brand-border shadow-sm text-center font-semibold text-brand-primary hover:bg-brand-nav_active_bg hover:-translate-y-1 transition-all duration-200 flex flex-col items-center gap-2"><FaUsers size={24}/> + New Client</button>
                <button className="bg-brand-surface p-6 rounded-lg border border-brand-border shadow-sm text-center font-semibold text-brand-primary hover:bg-brand-nav_active_bg hover:-translate-y-1 transition-all duration-200 flex flex-col items-center gap-2"><FaHome size={24}/> + New Project</button>
                <button className="bg-brand-surface p-6 rounded-lg border border-brand-border shadow-sm text-center font-semibold text-brand-primary hover:bg-brand-nav_active_bg hover:-translate-y-1 transition-all duration-200 flex flex-col items-center gap-2"><FaBox size={24}/> + Add Inventory</button>
                <button className="bg-brand-surface p-6 rounded-lg border border-brand-border shadow-sm text-center font-semibold text-brand-primary hover:bg-brand-nav_active_bg hover:-translate-y-1 transition-all duration-200 flex flex-col items-center gap-2"><FaCalendarCheck size={24}/> Book Consultation</button>
            </div>
        </section>

        {/* ===== PROJECT PIPELINE ===== */}
        <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-brand-text_primary">Project Pipeline</h2>
                <a href="#" className="font-semibold text-brand-primary hover:underline">View All Projects</a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Consult Column */}
                <div className="bg-[#fcfcfc] rounded-lg p-4 border-2 border-dashed border-purple-200 flex flex-col gap-4">
                    <div className="flex justify-between items-center"><h3 className="font-semibold">Consult</h3><span className="bg-gray-200 text-brand-primary text-xs font-semibold px-2 py-0.5 rounded-full">2</span></div>
                    <div className="bg-brand-surface p-4 rounded-lg border border-brand-border shadow-sm"><h4 className="font-bold flex justify-between items-center">Sarah Johnson <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-800">on track</span></h4><div className="text-sm text-brand-text_secondary mt-2 flex items-center gap-2"><FaMapMarkerAlt/> 123 Maple Street</div></div>
                    <div className="bg-brand-surface p-4 rounded-lg border border-brand-border shadow-sm"><h4 className="font-bold flex justify-between items-center">Mike Chen <span className="text-xs font-semibold px-2 py-1 rounded-full bg-red-100 text-red-800">urgent</span></h4><div className="text-sm text-brand-text_secondary mt-2 flex items-center gap-2"><FaVideo/> Virtual Consultation</div></div>
                </div>
                {/* Quote Column */}
                <div className="bg-[#fcfcfc] rounded-lg p-4 border-2 border-dashed border-yellow-200 flex flex-col gap-4">
                    <div className="flex justify-between items-center"><h3 className="font-semibold">Quote</h3><span className="bg-gray-200 text-brand-primary text-xs font-semibold px-2 py-0.5 rounded-full">1</span></div>
                    <div className="bg-brand-surface p-4 rounded-lg border border-brand-border shadow-sm"><h4 className="font-bold flex justify-between items-center">Emily Davis <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-800">on track</span></h4><div className="text-sm text-brand-text_secondary mt-2 flex items-center gap-2"><FaFileInvoiceDollar/> Staging Quote</div></div>
                </div>
                {/* Design Column */}
                <div className="bg-[#fcfcfc] rounded-lg p-4 border-2 border-dashed border-blue-200 flex flex-col gap-4">
                     <div className="flex justify-between items-center"><h3 className="font-semibold">Design</h3><span className="bg-gray-200 text-brand-primary text-xs font-semibold px-2 py-0.5 rounded-full">1</span></div>
                     <div className="bg-brand-surface p-4 rounded-lg border border-brand-border shadow-sm"><h4 className="font-bold flex justify-between items-center">Robert Wilson <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-800">on track</span></h4><div className="text-sm text-brand-text_secondary mt-2 flex items-center gap-2"><FaPencilRuler/> Design Planning</div></div>
                </div>
                {/* Staged Column */}
                <div className="bg-[#fcfcfc] rounded-lg p-4 border-2 border-dashed border-green-200 flex flex-col gap-4">
                    <div className="flex justify-between items-center"><h3 className="font-semibold">Staged</h3><span className="bg-gray-200 text-brand-primary text-xs font-semibold px-2 py-0.5 rounded-full">2</span></div>
                    <div className="bg-brand-surface p-4 rounded-lg border border-brand-border shadow-sm"><h4 className="font-bold flex justify-between items-center">Lisa Anderson <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-800">on track</span></h4><div className="text-sm text-brand-text_secondary mt-2 flex items-center gap-2"><FaCouch/> Full Staging</div></div>
                    <div className="bg-brand-surface p-4 rounded-lg border border-brand-border shadow-sm"><h4 className="font-bold flex justify-between items-center">David Thompson <span className="text-xs font-semibold px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">delayed</span></h4><div className="text-sm text-brand-text_secondary mt-2 flex items-center gap-2"><FaBoxes/> Partial Staging</div></div>
                </div>
            </div>
        </section>

        {/* ===== LOWER DASHBOARD ===== */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-brand-surface p-6 rounded-lg border border-brand-border shadow-sm">
                <h2 className="text-xl font-bold text-brand-text_primary mb-4">Upcoming Tasks</h2>
                <div className="space-y-4">
                    <div className="flex flex-col pb-4 border-b border-brand-border"><span className="font-semibold">Design consultation</span><span className="text-sm text-brand-text_secondary">Wilson residence - Today 2:00 PM</span></div>
                    <div className="flex flex-col pb-4 border-b border-brand-border"><span className="font-semibold">Staging setup</span><span className="text-sm text-brand-text_secondary">45 Elm Street - Tomorrow 9:00 AM</span></div>
                    <div className="flex flex-col"><span className="font-semibold">De-staging</span><span className="text-sm text-brand-text_secondary">123 Oak Avenue - Friday 11:00 AM</span></div>
                </div>
            </div>
            <div className="bg-brand-surface p-6 rounded-lg border border-brand-border shadow-sm">
                <h2 className="text-xl font-bold text-brand-text_primary mb-4">Recent Activity</h2>
                <div className="space-y-4">
                    <div className="flex items-center gap-4"><div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0"><FaCalendarCheck/></div><div className="flex-grow"><p className="font-semibold">Consultation booked with John D.</p></div><p className="text-sm text-brand-text_secondary flex-shrink-0">2 hours ago</p></div>
                    <div className="flex items-center gap-4"><div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0"><FaCheck/></div><div className="flex-grow"><p className="font-semibold">Staging completed at 45 Elm Street</p></div><p className="text-sm text-brand-text_secondary flex-shrink-0">4 hours ago</p></div>
                    <div className="flex items-center gap-4"><div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0"><FaPlus/></div><div className="flex-grow"><p className="font-semibold">New client inquiry received</p></div><p className="text-sm text-brand-text_secondary flex-shrink-0">6 hours ago</p></div>
                </div>
            </div>
        </section>
      </main>
    </div>
  );
}