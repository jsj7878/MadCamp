import React,{useState} from 'react'
import ReactDOM from 'react-dom';
import './questionbox.css'
import axios from 'axios'
import Radio from '@material-ui/core/Radio';
import { BrowserRouter as Router,Route,Link } from 'react-router-dom';
import Result from './Result.js'


function Questionbox(){
    const [q1,setQ1] = useState("one");
    const [q2,setQ2] = useState("one");
    const [q3,setQ3] = useState("one");
    const [q4,setQ4] = useState("one");
    const axios=require('axios');

    const q1checked=(e)=>
    {
        /*console.log(q1)
        console.log(e.target.value)
        if(e.target.value==="one")
        setQ1("two");
        else if(e.target.value==="two")
        setQ1("one")*/
        setQ1(e.target.value)
    }
    const q2checked=(e)=>
    { 
        /*if(e.target.value==="one")
        setQ2("two");
        else if(e.target.value==="two")
        setQ2("one")*/
        setQ2(e.target.value)
    }
    const q3checked=(e)=>
    {
        /*if(e.target.value==="one")
        setQ3("two");
        else if(e.target.value==="two")
        setQ3("one")*/
        setQ3(e.target.value)
    }
    const q4checked=(e)=>
    { 
        /*if(e.target.value==="one")
        setQ4("two");
        else if(e.target.value==="two")
        setQ4("one")*/
        setQ4(e.target.value)
    }

    const json={
        q1:q1,
        q2:q2,
        q3:q3,
        q4:q4
    }

    const Submit = async() => {
       await axios.delete('http://192.249.18.249:3000/surveyresult');
        console.log(json);
       await axios.post(
            'http://192.249.18.249:3000/surveyresult',
            json,
            {
                headers:{'Content-Type':'application/json'}
            }
        ).then((res)=>{
            console.log(res);
        }).catch(error=>{
            console.log(error);
        });
         
        document.location.href="/result"
        
    }
    return(
<div>
    <Router>
        <div className='questionbox'>
            <h2>나는 제주도에서 운전을 할 수 </h2>
                <div>
                <span>있다.</span>
                <Radio 
                value="one"
                checked={q1==="one"} 
                color="primary" 
                onChange={q1checked}
                />
                
                </div>
                <div>
                <span>없다.</span>
                <Radio 
                value="two"
                checked={q1==="two"} 
                color="primary" 
                onChange={q1checked}
                />
                </div>


            <h2>나는 여행을...</h2>
                <div>
                <span>가족 단위로 갈 것이다.</span>
                <Radio 
                value="one" 
                checked={q2==="one"} 
                color="primary" 
                onChange={q2checked}
                />
                </div>
                <div>
                <span>혼자, 혹은 애인과 함께 갈 것이다.</span>
                <Radio 
                value="two" 
                checked={q2==="two"} 
                color="primary" 
                onChange={q2checked}
                />
                </div>

            <h2>나는 제주도에서 주로</h2>
                <div>
                <span>방에 콕 박혀서 낮잠을 잘 것이다.</span>
                <Radio 
                value="one" 
                checked={q3==="one"} 
                color="primary" 
                onChange={q3checked}
                />
                </div>
                <div>
                <span>여기저기 돌아다니며 여행을 즐길 것이다.</span>
                <Radio 
                value="two" 
                checked={q3==="two"} 
                color="primary" 
                onChange={q3checked}
                />
                </div>

            <h2>내가 좋아하는 장소는...</h2>
                <div>
                <span>인스타 핫플로 유명한 카페, 소품샵이다.</span>
                <Radio 
                value="one"
                checked={q4==="one"} 
                color="primary" 
                onChange={q4checked}
                />
                </div>
                <div>
                <span>탁 트인 산과 바다이다.</span>
                <Radio 
                value="two"
                checked={q4==="two"} 
                color="primary" 
                onChange={q4checked}
                />
                </div> 

                <div>
                    <button className='submitbutton' onClick={Submit}>설문지 제출</button>
                <br/><br/>

                </div>
                <Route path="/result">
                    <Result/>
                </Route>
            </div>
        </Router>        
</div>
        
    );
    
}

//ReactDOM.render(<BrowserRouter><Questionbox/></BrowserRouter>,document.getElementById('root'));

export default Questionbox;