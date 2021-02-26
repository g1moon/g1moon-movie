import React, {useEffect, useState} from 'react';
import {Button} from 'antd';
import axios from "axios";
import Axios from 'axios';

function LikeSection(props) {
    const movieDetailData = props.movieDetailData;
    const [likeState, setLikeState] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    useEffect(() => {

        let variables = {
            'movieId': movieDetailData.movieId,
            'userId': localStorage.getItem('userId')
        };

        Axios.post('/api/movieLike/getLikeState', variables)
            .then(response => {
                if (response.data.like) {
                    setLikeState(true);
                } else {
                    setLikeState(false);
                }
            })

        Axios.post('/api/movieLike/countLike', {movieId: movieDetailData.movieId})
            .then(res => {
                if (res.data.success) {
                    setLikeCount(res.data.like_cnt)
                } else {
                    alert('countLike 실패');
                }
            });

    }, [])


    const _onCLickLikeButton = () => {
        console.log(likeState);
        let variable = {
            userId: localStorage.getItem('userId'),
            movieId: movieDetailData.movieId,
            movieTitle: movieDetailData.title,
            runtime: movieDetailData.runtime,
            vote_average: movieDetailData.vote_average,
        }
        //좋아요인 상태가 아닐때 -> 저장
        console.log(likeState);
        if (!likeState) {
            // console.log(variable);
            // 클릭을 하면 movieLike db에 {userId, movieId, movieTitle, runtime, vote_avg)
            axios.post('/api/movieLike/clickLike', variable)
                .then(res => {
                    // console.log(variable);
                    if (res.data.success) {
                        setLikeState(true);
                        setLikeCount(likeCount + 1);
                    } else {
                        alert('clickLike 실패 ');
                    }
                });

        } else {
            //좋아요인 상태일때 -> 삭제해주고
            axios.post('/api/movieLike/unClickLike', variable)
                .then(res => {
                    if (res.data.success) {
                        console.log('unClick성공');
                        setLikeState(false);
                        setLikeCount(likeCount - 1);
                    } else {
                        alert('unCLickLike 실패')
                    }
                });


        }
        }


//primary or default
    return (
        <div style={{display: 'flex', flexDirection: 'row-reverse', marginRight: '3rem'}}>
            <div>
            </div>
            {likeState ?
            <Button onClick={_onCLickLikeButton} type="primary" danger>
                Liked
            </Button> :
                <Button onClick={_onCLickLikeButton} type="default" danger>
                Like
                </Button>}
<div>
    {likeCount}
</div>
        </div>
    );

}

export default LikeSection;
