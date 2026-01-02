package de.hoelscherp.invoice.api.api;

import de.hoelscherp.invoice.api.models.InvoiceItem;
import de.hoelscherp.invoice.api.service.InvoiceItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class InvoiceItemsApiImpl implements InvoiceItemsApi {

    private final InvoiceItemService service;

    @Override
    public ResponseEntity<InvoiceItem> createInvoiceItem(Long invoiceId, InvoiceItem invoiceItem) {
        InvoiceItem created = service.create(invoiceId, invoiceItem);
        return ResponseEntity.ok(created);
    }

    @Override
    public ResponseEntity<InvoiceItem> updateInvoiceItem(Long id, InvoiceItem invoiceItem) {
        InvoiceItem updated = service.update(id, invoiceItem);
        return ResponseEntity.ok(updated);
    }

    @Override
    public ResponseEntity<Void> deleteInvoiceItem(Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @Override
    public ResponseEntity<List<InvoiceItem>> getItemsByInvoice(Long invoiceId) {
        List<InvoiceItem> items = service.getByInvoice(invoiceId);
        return ResponseEntity.ok(items);
    }
}
