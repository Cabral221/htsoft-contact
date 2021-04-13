import React, { Component } from 'react';
import ContactItem from './ContactItem';

class ContactList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Contacts: this.props.contacts
        }
    }
    
    componentDidMount() {
        const rows = []
        const contacts = this.props.contacts

        Object.entries(contacts).forEach(entry => {
            const [key, contact] = entry;
            rows.push(<ContactItem key={contact.id} contact={contact} />)
        })

        this.setState({
            contacts: rows
        })
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
    