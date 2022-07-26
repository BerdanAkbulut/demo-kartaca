package com.kartacademo.demo.service;

import com.kartacademo.demo.model.Account;
import com.kartacademo.demo.model.Calendar;
import com.kartacademo.demo.repository.AccountRepository;
import com.kartacademo.demo.repository.CalendarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CalendarService {

    private final CalendarRepository calendarRepository;
    private final AccountRepository accountRepository;

    @Autowired
    public CalendarService(CalendarRepository calendarRepository, AccountRepository accountRepository) {
        this.calendarRepository = calendarRepository;
        this.accountRepository = accountRepository;
    }

    public Calendar addCalendarToAccount(Calendar calendar,String email) {
        Account account = accountRepository.getByEmail(email);
        List<Calendar> accountCalendarList = account.getCalendarList();
        accountCalendarList.add(calendar);
        account.setCalendarList(accountCalendarList);
        accountRepository.save(account);
        return calendar;
    }
    public Calendar addCalendar(Calendar calendar) {
       // Account account = accountRepository.getByEmail(calendar.getAccount().getEmail());
        calendarRepository.save(calendar);
        return calendar;
    }
    public void deleteCalendar(String id) {
        calendarRepository.deleteById(id);
    }
    public Calendar getById(String id) {
        return calendarRepository.findById(id).get();
    }
}
