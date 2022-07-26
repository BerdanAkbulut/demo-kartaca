package com.kartacademo.demo.repository;

import com.kartacademo.demo.model.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RoleRepository extends MongoRepository<Role,String> {

    Role getByRoleName(String roleName);
}
