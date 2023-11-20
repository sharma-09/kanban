
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
} from "@fortawesome/free-solid-svg-icons"


const Ticket = ({ ticket}) => {
    const ticketStyle = {
        boxShadow: '1px 2px 3px 2px rgba(65, 64, 64, 0.1)', 
        borderRadius: '8px',
        background: 'white',
      };
    const styles1={border:'2px solid rgb(238, 237, 238)', textAlign:'center',marginRight:'30px',borderRadius:'5px' ,color:'rgb(121, 119, 119)',fontWeight:'600',padding:'5px 5px 5px 5px'}
    const styles2={display:'flex'}
    const styles3={border:'2px solid rgb(238, 237, 238)', textAlign:'center',marginRight:'30px',borderRadius:'5px' ,color:'rgb(121, 119, 119)',fontWeight:'800',padding:'2px 3px 8px 8px',fontSize:'13px',textAlign:'center'}
    return (
    <div className={`ticket priority-${ticket.priority}`} style={ticketStyle}>
      <div style={{display:'flex',justifyContent:'space-between'}}>
      <h2>{ticket.id}</h2>
        <FontAwesomeIcon icon={faUser} />
      </div>
      <h3>{ticket.title}</h3>
      <div style={styles2}>
      <h3 style={styles3}>... &ensp;</h3>
      <h3 style={styles1}>{ticket.tag}</h3>
      </div>
    </div>
  );
};

export default Ticket;
