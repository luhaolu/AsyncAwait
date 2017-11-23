class HttpError extends Error {
    constructor(response) {
      super(`${response.status} for ${response.url}`);
      this.name = 'HttpError';
      this.response = response;
    }
  }
  
  async function loadJson(url) {
    let response = await fetch(url);
    if (response.status == 200) {
      return response.json();
    } else {
      throw new HttpError(response);
    }
  }
  
  // Ask for a user name until github returns a valid user
  async function getGithubUser() {
  
    let user;
    while(true) {
      let name = prompt("Enter a name?", "luhaolu");
  
      try {
        user = await loadJson(`https://api.github.com/users/${name}`);
        break; // no error, exit loop
      } catch(err) {
        if (err instanceof HttpError && err.response.status == 404) {
          // loop continues after the alert
          alert("No such user, please reenter.");
        } else {
          // unknown error, rethrow
          throw err;
        }
      }
    }

    var joinDate = new Date(user.created_at);
  
    // show the user info
    document.getElementById("icon").src = user.avatar_url;
    document.getElementById("name").innerHTML = user.name;
    document.getElementById("location").innerHTML = user.location;
    document.getElementById("url").href = user.html_url;
    document.getElementById("createdDate").innerHTML = "Join GitHub on " + joinDate.getDate() + "/" + (joinDate.getMonth() + 1) + "/" + joinDate.getFullYear();
    
    return user;
  }
  
 getGithubUser();
 