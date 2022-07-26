package com.kartacademo.demo.security;

import com.kartacademo.demo.jwt.JwtTokenFilter;
import com.kartacademo.demo.jwt.JwtTokenUtil;
import com.kartacademo.demo.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.http.HttpServletResponse;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@ComponentScan
public class SecurityConfig extends WebSecurityConfigurerAdapter {


    @Autowired
    private final AccountRepository accountRepository;
    @Autowired
    private JwtTokenFilter jwtTokenFilter;


    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(username -> accountRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("User not found")));
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.exceptionHandling().authenticationEntryPoint((request, response, authException) -> {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
            authException.getMessage();
        } );
        http.authorizeRequests()
                .antMatchers("/api/auth/login","/account/add-account","/account/get-by-email","/api/calendar/add-calendar","/api/calendar/delete-calendar/{id}","/account/delete-calendar","/api/calendar/add-calendar-v2")
                .permitAll()
                .anyRequest()
                .authenticated();
        http.addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Override
    @Bean
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }
}
