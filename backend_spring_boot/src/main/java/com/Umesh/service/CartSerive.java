package com.Umesh.service;

import com.Umesh.Exception.CartException;
import com.Umesh.Exception.CartItemException;
import com.Umesh.Exception.FoodException;
import com.Umesh.Exception.UserException;
import com.Umesh.model.Cart;
import com.Umesh.model.CartItem;
import com.Umesh.request.AddCartItemRequest;

public interface CartSerive {

	public CartItem addItemToCart(AddCartItemRequest req, String jwt) throws UserException, FoodException, CartException, CartItemException;

	public CartItem updateCartItemQuantity(Long cartItemId,int quantity) throws CartItemException;

	public Cart removeItemFromCart(Long cartItemId, String jwt) throws UserException, CartException, CartItemException;

	public Long calculateCartTotals(Cart cart) throws UserException;
	
	public Cart findCartById(Long id) throws CartException;
	
	public Cart findCartByUserId(Long userId) throws CartException, UserException;
	
	public Cart clearCart(Long userId) throws CartException, UserException;
	

	

}
