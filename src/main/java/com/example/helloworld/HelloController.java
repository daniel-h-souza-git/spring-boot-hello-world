package com.example.helloworld;

import com.example.helloworld.message.HelloMessageFactory;
import com.example.helloworld.message.Language;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class HelloController {

    private static final Logger log = LoggerFactory.getLogger(HelloController.class);

    @GetMapping(value = "/hello/{lang}", produces = "text/plain;charset=UTF-8")
    public String hello(@PathVariable String lang) {

        log.debug("Processando /hello/{} (lang recebido='{}')", lang, lang);

        
        try {
            String text = HelloMessageFactory.create(Language.valueOf(lang.toUpperCase())).getText();
            log.info("Mensagem gerada para o idioma '{}'", lang);
            return text;
        } catch (IllegalArgumentException e) {
            log.warn("Idioma não suportado: '{}' (aceitos: en, pt, es) -> 400", lang);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unsupported language: " + lang);
        }
    }

    @GetMapping(value = "/hello2", produces = MediaType.TEXT_PLAIN_VALUE)
    public String hello2() {
        log.info("Processando /hello2");
        return "Hello, World 2!";
    }
}
