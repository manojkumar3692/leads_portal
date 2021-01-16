import React, { PureComponent } from 'react'
import './LeadGeneration.scss'

/**
 Note i have used this HTML & CSS from external source ( I can build one too ...) 
 I want to spend more time on login and implementation 
*/

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);


class LeadGeneration extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      fullName: null,
      email: null,
      phoneNumber: null,
      comments: null,
      validMessage: '',
      errors: {
        fullName: '',
        email: '',
        phoneNumber: '',
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.validateForm = this.validateForm.bind(this)
    // this.saveLeadGeneration = this.saveLeadGeneration.bind(this)
  }

  componentDidMount() {
    // var leadGenerationForm = JSON.parse(localStorage.getItem('privyr'));
    // console.log('Check on Compoent', typeof leadGenerationForm)  
    // console.log('Check on Compoent',  leadGenerationForm)  
  }



  validateForm = (errors) => {
    let valid = true;
    if (this.state.fullName === null &&
      this.state.email === null &&
      this.state.phoneNumber === null) {
      valid = false
      this.setState({ validMessage: 'Please fill the required fields' })
    }
    Object.values(errors).forEach(
      (val) => {
        val.length > 0 && (valid = false)
      }
    );
    return valid;
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    switch (name) {
      case 'fullName':
        errors.fullName =
          value.length < 5
            ? 'Full Name must be 5 characters long!'
            : '';
        break;
      case 'email':
        errors.email =
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid!';
        break;
      case 'phoneNumber':
        errors.phoneNumber =
          value.length === 10
            ? ''
            : 'phone number must be 10 characters long!';
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  }



  handleSubmit = (event) => {
    event.preventDefault();
    if (this.validateForm(this.state.errors)) {
      console.info('Valid Form')
      this.setState({ validMessage: 'Form Submitted Successfully' })
      let leadObj = {
        'fullName': this.state.fullName,
        'email': this.state.email,
        'phoneNumber': this.state.phoneNumber,
        'comments': this.state.comments
      }
      let leadGenerationForm = JSON.parse(localStorage.getItem('privyr')) || [];
        leadGenerationForm.push(leadObj);
        localStorage.setItem('privyr', JSON.stringify(leadGenerationForm));
        setTimeout(() => {
          this.setState({validMessage: '',fullName: '', email: '', phoneNumber: '' , comments: ''})
        },2000)
    } else {
      alert('please fill all fields')
    }
  }




  render() {
    const { errors } = this.state;
    return (
      <div>

        <div className="background">
          <div className="container">
            <div className="screen">
              <div className="screen-header">
                <div className="screen-header-left">
                  <div className="screen-header-button close"></div>
                  <div className="screen-header-button maximize"></div>
                  <div className="screen-header-button minimize"></div>
                </div>
                <div className="screen-header-right">
                  <div className="screen-header-ellipsis"></div>
                  <div className="screen-header-ellipsis"></div>
                  <div className="screen-header-ellipsis"></div>
                </div>
              </div>
              <div className="screen-body">
                <div className="screen-body-item left">
                  <div className="app-title">
                    <span>LEAD</span>
                    <span>GENERATION</span>
                  </div>
                  <div className="app-contact">Please enter your contact details & any requirments</div>
                </div>
                <div className="screen-body-item">
                  <div className="app-form">
                    <form onSubmit={this.handleSubmit}>
                      <div className="app-form-group">
                        <input value={this.state.fullName} className="app-form-control" placeholder="Full Name" type='text' name='fullName' onChange={this.handleChange} noValidate />
                        {errors.fullName.length > 0 &&
                          <span className='error'>{errors.fullName}</span>}
                      </div>
                      <div className="app-form-group">
                        <input value={this.state.email} className="app-form-control" placeholder="Email Address" type='text' name='email' onChange={this.handleChange} noValidate />
                        {errors.email.length > 0 &&
                          <span className='error'>{errors.email}</span>}
                      </div>
                      <div className="app-form-group">
                        <input value={this.state.phoneNumber} className="app-form-control" placeholder="Mobile Number" type='number' name='phoneNumber' onChange={this.handleChange} noValidate />
                        {errors.phoneNumber.length > 0 &&
                          <span className='error'>{errors.phoneNumber}</span>}
                      </div>
                      <div className="app-form-group message">
                        <input value={this.state.comments} className="app-form-control" placeholder="Requirments / Comments" type='textarea' name='comments' onChange={this.handleChange} noValidate />
                      </div>
                      <div className="app-form-group buttons">
                        <button className="app-form-button">CANCEL</button>
                        <button className="app-form-button" type="submit" value="Submit">REGISTER</button>
                      </div>
                      <span>
                        <span className='error'>{this.state.validMessage}</span>
                      </span>
                    </form>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>


      </div>
    )
  }
}


export default LeadGeneration;