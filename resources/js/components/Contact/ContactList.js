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
        return (
            <div className="card">
                <div className="card-header">Liste des contact </div>
                <div className="card-body">
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
                </div>
            </div>
        );
    }
}

    
export default ContactList;
    