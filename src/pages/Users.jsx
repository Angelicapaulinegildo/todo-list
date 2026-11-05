import { useState } from 'react';
import axios from 'axios';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);

  // Function na pwedeng tawagin sa pamamagitan ng button
  const fetchUsers = () => {
    setLoading(true);
    setError(null);
    
    axios.get('https://dummyjson.com/users?limit=6')
      .then(res => {
        setUsers(res.data.users);
        setLoading(false);
        setHasFetched(true);
      })
      .catch(err => {
        setError('Failed to load user data from API.');
        setLoading(false);
      });
  };

  return (
    <div>
      <h1 className="text-2xl mb-2 font-serif">User Information (DummyJSON API)</h1>
      <p className="text-muted mb-6">Click the button below to retrieve sample users using Axios.</p>

      {/* KAPAG WALA PANG NAKUKUHA, IPAKITA YUNG BUTTON */}
      {!hasFetched && !loading && (
        <div className="text-center py-12 bg-white border border-border rounded-xl shadow-sm">
          <p className="text-muted mb-4">No data loaded yet.</p>
          <button 
            onClick={fetchUsers} 
            className="bg-navy text-white px-8 py-3 rounded-lg font-semibold hover:bg-navy/90 transition-colors"
          >
            Fetch Users from API
          </button>
        </div>
      )}

      {/* LOADING INDICATOR */}
      {loading && (
        <div className="text-center p-10 font-bold text-navy text-xl">
          Loading Users from API...
        </div>
      )}

      {/* ERROR MESSAGE */}
      {error && (
        <div className="text-center p-10 text-red-500 font-bold">
          {error}
        </div>
      )}

      {/* LISTAHAN NG USERS */}
      {hasFetched && !loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map(user => (
            <div key={user.id} className="bg-white border border-border p-6 rounded-xl flex flex-col items-center text-center shadow-sm">
              <img src={user.image} alt={user.firstName} className="w-20 h-20 rounded-full mb-4 border-2 border-navy" />
              <h2 className="text-lg font-bold text-ink">{user.firstName} {user.lastName}</h2>
              <p className="text-sm text-navy font-semibold">@{user.username}</p>
              <p className="text-sm text-muted mt-1">{user.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}