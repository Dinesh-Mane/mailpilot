package com.dineshmane.mailpilot.service;

import com.dineshmane.mailpilot.dto.EmailRequest;

public interface EmailGeneratorService {
    String generateEmailReply(EmailRequest emailRequest);
}
