import { getAuthHeaders } from "@/utils/request.headers";

export const fetchCart = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
        method: 'GET',
        headers: await getAuthHeaders(),
        credentials: 'include',
    });
    if (!res.ok) throw new Error('Не вдалося завантажити корзину');
    return res.json();
};

export const addToCart = async (productId: number, quantity = 1) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
        method: 'POST',
        headers: await getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify({ product_id: productId, quantity }),
    });
    if (!res.ok) throw new Error(`Не вдалося додати продукт ${productId}`);
};

export const changeItemQuantity = async (
    cartItemId: number,
    action: 'increment' | 'decrement',
    quantity: number = 1
) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/change-item-quantity/${cartItemId}`, {
        method: 'PATCH',
        headers: await getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify({ action, quantity }),
    });
    if (!res.ok) throw new Error(`Не вдалося змінити кількість товару ${cartItemId}`);
};

export const removeItemFromCart = async (cartItemId: number) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/${cartItemId}`, {
        method: 'DELETE',
        headers: await getAuthHeaders(),
        credentials: 'include',
    });
    if (!res.ok) throw new Error(`Не вдалося видалити товар ${cartItemId}`);
};

