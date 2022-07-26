package com.kartacademo.demo.repository;

import com.kartacademo.demo.model.Calendar;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface CalendarRepository  extends MongoRepository<Calendar,String> {


}
