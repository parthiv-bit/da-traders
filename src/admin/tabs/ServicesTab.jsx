import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Plus, 
  Trash2, 
  Edit, 
  Check, 
  X, 
  RefreshCw, 
  Loader2 
} from 'lucide-react';
import { 
  getProductsAndServices, 
  addProductOrService, 
  updateProductOrService, 
  deleteProductOrService 
} from '../../services/productService';

export default function ServicesTab() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState({ name: '', category: 'Painting Service', description: '', active: true });
  const [editingId, setEditingId] = useState(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await getProductsAndServices();
      setItems(data);
    } catch (err) {
      console.error('Failed to load services:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    try {
      if (editingId) {
        await updateProductOrService(editingId, form);
        setItems((prev) =>
          prev.map((it) => (it.id === editingId ? { ...it, ...form } : it))
        );
        setEditingId(null);
      } else {
        const created = await addProductOrService(form);
        setItems((prev) => [...prev, created]);
      }
      setIsAdding(false);
      setForm({ name: '', category: 'Painting Service', description: '', active: true });
    } catch (err) {
      alert('Error saving service: ' + err.message);
    }
  };

  const handleEdit = (it) => {
    setEditingId(it.id);
    setForm({
      name: it.name,
      category: it.category || 'Painting Service',
      description: it.description || '',
      active: it.active !== false,
    });
    setIsAdding(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this service/product item?')) return;
    try {
      await deleteProductOrService(id);
      setItems((prev) => prev.filter((it) => it.id !== id));
    } catch (err) {
      alert('Error deleting service: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-extrabold text-2xl text-paint-charcoal">
            Services &amp; Offerings ({items.length})
          </h2>
          <p className="text-xs text-paint-muted">
            Manage the offerings, equipment rentals, and painting services provided by DA Traders.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsAdding(!isAdding);
              setEditingId(null);
              setForm({ name: '', category: 'Painting Service', description: '', active: true });
            }}
            className="px-4 py-2 rounded-xl bg-paint-terracotta hover:bg-[#5E0E00] text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Offering</span>
          </button>

          <button
            onClick={fetchItems}
            className="px-3 py-2 rounded-xl bg-white border border-paint-border text-xs font-bold text-paint-charcoal hover:bg-paint-surfaceAlt flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Add / Edit Form Drawer/Box */}
      {isAdding && (
        <form onSubmit={handleSave} className="p-6 rounded-3xl bg-white border-2 border-paint-terracotta/40 shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-paint-border">
            <h3 className="font-display font-bold text-base text-paint-charcoal">
              {editingId ? 'Edit Offering' : 'Create New Offering'}
            </h3>
            <button
              type="button"
              onClick={() => {
                setIsAdding(false);
                setEditingId(null);
              }}
              className="text-paint-muted hover:text-paint-charcoal text-xs font-bold"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-paint-charcoal block">Name *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. High-Pressure Airless Sprayer"
                className="w-full px-3 py-2 rounded-xl bg-paint-surfaceAlt text-xs border border-paint-border focus:outline-none focus:border-paint-terracotta"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-paint-charcoal block">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-paint-surfaceAlt text-xs border border-paint-border focus:outline-none focus:border-paint-terracotta"
              >
                <option value="Painting Service">Painting Service</option>
                <option value="Rentals">Rentals</option>
                <option value="Artistic Decor">Artistic Decor</option>
                <option value="Logistics">Logistics</option>
                <option value="Paint Products">Paint Products</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-paint-charcoal block">Description</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Details about equipment specs, painter expertise, or delivery terms..."
              className="w-full px-3 py-2 rounded-xl bg-paint-surfaceAlt text-xs border border-paint-border focus:outline-none focus:border-paint-terracotta resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-paint-terracotta hover:bg-[#5E0E00] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{editingId ? 'Update Offering' : 'Save Offering'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Grid of Items */}
      {loading ? (
        <div className="py-20 text-center text-xs text-paint-muted flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-paint-terracotta" />
          <span>Loading offerings...</span>
        </div>
      ) : items.length === 0 ? (
        <div className="py-16 text-center rounded-3xl bg-white border border-paint-border text-xs text-paint-muted">
          <Package className="w-8 h-8 mx-auto text-paint-muted/50 mb-2" />
          <p className="font-bold text-paint-charcoal">No offerings recorded yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((it) => (
            <div
              key={it.id}
              className="p-5 rounded-3xl bg-white border border-paint-border space-y-3 flex flex-col justify-between hover:border-paint-terracotta/40 transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-paint-terracotta bg-[#821400]/10 px-2 py-0.5 rounded-md">
                    {it.category}
                  </span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      it.active !== false ? 'bg-emerald-500' : 'bg-stone-300'
                    }`}
                    title={it.active !== false ? 'Active' : 'Inactive'}
                  />
                </div>
                <h4 className="font-display font-bold text-base text-paint-charcoal">
                  {it.name}
                </h4>
                <p className="text-xs text-paint-muted leading-relaxed">
                  {it.description}
                </p>
              </div>

              <div className="pt-3 border-t border-paint-border flex items-center justify-end gap-2">
                <button
                  onClick={() => handleEdit(it)}
                  className="p-1.5 rounded-lg bg-paint-surfaceAlt hover:bg-stone-200 text-paint-charcoal transition-colors"
                  title="Edit"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(it.id)}
                  className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

