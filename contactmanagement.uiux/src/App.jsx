import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isEditing, setIsEditing] = useState(false);    
  
  
  const [currentContact, setCurrentContact] = useState({
    id: 0,
    name: '',
    email: '',
    phone: ''
  });

  
  const fetchContacts = () => {
    axios.get('https://contactmanagement-5lzg.onrender.com/api/Contact/GetAllContacts') 
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

 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentContact({ ...currentContact, [name]: value });
  };

  
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

 
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditing) {
     
      axios.put(`https://contactmanagement-5lzg.onrender.com/api/Contact/UpdateContact/${currentContact.id}`, currentContact)
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
      
      const contactToSend = {
        id: 0,
        name: currentContact.name,
        email: currentContact.email,
        phone: currentContact.phone
      };

      axios.post('https://contactmanagement-5lzg.onrender.com/api/Contact/AddContact', contactToSend)
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

  
  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      axios.delete(`https://contactmanagement-5lzg.onrender.com/api/Contact/DeleteContact/${id}`)
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

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6">
        
        {}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h1 className="text-3xl font-bold text-slate-800">👤 Contact Management System</h1>
          <button 
            onClick={() => openModal()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg transition shadow"
          >
            + Add New Contact
          </button>
        </div>

        {}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 uppercase text-sm border-b">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {contacts.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-8 text-slate-400">
                    No contacts found. Click "+ Add New Contact" to start!
                  </td>
                </tr>
              ) : (
                contacts.map((contact) => (
                  <tr key={contact.id || contact.email} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-4 font-medium">{contact.name}</td>
                    <td className="py-3 px-4">{contact.email}</td>
                    <td className="py-3 px-4">{contact.phone}</td>
                    <td className="py-3 px-4 text-center">
                      <button 
                        onClick={() => openModal(contact)}
                        className="text-blue-600 hover:text-blue-800 font-medium mr-3"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(contact.id, contact.name)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              {isEditing ? "Edit Contact" : "Add New Contact"}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Name</label>
                <input 
                  type="text" name="name" required
                  value={currentContact.name} onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Email</label>
                <input 
                  type="email" name="email" required
                  value={currentContact.email} onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Phone</label>
                <input 
                  type="text" name="phone" required
                  value={currentContact.phone} onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="+88017xxxxxxxx"
                />
              </div>

              {}
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button 
                  type="button" onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow transition"
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

export default App;