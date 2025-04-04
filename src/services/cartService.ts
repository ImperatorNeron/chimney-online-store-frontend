export async function fetchUserCart() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
        method: 'GET',
        credentials: 'include',
    });

    if (!response.ok) throw new Error(`HTTP помилка! Статус: ${response.status}`);

    const data = await response.json();
    if (data.errors?.length) throw new Error(data.errors[0].message);

    return { data: data.data }
};

export async function handleQuantityChange(itemId: number, action: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/change-item-quantity/${itemId}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            quantity: 1,
            action: action
        }),
    });

    if (!response.ok) throw new Error('Не вдалось оновити кількість');
};

export async function handleRemoveItem(itemId: number) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/${itemId}`, {
        method: 'DELETE',
        credentials: 'include',
    });

    if (!response.ok) throw new Error('Не вдалось видалити товар');
};

export async function handleAddToCart(productId: number, quantity: number) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            product_id: productId,
            quantity: quantity,
        }),
    });

    if (!response.ok) throw new Error('Не вдалось додати товар до корзини');
};