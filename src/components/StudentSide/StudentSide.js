import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

var moment = require('moment');

class StudentSide extends Component {
    
    currentTime= moment().format('HH:mm:ss')
    currentDate= moment().format('YYYY-MM-DD')
    componentDidMount(){
        this.trigger();
        // this.getTimeAndDate();
    }

    state= {
      newAnswer: {
        answer: '',
        question_id: '',
      }
    }


    handleChange = propertyName => {
      return(event) =>{
      
      this.setState({
          newAnswer: {
              ...this.state.newAnswer,
              [propertyName]: event.target.value,
              question_id: this.props.reduxState.getActivatorReducer.id,
          }
      });
    }
  }
  handleSubmit = event => {
      event.preventDefault();
      console.log('in handleSubmit');
      this.props.dispatch({type:'ADD_ANSWER', payload: this.state.newAnswer});
     
  }


    

    renderQuestion = () => {
      if (this.props.reduxState.getActivatorReducer.length === 0){
        console.log(this.props.reduxState.getActivatorReducer)
        return(
          <Paper>
            <Typography variant="h3">Please wait for release of activator question</Typography>   
          </Paper>
        )
      }
      else if(this.props.reduxState.getActivatorReducer === 'Question has ended'){
        return(
        <Paper>
          <Typography variant="h3">Question Time Period Has Ended</Typography>   
        </Paper>
        )
      }
      else{ return(
        <Paper>
        <Typography variant="h3">Question:</Typography>   
        <Typography variant="h6">{this.props.reduxState.getActivatorReducer.question}</Typography> 
        <TextField
              placeholder="Type Question Here"
              multiline={true}
              rows={6}
              variant="outlined"
              value={this.state.newAnswer.answer}
              onChange={this.handleChange('answer')}
          />    
        <Button onClick={this.handleSubmit}>Add Answer</Button>
        </Paper>
      )}
    }


    getStartTimeAndDate = () => {
        console.log('IN GET START TIME AND DATE');
        axios({
          method: 'GET',
          url: '/spikesolo/activators/start'
        })
        .then( (response) => {
          this.props.dispatch({type:'GET_ACTIVATOR_START', payload: response.data})
          console.log('Response Data', response.data);
        })
        .catch( (error) => {
          console.log('ERROR in GET', error);
        })
    };

    getEndTimeAndDate = () => {
      console.log('IN GET END TIME AND DATE');
      axios({
        method: 'GET',
        url: '/spikesolo/activators/end'
      })
      .then( (response) => {
        this.props.dispatch({type:'GET_ACTIVATOR_END', payload: response.data})
        console.log('Response Data', response.data);
      
       
      })
      .catch( (error) => {
        console.log('ERROR in GET', error);
  })
}


    trigger() {
        setInterval(() => { 
            this.getStartTimeAndDate();
            this.getEndTimeAndDate();
            console.log('Time Is', new Date())
        }, 15000);
      }
   
  render() {
    return (
      <section>
        {this.renderQuestion()}
      </section>
      
      
    )
  }
}


const mapReduxStateToProps = (reduxState) => ({
    reduxState,
})

export default connect(mapReduxStateToProps)(StudentSide);