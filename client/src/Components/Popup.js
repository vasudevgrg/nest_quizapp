
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hidePopup } from '../action';


const Popup = () => {
    console.log("insode popup");
  const dispatch = useDispatch();
  const { visible, message } = useSelector(state => state.managePopup);

  console.log(message+ " "+ visible);
  useEffect(() => {
    
    if (visible) {
      const timer = setTimeout(() => {
        dispatch(hidePopup());
      }, 5000); 


      return () => clearTimeout(timer);
    }
  }, [visible, dispatch]);

  if (!visible) return null;

  return (
    <div className="popup">
      <div className="popup-content">
        <p>{message}</p>
        <button onClick={() => dispatch(hidePopup())}>Close</button>
      </div>
    </div>
  );
};

export default Popup;
