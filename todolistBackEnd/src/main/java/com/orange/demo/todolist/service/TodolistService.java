package com.orange.demo.todolist.service;

import com.orange.demo.todolist.dto.TodolistDeleteDto;
import com.orange.demo.todolist.dto.TodolistDoneDTO;
import com.orange.demo.todolist.model.TodolistModel;
import com.orange.demo.todolist.repository.TodolistRepository;
import com.orange.demo.todolist.dto.TodolistSaveDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class TodolistService {

    private final TodolistRepository todolistRepository;

    @Autowired
    public TodolistService(TodolistRepository todolistRepository) {
        this.todolistRepository = todolistRepository;
    }


    public List<TodolistModel> getAllTodolist() {
        return todolistRepository.findAll();
    }

    public void saveNewTodo(TodolistSaveDTO todolistSaveDTO) {
        TodolistModel todolistModel = new TodolistModel();
        todolistModel.setTodolistType(todolistSaveDTO.getTodolistType());
        todolistModel.setName(todolistSaveDTO.getName());
        todolistModel.setExpiryDate(todolistSaveDTO.getExpiryDate());
        todolistModel.setEstimatedTime(todolistSaveDTO.getEstimatedTime());
        todolistRepository.save(todolistModel);
    }

    public void markDoneTodo(TodolistDoneDTO todolistDoneDTO) {
            Long todoId = todolistDoneDTO.getId();
            Date completedTime = new Date();
            int actualWorkTime = todolistDoneDTO.getActualTime();
            todolistRepository.markDoneTodo(todoId, completedTime, actualWorkTime);
    }

    public void deleteTodo(TodolistDeleteDto todolistDeleteDto) {
             todolistRepository.deleteById(todolistDeleteDto.getId());
    }
}
