import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Developers() {
  const [devs, setDevs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const localTeamData = [
    {
      firstName: 'Angelica Pauline',
      lastName: 'Gildo',
      username: 'angelica', 
      email: 'angelicapauline.gildo@cvsu.edu.ph',
      role: 'Lead Developer',
      image: '/images/gildo.png', 
      link: 'https://portfolio-gildo.vercel.app/' 
    },
    {
      firstName: 'Anica',
      lastName: 'Cosares',
      username: 'anica',
      email: 'anica.cosares@cvsu.edu.ph',
      role: 'UI/UX Designer',
      image: '/images/cosares.png',
      link: 'https://anica-portfolio.vercel.app/'
    },
    {
      firstName: 'Jeanzen',
      lastName: 'Esquillo',
      username: 'jeanzen',
      email: 'jeanzen.esquillo@cvsu.edu.ph',
      role: 'Frontend Developer',
      image: '/images/esquillo.png',
      link: 'https://esqullio-portfolio.vercel.app/'
    },
    {
      firstName: 'Neilyn',
      lastName: 'Cenizal',
      username: 'neilynl',
      email: 'neilyn.cenizal@cvsu.edu.ph',
      role: 'QA / Documentation',
      image: '/images/cenizal.png',
      link: 'https://website-inky-nine-82.vercel.app/'
    }
  ];

  useEffect(() => {
    // Axios at DummyJSON
    axios.get('https://dummyjson.com/users?limit=4')
      .then(res => {
        // localTeamData, apiUsers, at combineddata
        const apiUsers = res.data.users;
        const combinedData = localTeamData.map((teamMember, index) => {
          return {
            ...teamMember,
            id: apiUsers[index].id,
            apiEmail: apiUsers[index].email 
          };
        });
        
        setDevs(combinedData);
        setLoading(false);
      })
      .catch(err => {
        setError('Error fetching developers from API. Please check your connection.');
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="text-center p-10 font-bold text-navy text-xl">
      Loading Developers...
    </div>
  );

  if (error) return (
    <div className="text-center p-10 text-red-500 font-bold">
      {error}
      <br />
      <Link to="/" className="text-navy underline mt-4 inline-block">Back to Dashboard</Link>
    </div>
  );

  return (
    <div>
      <h1 className="text-2xl mb-2 font-serif">Developers</h1>
      <p className="text-muted mb-6">The team behind this ToDoList application.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {devs.map((dev) => (
          <div key={dev.id} className="bg-white border border-border p-6 rounded-xl flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
            
            {/* Picture */}
            <img 
              src={dev.image} 
              alt={dev.firstName} 
              className="w-24 h-24 rounded-full mb-4 border-2 border-navy object-cover shadow-sm" 
            />
            
            {/* Pangalan Galing sa localTeamData */}
            <h2 className="text-xl font-serif text-ink">{dev.firstName} {dev.lastName}</h2>
            
            {/* ROLE */}
            <p className="text-xs font-semibold text-navy uppercase tracking-wider mt-1 mb-2">{dev.role}</p>
            
            {/* USERNAME AT EMAIL */}
            <p className="text-sm font-semibold text-gray-500 mb-1">@{dev.username}</p>
            <p className="text-sm text-muted mb-4">{dev.email}</p>

            {/* Link Button */}
            <a 
              href={dev.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-navy border border-border px-4 py-2 rounded-lg hover:bg-[#F8F5F0] transition-colors"
            >
              View Profile
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}