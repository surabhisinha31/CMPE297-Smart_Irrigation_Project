import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import Home from './landingpage';
// import aboutme from './aboutme';
// import dashboard from './dashboard';
// import GraphData from './graphdata';
// import BinList from './binlist';
class Main extends Component {
    render(){
        return(
            <div>

                {/* <Route path="/home" component={landingpage}/> */}
                <Route path="/" component={Home}/>

            </div>
        )
    }
}
//Export The Main Component
export default Main;
