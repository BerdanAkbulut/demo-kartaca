package com.kartacademo.demo.api;

import com.kartacademo.demo.jwt.JwtTokenUtil;
import com.kartacademo.demo.model.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    JwtTokenUtil jwtTokenUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid AuthRequest authRequest) {

        try {
            Authentication authentication = authenticationManager.authenticate(
              new UsernamePasswordAuthenticationToken(authRequest.getEmail(),authRequest.getPassword())
            );

            Account account = (Account) authentication.getPrincipal();
            String accessToken = jwtTokenUtil.generateAccessToken(account);
            AuthResponse authResponse = new AuthResponse(account.getEmail(),accessToken);
            return ResponseEntity.ok(authResponse);
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
