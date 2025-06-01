'use client';

import ConfirmButton from '@/components/ui/ConfirmButton';
import FormField from '@/components/shared/FormField';
import { ArrowLeftEndOnRectangleIcon, LockClosedIcon, UserIcon } from '@heroicons/react/24/outline';
import useLoginForm from '../hook/useLoginForm';
import { inputPatterns } from '@/utils/field.patterns';

export default function LoginForm() {
    const { register, handleSubmit, formState, onSubmit } = useLoginForm();

    return (
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <FormField
                id="username"
                label="Логін"
                required
                placeholder="Customer"
                errorMessage={formState.errors.username?.message}
                {...register("username")}
                pattern={inputPatterns.username}
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
                pattern={inputPatterns.password}
                icon={LockClosedIcon}
            />

            <ConfirmButton
                label='Увійти'
                icon={<ArrowLeftEndOnRectangleIcon className='h-5 w-5' />}
                isLoading={formState.isSubmitting}
            />
        </form>
    );
}
