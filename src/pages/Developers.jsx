export default function Developers() {

  const team = [
    { 
      name: 'Angelica Pauline M. Gildo', 
      role: 'Lead Developer', 
      desc: 'Built the overall layout and wrote the JavaScript logic.',
      image: 'public/gildo.png', 
      link: 'https://portfolio-gildo.vercel.app/'
    },
    { 
      name: 'Anica C. Cosares', 
      role: 'UI/UX Designer', 
      desc: 'Designed the cards, buttons, and color scheme.',
      image: 'public/cosares.png',
      link: 'https://anica-portfolio.vercel.app/'
    },
    { 
      name: 'Jeanzen D. Esquillo', 
      role: 'Frontend Developer', 
      desc: 'Handled the responsiveness for mobile and tablet devices.',
      image: 'public/esquillo.png', 
      link: 'https://esqullio-portfolio.vercel.app/'
    },
    { 
      name: 'Neilyn M. Cenizal', 
      role: 'QA / Documentation', 
      desc: 'Tested all the buttons and wrote the User Guide.',
      image: 'public/cenizal.png',
      link: 'https://website-inky-nine-82.vercel.app/'
    }
  ];

  return (
    <div>
      <h1 className="text-2xl mb-6 font-serif">Developers</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {team.map((member, i) => {
          // Gumagawa tayo ng initials kung sakaling walang image na nakalagay
          const initials = member.name.split(' ').map(n => n[0]).join('').toUpperCase();

          return (
            <div key={i} className="bg-white border border-border p-6 rounded-xl flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
              
              {/* PROFILE PICTURE O INITIALS */}
              {member.image ? (
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-20 h-20 rounded-full object-cover border-2 border-[#EAE5DD] mb-4 shadow-sm"
                />
              ) : (
                <div className="w-20 h-20 bg-[#EAE5DD] text-navy rounded-full flex items-center justify-center font-serif text-2xl font-bold mb-4 shadow-sm border-2 border-transparent">
                  {initials}
                </div>
              )}

              <h2 className="text-lg font-serif">{member.name}</h2>
              <div className="text-xs font-semibold text-navy uppercase tracking-wider mt-1 mb-3">{member.role}</div>
              <p className="text-muted text-sm leading-relaxed mb-6">{member.desc}</p>
              
              {/* LINK BUTTON */}
              <a 
                href={member.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-navy border border-border px-4 py-2 rounded-lg hover:bg-[#F8F5F0] transition-colors"
              >
                View Profile
                {/* External Link Icon */}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>

            </div>
          );
        })}
      </div>
    </div>
  );
}