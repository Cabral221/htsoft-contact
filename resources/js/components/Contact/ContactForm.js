import React, {Component} from 'react'

class ContactForm extends Component {

    constructor(props){
        super(props)

        this.handleFirstNameChange = this.handleFirstNameChange.bind(this)
        this.handleLastNameChange = this.handleLastNameChange.bind(this)
        this.handlePhoneChange = this.handlePhoneChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handleAddressChange = this.handleAddressChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleFirstNameChange(e){
        this.props.onFirstNameChange(e.target.value)
    }
    handleLastNameChange(e){
        this.props.onLastNameChange(e.target.value)
    }
    handlePhoneChange(e){
        this.props.onPhoneChange(e.target.value)
    }
    handleEmailChange(e){
        this.props.onEmailChange(e.target.value)
    }
    handleAddressChange(e){
        this.props.onAddressChange(e.target.value)
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.onStoreContact();
    }

    render() {
        const {firstName, lastName, phone, email, address, errors} = this.props
        
        return (
            <div className="card">
                <div className="card-header">Créer un contact</div>
                <div className="card-body">
                    <form className="form" onSubmit={this.handleSubmit}>
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
                        <div className="form-group" >
                            <button type="submit" className="btn btn-sm btn-block btn-primary" >Enregistrer</button>
                        </div>
                    </form>
                    
                </div>
            </div>
            );
        }
    }
    
    export default ContactForm;