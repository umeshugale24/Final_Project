package com.Umesh.service;

import com.stripe.exception.StripeException;
import com.Umesh.model.Order;
import com.Umesh.model.PaymentResponse;

public interface PaymentService {
	
	public PaymentResponse generatePaymentLink(Order order) throws StripeException;

}
