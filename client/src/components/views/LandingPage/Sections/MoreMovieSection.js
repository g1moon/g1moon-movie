import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import React from 'react';
import {API_KEY} from "../../../Config";


function MoreMovieSection(props) {
    const listData = [];
    // console.log(props.movieList);
    const movieList = props.movieList;
    const tmpMovie = movieList[0]
    const updateLandingPageLikeCount = (likeCount) => {
        console.log(likeCount)
    };

    movieList.map(movie => {
        listData.push(
            {
                image : `http://image.tmdb.org/t/p/w1280${movie.backdrop_path}`,
                href : `/movie/${movie.id}`,
                title : movie.title,
                description : movie.overview
            }
        )
    });

    const IconText = ({ icon, text }) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );

    return (
        <div>
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 5,
                }}
                dataSource={listData}
                renderItem={item => (
                    <List.Item
                        extra={
                            <img style={{width : '300px'}}
                                 width={272}
                                 alt="logo"
                                 src={item.image}
                            />
                        }
                        key={item.title}
                        actions={[
                            <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                            <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                        ]}

                    >
                        <List.Item.Meta
                            title={<a href={item.href}>{item.title}</a>}
                            description={item.description}
                        />
                        {item.content}
                    </List.Item>
                )}
            />
        </div>
    );
}

export default MoreMovieSection;