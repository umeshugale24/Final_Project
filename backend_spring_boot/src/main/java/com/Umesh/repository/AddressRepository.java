package com.Umesh.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Umesh.model.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {

}
