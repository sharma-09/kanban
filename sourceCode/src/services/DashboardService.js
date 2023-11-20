const DashboardService = {
  fetchData: async () => {
    try {
      const response = await fetch(
        "https://api.quicksell.co/v1/internal/frontend-assignment"
      );
      const data = await response.json();
      if (data && data.tickets && Array.isArray(data.tickets)) {
        return data.tickets;
      } else {
        console.error(
          "API response does not contain an array of tickets:",
          data
        );
        return null;
      }
    } catch (error) {
      console.error("Error fetching data from the API:", error);
      return null;
    }
  },
};

export default DashboardService;