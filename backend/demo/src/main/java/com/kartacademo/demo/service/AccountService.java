package com.kartacademo.demo.service;

import com.kartacademo.demo.model.Account;
import com.kartacademo.demo.model.Role;
import com.kartacademo.demo.repository.AccountRepository;
import com.kartacademo.demo.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AccountService {

    private final AccountRepository accountRepository;
    private final CalendarService calendarService;
    private final RoleRepository roleRepository;

    @Autowired
    private  BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public AccountService(AccountRepository accountRepository,RoleRepository roleRepository,CalendarService calendarService) {
        this.accountRepository = accountRepository;
        this.roleRepository =  roleRepository;
        this.calendarService = calendarService;

    }

    public Account addAccount(Account account) {
        account.setPassword(bCryptPasswordEncoder.encode(account.getPassword()));
        return accountRepository.save(account);
    }
    @Cacheable(value = "itemCache")
    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    @Cacheable(value = "itemCache")
    public Account getAccountById(String id) {
        return accountRepository.findById(id).get();
    }

    public Role addRole(Role role) {
        return roleRepository.save(role);
    }

    public Account addRoleToAccount(String email,String roleName) {
        Account account = accountRepository.getByEmail(email);
        Role role = roleRepository.getByRoleName(roleName);

        List<Role> accountRoleList = account.getRoleList();
        accountRoleList.add(role);
        return accountRepository.save(account);
    }

    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    @Cacheable(value = "itemCache")
    public Account getAccountByEmail(String email) {
        return accountRepository.getByEmail(email);
    }

    public void deleteCalendar(String email, String id) {
        Account account = getAccountByEmail(email);

        for (int i = 0; i<account.getCalendarList().size(); i++) {
            if(account.getCalendarList().get(i).getId().equals(id)) {
                account.getCalendarList().remove(i);
                account.setCalendarList(account.getCalendarList());
                accountRepository.save(account);
            }
        }


    }


}
