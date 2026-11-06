package com.example.helloworld.message;

public class HelloMessageFactory {

    private HelloMessageFactory() {
    }

    public static HelloMessage create(Language language) {
        return switch (language) {
            case EN -> () -> "Hello, World!";
            case PT -> () -> "Olá, Mundo!";
            case ES -> () -> "¡Hola, Mundo!";
        };
    }
}
