//ONLY USED AS A TEMP FILE FOR NOW TO RUN SERVER.JS
export async function createTrendingTopic(name) {
    const response = await fetch(`/createTrending`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name }),
    });
    const data = await response.json();
    return data;
  }

  export async function createInterestTopic(name) {
    const response = await fetch(`/createInterest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name }),
    });
    const data = await response.json();
    return data;
  }
  
  export async function readTrendingTopic(name) {
    try {
      const response = await fetch(`/readTrending?name=${name}`, {
        method: 'GET',
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  export async function readInterestTopic(name) {
    try {
      const response = await fetch(`/readInterest?name=${name}`, {
        method: 'GET',
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  
  export async function updateTrendingTopic(name, analysis) {
    // TODO: Add your solution here.
    try {
      const response = await fetch(`/updateTrending?name=${name}&analysis=${analysis}`, {
        method: 'PUT',
      });
      const data = await response.json();
      return data;
    }
    catch(err) {
      console.log(err);
    }
  }

  export async function updateInterestTopic(name, analysis) {
    // TODO: Add your solution here.
    try {
      const response = await fetch(`/updateInterest?name=${name}&analysis=${analysis}`, {
        method: 'PUT',
      });
      const data = await response.json();
      return data;
    }
    catch(err) {
      console.log(err);
    }
  }
  
  export async function deleteTrendingTopic(name) {
    try {
      const response = await fetch(`/deleteTrending?name=${name}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      return data;
    }
    catch(err) {
      console.log(err);
    }
  }

  export async function deleteInterestTopic(name) {
    try {
      console.log('bill')
      const response = await fetch(`/deleteInterest?name=${name}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      return data;
    }
    catch(err) {
      console.log(err);
    }
  }
  
  export async function readAllTrendingTopics() {
    const response = await fetch(`/dumpTrending`, {
      method: 'GET',
    });
    const data = await response.json();
    return data;
  }

  export async function readAllInterestTopics() {
    const response = await fetch(`/dumpInterest`, {
      method: 'GET',
    });
    const data = await response.json();
    return data;
  }
  