package com.orange.demo.todolist.controller;

import com.orange.demo.todolist.dto.TodolistDeleteDto;
import com.orange.demo.todolist.dto.TodolistDoneDTO;
import com.orange.demo.todolist.model.TodolistModel;
import com.orange.demo.todolist.service.TodolistService;
import com.orange.demo.todolist.dto.TodolistSaveDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/todolist")
@CrossOrigin
public class TodolistController {

    private final TodolistService todolistService;

    @Autowired
    public TodolistController(TodolistService todolistService) {
        this.todolistService = todolistService;
    }

    @GetMapping
    public List<TodolistModel> getAllTodolist(){
        return todolistService.getAllTodolist();
    }

    @PostMapping
    public void saveNewTodo(@Valid @RequestBody TodolistSaveDTO todolistSaveDTO){
        todolistService.saveNewTodo(todolistSaveDTO);
    }
    @PutMapping
    public void markDoneTodo(@Valid @RequestBody TodolistDoneDTO todolistDoneDTO){
          todolistService.markDoneTodo(todolistDoneDTO);

    }
    @DeleteMapping
    public void deleteTodo(@Valid @RequestBody TodolistDeleteDto todolistDeleteDto){
        todolistService.deleteTodo(todolistDeleteDto);
    }
}
