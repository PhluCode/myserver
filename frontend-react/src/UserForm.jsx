import { useState } from 'react';

const EMPTY = { username: '', email: '', password: '', age: '' };

// Build a request body from the fields that have a value
function toBody(form) {
  const body = {};
  for (const [key, value] of Object.entries(form)) {
    if (value === '') continue;
    body[key] = key === 'age' ? Number(value) : value;
  }
  return body;
}

export default function UserForm({ submitLabel, onSubmit, requireAll }) {
  const [form, setForm] = useState(EMPTY);
  const [msg, setMsg] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await onSubmit(toBody(form));
      setMsg({ ok: true, text: 'สำเร็จ' });
      if (data) setForm(EMPTY);
    } catch (err) {
      setMsg({ ok: false, text: err.message });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {['username', 'email', 'password', 'age'].map((name) => (
        <div key={name}>
          <label>{name}{requireAll ? '' : ' (เว้นว่างถ้าไม่เปลี่ยน)'}</label>
          <input
            name={name}
            type={name === 'password' ? 'password' : name === 'email' ? 'email' : name === 'age' ? 'number' : 'text'}
            min={name === 'age' ? 0 : undefined}
            required={requireAll}
            value={form[name]}
            onChange={handleChange}
          />
        </div>
      ))}
      <button type="submit">{submitLabel}</button>
      {msg && <div className={`msg ${msg.ok ? 'ok' : 'err'}`}>{msg.text}</div>}
    </form>
  );
}
