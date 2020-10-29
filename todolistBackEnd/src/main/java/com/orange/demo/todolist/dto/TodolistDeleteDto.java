package com.orange.demo.todolist.dto;

import lombok.*;

import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TodolistDeleteDto {

    @Setter(value = AccessLevel.NONE)
    @NotNull
    private Long id;
}
