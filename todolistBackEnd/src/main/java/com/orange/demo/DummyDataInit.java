package com.orange.demo;

import com.orange.demo.todolist.model.TodolistModel;
import com.orange.demo.todolist.repository.TodolistRepository;
import com.orange.demo.todolist.model.TodolistType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

@Component
public class DummyDataInit implements CommandLineRunner {

    private final TodolistRepository todolistRepository;

    @Autowired
    public DummyDataInit(TodolistRepository todolistRepository) {
        this.todolistRepository = todolistRepository;
    }


    @Override
    public void run(String... args) throws Exception {

        Date today = new Date();

        TodolistModel todolistModel1 = new TodolistModel(
                1L,TodolistType.HOBBY,
                "Christmas presents",
                false,
                today,
                new GregorianCalendar(2020, Calendar.DECEMBER, 25, 0, 0)
                .getTime(),
                5,0,
                null);

        TodolistModel todolistModel2 = new TodolistModel(
                2L,TodolistType.WORK,
                "Go to the auto-service",
                true,
                today,
                new GregorianCalendar(2020, Calendar.NOVEMBER, 30, 1, 0).getTime()
                ,4,2,
                new GregorianCalendar(2020, Calendar.OCTOBER, 29, 4, 4).getTime());

        todolistRepository.save(todolistModel1);
        todolistRepository.save(todolistModel2);
    }
}
