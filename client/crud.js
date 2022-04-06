//ONLY USED AS A TEMP FILE FOR NOW TO RUN SERVER.JS
export async function createTopic(name) {
    const response = await fetch(`/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name }),
    });
    const data = await response.json();
    return data;
  }
  
  export async function readTopic(name) {
    try {
      const response = await fetch(`/read?name=${name}`, {
        method: 'GET',
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  
  export async function updateTopic(name, analysis) {
    // TODO: Add your solution here.
    try {
      const response = await fetch(`/update?name=${name}&analysis=${analysis}`, {
        method: 'PUT',
      });
      const data = await response.json();
      return data;
    }
    catch(err) {
      console.log(err);
    }
  }
  
  export async function deleteTopic(name) {
    try {
      const response = await fetch(`/delete?name=${name}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      return data;
    }
    catch(err) {
      console.log(err);
    }
  }
  
  export async function readAllTopics() {
    const response = await fetch(`/dump`, {
      method: 'GET',
    });
    const data = await response.json();
    return data;
  }
  