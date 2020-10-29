package com.orange.demo.todolist.repository;

import com.orange.demo.todolist.model.TodolistModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Date;

@Repository
public interface TodolistRepository extends JpaRepository<TodolistModel, Long> {


    @Transactional
    @Modifying
    @Query(value = "update TodolistModel td set td.isCompleted=true, td.completedAt=:completedAt, td.actualTime=:actualTime where td.id=:todoId")
    void markDoneTodo(@Param("todoId")Long todoId,
                      @Param("completedAt") Date completedTime,
                        @Param("actualTime")int actualTime);

}
