import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Home from './landingpage';
import GraphLog from './graphLog';
import WeeklyReport from './weeklyReport';
class Main extends Component {
    render(){
        return(
            <div>
                <Route path="/" component={Home}/>
                <Route path="/graphLog" component={GraphLog}/>
                <Route path="/weeklyReport" component={WeeklyReport}/>
            </div>
        )
    }
}
export default Main;
