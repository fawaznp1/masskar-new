import { useState, useEffect, useRef } from "react";
import { FaShoppingCart, FaSearch, FaBars, FaTimes, FaChevronDown, FaUser } from "react-icons/fa";
import "../../styles/Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

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
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        } catch (error) {
          console.error('Error parsing user data:', error);
          localStorage.removeItem('currentUser');
          setUser(null);
        }
      } else {
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
      const cartData = localStorage.getItem('cartItems');
      if (cartData) {
        try {
          const parsedCart = JSON.parse(cartData);
          setCartItems(Array.isArray(parsedCart) ? parsedCart : []);
        } catch (error) {
          console.error('Error parsing cart data:', error);
          localStorage.removeItem('cartItems');
          setCartItems([]);
        }
      } else {
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

  const loginOnClick = () => {
    window.location.href = '/login';
  };

  const logoutOnClick = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    window.location.href = '/';
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  const categories = [
    { path: "/", emoji: "", name: "Fresh Fish" },
    { path: "/perfumecard", emoji: "", name: "Perfumes" },
    { path: "/fruits", emoji: "", name: "Fresh Fruits" },
    { path: "/meatcard", emoji: "", name: "Premium Meat" }
  ];

  const cartItemCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          <div className="logo-container" onClick={() => handleNavigation('/')}>
            <div className="logo-image">
              <img 
                src="https://masskaronline.com/qfreshstyles/images/formbg.png" 
                alt="Masskar Logo" 
              />
            </div>
            <div className="logo-divider"></div>
            <span className="logo-text">
              Masskar
            </span>
          </div>

          <nav className="desktop-nav">
            <button onClick={() => handleNavigation('/')}>
              Home
            </button>
            <button onClick={() => handleNavigation('/about')}>
              About
            </button>
            <button onClick={() => handleNavigation('/locations')}>
              Locations
            </button>

            <div className="dropdown-container" ref={dropdownRef}>
              <button 
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                onMouseEnter={() => setCategoriesOpen(true)}
              >
                <span>Categories</span>
                <FaChevronDown className={`dropdown-icon ${categoriesOpen ? 'open' : ''}`} />
              </button>
              
              <div 
                className={`dropdown-menu ${categoriesOpen ? 'open' : ''}`}
                onMouseLeave={() => setCategoriesOpen(false)}
              >
                {categories.map((category) => (
                  <button
                    key={category.path}
                    onClick={() => {
                      handleNavigation(category.path);
                      setCategoriesOpen(false);
                    }}
                  >
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </nav>

          <div className="search-container">
            <form onSubmit={handleSearch}>
              <div className="search-input-container">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>

          <div className="action-buttons">
            {cartItemCount > 0 && (
              <button onClick={() => handleNavigation('/cart')}>
                <FaShoppingCart />
                <span className="cart-badge">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              </button>
            )}
            
            {user ? (
              <div className="user-section">
                <div className="user-info">
                  <FaUser />
                  <span>
                    {user.fullName || user.name || user.username}
                  </span>
                </div>
                <button onClick={logoutOnClick}>
                  Logout
                </button>
              </div>
            ) : (
              <button onClick={loginOnClick}>
                Login
              </button>
            )}

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

        {menuOpen && (
          <div className="mobile-menu">
            <button onClick={() => handleNavigation('/')}>
              Home
            </button>
            <button onClick={() => handleNavigation('/about')}>
              About
            </button>
            <button onClick={() => handleNavigation('/locations')}>
              Locations
            </button>
            <div>
              <button
                onClick={() => setCategoriesOpen(!categoriesOpen)}
              >
                <span>Categories</span>
                <FaChevronDown
                  className={`dropdown-icon ${categoriesOpen ? 'open' : ''}`}
                />
              </button>
              {categoriesOpen && (
                <div className="mobile-dropdown">
                  {categories.map((category) => (
                    <button
                      key={category.path}
                      onClick={() => {
                        handleNavigation(category.path);
                        setMenuOpen(false);
                      }}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {user ? (
              <div className="mobile-user-section">
                <div className="mobile-user-info">
                  <FaUser />
                  <span>
                    {user.fullName || user.name || user.username}
                  </span>
                </div>
                <button onClick={logoutOnClick}>
                  Logout
                </button>
              </div>
            ) : (
              <button onClick={loginOnClick}>
                Login
              </button>
            )}
          </div>
        )}
      </header>

      <div className="announcement-bar">
        <div className="marquee">
          <span>
            <marquee behavior="" direction="">📞 +91 9874563210 • ✉️ masskar@gmail.com • 🚚 Free delivery on orders above QR 20</marquee>
          </span>
        </div>
      </div>
    </>
  );
};

export default Header;