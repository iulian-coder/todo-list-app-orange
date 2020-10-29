package com.orange.demo.todolist.dto;

import com.orange.demo.todolist.model.TodolistType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TodolistSaveDTO {


    @NotNull
    private TodolistType todolistType;

    @NotEmpty
    private String name;

    @NotNull
    private Date expiryDate;

    @NotNull
    private int estimatedTime;
}
