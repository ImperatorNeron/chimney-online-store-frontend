class CartService {
    async getCart(): Promise<{ data: CartData }> {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
            method: 'GET',
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('Failed to fetch cart');
        }
        const data = await response.json();
        if (data.errors?.length) throw new Error(data.errors[0].message);

        return { data: data.data };
    }

    async addToCart(productId: number, quantity: number) {
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
    }

    async updateCartItem(itemId: number, action: string) {
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
    }

    async removeFromCart(itemId: number) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/${itemId}`, {
            method: 'DELETE',
            credentials: 'include',
        });

        if (!response.ok) throw new Error('Не вдалось видалити товар');
    }
}

export const cartService = new CartService();