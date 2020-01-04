import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { InputLabel, InputBase, Button ,Grid} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import fire from '../config/Fire';
import  { Redirect } from 'react-router-dom';
import {
    KeyboardDatePicker,
    KeyboardTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import TextareaAutosize from 'react-textarea-autosize';

class CreatejobForm extends Component{

  constructor(props) {
    super(props);
    this.onCreatejob = this.onCreatejob.bind(this);
    this.state = {
        User:{},
        selectedDate: null,
        selectedBegintime: null,
        selectedEndtime: null,
    }
  }

    formatDate(date) {
        var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
}
  
    handleDateChange = date => {
    
    
        const newdate = this.formatDate(date);
        this.setState({
            selectedDate: newdate
        })
    }
    handleBeginTimeChange = time => {
        this.setState({
            selectedBegintime: time
        })
    } 
    handleEndTimeChange = time => {
        this.setState({
            selectedEndtime: time
        })
    }       
 
  
  onCreatejob(){
    var jobname = document.getElementById('jobname').value;
    var jobdes = document.getElementById('jobdescription').value;
    var wages = document.getElementById('wages').value;
    var amount = document.getElementById('amount').value;
    var location = document.getElementById('location').value;
    var begintime = document.getElementById('timebegin').value;
    var endtime = document.getElementById('timeend').value;
    var date = this.state.selectedDate;
    const auth = fire.auth();

    console.log(jobname);

    var firebaseRef = fire.database().ref('ListingJob');
  
    firebaseRef.push({
        Jobname:jobname,
        Jobdes:jobdes,
        Wages:wages,
        Amount:amount,
        Date:date,
        Location:location,
        Begintime:begintime,
        Endtime:endtime,
        Employee:auth.currentUser.email
      }).then(
          <Redirect to='/dashboard' />);

      
    alert("Success!!");

    

    }



  render(){
    
    return (
        <div style={{ marginTop: '100px', marginBottom: '100px',paddingLeft:'25%' }}>
            <h1>Create Job</h1>
            <form>
                <Grid xs={12} md={8}>
                    <Grid style={{ margin: '16px',display:'flex',direction:'column' }}>
                        <h3>Jobname : </h3>
                        <TextField name='Jobname' id="jobname" variant="outlined" style={{marginLeft:'20px'}} />
                    </Grid>
                    <Grid style={{ margin: '16px' }}>
                        <h3>Detail :</h3>
                        <TextareaAutosize rowsMin={10} style={{width:'100%',height:'100%'}} name='detail' id="jobdescription" label="Detail" variant="outlined" />
                    </Grid>
                    <Grid style={{ margin: '16px',display:'flex',direction:'column' }}>
                        <h3>Time :</h3>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardTimePicker
                                margin="normal"
                                id='timebegin'
                                label="Time picker"
                                value={this.state.selectedBegintime}
                                onChange={this.handleBeginTimeChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                        
                
                        <h3>to</h3>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardTimePicker
                                margin="normal"
                                id='timeend'
                                label="Time picker"
                                value={this.state.selectedEndtime}
                                onChange={this.handleEndTimeChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid style={{ margin: '16px',display:'flex',direction:'column' }}>
                        <h3>Date</h3>

                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Select Work Date"
                                value={this.state.selectedDate}
                                onChange={this.handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                /> 
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid style={{ margin: '16px' }}>
                        <TextField name='wages' id='wages' label="Wages (Baht)" variant="outlined" type='number'  />
                        <TextField name='people' id='amount' label="Limited Person" variant="outlined" type='number' style={{marginLeft:'16px'}} />
                        <TextField name='location' id='location' label="Location" variant="outlined" style={{marginLeft:'16px'}}  />
                    </Grid>
                    
                    <Grid style={{ margin: '16px',right:'0px',float:'right'}}>
                    <Button variant="contained" color="primary" style={{}} onClick={this.onCreatejob} href='/Dashboard'>Submit</Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
    
    
    return(
        <div>
            <Grid container alignItems="center" justify="center">
            <Grid direction='column' alignItems="center" justify="center">
            <h1>Create Job</h1>
            <Grid item><p>Title</p><TextField size="small" id="jobname" variant="outlined" fullWidth /></Grid>
            <Grid item><p>Description</p><TextField size="medium" id="jobdescription" variant="outlined" fullWidth/></Grid>
            <Grid item><p>Wages</p><TextField size="small" id="wages" variant="outlined" label='Baht' fullWidth/></Grid>
            <Grid item><p>Amount</p><TextField size="small" id="amount" variant="outlined" fullWidth/></Grid>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="center">
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Select Work Date"
                            value={this.state.selectedDate}
                            onChange={this.handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        /> &nbsp;&nbsp;&nbsp;&nbsp;
                        

                    </Grid>
            </MuiPickersUtilsProvider>
            
            <Grid sm={12} xs={8} direction='column' style={{marginTop:'10px',marginLeft:'56%'}} justify='flex-end'>
            <Button variant='contained' color='primary' style={{marginLeft:'10px'}} flip onClick={this.onCreatejob}>Submit</Button>
            </Grid>
            </Grid>
            </Grid>
        </div>
    )
    

    
}

}
export default CreatejobForm;