package com.kartacademo.demo.model;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import org.hibernate.validator.constraints.Length;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.validation.constraints.Email;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Document(collection = "accounts")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Account implements UserDetails {

    @Id
    private String id;

    @Length(min = 2,max = 50)
    private String firstName;

    @Length(min = 2,max = 50)
    private String lastName;

    @Email
    @Indexed(unique = true)
    @Length(min = 5,max = 50)
    private String email;

    private List<Calendar> calendarList = new ArrayList<>();

    @Length(min = 5,max = 50)
    private String password;


    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime localDateTime;

    private List<Role> roleList;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getUsername() {
        return this.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
