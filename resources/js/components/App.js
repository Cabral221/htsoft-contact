import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ContactForm from './Contact/ContactForm';
import ContactList from './Contact/ContactList';

class App extends Component {

    constructor (props) {
        super(props)

        this.state = {
            // données pour le formulaires
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
            success: false,
            // Les contacts
            contacts : [],
            // Les status
            errors : [],
            loading: false
        }

        this.handleFirstNameChange = this.handleFirstNameChange.bind(this)
        this.handleLastNameChange = this.handleLastNameChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePhoneChange = this.handlePhoneChange.bind(this)
        this.handleAddressChange = this.handleAddressChange.bind(this)
        this.handleStoreContact = this.handleStoreContact.bind(this)
    }
    
    componentDidMount () {
        this.getContact()
    }

    handleFirstNameChange(firstName) {
        this.setState({firstName})
    }
    handleLastNameChange(lastName) {
        this.setState({lastName})
    }
    handleEmailChange(email){
        this.setState({email})
    }
    handlePhoneChange(phone){
        this.setState({phone})
    } 
    handleAddressChange(address){
        this.setState({address})
    }

    handleStoreContact(){
        window.axios.post('/contacts', {
            first_name : this.state.firstName,
            last_name : this.state.lastName,
            phone : this.state.phone,
            email : this.state.email,
            address : this.state.address 
        }).then((response) => {
            this.getContact()

            // reset formulaire
            this.setState({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                address: '',
                success: true,
            })

            // Declanche le timer pour desactiver l'alert success dans 5s
            setTimeout(() => {
                this.setState({success: false})
            }, 10000);

            console.log('response : ')
            console.log(response)
        }).catch((error) => {
            // var errors = this.state.errors
            this.setState({errors: error.response.data.errors})

            console.log('error : ')
            console.log(error.response.data.errors)
        })
    }

    getContact() {
        this.setState({
            loading: true
        })
        window.axios.get('/contacts').then((response) => {
            this.setState({
                contacts: response.data,
                loading: false
            })
        }).catch((error) => {
            console.log('ERROR', error.response)
            this.setState({
                error: error,
                loading: false
            })
        })
    }

    render() {
        const  {contacts, loading, success} = this.state
        return (
            <div>
                {
                    (success) 
                    ?   <div className="alert alert-success" role="alert">Le contact a été ajouté avec succés !</div> 
                    : ''
                }
                <div className="row">
                    <div className="col-md-4">
                        <ContactForm 
                            firstName={this.state.firstName}
                            lastName={this.state.lastName}
                            phone={this.state.phone}
                            email={this.state.email}
                            address={this.state.address} 
                            
                            onFirstNameChange={this.handleFirstNameChange}
                            onLastNameChange={this.handleLastNameChange}
                            onPhoneChange={this.handlePhoneChange}
                            onEmailChange={this.handleEmailChange}
                            onAddressChange={this.handleAddressChange}

                            onStoreContact={this.handleStoreContact} 
                            
                            // success={this.state.success}
                            errors={this.state.errors} />                   
                    </div>
                    <div className="col-md-8">
                        {(loading) ? 'En chargement...' : <ContactList contacts={contacts} /> }
                    </div>
                </div>
            </div>
        );
    }
}

export default App;

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}
