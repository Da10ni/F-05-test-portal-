import { useState } from 'react';

const INITIAL = { fullname: '', reference: '', maxlen: '', email: '', account: '' };

export default function App() {
  const [values, setValues] = useState(INITIAL);
  const [accountInvalid, setAccountInvalid] = useState(false);
  const [result, setResult] = useState('');

  const set = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }));

  function onSubmit(e) {
    e.preventDefault();
    const acct = values.account.trim();
    const accountOk = acct === '' || /^[0-9]{6}$/.test(acct);
    setAccountInvalid(!accountOk);

    // Native constraint validation (email format, etc.) plus the custom account rule.
    const nativeOk = e.currentTarget.checkValidity();
    if (nativeOk && accountOk) {
      setResult('Submitted successfully.');
    } else {
      setResult('');
      e.currentTarget.reportValidity();
    }
  }

  return (
    <main>
      <form className="card" onSubmit={onSubmit}>
        <h2>Form</h2>

        <div className="field">
          <label htmlFor="fullname">Full name</label>
          <input id="fullname" name="fullname" type="text" value={values.fullname} onChange={set('fullname')} placeholder="Name" />
        </div>

        <div className="field">
          <label htmlFor="reference">Reference number</label>
          <input id="reference" name="reference" type="text" value={values.reference} onChange={set('reference')} placeholder="Reference" />
        </div>

        <div className="field">
          <label htmlFor="maxlen">Short code (max 5)</label>
          <input id="maxlen" name="maxlen" type="text" maxLength={5} value={values.maxlen} onChange={set('maxlen')} placeholder="max 5 chars" />
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={values.email} onChange={set('email')} placeholder="name@example.com" />
        </div>

        <div className="field">
          <label htmlFor="account">Account number (6 digits)</label>
          <input
            id="account"
            name="account"
            type="text"
            className={accountInvalid ? 'is-invalid' : ''}
            aria-invalid={accountInvalid ? 'true' : undefined}
            aria-describedby={accountInvalid ? 'account-feedback' : undefined}
            value={values.account}
            onChange={set('account')}
            placeholder="6 digits"
          />
          {accountInvalid && (
            <div className="invalid-feedback" id="account-feedback">
              Account number must be exactly 6 digits.
            </div>
          )}
        </div>

        <button type="submit">Submit</button>
        <div className="result">{result}</div>
      </form>
    </main>
  );
}
