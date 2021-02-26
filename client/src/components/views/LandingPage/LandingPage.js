import React, {useEffect, useState} from 'react';
import Axios from "axios";
import {API_KEY} from "../../Config";
import * as PropTypes from "prop-types";
import TopMovieSection from "./Sections/TopMovieSection";
import MoreMovieSection from './Sections/MoreMovieSection';

function LandingPage() {
    const [movieList, setMovieList] = useState([]);
    const [topMovie, setTopMovie] = useState({});
    const [likeCount, setLikeCount] = useState(0);



    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
            .then(res => res.json())
            .then(res => {
                setMovieList(res.results);
                setTopMovie(res.results[0]);
            });
    }, []);

    return (
        <>
            {/*메인*/}
            <div>
                {/*<TopMovieSection image={`http://image.tmdb.org/t/p/w1280${topMovie.backdrop_path}`}/>*/}
                <TopMovieSection movie={topMovie}/>
            </div>
            <div>
                <MoreMovieSection movieList={movieList}/>
            </div>
        </>
    );
}

export default LandingPage;
