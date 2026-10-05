import { useEffect, useState } from 'react';
import { request } from './api.js';
import UserForm from './UserForm.jsx';

export default function App() {
  const [userId, setUserId] = useState('');
  const [status, setStatus] = useState(null);
  const [users, setUsers] = useState([]);
  const [found, setFound] = useState(null);

  const loadUsers = () =>
    request('GET', '/users')
      .then(setUsers)
      .catch((err) => setStatus({ ok: false, text: err.message }));

  useEffect(() => {
    loadUsers();
  }, []);

  const run = async (fn) => {
    try {
      const data = await fn();
      setStatus({ ok: true, text: 'สำเร็จ' });
      return data;
    } catch (err) {
      setStatus({ ok: false, text: err.message });
      throw err;
    }
  };

  const requireId = () => {
    if (!userId.trim()) throw new Error('กรุณากรอก User ID');
    return userId.trim();
  };

  const createUser = (body) =>
    run(async () => {
      const user = await request('POST', '/users', body);
      setUserId(user._id);
      loadUsers();
      return user;
    });

  const getUser = async () => {
    try {
      const user = await request('GET', `/users/${requireId()}`);
      setFound(user);
      setStatus({ ok: true, text: 'พบผู้ใช้' });
    } catch (err) {
      setFound(null);
      setStatus({ ok: false, text: err.message });
    }
  };

  const updateUser = (body) =>
    run(async () => {
      const user = await request('PUT', `/users/${requireId()}`, body);
      loadUsers();
      return user;
    });

  const deleteUser = () =>
    run(async () => {
      const id = requireId();
      if (!confirm('ยืนยันการลบผู้ใช้นี้?')) return { message: 'ยกเลิกการลบ' };
      const data = await request('DELETE', `/users/${id}`);
      setUserId('');
      loadUsers();
      return data;
    }).catch(() => {});

  return (
    <div className="container">
      <h1>User Manager</h1>

      <section>
        <h2>สร้างผู้ใช้ใหม่</h2>
        <UserForm submitLabel="สร้างผู้ใช้" requireAll onSubmit={createUser} />
      </section>

      <section>
        <h2>ค้นหา / แก้ไข / ลบ (ด้วย ID)</h2>
        <label>User ID</label>
        <div className="row">
          <div>
            <input value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="เช่น 66f1a2b3c4d5e6f7a8b9c0d1" />
          </div>
          <button type="button" onClick={() => getUser().catch(() => {})}>ค้นหา</button>
        </div>

        <div style={{ marginTop: 16 }}>
          <UserForm submitLabel="แก้ไข" onSubmit={updateUser} />
        </div>
        <button type="button" className="danger" onClick={() => deleteUser()}>
          ลบ
        </button>

        {status && <div className={`msg ${status.ok ? 'ok' : 'err'}`}>{status.text}</div>}
        {found && (
          <div className="found">
            <div><strong>ชื่อ:</strong> {found.username}</div>
            <div><strong>อีเมล:</strong> {found.email}</div>
            <div><strong>อายุ:</strong> {found.age}</div>
          </div>
        )}
      </section>

      <section>
        <div className="row">
          <h2 style={{ flex: 1 }}>รายชื่อผู้ใช้ทั้งหมด</h2>
          <button type="button" onClick={loadUsers}>รีเฟรช</button>
        </div>
        {users.length === 0 ? (
          <div className="msg">ยังไม่มีผู้ใช้</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Age</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>{u.age}</td>
                  <td>
                    <button type="button" onClick={() => setUserId(u._id)}>เลือก</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
