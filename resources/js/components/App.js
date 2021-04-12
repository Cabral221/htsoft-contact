import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ContactList from './Contact/ContactList';

class App extends Component {

    constructor (props) {
        super(props)

        this.state = {
            contacts : [],
            error : [],
            loading: false
        }
    }
    
    componentDidMount () {
        this.setState({
            loading: true
        })
        window.axios.get('/contacts').then((response) => {
            // console.log('RESPONSE :')
            // console.log(response)
            this.setState({
                contacts: response.data,
                loading: false
            })

        }).catch((error) => {
            console.log('ERROR' + error)
            this.setState({
                error: error,
                loading: false
            })
        })
        
        
    }

    render() {
        const  {contacts, loading} = this.state
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header">Dashboard</div>
        
                        <div className="card-body">
                            {/* @if (session('status')) */}
                                <div className="alert alert-success" role="alert">
                                    status
                                </div>
                            {/* @endif */}
        
                            You are logged in!
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    {(loading) ? 'En chargement...' : <ContactList contacts={contacts} /> }
                </div>
            </div>
        );
    }
}

export default App;

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}
