import React from 'react';
import { ExternalLink, HeartHandshake } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DonationMain = () => {
  const conservationOrgs = [
    {
        "name": "Bombay Natural History Society (BNHS)",
        "imageUrl": "https://www.bnhs.org",
        "description": "Promotes the conservation of nature and natural resources in India.",
        "impact": "Conducted numerous studies on Indian wildlife and ecology.",
        //"imageUrl": "/api/placeholder/400/300"
    },
    {
        "name": "Wildlife Institute of India (WII)",
        "imageUrl": "https://www.wii.gov.in",
        "description": "An autonomous institution under the Ministry of Environment, India.",
        "impact": "Trains wildlife managers and conducts scientific research.",
        //"imageUrl": "/api/placeholder/400/300"
    },
    {
        "name": "Botanical Survey of India (BSI)",
        "imageUrl": "http://bsi.gov.in",
        "description": "Researches the plant wealth of India.",
        "impact": "Cataloged thousands of Indian plant species.",
        //"imageUrl": "/api/placeholder/400/300"
    },
    {
        "name": "Zoological Survey of India (ZSI)",
        "imageUrl": "https://zsi.gov.in",
        "description": "Conducts surveys and studies of India's animal species.",
        "impact": "Published key documents on Indian fauna.",
        //"imageUrl": "/api/placeholder/400/300"
    },
    {
        "name": "Indian Institute of Sciences (IIS)",
        "imageUrl": "https://www.iisc.ac.in",
        "description": "A premier institute for advanced scientific research in India.",
        "impact": "Pioneered research in various scientific disciplines.",
        //"imageUrl": "/api/placeholder/400/300"
    },
    {
        "name": "Wildlife Protection Society of India (WPSI)",
        "imageUrl": "http://www.wpsi-india.org",
        "description": "Works to protect India's wildlife.",
        "impact": "Combats poaching and illegal wildlife trade.",
        //"imageUrl": "/api/placeholder/400/300"
    },
    {
        "name": "Central Zoo Authority (CZA)",
        "imageUrl": "http://www.cza.nic.in",
        "description": "Regulates zoos across India.",
        "impact": "Ensures high standards in zoo management.",
        //"imageUrl": "/api/placeholder/400/300"
    },
    {
        "name": "National Board for Wildlife (NBWL)",
        "imageUrl": "No dedicated website; operates under the Ministry of Environment, Forest and Climate Change",
        "description": "Advises on wildlife conservation policies in India.",
        "impact": "Developed key wildlife protection programs.",
        //"imageUrl": "/api/placeholder/400/300"
    },
    {
        "name": "Wildlife Trust of India (WTI)",
        "imageUrl": "https://www.wti.org.in",
        "description": "Works for wildlife protection and habitat restoration.",
        "impact": "Implemented community-based conservation programs.",
        //"imageUrl": "/api/placeholder/400/300"
    },

    {
        "name": "International Union for Conservation of Nature and Natural Resources (IUCN)",
        "imageUrl": "https://www.iucn.org",
        "description": "Provides data and guidance for conservation worldwide.",
        "impact": "Maintains the Red List of Threatened Species.",
        //"imageUrl": "/api/placeholder/400/300"
    },
    {
        "name": "Convention on International Trade in Endangered Species (CITES)",
        "imageUrl": "https://www.cites.org",
        "description": "Regulates international trade in endangered species.",
        "impact": "Protected numerous species from over-exploitation.",
        //"imageUrl": "/api/placeholder/400/300"
    },
    {
        "name": "United Nations Development Programme (UNDP)",
        "imageUrl": "https://www.undp.org",
        "description": "Works globally to eradicate poverty and protect the planet.",
        "impact": "Assisted countries in achieving sustainable development goals.",
        //"imageUrl": "/api/placeholder/400/300"
    },
    {
        "name": "Food and Agriculture Organization (FAO)",
        "imageUrl": "https://www.fao.org",
        "description": "Leads international efforts to combat hunger.",
        "impact": "Promotes sustainable agriculture and food security.",
        //"imageUrl": "/api/placeholder/400/300"
    },
    {
        "name": "TRAFFIC - Trade Records Analysis of Flora and Fauna in Commerce",
        "imageUrl": "https://www.traffic.org",
        "description": "Monitors wildlife trade to ensure it is not a threat to conservation.",
        "impact": "Combated illegal wildlife trade globally.",
        //"imageUrl": "/api/placeholder/400/300"
    },
    {
        "name": "United Nations Educational, Scientific and Cultural Organization (UNESCO)",
        "imageUrl": "https://www.unesco.org",
        "description": "Promotes international collaboration through education and science.",
        "impact": "Designated World Heritage Sites for natural conservation.",
        //"imageUrl": "/api/placeholder/400/300"
    },
    {
        "name": "World Wide Fund for Nature (WWF)",
        "imageUrl": "https://www.worldwildlife.org",
        "description": "Works globally for wildlife and nature conservation.",
        "impact": "Protected endangered species and restored habitats.",
        //"imageUrl": "/api/placeholder/400/300"
    },


    {
        "name": "International Commission on Zoological Nomenclature (ICZN)",
        "imageUrl": "https://www.iczn.org",
        "description": "Regulates the scientific naming of animals.",
        "impact": "Maintains stability in zoological nomenclature.",
        //"imageUrl": "/api/placeholder/400/300"
    },
    {
        "name": "International Commission on Botanical Nomenclature (ICBN)",
        "imageUrl": "https://www.iapt-taxon.org",
        "description": "Regulates the scientific naming of plants.",
        "impact": "Ensures consistency in botanical nomenclature.",
        //"imageUrl": "/api/placeholder/400/300"
    },
    {
        "name": "Global Tiger Forum (GTF)",
        "imageUrl": "https://www.globaltigerforum.org",
        "description": "An intergovernmental platform to protect tigers.",
        "impact": "Advocated for policies to double tiger populations.",
        //"imageUrl": "/api/placeholder/400/300"
    }
];

  const navigate = useNavigate();
  const handleDonateClick = () => {
    navigate('/donation1');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Hero Section */}
      <div style={{
        height: '400px',
        position: 'relative',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        textAlign: 'center',
        padding: '20px'
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%'
        }}>
          <HeartHandshake style={{ width: '64px', height: '64px', margin: '0 auto 16px', color: '#4ade80' }} />
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '16px' }}>
            Donate to Save a Life
          </h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px',color: '#ffffff'}}>
            Your contribution can make a difference in protecting wildlife and their habitats
          </p>
          <button 
            onClick={handleDonateClick}
            style={{ 
              backgroundColor: '#16a34a',
              color: 'white',
              padding: '16px 32px',
              fontSize: '1.125rem',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#15803d'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#16a34a'}
          >
            Make a Donation
            <span style={{ marginLeft: '8px', fontSize: '20px' }}>&#9825;</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 16px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
            Trusted Conservation Organizations
          </h2>
          <p style={{ fontSize: '1.125rem', color: '#4b5563', maxWidth: '800px', margin: '0 auto' }}>
            These organizations are making significant impacts in wildlife conservation. 
            You can donate directly through their platforms or use our donation system.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          {conservationOrgs.map((org, index) => (
            <div key={index} style={{ 
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              backgroundColor: 'white',
              overflow: 'hidden'
            }}>
              <div style={{ padding: '20px' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '8px'
                }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827' }}>{org.name}</h3>
                  <ExternalLink style={{ width: '20px', height: '20px', color: '#6b7280' }} />
                </div>
                <p style={{ color: '#16a34a', fontWeight: '500', marginBottom: '12px' }}>{org.impact}</p>
                <p style={{ color: '#4b5563', marginBottom: '16px' }}>{org.description}</p>
                <button 
                  style={{ 
                    width: '100%',
                    padding: '8px 16px',
                    border: '1px solid #16a34a',
                    borderRadius: '4px',
                    color: '#16a34a',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onClick={() => window.open(org.imageUrl, '_blank')}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#f0fdf4';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  Visit Website
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Impact Section */}
        
      </div>
    </div>
  );
};

export default DonationMain;