import React, {useState, useEffect} from 'react';
import {List, Avatar} from 'antd';
import {API_KEY} from "../../../Config";
import { Button } from 'antd';


function MovieActorSection(props) {
    const [castList, setCastList] = useState([]);
    const [crewList, setCrewList] = useState([]);
    const [creditType, setCreditType] = useState('cast'); //crew or cast
    let data

    useEffect(() => {
            fetch(`https://api.themoviedb.org/3/movie/${props.movieId}/credits?api_key=${API_KEY}&language=en-US`)
                .then(res => res.json())
                .then(res => {
                    setCrewList(res.crew);
                    setCastList(res.cast);
                });
    },[props]
    );

    //crew, cast 데이터를 받아와 렌더링해줄 데이터 만들기
    const makeCreditData = (listTypeOfCredit) => {
        let ret = []
        let role //character or department

        listTypeOfCredit.map(item => {
            if (item.character) {
                role = item.character;
            } else {
                role = item.department;
            }
            ret.push({
                character : role,
                name : item.name,
                profile_path : item.profile_path
            });
        });
        return ret
    }

    //화면에 보여질 데이터
    const castData = makeCreditData(castList);
    const crewData = makeCreditData(crewList);

    //crew데이터를 보일 것 인지 cast 데이터를 보일 것 인지에 대한 버튼 이벤트 처리
    const _onClickCreditType = (e) => {
        //토글버튼 의한 creditType 관리
        if (creditType === 'crew') {
            setCreditType('cast');
        } else {
            setCreditType('crew');
        }
    };


    return (
        <div>
            <div>
                <Button onClick={_onClickCreditType} type="primary">{creditType === 'crew' ? 'Show Cast' : 'Show Crew'}</Button>
            </div>
            <div>
            </div>
            <List
                itemLayout="horizontal"
                dataSource={creditType === 'crew' ? crewData : castData}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`}/>}
                            title={<a href="https://ant.design">{item.name}</a>}
                            description={item.character}
                        />
                    </List.Item>
                )}
            />

        </div>
    );
}


export default MovieActorSection;