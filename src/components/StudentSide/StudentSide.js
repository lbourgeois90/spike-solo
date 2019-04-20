import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

var moment = require('moment');

class StudentSide extends Component {
    
    currentTime= moment().format('HH:mm:ss')
    currentDate= moment().format('YYYY-MM-DD')
   
    componentDidMount(){
        this.trigger();
    }

    getTimeAndDate = () => {
        console.log('IN GET TIME AND DATE');
        axios({
          method: 'GET',
          url: '/spikesolo/activators'
        })
        .then( (response) => {
          this.props.dispatch({type:'GET_ACTIVATOR', payload: response.data})
          console.log('Response Data', response.data);
        
         
        })
        .catch( (error) => {
          console.log('ERROR in GET', error);
          alert(`
          Sorry! Unable to get question from database! Try again later!`);
        })
    };

    trigger() {
        setInterval(() => { 
            this.getTimeAndDate();
            console.log('Time Is', new Date())
        }, 5000);
    }

 




     
          
          
          
    //     //   if(this.currentTime === this.props.reduxState.getActivatorReducer.time_start){
    //     //       console.log('WOOOO');
    //     //   }
    //     //   else{
    //     //       return (
    //     //       console.log('Not Yet')
    //     //       )
    //     //   }
    //   }
   
  render() {
    console.log(this.currentTime);
    console.log(this.currentDate);
    return (
    
        <section>
            <h1> Student Side</h1>
            <h4>{JSON.stringify(this.props.reduxState.getActivatorReducer)}</h4>
        </section>
      
    )
  }
}


const mapReduxStateToProps = (reduxState) => ({
    reduxState,
})

export default connect(mapReduxStateToProps)(StudentSide);