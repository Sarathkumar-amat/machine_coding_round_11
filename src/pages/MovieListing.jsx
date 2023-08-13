import { useContext, useState } from "react"
import { MovieContext } from "../contexts/MovieProvider";
import { AddMovie } from "../components/AddMovie";
import { Link } from "react-router-dom";

export function MovieListing()
{
    const {movieList,setMovieList,handleAddWatchList,handleRemoveWatchList,watchList,searchText} = useContext(MovieContext);
    const [genreType,setGenre] = useState("allGenre");
    const [releaseYear,setYear] = useState("all");
    const [ratings,setRatings] = useState("all");
    const [addModal,setAddModal] = useState(false);

    let availableGenre = movieList?.reduce((initVal,current)=>[...initVal,...current.genre],[]);
    availableGenre = [...new Set(availableGenre)];
    const checkWatchList = (movieObj)=>{
        return watchList?.find(({id})=>id==movieObj.id)?true:false;
    }

    let displayMovies = movieList;
    if(genreType!=="allGenre")
    {
        displayMovies=displayMovies?.filter(({genre})=>genre.includes(genreType));
    }
    if(releaseYear!=="all")
    {
        if(releaseYear==="1990-2000")
        {
            displayMovies=displayMovies?.filter(({year})=>year>=1990 && year<=2000)
        }
        else if(releaseYear==="2001-2010")
        {
            displayMovies=displayMovies?.filter(({year})=>year>=2001 && year<=2010)
        }
        else if(releaseYear==="2011-2020")
        {
            displayMovies=displayMovies?.filter(({year})=>year>=2011 && year<=2020)
        }
        else if(releaseYear==="2021-2023")
        {
            displayMovies=displayMovies?.filter(({year})=>year>=2021 && year<=2023)
        }
    }
    if(ratings!=="all")
    {
        if(ratings==="less than 2")
        {
            displayMovies=displayMovies?.filter(({rating})=>rating<2);
        }
        else if(ratings==="2-5")
        {
            displayMovies=displayMovies?.filter(({rating})=>rating>=2 && rating<=5);
        }
        else if(ratings==="5-8")
        {
            displayMovies=displayMovies?.filter(({rating})=>rating>5 && rating<=8);
        }
        else if(ratings==="8-10")
        {
            displayMovies=displayMovies?.filter(({rating})=>rating>8 && rating<=10);
        }
    }
    if(searchText!=="")
    {
        displayMovies = displayMovies?.filter(({title,cast,director})=>{
            const titleSearch = title.toUpperCase().includes(searchText.toUpperCase());
            const castSearch = cast.includes(searchText);
            const directorSearch = director.toUpperCase().includes(searchText.toUpperCase());
            return titleSearch || castSearch || directorSearch;
        })
    }
    
    return (<div>
        
        {addModal && <AddMovie setModal={setAddModal}/>}
        <h3>Movies</h3>
        <select onChange={(e)=>setGenre(e.target.value)}>
            <option value="allGenre">All Genre</option>
            {availableGenre?.map(element=>
            <option value={element}>{element}</option>
            )}
        </select>
        <select onChange={(e)=>setYear(e.target.value)}>
            <option value="all">Release Year</option>
            <option value="1990-2000">1990 to 2000</option>
            <option value="2001-2010">2001 to 2010</option>
            <option value="2011-2020">2011 to 2020</option>
            <option value="2021-2023">2021 to 2023</option>
        </select>
        <select onChange={(e)=>setRatings(e.target.value)}>
            <option value="all">rating</option>
            <option value="less than 2">less than 2</option>
            <option value="2-5">2 to 5</option>
            <option value="5-8">5 to 8</option>
            <option value="8-10">Greater than 8</option>
        </select>
        <button  onClick={()=>setAddModal(true)}>Add Movie</button>
        
        <div className="movie-container">
            {displayMovies?.map((movie)=>{
                const {imageURL,summary,title } = movie;
                return (
                <div className="movie-card">
                    <img className="movie-image" src={imageURL} alt="movie-poster" />
                    <div>{title}</div>
                    <div>{summary}</div>
                    <div className="add-buttons">
                       {checkWatchList(movie) && <button onClick={()=>handleRemoveWatchList(movie)}>
                        Remove from watchList
                        </button>}
                        {!checkWatchList(movie) &&<button onClick={()=>handleAddWatchList(movie)}>Add to WatchList</button>}
                    </div>
                </div>)}
            )}
        </div>
    </div>)
}