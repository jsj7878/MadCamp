import React,{useState} from 'react'
import ReactDOM from 'react-dom';
import './result.css'
import axios from 'axios'
import { BrowserRouter,Route } from 'react-router-dom';


function Result(){
    const [q1,setQ1] = useState("one")
    const [q2,setQ2] = useState("one")
    const [q3,setQ3] = useState("one")
    const [q4,setQ4] = useState("one")
    var data = null;
    const Data= axios.get('http://192.249.18.249:3000/surveyresult').then((response)=>{
        data = response.data.mySurveyresult;
    setQ1(data.q1);
    setQ2(data.q2);
    setQ3(data.q3);
    setQ4(data.q4);
    });
    var json=null;
const goNextPage=async()=>{
    await axios.delete('http://192.249.18.249:3000/region');
    //region post하기
    await axios.post(
        'http://192.249.18.249:3000/region',
        json,
        {
            headers:{'Content-Type':'application/json'}
        }
    ).then((res)=>{
        console.log(res);
    }).catch(error=>{
        console.log(error);
    });
    document.location.href='/plan'
}
    switch(q1){
        case "one":
            switch(q2){
                case "one":
                    switch(q3){
                        case "one":
                            switch(q4){
                                case "one":  { json={"region":"aewol"}
                                                return(<div><div className='resultbox'><h5>당신에게 어울리는 제주도의 여행지는 "애월읍"입니다.</h5> </div>
                                                <button className='nextPageMessage'onClick={goNextPage}><br/>여행지 정보 <br/>보러가기</button></div>);
                                                }   
                                case "two": { json={"region":"seoguipo"}
                                                return(<div><div className='resultbox'>당신에게 어울리는 제주도의 여행지는 "서귀포시"입니다. </div>
                                                <button className='nextPageMessage'onClick={goNextPage}><br/>여행지 정보 <br/>보러가기</button></div>);
                                            }
                            }
                        case "two":
                            switch(q4){
                                case "one": {  json={"region":"pyosun"}
                                                 return(<div><div className='resultbox'><br/><br/>당신에게 어울리는 제주도의 여행지는 "표선면"입니다. </div>
                                                 <button className='nextPageMessage'onClick={goNextPage}><br/>여행지 정보 <br/>보러가기</button></div>);
                                            }           
                                case "two": {  json={"region":"jocheon"}
                                                return(<div><div className='resultbox'><br/><br/>당신에게 어울리는 제주도의 여행지는 "조천읍"입니다. </div>
                                                <button className='nextPageMessage'onClick={goNextPage}><br/>여행지 정보 <br/>보러가기</button></div>);
                                            }       
                            }
                    }
                case "two":
                    switch(q3){
                        case "one":
                            switch(q4){
                                case "one": {  json={"region":"aewol"}
                                                return(<div><div className='resultbox'><br/><br/>당신에게 어울리는 제주도의 여행지는 "애월읍"입니다. </div>
                                                <button className='nextPageMessage'onClick={goNextPage}><br/>여행지 정보 <br/>보러가기</button></div>);
                                            }       
                                case "two": { json={"region":"seoguipo"}
                                                return(<div><div className='resultbox'><br/><br/>당신에게 어울리는 제주도의 여행지는 "서귀포시"입니다. </div>
                                                <button className='nextPageMessage'onClick={goNextPage}><br/>여행지 정보 <br/>보러가기</button></div>);
                                             }
                            }
                        case "two":
                            switch(q4){
                                case "one": { json={"region":"pyosun"}
                                                return(<div><div className='resultbox'><br/><br/>당신에게 어울리는 제주도의 여행지는 "표선면"입니다. </div>
                                                <button className='nextPageMessage'onClick={goNextPage}><br/>여행지 정보 <br/>보러가기</button></div>);
                                            }   
                                case "two": {json={"region":"jocheon"}
                                                return(<div><div className='resultbox'><br/><br/>당신에게 어울리는 제주도의 여행지는 "조천읍"입니다. </div>
                                                <button className='nextPageMessage'onClick={goNextPage}><br/>여행지 정보 <br/>보러가기</button></div>);
                                            }
                            }
                    }
            }
        case "two":
            switch(q2){
                case "one":
                    switch(q3){
                        case "one":
                            switch(q4){
                                case "one": { json={"region":"weoljung"}
                                                return(<div><div className='resultbox'><br/><br/>당신에게 어울리는 제주도의 여행지는 "월정리"입니다. </div>
                                                <button className='nextPageMessage'onClick={goNextPage}><br/>여행지 정보 <br/>보러가기</button></div>);
                                            }
                                case "two": { json={"region":"hanlim"}
                                                return(<div><div className='resultbox'><br/><br/>당신에게 어울리는 제주도의 여행지는 "한림읍"입니다. </div>
                                                <button className='nextPageMessage'onClick={goNextPage}><br/>여행지 정보 <br/>보러가기</button></div>);
                                            }
                            }
                        case "two":
                            switch(q4){
                                case "one":  {json={"region":"woodo"}
                                                return(<div><div className='resultbox'><br/><br/>당신에게 어울리는 제주도의 여행지는 "우도"입니다. </div>
                                                <button className='nextPageMessage'onClick={goNextPage}><br/>여행지 정보 <br/>보러가기</button></div>);
                                            }
                                case "two": {json={"region":"jeju"}
                                                return(<div><div className='resultbox'><br/><br/>당신에게 어울리는 제주도의 여행지는 "제주시"입니다. </div>
                                                <button className='nextPageMessage'onClick={goNextPage}><br/>여행지 정보 <br/>보러가기</button></div>);
                                            }
                            }
                    }
                case "two":
                    switch(q3){
                        case "one":
                            switch(q4){
                                case "one": { json={"region":"weoljung"}
                                                return(<div><div className='resultbox'><br/><br/>당신에게 어울리는 제주도의 여행지는 "월정리"입니다. </div>
                                                <button className='nextPageMessage'onClick={goNextPage}><br/>여행지 정보 <br/>보러가기</button></div>);
                                            }
                                case "two": { json={"region":"hanlim"}
                                                return(<div><div className='resultbox'><br/><br/>당신에게 어울리는 제주도의 여행지는 "한림읍"입니다. </div>
                                                <button className='nextPageMessage'onClick={goNextPage}><br/>여행지 정보 <br/>보러가기</button></div>);
                                            }
                            }
                        case "two":
                            switch(q4){
                                case "one": { json={"region":"woodo"}
                                                return(<div><div className='resultbox'><br/><br/>당신에게 어울리는 제주도의 여행지는 "우도"입니다. </div>
                                                <button className='nextPageMessage'onClick={goNextPage}><br/>여행지 정보 <br/>보러가기</button></div>);
                                            }
                                case "two": {  json={"region":"jeju"}
                                                return(<div><div className='resultbox'><br/><br/>당신에게 어울리는 제주도의 여행지는 "제주시"입니다. </div>
                                                <button className='nextPageMessage'onClick={goNextPage}><br/>여행지 정보 <br/>보러가기</button></div>);
                                            }
                            }
                    }
            }
    }
}

 export default Result;