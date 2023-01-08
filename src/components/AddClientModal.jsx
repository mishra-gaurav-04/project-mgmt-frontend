import {useState} from 'react';
import {UserPlus} from 'react-feather';
import { useMutation } from '@apollo/client';
import {ADD_CLIENT} from '../mutations/clientsMutations';
import {GET_CLIENTS} from '../queries/clientQueries';


export default function AddClientModal() {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState('');

    const [addClient] = useMutation(ADD_CLIENT,{
        variables : {name,email,phone},
        update(cache,{data : {addClient}}){
            const {clients} = cache.readQuery({
                query : GET_CLIENTS
            });
            cache.writeQuery({
                query : GET_CLIENTS,
                data: {clients : [...clients,addClient]},
            });
        }
    });

    const submitClient = (event) => {
        event.preventDefault();
        
        if(name === '' || email === '' || phone === ''){
            return alert('Please Fill in all the field');
        }

        addClient(name,email,phone);
        
        setName('');
        setEmail('');
        setPhone('');
    };
  return (
    <>
<button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#addClientModal">
    <div className="d-flex align-items-center">
        <UserPlus className='icon'/>
        <div>Add Client</div>
    </div>
</button>

<div className="modal fade" id="addClientModal"  aria-labelledby="addClientModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="addClientModalLabel">Add Client</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form onSubmit={submitClient}>
            <div className="mb-3">
                <label className='form-label'>Name</label>
                <input type="text" className='form-control' id='name' value={name} onChange = {(event) => setName(event.target.value)} />
            </div>
            <div className="mb-3">
                <label className='form-label'>Email</label>
                <input type="text" className='form-control' id='email' value={email} onChange = {(event) => setEmail(event.target.value)} />
            </div>
            <div className="mb-3">
                <label className='form-label'>Phone</label>
                <input type="text" className='form-control' id='phone' value={phone} onChange = {(event) => setPhone    (event.target.value)} />
            </div>
            <button type='submit' className='btn btn-secondary' data-bs-dismiss='modal'>Submit</button>
        </form>
      </div>
    </div>
  </div>
</div>
    </>
  )
};