package com.kartacademo.demo.repository;


import com.kartacademo.demo.model.Account;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

public interface AccountRepository extends MongoRepository<Account,String> {

    public Account getByEmail(String email);

    public Account getByEmailAndPassword(String email,String password);

    public Optional<Account> findByEmail(String email);


}
