import React from 'react'

function ContactItem ({contact}) {
 

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
                <button type="button" className="btn btn-warning btn-sm"><i className="fa fa-edit"></i></button>
                <button type="button" className="btn btn-danger btn-sm"><i className="fa fa-trash"></i></button>
            </td>
        </tr>
    );
}

    
export default ContactItem;
    