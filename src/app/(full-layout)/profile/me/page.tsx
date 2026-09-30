'use client';

import PersonalDataForm from '@/components/modules/profile/components/PersonalDataForm';
import { useContext, useEffect } from 'react';
import { ProfileContext } from '@/provider/profile.provider';

export default function ProfilePage() {
    const user = useContext(ProfileContext);

    useEffect(() => {
        document.title = "Профіль користувача";
    }, []);

    return (
        user ? <PersonalDataForm user={user} /> : <div>Не вдалося завантажити</div>
    );
}
