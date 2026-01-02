package de.hoelscherp.invoice.api.api;

import de.hoelscherp.invoice.api.models.Invoice;
import de.hoelscherp.invoice.api.service.InvoiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class InvoicesApiImpl implements InvoicesApi {

    private final InvoiceService service;

    @Override
    public ResponseEntity<Invoice> createInvoice(Long customerId, Invoice invoice) {
        Invoice saved = service.create(customerId, invoice);
        return ResponseEntity.ok(saved);
    }

    @Override
    public ResponseEntity<Void> deleteInvoice(Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @Override
    public ResponseEntity<Invoice> getInvoice(Long id) {
        Invoice record = service.get(id);
        return ResponseEntity.ok(record);
    }

    @Override
    public ResponseEntity<List<Invoice>> getInvoicesByCustomer(Long customerId) {
        List<Invoice> invoices = service.getByCustomer(customerId);
        return ResponseEntity.ok(invoices);
    }

    @Override
    public ResponseEntity<Invoice> updateInvoice(Long id, Invoice invoice) {
        Invoice updatedRecord = service.update(id, invoice);
        return ResponseEntity.ok(updatedRecord);
    }
}
