package com.kartacademo.demo.jwt;

import com.kartacademo.demo.model.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtTokenFilter extends OncePerRequestFilter {

    @Autowired private JwtTokenUtil jwtTokenUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        if(!hasAuthorizationHeader(request)) {
            filterChain.doFilter(request,response);
            return;
        }
        String accessToken = getAccessToken(request);

        if(!jwtTokenUtil.validateAccessToken(accessToken)) {
            filterChain.doFilter(request,response);
            return;
        }
        setAuthenticationContext(accessToken,request);
        filterChain.doFilter(request,response);

    }

    private void setAuthenticationContext(String accessToken, HttpServletRequest request) {
        Account account = getAccountDetails(accessToken);
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(account,null,null);
        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
    }

    private Account getAccountDetails(String accessToken) {
        Account account = new Account();
        String[] subjectArray = jwtTokenUtil.getSubject(accessToken).split(",");

        account.setId(subjectArray[0]);
        account.setEmail(subjectArray[1]);
        return account;

    }

    private boolean hasAuthorizationHeader(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        System.out.println(header);

        if(ObjectUtils.isEmpty(header) || !header.startsWith("Bearer")) {
            return false;
        }

        return true;
    }
    private String getAccessToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        String token = header.split(" ")[1].trim();
        System.out.println("Access token " + token);
        return token;
    }

}
