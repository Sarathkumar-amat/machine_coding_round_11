import { useContext, useReducer, useState } from "react"
import { MovieContext } from "../contexts/MovieProvider";
import { v4 as uuid } from "uuid";

function movieReducer(state,action)
{
    const {type,payload} = action;
    switch(type)
    {
        case "set_title":
            return {...state,title:payload};
        case "set_year":
            return {...state,year:Number(payload)};
        case "set_summary":
            return {...state,summary:payload};
        case "set_writer":
            return {...state,writer:payload};
        case "set_director":
            return {...state,director:payload};
        case "set_rating":
            return {...state,rating:Number(payload)};
        case "set_genre":
            return {...state,genre:payload};
        case "set_cast":
            return {...state,cast:payload};
        case "set_url":
            return {...state,imageURL:payload};
    }
}
export function AddMovie({setModal})
{
    const {movieList,setMovieList} = useContext(MovieContext);
    const [castList,setCastList] = useState([]);

    const [movieData,dispatchMovie] = useReducer(movieReducer,{
        title:"",year:"",cast:[],genre:[],writer:"",director:"",imageURL:"",rating:"",
    })
    const [currentCast,setCurrentCast] = useState("");
    const [genreList,setGenreList] = useState([]);
    const [currentGenre,setGenre] = useState("");
    const [isSubmit,setIsSubmit] = useState(false);
    const handleAddCast = (e)=>{
     
        if(currentCast!=="")
        {
            setCastList(prev=>[...prev,currentCast]);
            setCurrentCast("");
            dispatchMovie({type:"set_cast",payload:castList});
        }
        
    }
    const handleAddGenre = (e)=>{
       
        if(currentGenre!=="")
        {
            setGenreList(prev=>[...prev,currentGenre]);
            setGenre("");
            dispatchMovie({type:"set_genre",payload:genreList});
        } 
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(isSubmit)
        {
            const newList = [...movieList,{...movieData,id:uuid()}];
            setMovieList(newList);
            localStorage.setItem("allMovies",JSON.stringify(newList));
            setModal(false);
        }
    }
    return (<div className="add-movie-overlay">
        <div className="add-movie-container">
            <h3>Add a movie released after 1990</h3>
            <form onSubmit={(e)=>handleSubmit(e)} className="new-movie-form">
                <label>Movie Name</label>
                <input required onChange={(e)=>dispatchMovie({type:"set_title",payload:e.target.value})} type="text" />
                <label>Movie Summary</label>
                <input required onChange={(e)=>dispatchMovie({type:"set_summary",payload:e.target.value})} type="text" />
                <label>Director</label>
                <input required onChange={(e)=>dispatchMovie({type:"set_director",payload:e.target.value})} type="text" />
                <label>Cast</label>
                <div>
                    <input value={currentCast} onChange={(e)=>setCurrentCast(e.target.value)} className="cast-list" type="text" />
                    <button onClick={()=>handleAddCast()}>Add</button>
                    {castList?.map(element=>
                        <div>{element}</div>)}
                </div>
                <label>Genre</label>
                <div>
                <input value={currentGenre} onChange={(e)=>setGenre(e.target.value)} className="cast-list" type="text" />
                    <button onClick={()=>handleAddGenre()}>Add</button>
                    {genreList?.map(element=>
                        <div>{element}</div>)}
                </div>
                <label>Year</label>
                <input required onChange={(e)=>dispatchMovie({type:"set_year",payload:e.target.value})} type="number" />
                <label>Writer</label>
                <input required onChange={(e)=>dispatchMovie({type:"set_writer",payload:e.target.value})} type="text"/>
                <label>Rating</label>
                <input required onChange={(e)=>dispatchMovie({type:"set_rating",payload:e.target.value})} type="number"/>
                <label>Image url</label>
                <input required onChange={(e)=>dispatchMovie({type:"set_url",payload:e.target.value})} type="text"/>
                <input required onClick={()=>setIsSubmit(true)} type="submit" value="add movie"/>
            </form>
            <button onClick={()=>setModal(false)}>close</button>
        </div>
    </div>)
}