'use client';

import ConfirmButton from '@/components/ui/ConfirmButton';
import FormField from '@/components/shared/FormField';
import { ArrowLeftEndOnRectangleIcon, LockClosedIcon, UserIcon } from '@heroicons/react/24/outline';
import useLoginForm from '../hook/useLoginForm';

export default function LoginForm() {
    const {
        form: { register, handleSubmit, formState },
        onSubmit,
        loginError,
        usernameHandlers
    } = useLoginForm();

    return (
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            {loginError && (
                <div className="text-red-500 text-sm p-3 bg-red-50 rounded-lg">
                    {loginError}
                </div>
            )}

            <FormField
                id="username"
                label="Логін"
                required
                placeholder="Customer"
                errorMessage={formState.errors.username?.message}
                {...register("username")}
                onKeyPress={usernameHandlers.onKeyPress}
                onPaste={usernameHandlers.onPaste}
                icon={UserIcon}
            />

            <FormField
                id="password"
                type="password"
                label="Пароль"
                required
                placeholder="••••••••"
                errorMessage={formState.errors.password?.message}
                {...register("password")}
                icon={LockClosedIcon}
            />

            <ConfirmButton
                label='Увійти'
                icon={<ArrowLeftEndOnRectangleIcon className='h-5 w-5' />}
            />
        </form>
    );
}
