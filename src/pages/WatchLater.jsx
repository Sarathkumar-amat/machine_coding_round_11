import { useContext } from "react"
import { MovieContext } from "../contexts/MovieProvider"

export function WatchLater()
{
    const {handleAddWatchList,handleRemoveWatchList,watchList} = useContext(MovieContext);
    const checkWatchList = (movieObj)=>{
        return watchList?.find(({id})=>id==movieObj.id)?true:false;
    }
    return (<div>
        <h3>Watch List movies</h3>
        {watchList?.length>0 && <div className="movie-container">
            {watchList?.map((movie)=>{
                const {imageURL,summary,title } = movie;
                return (
                <div className="movie-card">
                     <img className="movie-image" src={imageURL} alt="movie-poster" />
                    <div className="movie-title">{title}</div>
                    <div className="movie-summary">{summary}</div>
                    <div className="add-buttons">
                       {checkWatchList(movie) && <button onClick={()=>handleRemoveWatchList(movie)}>
                        Remove from watchList
                        </button>}
                        {!checkWatchList(movie) &&<button onClick={()=>handleAddWatchList(movie)}>Add to WatchList</button>}
                    </div>
                </div>)}
            )}
        </div>}
    </div>)

}