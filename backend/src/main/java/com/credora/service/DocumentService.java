package com.credora.service;

import com.credora.dto.ReportDtos;
import com.credora.model.ApplicationDocument;
import com.credora.model.LoanApplication;
import com.credora.repository.ApplicationDocumentRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DocumentService {

    private final ApplicationDocumentRepository documentRepository;

    public DocumentService(ApplicationDocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

    @Transactional(readOnly = true)
    public List<ReportDtos.DocumentResponse> listAll(String status) {
        List<ApplicationDocument> docs = status != null && !status.equals("all")
                ? documentRepository.findByStatusOrderByUploadedAtDesc(status.toUpperCase())
                : documentRepository.findAllByOrderByUploadedAtDesc();
        return docs.stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Transactional
    public ReportDtos.DocumentResponse updateStatus(Long id, String status) {
        ApplicationDocument doc = documentRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Document not found"));
        doc.setStatus(status.toUpperCase());
        return toResponse(documentRepository.save(doc));
    }

    private ReportDtos.DocumentResponse toResponse(ApplicationDocument doc) {
        ReportDtos.DocumentResponse r = new ReportDtos.DocumentResponse();
        r.setId(doc.getId());
        r.setDocumentType(doc.getDocumentType());
        r.setFileName(doc.getFileName());
        r.setStatus(doc.getStatus());
        r.setUploadedAt(doc.getUploadedAt() != null ? doc.getUploadedAt().toString() : null);
        r.setContentType(doc.getContentType());
        LoanApplication app = doc.getApplication();
        if (app != null) {
            r.setApplicationId(app.getId());
            r.setApplicationRef(app.getReferenceId());
            r.setLoanType(app.getLoanType());
            if (app.getUser() != null) {
                r.setCustomerName(app.getUser().getFullName());
                r.setCustomerEmail(app.getUser().getEmail());
            }
        }
        return r;
    }
}
