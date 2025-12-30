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
    public ResponseEntity<Invoice> createInvoice(Integer customerId, Invoice invoice) {
        Invoice saved = service.create(customerId.longValue(), invoice);
        return ResponseEntity.ok(saved);
    }

    @Override
    public ResponseEntity<Void> deleteInvoice(Integer id) {
        service.delete(id.longValue());
        return ResponseEntity.noContent().build();
    }

    @Override
    public ResponseEntity<Invoice> getInvoice(Integer id) {
        Invoice record = service.get(id.longValue());
        return ResponseEntity.ok(record);
    }

    @Override
    public ResponseEntity<List<Invoice>> getInvoicesByCustomer(Integer customerId) {
        List<Invoice> invoices = service.getByCustomer(customerId.longValue());
        return ResponseEntity.ok(invoices);
    }

    @Override
    public ResponseEntity<Invoice> updateInvoice(Integer id, Invoice invoice) {
        Invoice updatedRecord = service.update(id.longValue(), invoice);
        return ResponseEntity.ok(updatedRecord);
    }
}
