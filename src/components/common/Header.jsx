import { useState, useEffect, useRef } from "react";
import { FaShoppingCart, FaSearch, FaBars, FaTimes, FaChevronDown, FaUser, FaPhone, FaEnvelope, FaTruck } from "react-icons/fa";
import "../../styles/Header.css";
import { useSearch } from "./SearchContext";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const dropdownRef = useRef(null);
    const { searchTerm, setSearchTerm } = useSearch(); //to search from diff jsonss 


  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && !event.target.closest('.mobile-menu') && !event.target.closest('.mobile-toggle')) {
        setMenuOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setCategoriesOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpen]);

  useEffect(() => {
    const checkUserData = () => {
      const userData = localStorage.getItem('currentUser');
      try {
        const parsedUser = userData ? JSON.parse(userData) : null;
        setUser(parsedUser);
      } catch {
        localStorage.removeItem('currentUser');
        setUser(null);
      }
    };

    checkUserData();
    window.addEventListener('storage', checkUserData);
    window.addEventListener('focus', checkUserData);
    window.addEventListener('userUpdated', checkUserData);

    return () => {
      window.removeEventListener('storage', checkUserData);
      window.removeEventListener('focus', checkUserData);
      window.removeEventListener('userUpdated', checkUserData);
    };
  }, []);

  useEffect(() => {
    const checkCartData = () => {
      try {
        const cartData = JSON.parse(localStorage.getItem('cartItems') || '[]');
        setCartItems(Array.isArray(cartData) ? cartData : []);
      } catch {
        localStorage.removeItem('cartItems');
        setCartItems([]);
      }
    };

    checkCartData();
    window.addEventListener('storage', checkCartData);
    window.addEventListener('focus', checkCartData);
    window.addEventListener('cartUpdated', checkCartData);

    return () => {
      window.removeEventListener('storage', checkCartData);
      window.removeEventListener('focus', checkCartData);
      window.removeEventListener('cartUpdated', checkCartData);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  const loginOnClick = () => {
    window.location.href = '/login';
  };

  const logoutOnClick = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    window.location.href = '/';
  };

  const categories = [
    { path: "/", name: "Fresh Fish" },
    { path: "/category/meat", name: "Premium Meat" },
    { path: "/perfumecard", name: "Perfumes" },
    { path: "/fruits6", name: "Fresh Fruits" },
    
        { path: "/fruits", name: "Fresh Fruits" },
    { path: "/fruits1", name: "Fresh Fruits" },
    { path: "/fruits2", name: "Fresh Fruits" },
     { path: "/fruits3", name: "Fresh Fruits" },
    { path: "/fruits4", name: "Fresh Fruits" },
    { path: "/fruits5", name: "Fresh Fruits" },
    

  ];

  const cartItemCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  return (
    <div className="header-wrapper">
      {/* Announcement Bar */}
      <div className="announcement-bar">
        <div className="announcement-content">
          <div className="announcement-item">
            <FaPhone className="announcement-icon" />
            <span>+91 9874563210</span>
          </div>
          <div className="announcement-item">
            <FaEnvelope className="announcement-icon" />
            <span>masskar@gmail.com</span>
          </div>
          <div className="announcement-item highlight">
            <FaTruck className="announcement-icon" />
            <span>Free delivery on orders above QR 20</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          {/* Logo */}
          <div className="logo-container" onClick={() => handleNavigation('/')}>
            <div className="logo-image">
              <img src="https://masskaronline.com/qfreshstyles/images/formbg.png" alt="Masskar Logo" />
            </div>
            <span className="logo-text">Masskar</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <a onClick={() => handleNavigation('/')} className="nav-link">Home</a>
            <a onClick={() => handleNavigation('/about')} className="nav-link">About</a>
            <a onClick={() => handleNavigation('/locations')} className="nav-link">Locations</a>
            <div className="dropdown-container" ref={dropdownRef}>
              <a
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                onMouseEnter={() => setCategoriesOpen(true)}
                className="nav-link dropdown-trigger"
              >
                <span>Categories</span>
                <FaChevronDown className={`dropdown-icon ${categoriesOpen ? 'open' : ''}`} />
              </a>
              <div className={`dropdown-menu ${categoriesOpen ? 'open' : ''}`} onMouseLeave={() => setCategoriesOpen(false)}>
                {categories.map((cat) => (
                  <button key={cat.path} onClick={() => handleNavigation(cat.path)} className="dropdown-item">
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* Search Bar */}
          <div className="search-container">
            <div className="search-form">
              <div className="search-input-wrapper">
                <FaSearch className="search-icon" onClick={handleSearch} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                  className="search-input"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            {/* Cart Button */}
            {cartItemCount > 0 && (
              <button onClick={() => handleNavigation('/cart')} className="cart-button">
                <FaShoppingCart />
                <span className="cart-badge">{cartItemCount > 99 ? '99+' : cartItemCount}</span>
              </button>
            )}

            {/* User Section */} 
            {user ? (
              <div className="user-section">
                <div className="user-info">
                  <FaUser className="user-icon" />
                  <span className="user-name">{user.fullName || user.name || user.username}</span>
                </div>
                <button onClick={logoutOnClick} className="logout-button">Logout</button>
              </div>
            ) : (
              <button onClick={loginOnClick} className="login-button">Login</button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="mobile-toggle"
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(!menuOpen);
              }}
              aria-label="Toggle Menu"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="mobile-menu">
            <div className="mobile-menu-content">
              <button onClick={() => handleNavigation('/')} className="mobile-nav-item">Home</button>
              <button onClick={() => handleNavigation('/about')} className="mobile-nav-item">About</button>
              <button onClick={() => handleNavigation('/locations')} className="mobile-nav-item">Locations</button>
              
              <div className="mobile-dropdown-wrapper">
                <button onClick={() => setCategoriesOpen(!categoriesOpen)} className="mobile-nav-item">
                  <span>Categories</span>
                  <FaChevronDown className={`dropdown-icon ${categoriesOpen ? 'open' : ''}`} />
                </button>
                {categoriesOpen && (
                  <div className="mobile-dropdown">
                    {categories.map((cat) => (
                      <button key={cat.path} onClick={() => handleNavigation(cat.path)} className="mobile-dropdown-item">
                        {cat.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button className="mobile-cart-button" onClick={() => handleNavigation('/cart')}>
                <FaShoppingCart />
                {cartItemCount > 0 && (
                  <span className="cart-badge">{cartItemCount > 99 ? '99+' : cartItemCount}</span>
                )}
              </button>

              {user ? (
                <div className="mobile-user-section">
                  <div className="mobile-user-info">
                    <FaUser />
                    <span>{user.fullName || user.name || user.username}</span>
                  </div>
                  <button onClick={logoutOnClick} className="mobile-logout-button">Logout</button>
                </div>
              ) : (
                <button onClick={loginOnClick} className="mobile-login-button">Login</button>
              )}
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;