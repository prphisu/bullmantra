'use client';

import { useState, useEffect } from 'react';
import { Trash2, Plus, Edit, UploadCloud, Star, X, Check } from 'lucide-react';

interface Testimonial {
  id: number;
  author_name: string;
  author_role: string;
  author_image: string;
  rating: number;
  comment: string;
  is_approved: boolean;
}

export default function TestimonialsPage() {
  const [reviews, setReviews] = useState<Testimonial[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form Data
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [rating, setRating] = useState('5');
  const [comment, setComment] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    // We use the public API to get them, but in a real app 
    // you might want an admin-specific GET to see unapproved ones too.
    // For now, let's reuse the public one or creating a specific GET in admin API is better.
    // Assuming we fetch from public for simplicity:
    const res = await fetch('/api/testimonials'); 
    if(res.ok) setReviews(await res.json());
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size < 2 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onloadend = () => setImageUrl(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      alert("File too large (Max 2MB)");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const method = editingId ? 'PUT' : 'POST';
      const body = { id: editingId, author_name: name, author_role: role, author_image: imageUrl, rating, comment, is_approved: true };
      
      const res = await fetch('/api/admin/testimonials', {
        method,
        body: JSON.stringify(body),
      });

      if (res.ok) {
        resetForm();
        fetchReviews();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (item: Testimonial) => {
    setEditingId(item.id);
    setName(item.author_name || '');
    setRole(item.author_role || '');
    setRating(item.rating.toString());
    setComment(item.comment);
    setImageUrl(item.author_image || '');
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this testimonial?")) return;
    await fetch(`/api/admin/testimonials?id=${id}`, { method: 'DELETE' });
    fetchReviews();
  };

  const resetForm = () => {
    setName(''); setRole(''); setRating('5'); setComment(''); setImageUrl('');
    setEditingId(null); setShowForm(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Testimonials</h1>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus size={20} /> Add Testimonial
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-xl shadow-sm border animate-in fade-in slide-in-from-top-4">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-bold">{editingId ? 'Edit Review' : 'New Review'}</h2>
            <button onClick={resetForm}><X /></button>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input placeholder="Client Name" value={name} onChange={e => setName(e.target.value)} className="p-2 border rounded" required />
            <input placeholder="Role (e.g. Student, Trader)" value={role} onChange={e => setRole(e.target.value)} className="p-2 border rounded" required />
            
            <div className="md:col-span-2">
              <textarea placeholder="Comment" value={comment} onChange={e => setComment(e.target.value)} className="w-full p-2 border rounded h-24" required />
            </div>

            <div>
              <label className="block text-sm mb-1">Rating</label>
              <select value={rating} onChange={e => setRating(e.target.value)} className="w-full p-2 border rounded">
                {[5,4,3,2,1].map(num => <option key={num} value={num}>{num} Stars</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm mb-1">Photo</label>
              <input type="file" onChange={handleImageChange} className="w-full" accept="image/*" />
            </div>

            <div className="md:col-span-2 flex justify-end">
              <button disabled={isSubmitting} className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50">
                {isSubmitting ? 'Saving...' : 'Save Review'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((t) => (
          <div key={t.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                {t.author_image ? <img src={t.author_image} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-400"><UploadCloud size={20}/></div>}
              </div>
              <div>
                <h4 className="font-bold">{t.author_name}</h4>
                <p className="text-xs text-gray-500">{t.author_role}</p>
              </div>
            </div>
            <div className="flex text-yellow-400 mb-2">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={i < t.rating ? "currentColor" : "none"} className={i >= t.rating ? "text-gray-300" : ""} />)}
            </div>
            <p className="text-gray-600 text-sm flex-1">{t.comment}</p>
            <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
              <button onClick={() => handleEdit(t)} className="p-2 text-blue-600 hover:bg-blue-50 rounded"><Edit size={18}/></button>
              <button onClick={() => handleDelete(t.id)} className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash2 size={18}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}