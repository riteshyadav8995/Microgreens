import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import FormField from '../../components/common/FormField';

export default function PasswordField(props) {
  const [visible, setVisible] = useState(false);
  return (
    <FormField
      {...props}
      render={(controlProps) => (
        <div className="relative">
          <input {...controlProps} type={visible ? 'text' : 'password'} className={`${controlProps.className} pr-12`} />
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className="icon-btn absolute top-1/2 right-1.5 size-9 -translate-y-1/2 text-muted"
            aria-label={visible ? 'Hide password' : 'Show password'}
            aria-pressed={visible}
          >
            {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      )}
    />
  );
}
