import React, { useState, useEffect } from "react";
import KanbanBoard from "./components/KanBoard";
import DisplayOptions from "./components/DisplayOptions";
import DashboardService from "./services/DashboardService";

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [groupingOption, setGroupingOption] = useState("status");
  const [sortingOption, setSortingOption] = useState("priority");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "kanbanViewState",
      JSON.stringify({ groupingOption, sortingOption })
    );
  }, [groupingOption, sortingOption]);

  const fetchDashboardData = async () => {
    let tickets = await DashboardService.fetchData();
    if (tickets == null) {
      alert("Something went wrong while fetching tickets");
    } else {
      setTickets(tickets);
    }
  };

  const handleGroupingChange = (option) => {
    setGroupingOption(option);
  };

  const handleSortingChange = (option) => {
    setSortingOption(option);
  };

  return (
    <div className="app">
      <div className="TopHeader"></div>
      <div className="controls">
        <DisplayOptions
          onGroupingChange={handleGroupingChange}
          onSortingChange={handleSortingChange}
        />
      </div>
      <div className="Content">
        <KanbanBoard
          tickets={tickets}
          groupingOption={groupingOption}
          sortingOption={sortingOption}
        />
      </div>
    </div>
  );
};

export default App;
