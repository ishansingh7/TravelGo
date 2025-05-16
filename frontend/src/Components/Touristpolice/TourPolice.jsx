import React, { useState } from 'react';
import './css/TourPolice.css';

// Tourist police contact data with coordinates added
const helpServices = [
  { 
    country: 'Nepal', 
    title: 'Tourist Police (Kathmandu)', 
    contact: '+977-1-4247041, 1144 (Toll Free)', 
    email: 'touristpolice@nepalpolice.gov.np', 
    info: 'Bhrikutimandap, Kathmandu (Nepal Tourism Board)',
    lat: 27.7172, 
    lon: 85.3240
  },
  { 
    country: 'Nepal', 
    title: 'Tourist Police (Pokhara)', 
    contact: '+977-9851289444', 
    email: 'touristpolice@nepalpolice.gov.np', 
    info: 'Support in Pokhara city',
    lat: 28.2096, 
    lon: 83.9856
  },
  { 
    country: 'India', 
    title: 'Tourist Police (Delhi)', 
    contact: '+91-11-2341-2345', 
    email: 'delhi.tourist@police.in', 
    info: 'Assistance for tourists in Delhi',
    lat: 28.6139, 
    lon: 77.2090
  },
  { 
    country: 'India', 
    title: 'Tourist Helpline (India)', 
    contact: '1363', 
    email: 'support@touristhelpline.in', 
    info: '24/7 nationwide tourist support',
    lat: 20.5937, 
    lon: 78.9629
  },
  { 
    country: 'United States', 
    title: 'Tourist Police (New York)', 
    contact: '+1-212-639-7100', 
    email: 'nyc.tourist@nypd.org', 
    info: 'Support in New York',
    lat: 40.7128, 
    lon: -74.0060
  },
  { 
    country: 'United Kingdom', 
    title: 'Tourist Police (London)', 
    contact: '+44-20-7230-1212', 
    email: 'london.tourist@met.police.uk', 
    info: 'Assistance in London',
    lat: 51.5074, 
    lon: -0.1278
  },
  { 
    country: 'France', 
    title: 'Tourist Police (Paris)', 
    contact: '+33-1-53-71-53-71', 
    email: 'paris.tourist@police.gouv.fr', 
    info: 'Support in Paris',
    lat: 48.8566, 
    lon: 2.3522
  },
    {
    country: 'India',
    title: 'Tourist Police (Coimbatore Central)',
    contact: '+91-422-253-1234',
    email: 'coimbatore.central@police.in',
    info: 'Tourist assistance in central Coimbatore',
    lat: 11.0151,
    lon: 76.9584
  },
  {
    country: 'India',
    title: 'Tourist Police (Coimbatore West)',
    contact: '+91-422-254-5678',
    email: 'coimbatore.west@police.in',
    info: 'Support in western Coimbatore area',
    lat: 11.0185,
    lon: 76.9360
  },
  {
    country: 'India',
    title: 'Tourist Police (Coimbatore South)',
    contact: '+91-422-255-7890',
    email: 'coimbatore.south@police.in',
    info: 'Tourist help in southern Coimbatore',
    lat: 10.9985,
    lon: 76.9600
  },
  {
    country: 'India',
    title: 'Tourist Helpline (Coimbatore)',
    contact: '1363',
    email: 'support@touristhelpline.in',
    info: '24/7 tourist assistance',
    lat: 11.0168,
    lon: 76.9558
  },
  {
    country: 'India',
    title: 'Coimbatore City Police Headquarters',
    contact: '+91-422-253-5678',
    email: 'coimbatore.police@tn.gov.in',
    info: 'Main police HQ for Coimbatore',
    lat: 11.0170,
    lon: 76.9622
  },
  {
    country: 'India',
    title: 'Police Station (Polachi)',
    contact: '+91-422-278-1122',
    email: 'polachi.police@tn.gov.in',
    info: 'Police assistance in Polachi town',
    lat: 10.9032,
    lon: 77.0123
  },

  { 
    country: 'Germany', 
    title: 'Tourist Police (Berlin)', 
    contact: '+49-30-4664-4664', 
    email: 'berlin.polizei@polizei.berlin', 
    info: 'Assistance in Berlin',
    lat: 52.5200, 
    lon: 13.4050
  },
  { 
    country: 'Japan', 
    title: 'Tourist Police (Tokyo)', 
    contact: '+81-3-3503-8484', 
    email: 'tokyo.tourist@police.go.jp', 
    info: 'Assistance in Tokyo',
    lat: 35.6762, 
    lon: 139.6503
  },
  { 
    country: 'Australia', 
    title: 'Tourist Police (Sydney)', 
    contact: '+61-2-9265-6495', 
    email: 'sydney.tourist@police.nsw.gov.au', 
    info: 'Support in Sydney',
    lat: -33.8688, 
    lon: 151.2093
  }
];

// Haversine formula to calculate distance in km
const getDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = angle => angle * (Math.PI / 180);
  const R = 6371; // Earth radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Help Card Component
const HelpCard = ({ service, isNearby }) => (
  <div className={`help-card ${isNearby ? 'nearby' : ''}`}>
    <div className="card-front">
      <div className="card-header">
        <h3>{service.title}</h3>
        {isNearby && <span className="nearby-badge">Nearby</span>}
      </div>
      <div className="card-body">
        <p><i className="fas fa-flag"></i> {service.country}</p>
        <p><i className="fas fa-phone"></i> <a href={`tel:${service.contact}`}>{service.contact}</a></p>
        <p><i className="fas fa-envelope"></i> <a href={`mailto:${service.email}`}>{service.email}</a></p>
        <p><i className="fas fa-info-circle"></i> {service.info}</p>
        {service.distance && (
          <p className="distance-info">
            <i className="fas fa-map-marker-alt"></i> About {service.distance.toFixed(1)} km away
          </p>
        )}
      </div>
      <div className="card-footer">
        <button className="contact-btn" onClick={() => window.location.href = `tel:${service.contact}`}>
          <i className="fas fa-phone-alt"></i> Call Now
        </button>
        <button className="email-btn" onClick={() => window.location.href = `mailto:${service.email}`}>
          <i className="fas fa-envelope"></i> Email
        </button>
      </div>
    </div>
  </div>
);

// Query Box Component
const QueryBox = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', country: '', location: '', issueType: '', details: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    alert(`Grievance submitted successfully!\nWe'll contact you at ${formData.email}`);
    setFormData({ name: '', email: '', country: '', location: '', issueType: '', details: '' });
  };

  const uniqueCountries = [...new Set(helpServices.map(s => s.country))];

  return (
    <div className="query-box">
      <h2><i className="fas fa-exclamation-triangle"></i> Submit a Grievance</h2>
      <form onSubmit={handleSubmit}>
        {[
          { label: 'Name', icon: 'user', type: 'text', name: 'name' },
          { label: 'Email', icon: 'envelope', type: 'email', name: 'email' },
          { label: 'Location', icon: 'map-marker-alt', type: 'text', name: 'location', placeholder: 'City or specific location' }
        ].map(({ label, icon, ...props }) => (
          <div className="input-group" key={props.name}>
            <label htmlFor={props.name}><i className={`fas fa-${icon}`}></i> {label}</label>
            <input
              id={props.name}
              value={formData[props.name]}
              onChange={handleChange}
              placeholder={props.placeholder || label}
              required
              {...props}
            />
          </div>
        ))}
        <div className="input-group">
          <label><i className="fas fa-globe"></i> Country</label>
          <select name="country" value={formData.country} onChange={handleChange} required>
            <option value="">Select Country</option>
            {uniqueCountries.map((c, i) => <option key={i} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="input-group">
          <label><i className="fas fa-tag"></i> Type of Issue</label>
          <select name="issueType" value={formData.issueType} onChange={handleChange} required>
            <option value="">Select Issue Type</option>
            {['Theft', 'Harassment', 'Scam', 'Lost Property', 'Accident', 'Other'].map((type, i) => (
              <option key={i} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <label><i className="fas fa-comment-alt"></i> Details</label>
          <textarea
            name="details"
            value={formData.details}
            onChange={handleChange}
            placeholder="Describe your grievance in detail..."
            required
          />
        </div>
        <button type="submit" className="submit-query1">
          <i className="fas fa-paper-plane"></i> Submit Grievance
        </button>
      </form>
    </div>
  );
};

// Main Component
const TravelSafe = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [locationServices, setLocationServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [locationError, setLocationError] = useState(null);

  const handleFindLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }

    setIsLoading(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        // Filter services that have coordinates and calculate distances
        const nearby = helpServices
          .filter(service => service.lat && service.lon)
          .map(service => ({
            ...service,
            distance: getDistance(latitude, longitude, service.lat, service.lon)
          }))
          .sort((a, b) => a.distance - b.distance)
          .slice(0, 5); // Top 5 nearest

        setLocationServices(nearby);
        setSelectedCountry('');
        setSearchTerm('');
        setIsLoading(false);
      },
      (error) => {
        setIsLoading(false);
        setLocationError('Unable to retrieve your location. Please ensure location services are enabled.');
        console.error('Geolocation error:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const countries = [...new Set(helpServices.map(service => service.country))];

  const filteredServices = searchTerm
    ? helpServices.filter(service =>
        service.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.info.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : selectedCountry
      ? helpServices.filter(service => service.country === selectedCountry)
      : locationServices.length > 0
        ? locationServices
        : helpServices.filter(service => ['Nepal', 'India'].includes(service.country));

  return (
    <div className="travel-safe">
      <header className="travel-header">
        <div className="header-content">
          <h1><i className="fas fa-shield-alt"></i> TravelGo Safe Hub</h1>
          <p>Your safety is our priority - Connect with tourist police worldwide</p>
        </div>
      </header>
      
      <main>
        <section className="search-section">
          <div className="search-container">
            <div className="search-bar">
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Search by country, city or service..."
                value={searchTerm}
                onChange={e => {
                  setSearchTerm(e.target.value);
                  setSelectedCountry('');
                  setLocationServices([]);
                }}
              />
            </div>
            
            <div className="filter-controls">
              <div className="country-filter">
                <select
                  value={selectedCountry}
                  onChange={e => {
                    setSelectedCountry(e.target.value);
                    setSearchTerm('');
                    setLocationServices([]);
                  }}
                >
                  <option value="">All Countries</option>
                  {countries.map((country, index) => (
                    <option key={index} value={country}>{country}</option>
                  ))}
                </select>
              </div>
              
              <button 
                className={`gps-btn ${isLoading ? 'loading' : ''}`} 
                onClick={handleFindLocation}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Locating...
                  </>
                ) : (
                  <>
                    <i className="fas fa-map-marker-alt"></i> Find Nearby Help
                  </>
                )}
              </button>
            </div>
          </div>
          
          {locationError && (
            <div className="error-message">
              <i className="fas fa-exclamation-circle"></i> {locationError}
            </div>
          )}
        </section>

        <section className="help-services">
          <div className="section-header">
            <h2><i className="fas fa-phone-volume"></i> Tourist Police Contacts</h2>
            <p className="results-count">
              {filteredServices.length} {filteredServices.length === 1 ? 'service' : 'services'} found
              {locationServices.length > 0 && ' near you'}
            </p>
          </div>
          
          {filteredServices.length > 0 ? (
            <div className="help-grid">
              {filteredServices.map((service, index) => (
                <HelpCard 
                  key={index} 
                  service={service} 
                  isNearby={locationServices.some(s => s.title === service.title)}
                />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <i className="fas fa-exclamation-circle"></i>
              <p>No results found for "{searchTerm || selectedCountry}"</p>
              <button 
                className="try-again-btn"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCountry('');
                  setLocationServices([]);
                }}
              >
                Show all services
              </button>
            </div>
          )}
        </section>

        <section className="query-section">
          <div className="section-header">
            <h2><i className="fas fa-headset"></i> Need Help? File a Grievance</h2>
            <p>Report any issues you encounter while traveling</p>
          </div>
          <QueryBox />
        </section>
      </main>
      
     
    </div>
  );
};

export default TravelSafe;