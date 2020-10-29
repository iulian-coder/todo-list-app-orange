package com.orange.demo.todolist.dto;

import lombok.*;

import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TodolistDoneDTO {


    @Setter(value = AccessLevel.NONE)
    @NotNull
    private Long id;

    @NotNull
    private int actualTime;


}
