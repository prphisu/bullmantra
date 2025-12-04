'use client';

import { useState, useEffect } from 'react';
import { Trash2, Plus, Edit, Image as ImageIcon, UploadCloud, X } from 'lucide-react';

interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail_url: string;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [fileError, setFileError] = useState('');

  // 1. Fetch Courses
  const fetchCourses = async () => {
    try {
      const res = await fetch('/api/courses');
      const data = await res.json();
      setCourses(data);
    } catch (error) {
      console.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // 2. Handle Image Upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileError('');
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        setFileError('Image too large (Max 2MB)');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setImageUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // 3. Handle Submit (Create or Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!imageUrl) {
        setFileError('Please select an image.');
        setIsSubmitting(false);
        return;
    }

    try {
      const method = editingId ? 'PUT' : 'POST';
      const body = { 
        id: editingId,
        title, 
        description, 
        price, 
        thumbnail_url: imageUrl 
      };

      const res = await fetch('/api/admin/courses', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        resetForm();
        fetchCourses();
      } else {
        alert('Failed to save course.');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 4. Handle Edit Click
  const handleEdit = (course: Course) => {
    setEditingId(course.id);
    setTitle(course.title);
    setDescription(course.description);
    setPrice(course.price.toString());
    setImageUrl(course.thumbnail_url);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 5. Handle Delete
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this course?')) return;
    try {
      const res = await fetch(`/api/admin/courses?id=${id}`, { method: 'DELETE' });
      if (res.ok) fetchCourses();
    } catch (error) {
      alert('Failed to delete');
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPrice('');
    setImageUrl('');
    setEditingId(null);
    setShowForm(false);
    setFileError('');
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">My Courses</h1>
        {!showForm && (
          <button 
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Plus size={20} /> Add Course
          </button>
        )}
      </div>

      {/* --- FORM SECTION --- */}
      {showForm && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-top-4">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold">
              {editingId ? 'Edit Course' : 'Create New Course'}
            </h2>
            <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 border rounded-lg" required />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full p-2 border rounded-lg h-24" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
              <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="w-full p-2 border rounded-lg" required />
            </div>

            {/* Image Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 relative">
                <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                {imageUrl ? (
                  <img src={imageUrl} alt="Preview" className="h-40 mx-auto object-cover rounded-lg" />
                ) : (
                  <div className="flex flex-col items-center text-gray-500">
                    <UploadCloud size={32} />
                    <span className="text-sm mt-1">Click to upload thumbnail</span>
                  </div>
                )}
              </div>
              {fileError && <p className="text-red-500 text-sm mt-1">{fileError}</p>}
            </div>

            <div className="md:col-span-2 flex gap-3 justify-end mt-4">
              <button type="button" onClick={resetForm} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
              <button type="submit" disabled={isSubmitting} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
                {isSubmitting ? 'Saving...' : (editingId ? 'Update Course' : 'Create Course')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* --- COURSES LIST --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
            <div className="relative h-48 bg-gray-100">
              <img src={course.thumbnail_url} alt={course.title} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-green-700">
                ₹{course.price}
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="font-bold text-gray-800 text-lg mb-1">{course.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">{course.description}</p>
              
              <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                <button onClick={() => handleEdit(course)} className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium">
                  <Edit size={16} /> Edit
                </button>
                <button onClick={() => handleDelete(course.id)} className="text-red-500 hover:text-red-700 flex items-center gap-1 text-sm font-medium">
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}