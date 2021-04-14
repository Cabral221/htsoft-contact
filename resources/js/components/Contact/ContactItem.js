import React, { Component, useState } from 'react'
import FormBase from './FormBase'



class ContactItem extends Component {

    constructor(props){
        super(props)

        this.state = {
            // données pour le formulaires
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
            // Les status
            errors : []
        }

        this.handleSubmitChange = this.handleSubmitChange.bind(this)
        this.handleDelete = this.handleDelete.bind(this)    
    }

    handleSubmitChange(contact){
        window.axios.put('/contacts/'+ contact.id, {
            first_name : contact.firstName,
            last_name : contact.lastName,
            phone : contact.phone,
            email : contact.email,
            address : contact.address 
        }).then((response) => {
            // Cacher le modal
            $('#editModal'+contact.id).modal('toggle')
            // reset formulaire
            this.setState({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                address: '',
            })

            this.props.submitChange(contact)

            // console.log('response : ')
            // console.log(response)
        }).catch((error) => {
            this.setState({errors: error.response.data.errors})

            console.log('error : ')
            console.log(error.response.data.errors)
        })
    }

    handleDelete(e)
    {
        e.preventDefault()
        if(confirm('Etes-vous sûr de vouloir supprimé ce contact ?')){
            window.axios.delete('/contacts/'+ this.props.contact.id).then((response) => {
                this.props.submitDelete()
            }).catch((error) => {
                this.setState({errors: error.response.data.errors})
    
                console.log('error : ')
                console.log(error.response.data.errors)
            })
        }
    }

    render () {
        const {contact} = this.props
        const {errors} = this.state
        // console.log('erreur depuis contactItem');
        // console.log(errors);
        return (
            <tr>
                <td>
                    <div><strong>{contact.last_name} </strong>{contact.first_name}</div>
                    {contact.email}
                </td>
                <td>
                    <strong>{contact.phone}</strong>
                </td>
                <td className="text-sm">
                    <button type="button" className="btn btn-warning btn-sm" data-toggle="modal" data-target={"#editModal" + contact.id} ><i className="fa fa-edit"></i></button>
                    <div className="modal fade" id={"editModal" + contact.id}  tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Modifier un contact</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <FormBase contact={contact} submitChange={this.handleSubmitChange} errors={errors} />
                                </div>
                            </div>
                        </div>
                    </div>


                    <button type="button" className="btn btn-danger btn-sm" onClick={this.handleDelete}><i className="fa fa-trash"></i></button>
                </td>
            </tr>
        );
    }
}

    
export default ContactItem;
    