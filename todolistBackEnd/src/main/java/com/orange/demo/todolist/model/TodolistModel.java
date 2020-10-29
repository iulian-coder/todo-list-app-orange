package com.orange.demo.todolist.model;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "todolist")
public class TodolistModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    @Setter(value = AccessLevel.NONE)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    private TodolistType todolistType;

    @NotNull
    @Column(length = 50, nullable = false)
    private String name;

    private boolean isCompleted;

    //  Created Date
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at", nullable = false, updatable = false)
    @CreatedDate
    private Date createdAt = new Date();

    //    Expired Date
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "expiry_at")
    @NotNull
    private Date expiryDate;

    //    Estimated Time in hour
    @Column(name = "estimatedTimeHour")
    private int estimatedTime;


    //    Real Time in hour
    @Column(name = "actualTimeHour")
    private int actualTime;

    //    Completed Date
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "completed_at")
    @LastModifiedDate
    private Date completedAt;

}
