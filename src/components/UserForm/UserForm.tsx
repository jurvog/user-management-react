import { User, USER_ROLES, USER_STATUSES } from '@/types';
import { ChangeEvent, FormEvent, useState } from 'react';

interface UserFormProps {
    user: User | null;
    onSave: (user: User) => void;
    onClose: () => void;
}

export default function UserForm({ user, onSave, onClose }: UserFormProps) {

    const initialValues = {
        name: user?.name ?? '',
        email: user?.email ?? '',
        role: user?.role ?? USER_ROLES[0],
        status: user?.status ?? USER_STATUSES[0]
    }

    type Message = {
        type: string;
        text: string;
    }

    const [message, setMessage] = useState<Message | null>(null);
    const [formValues, setFormValues] = useState(initialValues);

    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const nextUser = {
            id: user?.id ?? crypto.randomUUID(),
            name: (data.name as User['name']).trim(),
            email: (data.email as User['email']).trim(),
            role: data.role as User['role'],
            status: data.status as User['status'],
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
        <form onSubmit={handleSubmit} onKeyDown={(e) => { if (e.key === 'Enter' && (e.target as HTMLElement).tagName === 'INPUT') e.preventDefault() }}>
            <div className="form-container">
                {message && <p className={message.type} aria-live="polite">{message.text}</p>}
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
                                {USER_ROLES.map(role => <option key={role} value={role}>{role}</option>)}
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                            Status
                            <select name="status" value={formValues.status} onChange={handleChange}>
                                {USER_STATUSES.map(status => <option key={status} value={status}>{status}</option>)}
                            </select>
                        </label>
                    </div>
                </div>
                {message?.type !== 'success' && (
                    <div>
                        <button onClick={onClose}>Cancel</button>
                        <button type="submit" className="cta">Save</button>
                    </div>
                )}
            </div>
        </form>
    );
}
