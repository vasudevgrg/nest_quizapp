import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const Navbar = () => {
    const [name, setName]= useState('');
    const [loggedIn, setLoggedIn]= useState(false);

    useEffect(() => {
        const userCookie = Cookies.get('user');
    
        if (userCookie) {
          try {
            const jsonString = userCookie.substring(2); 
            const parsedUser = JSON.parse(jsonString);
            console.log(parsedUser);

            setName(parsedUser.name);
            setLoggedIn(true);
          } catch (error) {
            console.error('Error parsing user cookie:', error);
          }
        }
      }, []);
    
  return (
   <>
   <nav style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly', alignItems:'center', backgroundColor:'grey'}}>
    <h1>Allen Distance Program</h1>
    <button>Analysis Page</button>
    {
        loggedIn && <div>Welcome {name}</div>
    }
     {
        !loggedIn && <button>Login</button>
    }
     {
        loggedIn && <button>SignOut</button>
    }
   </nav>
   </>
  )
}

export default Navbar