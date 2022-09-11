// We remove the useState hook and add the useReducer hook.
import React, { useEffect, useReducer } from 'react';
import topStoriesReducer from '../reducers/top-stories-reducer';
// We import our action creators.
import { getTopStoriesFailure, getTopStoriesSuccess } from '../actions/index';

// We create initial state for the useReducer hook.
const initialState = {
  isLoaded: false,
  topStories: [],
  error: null
};

function TopStories () {
  // We initialize the useReducer hook.
  const [state, dispatch] = useReducer(topStoriesReducer, initialState);

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
        // We create an action and then dispatch it.
        const action = getTopStoriesSuccess(jsonifiedResponse.results)
        dispatch(action);
      })
      .catch((error) => {
        // We create an action and then dispatch it. 
        const action = getTopStoriesFailure(error.message)
        dispatch(action);
      });
    }, [])

  // we destructure error, isLoaded, and topStories from the state variable.
  const { error, isLoaded, topStories } = state;

  if (error) {
    return <h1>Error: {error}</h1>;
  } else if (!isLoaded) {
    return <h1>...Loading...</h1>;
  } else {
    return (
      <React.Fragment>
        <h1>Top Stories</h1>
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

// old code 

// function TopStories() {
//   const [error, setError] = useState(null);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [topStories, setTopStories] = useState([]);

//   useEffect(() => {
//     fetch(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${process.env.REACT_APP_API_KEY}`)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`${response.status}: ${response.statusText}`);
//         } else {
//           return response.json()
//         }
//       })
//       .then((jsonifiedResponse) => {
//         setTopStories(jsonifiedResponse.results)
//         setIsLoaded(true)
//       })
//       .catch((error) => {
//         setError(error.message)
//         setIsLoaded(true)
//       });
//   }, [])

//   if (error) {                        // if theres a error - return error.
//     return <h1>Error: {error}</h1>;  // As long as the error's default state of null isn't changed, this conditional won't be triggered. 
//   } else if (!isLoaded) {              
//     return <h1>...Loading...</h1>; // if isLoaded is false (!), render "..Loading.." message
//   } else {
//     return (         // return top stories 
//       <React.Fragment>   
//         <h1>TopStories</h1>   
//         <ul>
//           {topStories.map((article, index) =>
//             <li key={index}>
//               <h3>{article.title}</h3>
//               <p>{article.abstract}</p>
//             </li>
//           )}
//         </ul>
//       </React.Fragment>
//     );
//   }

// }

// export default TopStories;
