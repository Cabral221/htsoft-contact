import React, { Component } from 'react'

class FormBase extends Component {
 
    constructor (props) {
        super(props)
        
        this.state = {
            // données pour le formulaires
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
        }
        
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this)
        this.handleLastNameChange = this.handleLastNameChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePhoneChange = this.handlePhoneChange.bind(this)
        this.handleAddressChange = this.handleAddressChange.bind(this)

        this.handleSubmitChange = this.handleSubmitChange.bind(this)
    }

    componentDidMount() {
        if(this.props.contact){
            this.setState({
                id: this.props.contact.id,
                firstName: this.props.contact.first_name,
                lastName: this.props.contact.last_name,
                email: this.props.contact.email,
                phone: this.props.contact.phone,
                address: this.props.contact.address,
            })
        }
    }

    handleFirstNameChange(e) {
        this.setState({firstName: e.target.value})
    }
    handleLastNameChange(e) {
        this.setState({lastName: e.target.value})
    }
    handleEmailChange(e){
        this.setState({email: e.target.value})
    }
    handlePhoneChange(e){
        this.setState({phone: e.target.value})
    } 
    handleAddressChange(e){
        this.setState({address: e.target.value})
    }

    handleSubmitChange(e) {
        e.preventDefault()
        this.props.submitChange(this.state)
    }

    render() {
        const  {firstName, lastName, phone, email, address} = this.state
        const {errors} = this.props


        return (
            <form className="form" onSubmit={this.handleSubmitChange}>
                <div className="form-group">
                    <input type="text" name="first_name" 
                        value={firstName} 
                        onChange={this.handleFirstNameChange}
                        className={(errors && errors.first_name) ? 'form-control is-invalid' : 'form-control'} 
                        placeholder="Prénom *" />
                        {(errors && errors.first_name) ? <div className="invalid-feedback">{errors.first_name}</div> : ''}
                </div>
                <div className="form-group">
                    <input type="text" name="last_name" 
                        value={lastName} 
                        onChange={this.handleLastNameChange}
                        className={(errors && errors.last_name) ? 'form-control is-invalid' : 'form-control'} 
                        placeholder="Nom *"/>
                        {(errors && errors.last_name) ? <div className="invalid-feedback">{errors.last_name}</div> : ''}
                </div>
                <div className="form-group">
                    <input type="number" name="phone" 
                        value={phone} 
                        onChange={this.handlePhoneChange} 
                        className={(errors && errors.phone) ? 'form-control is-invalid' : 'form-control'} 
                        placeholder="Téléphone *"/>
                        {(errors && errors.phone) ? <div className="invalid-feedback">{errors.phone}</div> : ''}
                </div>
                <div className="form-group">
                    <input type="text" name="email" 
                        value={email} 
                        onChange={this.handleEmailChange}
                        className={(errors && errors.email) ? 'form-control is-invalid' : 'form-control'} 
                        placeholder="Email *"/>
                        {(errors && errors.email) ? <div className="invalid-feedback">{errors.email}</div> : ''}
                </div>
                <div className="form-group">
                    <input type="text" name="address" 
                        value={address} 
                        onChange={this.handleAddressChange}
                        className={(errors && errors.address) ? 'form-control is-invalid' : 'form-control'} 
                        placeholder="Adresse"/>
                        {(errors && errors.address) ? <div className="invalid-feedback">{errors.address}</div> : ''}
                </div>
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-sm btn-primary mr-3" >Enregistrer</button>
                    <button type="button" className="btn btn-sm btn-secondary" data-dismiss="modal">annuler</button>
                </div>
            </form>
            );
        }
    }
    
    export default FormBase;