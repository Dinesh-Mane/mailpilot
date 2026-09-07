package com.dineshmane.mailpilot.serviceImpl;

import com.dineshmane.mailpilot.dto.EmailRequest;
import com.dineshmane.mailpilot.service.EmailGeneratorService;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class EmailGeneratorServiceImpl implements EmailGeneratorService {

    private final ChatClient chatClient;

    public EmailGeneratorServiceImpl(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    @Override
    public String generateEmailReply(EmailRequest emailRequest) {

        String prompt = buildPrompt(emailRequest);
        return chatClient
                .prompt(prompt)
                .call()
                .content();
    }

    private String buildPrompt(EmailRequest emailRequest) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("Generate a professional email reply for the following email content. Please don't generate a subject line ");

        if (emailRequest.getTone() != null && !emailRequest.getTone().isEmpty()){
            prompt.append("Use a ").append(emailRequest.getTone()).append(" tone.");
        }
        prompt.append("\nOriginal email: \n").append(emailRequest.getEmailContent());
        return prompt.toString();
    }
}
