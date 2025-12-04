'use client';

import { useState, useEffect } from 'react';
import { Trash2, Plus, Image as ImageIcon, UploadCloud } from 'lucide-react';
import Image from 'next/image';

interface Banner {
  id: number;
  title: string;
  image_url: string;
  link_url?: string;
  is_active: boolean;
}

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [fileError, setFileError] = useState('');

  // 1. Fetch Banners on Load
  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const res = await fetch('/api/banners');
      const data = await res.json();
      setBanners(data);
    } catch (error) {
      console.error('Failed to load banners');
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle Image File Selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileError('');

    if (file) {
      // Check file size (limit to 2MB to avoid DB issues)
      if (file.size > 2 * 1024 * 1024) {
        setFileError('File size too large. Please select an image under 2MB.');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        // The result is a Base64 string that we can save directly to the DB
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 3. Handle Add Banner
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!imageUrl) {
        setFileError('Please select an image.');
        setIsSubmitting(false);
        return;
    }

    try {
      const res = await fetch('/api/admin/banners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, image_url: imageUrl, link_url: linkUrl }),
      });

      if (res.ok) {
        setTitle('');
        setImageUrl('');
        setLinkUrl('');
        fetchBanners();
      } else {
        alert('Failed to add banner. The image might be too large.');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 4. Handle Delete
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this banner?')) return;

    try {
      const res = await fetch(`/api/admin/banners?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setBanners(banners.filter((b) => b.id !== id));
      }
    } catch (error) {
      alert('Failed to delete');
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Website Banners</h1>

      {/* --- ADD BANNER FORM --- */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Plus size={20} className="text-blue-600" /> Add New Banner
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Banner Title</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. Diwali Sale 50% Off"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Link URL (Optional)</label>
            <input 
              type="text" 
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. /courses/technical-analysis"
            />
          </div>
          
          {/* IMAGE UPLOAD SECTION */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Banner Image</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors relative">
                <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                {imageUrl ? (
                    <div className="relative h-48 w-full max-w-md mx-auto rounded-lg overflow-hidden">
                        <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity">
                            Click to change image
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center text-gray-500">
                        <UploadCloud size={40} className="mb-2" />
                        <p className="text-sm font-medium">Click to upload or drag and drop</p>
                        <p className="text-xs">SVG, PNG, JPG or GIF (max. 2MB)</p>
                    </div>
                )}
            </div>
            {fileError && <p className="text-red-500 text-sm mt-1">{fileError}</p>}
          </div>
          
          <div className="md:col-span-2">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 w-full md:w-auto"
            >
              {isSubmitting ? 'Uploading & Adding...' : 'Add Banner'}
            </button>
          </div>
        </form>
      </div>

      {/* --- BANNERS LIST --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {banners.map((banner) => (
          <div key={banner.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group">
            <div className="relative h-48 w-full bg-gray-100">
               <img 
                 src={banner.image_url} 
                 alt={banner.title}
                 className="w-full h-full object-cover"
                 onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=No+Image'; }}
               />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-800">{banner.title}</h3>
              <p className="text-sm text-gray-500 truncate">{banner.link_url || 'No link'}</p>
              
              <div className="mt-4 flex justify-end">
                <button 
                  onClick={() => handleDelete(banner.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  title="Delete Banner"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {!loading && banners.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-400 bg-white rounded-xl border border-dashed border-gray-300">
            <ImageIcon className="mx-auto h-12 w-12 opacity-50 mb-2" />
            <p>No banners active. Add one above!</p>
          </div>
        )}
      </div>
    </div>
  );
}