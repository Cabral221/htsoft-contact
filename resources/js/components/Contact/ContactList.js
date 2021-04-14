import React, { Component } from 'react';
import ContactItem from './ContactItem';

class ContactList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Contacts: this.props.contacts
        }

        this.handleSubmitChange = this.handleSubmitChange.bind(this)
        this.handleSubmitDelete = this.handleSubmitDelete.bind(this)
    }
    
    componentDidMount() {
        const rows = []
        const contacts = this.props.contacts

        Object.entries(contacts).forEach(entry => {
            const [key, contact] = entry;
            rows.push(<ContactItem 
                    key={contact.id} 
                    contact={contact} 
                    submitChange={this.handleSubmitChange}
                    submitDelete={this.handleSubmitDelete}
                    errors={this.props.errors ? this.props.errors : null} />)
        })

        this.setState({
            contacts: rows
        })
    }

    handleSubmitChange(contact) {
        this.props.submitChange(contact)
    }
    handleSubmitDelete() {
        this.props.submitDelete()
    }

    render() {
        const rows = this.state.contacts
        return (<div className="bg-white p-3">
            <h2>Liste des contact ({this.props.contacts.length})</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nom (email)</th>
                        <th>Téléphone</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>);
    }
}

    
export default ContactList;
    