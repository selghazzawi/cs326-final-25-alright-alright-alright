// //ONLY USED AS A TEMP FILE FOR NOW TO RUN SERVER.JS
// export async function createTrendingTopic(name) {
//     const response = await fetch(`/createTrending`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ name: name }),
//     });
//     const data = await response.json();
//     return data;
//   }

//   export async function createInterestTopic(name) {
//     const response = await fetch(`/createInterest`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ name: name }),
//     });
//     const data = await response.json();
//     return data;
//   }
  
//   export async function readTrendingTopic(name) {
//     try {
//       const response = await fetch(`/readTrending?name=${name}`, {
//         method: 'GET',
//       });
//       const data = await response.json();
//       return data;
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   export async function readInterestTopic(name) {
//     try {
//       const response = await fetch(`/readInterest?name=${name}`, {
//         method: 'GET',
//       });
//       const data = await response.json();
//       return data;
//     } catch (err) {
//       console.log(err);
//     }
//   }
  
//   export async function updateTrendingTopic(name, analysis) {
//     // TODO: Add your solution here.
//     try {
//       const response = await fetch(`/updateTrending?name=${name}&analysis=${analysis}`, {
//         method: 'PUT',
//       });
//       const data = await response.json();
//       return data;
//     }
//     catch(err) {
//       console.log(err);
//     }
//   }

//   export async function updateInterestTopic(name, analysis) {
//     // TODO: Add your solution here.
//     try {
//       const response = await fetch(`/updateInterest?name=${name}&analysis=${analysis}`, {
//         method: 'PUT',
//       });
//       const data = await response.json();
//       return data;
//     }
//     catch(err) {
//       console.log(err);
//     }
//   }
  
//   export async function deleteTrendingTopic(name) {
//     try {
//       const response = await fetch(`/deleteTrending?name=${name}`, {
//         method: 'DELETE',
//       });
//       const data = await response.json();
//       return data;
//     }
//     catch(err) {
//       console.log(err);
//     }
//   }

//   export async function deleteInterestTopic(name) {
//     try {
//       console.log('bill')
//       const response = await fetch(`/deleteInterest?name=${name}`, {
//         method: 'DELETE',
//       });
//       const data = await response.json();
//       return data;
//     }
//     catch(err) {
//       console.log(err);
//     }
//   }
  
//   export async function readAllTrendingTopics() {
//     const response = await fetch(`/dumpTrending`, {
//       method: 'GET',
//     });
//     const data = await response.json();
//     return data;
//   }

//   export async function readAllInterestTopics() {
//     const response = await fetch(`/dumpInterest`, {
//       method: 'GET',
//     });
//     const data = await response.json();
//     return data;
//   }
  
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
    console.log('check1')
    const data = await response.json();
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
      console.log(err);
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

