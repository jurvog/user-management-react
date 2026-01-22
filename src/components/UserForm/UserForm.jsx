import { useState } from 'react';

export default function UserForm({ user, onSave, onClose, roles, statuses }) {

    const initialValues = {
        name: user?.name ?? '',    
        email: user?.email ?? '',    
        role: user?.role ?? '',    
        status: user?.status ?? '' 
    }

    const [message, setMessage] = useState(null);
    const [formValues, setFormValues] = useState(initialValues);

    function handleChange(e) {
        const { name, value } = e.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const nextUser = {
            id: user?.id ?? crypto.randomUUID(),
            name: data.name.trim(),
            email: data.email.trim(),
            role: data.role,
            status: data.status,
            createdAt: user?.createdAt ?? new Intl.DateTimeFormat('en-CA').format(new Date())
        };

        try {
            onSave(nextUser);
            setMessage({ type: 'success', text: 'User saved successfully.' });
            setTimeout(() => {
                onClose();
                setMessage(null);
                setFormValues(initialValues);
            }, 3000);
        }
        catch {
            setMessage({ type: 'error', text: 'Error saving user. Please try again.' });
        }
        
    }

	return (
		<form onSubmit={handleSubmit} onKeyDown={(e) => { if(e.key === 'Enter' && e.target.tagName === 'INPUT') e.preventDefault() }}>
			<div className="form-container">
                { message && <p className={message.type} aria-live="polite">{message.text}</p> }
				<div>
					<label>
						Name
						<input type="text" name="name" value={formValues.name} onChange={handleChange} required />
					</label>
				</div>
				<div>
					<label>
						Email
                        <input type="email" name="email" value={formValues.email} onChange={handleChange} required />
					</label>
				</div>
				<div>
					<div>
						<label>
							Role
                            <select name="role" value={formValues.role} onChange={handleChange}>
								{ roles.map(role => <option key={role} value={role}>{role}</option>) }
							</select>
						</label>
					</div>
					<div>
						<label>
							Status
                            <select name="status" value={formValues.status} onChange={handleChange}>
								{ statuses.map(status => <option key={status} value={status}>{status}</option>) }
							</select>
						</label>
					</div>
				</div>
				{ message?.type !== 'success' && (
				<div>
					<button onClick={onClose} className="cancel">Cancel</button>
					<button type="submit" className="save">Save</button>
				</div>
				)}
			</div>
		</form>
	);
}