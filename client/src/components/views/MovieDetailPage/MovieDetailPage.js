import React, {useState, useEffect} from 'react';
import TopMovieSection from "../LandingPage/Sections/TopMovieSection";
import {API_KEY} from "../../Config";
import MovieInfoSection from "./Sections/MovieInfoSection";
import MovieActorSection from "./Sections/MovieActorSection";
import LikeSection from "./Sections/LikeSection";
import ReplySection from "./Sections/ReplySection";
import { Button } from 'antd';

function MovieDetailPage(props) {
    //////////////////////////////////////////////
    const [movie, setMovie] = useState({});
    const [replySectionState, setReplySectionState] = useState(false);

    const _onChangeReplySectionState = () =>{
        setReplySectionState(!replySectionState);
    }

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${props.match.params.movieId}?api_key=${API_KEY}&language=en-US`)
            .then(res => res.json())
            .then(res => {
                setMovie(res);
            });
    }, []);

    const movieDetailData = {
        movieId: props.match.params.movieId,
        title: movie.title,
        runtime: movie.runtime,
        vote_average: movie.vote_average,
    };

    console.log(movieDetailData);
    /////////////////////////////////////////////
    return (
        <div>
            <div>
                <TopMovieSection movie={movie}/>
            </div>
            <div style={{margin: '1.5rem'}}>
                <MovieInfoSection movie={movie}/>
            </div>
            <div>
                <LikeSection movieDetailData={movieDetailData}/>
            </div>
            <div>
                <div style={{margin: '1rem'}}>
                    <Button onClick = {_onChangeReplySectionState}type="primary">{replySectionState === false ? 'Open Reply' : ' Close Reply'}</Button>
                </div>
                {replySectionState&&
                <ReplySection/>
                }
            </div>
            <div style={{margin: '1rem'}}>
                <MovieActorSection movieId={movieDetailData.movieId}/>
            </div>
        </div>
    );
}

export default MovieDetailPage;