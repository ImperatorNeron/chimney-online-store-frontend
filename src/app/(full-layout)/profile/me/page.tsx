'use client';

import PersonalDataForm from '@/components/modules/profile/components/PersonalDataForm';
import { useContext } from 'react';
import { ProfileContext } from '@/provider/profile.provider';

export default function ProfilePage() {
    const user = useContext(ProfileContext);

    return (
        user ? <PersonalDataForm user={user} /> : <div>Не вдалося завантажити</div>
    );
}
