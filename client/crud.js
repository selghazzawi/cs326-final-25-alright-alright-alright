  export async function getTrendingTopics() {
    try {
      const response = await fetch(`/readTrending`, {
        method: 'GET',
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  export async function getInterests(email) {
    try {
      const response = await fetch(`/readInterest?email=${email}`, {
        method: 'GET',
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  export async function getTrendingAnalysis() {
    try {
      const response = await fetch(`/readTrendingAnalysis`, {
        method: 'GET',
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  //user adds new interest -> post to db -> get from db
  //on client -> create newInterest (updates all data) -> getalldata
  export async function createInterestTopic(email, arr) {
    const response = await fetch(`/createInterestAndTrending`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, args: arr }),
    });
    const data = response;
    return data;
  }

  export async function deleteInterestTopic(email, interest) {
    const response = await fetch(`/deleteInterest?email=${email}&interest=${interest}`, {
      method: 'DELETE',
    });
    const data = response
    return data;
  }

  export async function getTOD() {
    try {
      const response = await fetch(`/getTOD`, {
        method: 'GET',
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  export async function login(email, password) {
    try {
      const response = await fetch(`/checkUserLogin?email=${email}&password=${password}`, {
        method: 'GET',
      });
      const data = await response.json();
      return data;
    } catch (err) {
      return err
    }
  }

  export async function signUp(email, password) {
    const response = await fetch(`/createUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    const data = await response.json();
    return data;
  }

  //remove interest

