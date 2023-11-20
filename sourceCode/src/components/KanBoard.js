
import React, { useState, useEffect } from 'react';
import Ticket from './Ticket';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
} from "@fortawesome/free-solid-svg-icons"

const KanbanBoard = ({ tickets, groupingOption, sortingOption }) => {
  const [groupedTickets, setGroupedTickets] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        const data = await response.json();

        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const groupedData = groupTicketsByOption(tickets, groupingOption);
    const sortedData = sortTicketsByOption(groupedData, sortingOption);

    setGroupedTickets(sortedData);
  }, [tickets, groupingOption, sortingOption]);


  const groupTicketsByOption = (data, option) => {
    switch (option) {
      case 'status':
        return groupByStatus(data);
      case 'user':
        return groupByUser(data);
      case 'priority':
        return groupByPriority(data);
      default:
        return [];
    }
  };

  const sortTicketsByOption = (data, option) => {
    switch (option) {
      case 'priority':
        return sortByPriority(data);
      case 'title':
        return sortByTitle(data);
      default:
        return data;
    }
  };

  const groupByStatus = (data) => {
    const groupedData = {};

    data.forEach((ticket) => {
      const status = ticket.status;

      if (!groupedData[status]) {
        groupedData[status] = [];
      }

      groupedData[status].push(ticket);
    });

    return formatGroupedData(groupedData, 'Status');
  };
  const getGroupIcon= (column) => {
    switch (column) {
      case 'todo':
        return <FontAwesomeIcon icon={faCircle} />;
      case 'in progress':
        return 'In Progress';
      case 'backlog':
        return 'Backlog';
      default:
        return 'Unknown';
    }
  };
  const groupByUser = (data) => {
    const groupedData = {};

    data.forEach((ticket) => {
      const user = users.find((user) => user.id === ticket.userId);

      if (user) {
        const userName = user.name;

        if (!groupedData[userName]) {
          groupedData[userName] = [];
        }

        groupedData[userName].push(ticket);
      }
    });

    return formatGroupedData(groupedData, 'User');
  };

  const groupByPriority = (data) => {
    const groupedData = {};

    data.forEach((ticket) => {
      const priority = mapPriorityLabel(ticket.priority);

      if (!groupedData[priority]) {
        groupedData[priority] = [];
      }

      groupedData[priority].push(ticket);
    });

    return formatGroupedData(groupedData);
  };

  const mapPriorityLabel = (priority) => {
    switch (priority) {
      case 4:
        return 'No Priority';
      case 3:
        return 'Urgent';
      case 2:
        return 'High';
      case 1:
        return 'Medium';
      case 0:
        return 'Low';
      default:
        return 'Unknown';
    }
  };

  const formatGroupedData = (groupedData) => {
    return Object.keys(groupedData).map((key) => ({
      groupName: `${key}\u2002${groupedData[key].length}`,
      tickets: groupedData[key],
    }));
  };

  const groupTicketsByStatus = (status) => {
    return tickets.filter((ticket) => ticket.status === status);  
  };

  const sortByPriority = (data) => {
    return data.sort((a, b) => b.tickets[0].priority - a.tickets[0].priority);
  };

  const sortByTitle = (data) => {
    return data.sort((a, b) => a.tickets[0].title.localeCompare(b.tickets[0].title));
  };
  const styles={display: 'flex' ,justifyContent: 'space-between'}
  const styles1={color:'rgb(156, 154, 154)'
  }

  return (
    <div className="kanban-board">
      {groupedTickets.map((group, index) => (
        <div key={index} className="kanban-column">
          <div className='ticketHead' style={styles}>
          <span className={getGroupIcon(group.groupName)}>{group.groupName}</span>
          <span className='icon' style={styles1}>+ &ensp;...</span>
          </div>
          {group.tickets.map((ticket) => (
  <Ticket key={ticket.id} ticket={ticket} column={group.groupName.toLowerCase()} />
))}
        </div>
      ))}
      <div className="kanban-column">
        <div className='ticketHead' style={styles}>
          <span>Cancelled &ensp;{groupTicketsByStatus('Canceled').length}</span>
        </div>
        {groupTicketsByStatus('Canceled').map((ticket) => (
          <Ticket key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
