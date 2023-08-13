import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MovieContext } from "../contexts/MovieProvider";

export function NavBar()
{
    const {searchText,setSearch} = useContext(MovieContext);
    const navigate = useNavigate();
    return (<div>

        <div className="nav-container">
            
                <h3>IMDB</h3>
                <div>
                    <input size="40" onChange={(e)=>setSearch(e.target.value)} placeholder="Search movies by title, cast or director" type="text" />
                </div>
                <div>
                    <Link className="page-link" to="/">Movies</Link>
                    <Link className="page-link" to="/watchLater">Watch List</Link>
                </div>
           
        </div>
    </div>)
}