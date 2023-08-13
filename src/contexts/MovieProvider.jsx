import { createContext, useEffect, useState } from "react";
import { movies } from "../data/MovieData";
import { parse } from "uuid";

export const MovieContext = createContext();
export function MovieProvider({children})
{
    const [movieList,setMovieList] = useState(movies);
    const [watchList,setWatchList] = useState([]);
    const [searchText,setSearch] = useState("");
    
    const handleRemoveWatchList = (movieObj)=>{
        const newList = watchList?.filter(({id})=>id!=movieObj.id);
        setWatchList(newList);
        localStorage.setItem("localwatchList",JSON.stringify(newList));
    }
    
    const handleAddWatchList = (movieObj)=>{
        const newList = [...watchList,movieObj]
        setWatchList(prev=>[...prev,movieObj]);
        localStorage.setItem("localwatchList",JSON.stringify(newList));
    }
    useEffect(()=>{
        const moviesList = localStorage.getItem("allMovies");
        if(moviesList!==null)
        {
            setMovieList(JSON.parse(moviesList));
        }
        const localWatchList = localStorage.getItem("localwatchList");
        if(localWatchList!==null)
        {
            setWatchList(JSON.parse(localWatchList));
        }

    },[])
    return (
        <div>
            <MovieContext.Provider value={{searchText,setSearch,movieList,setMovieList,watchList,handleRemoveWatchList,handleAddWatchList}}>
                {children}
            </MovieContext.Provider>
        </div>)
}