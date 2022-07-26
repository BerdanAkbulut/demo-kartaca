package com.kartacademo.demo.api;

import com.kartacademo.demo.model.Calendar;
import com.kartacademo.demo.service.CalendarService;
import lombok.Data;
import org.hibernate.validator.constraints.Length;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Email;

@RestController
@RequestMapping("/api/calendar")
@CrossOrigin
public class CalendarController {

    @Autowired
    CalendarService calendarService;

    @PostMapping("/add-calendar")
    public ResponseEntity<Calendar> addCalendarToAccount(@RequestBody @Valid AddCalendarDto calendarDto) {
        return ResponseEntity.ok(calendarService.addCalendarToAccount(calendarDto.calendar,calendarDto.getEmail()));
    }
    @GetMapping("/delete-calendar/{id}")
    public ResponseEntity deleteCalendar(@PathVariable String id) {
        try {
            calendarService.deleteCalendar(id);
            return new ResponseEntity(HttpStatus.ACCEPTED);
        } catch (Exception ex ) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }

    }
    @PostMapping("/add-calendar-v2")
    public ResponseEntity addCalendar(@RequestBody Calendar calendar) {
        return ResponseEntity.ok(calendarService.addCalendar(calendar));
    }

    @Data
    static class AddCalendarDto {
        @Email @Length(min = 5,max = 50)
        public String email;
        public Calendar calendar;
    }
}
