package com.dineshmane.mailpilot.controller;

import com.dineshmane.mailpilot.dto.EmailRequest;
import com.dineshmane.mailpilot.service.EmailGeneratorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173/", "https://mail.google.com"})
public class EmailGeneratorController {

    private final EmailGeneratorService emailGeneratorService;

    @PostMapping("/generate")
    public ResponseEntity<String> generateEmail(@RequestBody EmailRequest emailRequest){
        return ResponseEntity.status(HttpStatus.OK).body(emailGeneratorService.generateEmailReply(emailRequest));
    }
}
