import { useContext } from "react";
import { useParams } from "react-router-dom"
import { MovieContext } from "../contexts/MovieProvider";

export function MovieDetails()
{
    const {movieId} = useParams();
    const {movieList} = useContext(MovieContext);
    const reqdMovie = movieList?.find(({id})=>id==movieId);

    return (<div>
        <div className="all-detail-container">
        <img className="movie-poster" src = {reqdMovie?.imageURL} alt="movie-poster" />
        <div className="all-details">
            <h3>{reqdMovie?.title}</h3>
            <div>{reqdMovie?.summary}</div>
            <div>Year: {reqdMovie?.year}</div>
            <div>Genre: {reqdMovie?.genre.join(",")}</div>
            <div>Rating: {reqdMovie?.rating}</div>
            <div>Director: {reqdMovie?.director}</div>
            <div>Writer: {reqdMovie?.writer}</div>
            <div>Cast: {reqdMovie?.cast.join(",")}</div>
        </div>
        </div>

    </div>)
}