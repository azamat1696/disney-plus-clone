import React, { useEffect } from 'react';
import { auth, provider } from "../firebase";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { 
    selectUsername,
    selectUserPhoto,
    setUserLogin,
    setSingOut,
} from '../features/user/userSlice';
import {  useDispatch, useSelector } from 'react-redux';


function Header() {
    const dispatch = useDispatch();
    const history = useHistory();
    const userName = useSelector(selectUsername);
    const userPhoto = useSelector(selectUserPhoto);
    useEffect(()=>{
      auth.onAuthStateChanged(async (user) => {
          if (user) {
            dispatch(setUserLogin({
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
            }))
            history.push("/");
          }
      })
    }, [] )

    const signIn = () => {
        auth.signInWithPopup(provider)
        .then((result) => {
            let user = result.user;
            dispatch(setUserLogin({
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
            }))
            history.push("/");
        })
    }

    const signOut = () => {
        auth.signOut()
        .then(() => {
            dispatch(setSingOut());
            history.push("/login");
        })
    }

    return (
        <Nav>
            <Link to="/">
            <Logo src="/images/logo.svg" alt="Disney+" />
            </Link>
            {
               !userName ? ( 
                  <LoginContainer>
                      <Login onClick={signIn}>Login</Login>
                  </LoginContainer>

               ) :
               <>
               <NavMenu>
              
                <Link to='/counter'>
                <a>
                    <img src="/images/home-icon.svg" />
                    <span>HOME</span>
                </a>
                </Link>
                <a>
                    <img src="/images/search-icon.svg" />
                    <span>SEARCH</span>
                </a>
                <a>
                    <img src="/images/watchlist-icon.svg" />
                    <span>WACHLIST</span>
                </a>
                <a>
                    <img src="/images/original-icon.svg" />
                    <span>ORIGNALS</span>
                </a>
                <a>
                    <img src="/images/movie-icon.svg" />
                    <span>MOVIES</span>
                </a>
                <a>
                    <img src="/images/series-icon.svg" />
                    <span>SERIES</span>
                </a>

            </NavMenu>

            <UserImg onClick={signOut} src={userPhoto} />


               </>

            }

            
            
        </Nav>
    
    )
}

export default Header


const Nav = styled.nav`
height: 70px;
background: #090b13;
display: flex;
align-item: center;
padding: 0 36px
overflow-x: hidden;

`
const Logo = styled.img`
width: 80px;
margin: 0 40px;

`
const NavMenu = styled.div`
display: flex;
flex: 1;
margin:-left: 25px ;
align-items: center;
margin-left: 160px;

a{
    display:flex;
    align-items: center;
    padding: 0 12px;

    img {
        height: 20px;
        margin: 0 6px;

    }
    span {
        font-size: 13px;
        letter-spacing: 1.42px;
        position: relative;
        &:after {
            content: " ";
            height:2px;
            background:white;
            position: absolute; 
            left: 0;
            right: 0;
            bottom: -6px; 
            opacity: 0;
            transform-origin: left center;
            transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
            transform: scaleX(0);
        }
        
    }
    &:hover {
        span:after {
            transform: scaleX(1);
            opacity: 1;

        }
    }
    
}
`

const UserImg = styled.img`
width:48px;
height:48px;
border-radius:50%;
cursor: pointer;
padding-top: 11px;
margin-right: 40px;
`;
const Login = styled.a`
  border: 1px solid #f9f9f9;
  align-items: center;
  display: flex;
  padding: 8px 16px;
  border-radius: 4px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  background-color: rgba(0,0,0, 0.6);

  &:hover {
      background-color: #f9f9f9;
      color: #000;
      border-color: transparent;

  }
`;

const LoginContainer = styled.div`
flex: 1;
display: flex;
justify-content: flex-end;

`;