import {Link} from 'react-router-dom';
import React, { Component } from 'react';
import './card.css';
class Home extends Component {
    state = {  }

    render() {
        return (
          <div className = "container">
            <div className="card-container">
              <div className='bg-light-orange dib br3 pa3 ma2 grow bw2 shadow-5'>
              <h1 className = "heading">SMART IRRIGATION SYSTEM</h1>
              <Link to="/graphLog">
                   <button type="button">
                        Get the soil humidity analysis report
                   </button>
              </Link>
              <Link to="/weeklyReport">
                   <button type="button">
                        Get the soil humidity weekly analysis report
                   </button>
              </Link>
           </div></div>
           </div>
        );
    }
}

export default Home;
