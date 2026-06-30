import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [currentContact, setCurrentContact] = useState({
    id: 0,
    name: '',
    email: '',
    phone: ''
  });

  // 1. Fetch all contacts from .NET Backend
  const fetchContacts = () => {
    axios.get('https://localhost:44356/api/Contact/GetAllContacts')
      .then(response => {
        const result = Array.isArray(response.data)
          ? response.data
          : (response.data.data || []);
        setContacts(result);
      })
      .catch(error => {
        console.error("API Error:", error);
        setContacts([]);
      });
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // 2. Handle Input Form Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentContact({ ...currentContact, [name]: value });
  };

  // 3. Open Modal for Add or Edit
  const openModal = (contact = null) => {
    if (contact) {
      setIsEditing(true);
      setCurrentContact(contact);
    } else {
      setIsEditing(false);
      setCurrentContact({ id: 0, name: '', email: '', phone: '' });
    }
    setIsModalOpen(true);
  };

  // 4. Submit Form (Create or Update)
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditing) {
      // Update Contact (PUT)
      axios.put(`https://localhost:44356/api/Contact/UpdateContact/${currentContact.id}`, currentContact)
        .then(() => {
          fetchContacts();
          setIsModalOpen(false);
          alert("Contact updated successfully! 🔄");
        })
        .catch(error => {
          console.error("Error updating contact:", error);
          alert("Failed to update contact. Please check console.");
        });
    } else {
      // Add New Contact (POST)
      const contactToSend = {
        id: 0,
        name: currentContact.name,
        email: currentContact.email,
        phone: currentContact.phone
      };

      axios.post('https://localhost:44356/api/Contact/AddContact', contactToSend)
        .then(() => {
          fetchContacts();
          setIsModalOpen(false);
          alert("Contact added successfully! 🎉");
        })
        .catch(error => {
          console.error("Error adding contact:", error);
          alert(`Failed to add contact. Status: ${error.response?.status || error.message}`);
        });
    }
  };

  // 5. Delete Contact (DELETE)
  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      axios.delete(`https://localhost:44356/api/Contact/DeleteContact/${id}`)
        .then(() => {
          fetchContacts();
          alert("Contact deleted successfully! 🗑️");
        })
        .catch(error => {
          console.error("Error deleting contact:", error);
          alert("Failed to delete contact.");
        });
    }
  };

  const handleLogout = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Navbar Section */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📱</span>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">Contact Hub Dashboard</h1>
        </div>
        <button 
          onClick={handleLogout}
          className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-all"
        >
          Logout 🚪
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto p-6 md:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">Welcome Back!</h2>
            <p className="text-slate-500 text-sm mt-1">Manage and keep track of all your professional contacts easily.</p>
          </div>
          <button 
            onClick={() => openModal()}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-lg shadow-blue-500/10 transition-all flex items-center gap-2"
          >
            <span>➕</span> Add New Contact
          </button>
        </div>

        {/* Contacts Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {contacts.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              <span className="text-4xl block mb-3">📁</span>
              <p className="font-medium text-slate-500">No contacts found!</p>
              <p className="text-xs text-slate-400 mt-1">Click the 'Add New Contact' button to get started.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 uppercase text-xs font-semibold tracking-wider border-b border-slate-200">
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Email Address</th>
                    <th className="px-6 py-4">Phone Number</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                  {contacts.map((contact) => (
                    <tr key={contact.id || contact.email} className="hover:bg-slate-50/80 transition-all">
                      <td className="px-6 py-4 font-medium text-slate-900">{contact.name}</td>
                      <td className="px-6 py-4 text-slate-500">{contact.email}</td>
                      <td className="px-6 py-4 font-mono text-slate-600">{contact.phone}</td>
                      <td className="px-6 py-4 text-right flex justify-end gap-3">
                        <button 
                          onClick={() => openModal(contact)}
                          className="px-3 py-1.5 text-blue-600 bg-blue-50 hover:bg-blue-100 font-medium rounded-lg transition-all"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(contact.id, contact.name)}
                          className="px-3 py-1.5 text-red-600 bg-red-50 hover:bg-red-100 font-medium rounded-lg transition-all"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Pop-up Form Modal (Add/Edit) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative transition-all border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              {isEditing ? "✏️ Edit Contact" : "🚀 Add New Contact"}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Name</label>
                <input 
                  type="text" name="name" required
                  value={currentContact.name} onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-800 placeholder:text-slate-400 text-sm transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Email</label>
                <input 
                  type="email" name="email" required
                  value={currentContact.email} onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-800 placeholder:text-slate-400 text-sm transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Phone</label>
                <input 
                  type="text" name="phone" required
                  value={currentContact.phone} onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-800 placeholder:text-slate-400 text-sm transition-all"
                  placeholder="+88017xxxxxxxx"
                />
              </div>

              {/* Action Buttons inside Modal */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100 mt-6">
                <button 
                  type="button" onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-xl font-medium text-sm transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium text-sm shadow-md transition-all"
                >
                  {isEditing ? "Update Contact" : "Save Contact"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}