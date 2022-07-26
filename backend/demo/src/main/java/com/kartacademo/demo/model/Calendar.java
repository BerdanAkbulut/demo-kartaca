package com.kartacademo.demo.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "calendars")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Calendar {


    @Id
    private String id;

    private String activity;


    @JsonFormat(pattern="yyyy-MM-dd HH:mm")
    private LocalDateTime startDate;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm")
    private LocalDateTime endDate;

    private Status status;

    private Type type;

    private Account account;
}
