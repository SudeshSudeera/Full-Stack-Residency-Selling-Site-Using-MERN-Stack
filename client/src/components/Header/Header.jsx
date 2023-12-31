import React, {useState} from 'react'
import './Header.css'
import { BiMenuAltRight } from 'react-icons/bi'
import { getMenuStyles } from "../../utils/common";
import useHeaderColor from "../../hooks/useHeaderColor";
import OutsideClickHandler from 'react-outside-click-handler'
import { useAuth0 } from '@auth0/auth0-react';
import { Link, NavLink } from 'react-router-dom';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import AddPropertyModal from '../AddPropertyModal/AddPropertyModal';
import useAuthCheck from '../../hooks/useAuthCheck'

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false)
  const {loginWithRedirect, isAuthenticated, user, logout} = useAuth0()
  const [modalOpened, setModalOpened] = useState(false)
  const headerColor = useHeaderColor()
  const {validateLogin} = useAuthCheck()
  const handleAddPropertyClick = () => {
    if(validateLogin()){
      setModalOpened(true)
    }
  }

  return (
    <section className="h-wrapper" style={{ background: headerColor }}>
        <div className="flexCenter paddings innerWidth h-container">

          <Link to="/">
            <img src="./logo.png" alt="logo" width={100} />
          </Link>

            <OutsideClickHandler
              onOutsideClick={()=>{
                setMenuOpened(false)
              }}
              >
              <div className="flexCenter h-menu"
              style={getMenuStyles(menuOpened)}
              >
                <NavLink to="/properties">Properties</NavLink>
                <a href="mailto:sudeshsudeera@gmail.com">Contact</a>

                {/* Add Property */}
                <div onClick={handleAddPropertyClick}>Add Property</div>
                <AddPropertyModal 
                  opened={modalOpened}
                  setOpened={setModalOpened}

                />

                {/* Login Button */}
                {
                  !isAuthenticated ? (
                  
                  <button className="button" onClick={loginWithRedirect}>
                    Login
                  </button> 
                  ) : (
                  <ProfileMenu user={user} logout={logout}/>

                )}

              </div>
            </OutsideClickHandler>
            <div className="menu-icon" onClick={()=>setMenuOpened((prev)=>!prev)}>
              <BiMenuAltRight size={30}/>
            </div>
        </div>
    </section>
  )
}

export default Header