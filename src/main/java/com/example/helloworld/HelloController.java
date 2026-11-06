package com.example.helloworld;

import com.example.helloworld.message.HelloMessageFactory;
import com.example.helloworld.message.Language;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class HelloController {

    @GetMapping(value = "/hello/{lang}", produces = "text/plain;charset=UTF-8")
    public String hello(@PathVariable String lang) {
        try {
            return HelloMessageFactory.create(Language.valueOf(lang.toUpperCase())).getText();
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unsupported language: " + lang);
        }
    }

    @GetMapping(value = "/hello2", produces = MediaType.TEXT_PLAIN_VALUE)
    public String hello2() {
        return "Hello, World 2!";
    }
}
