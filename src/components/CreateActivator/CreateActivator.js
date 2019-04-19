import React, { Component } from 'react';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField'
// import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
// import FormControl from '@material-ui/core/FormControl'
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
// import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import swal from '@sweetalert/with-react'
// import FormHelperText from '@material-ui/core/FormHelperText';
// import IconButton from '@material-ui/core/IconButton';
// import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
// import ArrowBack from '@material-ui/icons/ArrowBack';
// import Add from '@material-ui/icons/Add'

class CreateActivator extends Component {
    
    componentDidMount(){
        this.props.dispatch({type:'GET_CLASSES'});
        
    }

    state = {
        newActivator: {
            id: '',
            date: '',
            time_start: '',
            time_end: '',
            question_type: '',
            question: '',
        },
        labelWidth: 0,
    }

    handleChange = propertyName => {
        return(event) =>{
        
        this.setState({
            newActivator: {
                ...this.state.newActivator,
                [propertyName]: event.target.value,
            }
        });
      }
    }
    handleSubmit = event => {
        event.preventDefault();
        console.log('in handleSubmit');
        this.props.dispatch({type:'ADD_ACTIVATOR', payload: this.state.newActivator});
       
    }
    








  render() {
    console.log(this.state.newActivator);
    return (
    <form>
        <Select
              value={this.state.newActivator.id}
              onChange={this.handleChange('id')}
              input={
                <OutlinedInput
                  labelWidth={this.state.labelWidth}
                  name="id"
                  id="id"
                  />}
                  >
                  <MenuItem disabled>Choose a Class Period</MenuItem>
                   {this.props.reduxState.getClassesReducer.map( (item) =>
                   <MenuItem value={item.id} key={item.id}>Period: {item.class_period}</MenuItem>
                   )}
            </Select>
            <br/>
            <br/>
            <TextField
                id= "date"
                label="Assigned Date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                      }}
                variant="outlined"
                value={this.state.newActivator.date}
                onChange={this.handleChange('date')}
                   />
            <br/>
            <br/>

            <TextField
                id="time"
                label="Start Time"
                type="time"
                InputLabelProps={{
                shrink: true,
                }}
                inputProps={{
                step: 60, // 5 min
                }}
                variant="outlined"
                value={this.state.newActivator.time_start}
                onChange={this.handleChange('time_start')}
            />
            <br/>
            <br/>

            <TextField
                id="time"
                label="End Time"
                type="time"
                InputLabelProps={{
                shrink: true,
                }}
                inputProps={{
                step: 60, // 5 min
                }}
                variant="outlined"
                value={this.state.newActivator.time_end}
                onChange={this.handleChange('time_end')}
            />
            <br/>
            <br/>
            <Select
              value={this.state.newActivator.question_type}
              onChange={this.handleChange('question_type')}
              input={
                <OutlinedInput
                  labelWidth={this.state.labelWidth}
                  name="question_type"
                  id="question_type"
                  />}
                  >
                <MenuItem disabled>Choose a Question Type</MenuItem>
                <MenuItem value={'Text_Question'}>Text Question</MenuItem>
                <MenuItem value={'Multiple_Choice_Question'}>Multiple Choice Question</MenuItem>
            </Select>
            <br/>
            <br/>
            <TextField
                placeholder="Type Question Here"
                multiline={true}
                rows={6}
                variant="outlined"
                value={this.state.newActivator.question}
                onChange={this.handleChange('question')}
            />
            <br/>
            <br/>
            <Button onClick={this.handleSubmit}>Create Activator</Button>

    </form>
      
    )
  }
}


const mapReduxStateToProps = (reduxState) => ({
    reduxState,
})

export default connect(mapReduxStateToProps)(CreateActivator);