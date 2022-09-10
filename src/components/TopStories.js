import React, { useEffect, useState } from 'react';

function TopStories() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [topStories, setTopStories] = useState([]);

  useEffect(() => {
    fetch(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${process.env.REACT_APP_API_KEY}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        } else {
          return response.json()
        }
      })
      .then((jsonifiedResponse) => {
        setTopStories(jsonifiedResponse.results)
        setIsLoaded(true)
      })
      .catch((error) => {
        setError(error.message)
        setIsLoaded(true)
      });
  }, [])

  if (error) {                        // if theres a error - return error.
    return <h1>Error: {error}</h1>;  // As long as the error's default state of null isn't changed, this conditional won't be triggered. 
  } else if (!isLoaded) {              
    return <h1>...Loading...</h1>; // if isLoaded is false (!), render "..Loading.." message
  } else {
    return (         // return top stories 
      <React.Fragment>   
        <h1>TopStories</h1>   
        <ul>
          {topStories.map((article, index) =>
            <li key={index}>
              <h3>{article.title}</h3>
              <p>{article.abstract}</p>
            </li>
          )}
        </ul>
      </React.Fragment>
    );
  }

}

export default TopStories;

// .then(response => response.json())
//       .then((jsonifiedResponse) => {
//         setTopStories(jsonifiedResponse.results)
//         setIsLoaded(true)
//       })
//       .catch((error) => {
//         setError(error)
//         setIsLoaded(true)
//       });