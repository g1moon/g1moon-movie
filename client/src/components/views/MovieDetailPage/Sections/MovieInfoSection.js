import React from 'react';
import { List, Card } from 'antd';
function MovieInfoSection(props) {
    const movie = props.movie;
    const movieInfoList = [movie.title, movie.popularity, movie.budget,
        movie.release_date, movie.vote_average, movie.vote_count ]
    const dataList = [
        {
            title: 'title',
        },
        {
            title: 'popularity',
        },
        {
            title: 'budget',
        },
        {
            title: 'release_date',
        },
        {
            title: 'vote_average',
        },
        {
            title: 'vote_count',
        },

    ];
    dataList.map((data, idx) => data.info = movieInfoList[idx]);

    return (
        <div>
            <List
                grid={{
                    gutter: 16,
                    sm: 2,
                    md: 2,
                    lg: 3,
                    xl: 6,
                }}
                dataSource={dataList}
                renderItem={item => (
                    <List.Item>
                        <Card title={item.title} style={{color:'blue'}}>{item.info}</Card>
                    </List.Item>
                )}
            />
        </div>
    );
}

export default MovieInfoSection;