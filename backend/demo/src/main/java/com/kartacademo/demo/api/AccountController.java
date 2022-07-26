package com.kartacademo.demo.api;

import com.kartacademo.demo.model.Account;
import com.kartacademo.demo.model.Role;
import com.kartacademo.demo.service.AccountService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/account")
@CrossOrigin
public class AccountController {

    private final AccountService accountService;

    @Autowired
    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping("/add-account")
    public ResponseEntity addAccount(@RequestBody @Valid Account account) {
        return ResponseEntity.ok(accountService.addAccount(account));
    }

    @GetMapping("/get-all-accounts")
    public ResponseEntity<List<Account>> getAllAccounts() {
        return ResponseEntity.ok(accountService.getAllAccounts());
    }

    @PostMapping("/add-role")
    public ResponseEntity<Role> addRole(@RequestBody @Valid Role role) {
        return ResponseEntity.ok(accountService.addRole(role));
    }

    @GetMapping("/add-role-to-account")
    public ResponseEntity<Account> addRoleToAccount(@RequestBody RoleToAccount roleToAccount) {
        return ResponseEntity.ok(accountService.addRoleToAccount(roleToAccount.getEmail(),roleToAccount.getRoleName()));
    }

    @GetMapping("/get-all-roles")
    public ResponseEntity<List<Role>> getAllRoles() {
        return ResponseEntity.ok(accountService.getAllRoles());
    }


    @PostMapping("get-by-email")
    public ResponseEntity<Account> getByEmail(@RequestBody @Valid RoleToAccount roleToAccount) {
        return ResponseEntity.ok(accountService.getAccountByEmail(roleToAccount.getEmail()));
    }

    @PostMapping("/delete-calendar")
    public ResponseEntity<?> deleteCalendar(@RequestBody EmailId emailId) {
       try {
           accountService.deleteCalendar(emailId.getEmail(),emailId.getId());
           return new ResponseEntity(HttpStatus.ACCEPTED);
       } catch (Exception e) {
           System.out.println(e);
           return new ResponseEntity(HttpStatus.BAD_REQUEST);
       }
    }
    @Data
     public static class RoleToAccount {
      private String email;
      private String roleName;
    }
    @Data
    public static class EmailId {
        String email;
        String id;
    }
}


