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
    public ResponseEntity<InvoiceItem> createInvoiceItem(Integer invoiceId, InvoiceItem invoiceItem) {
        InvoiceItem created = service.create(invoiceId.longValue(), invoiceItem);
        return ResponseEntity.ok(created);
    }

    @Override
    public ResponseEntity<InvoiceItem> updateInvoiceItem(Integer id, InvoiceItem invoiceItem) {
        InvoiceItem updated = service.update(id.longValue(), invoiceItem);
        return ResponseEntity.ok(updated);
    }

    @Override
    public ResponseEntity<Void> deleteInvoiceItem(Integer id) {
        service.delete(id.longValue());
        return ResponseEntity.noContent().build();
    }

    @Override
    public ResponseEntity<List<InvoiceItem>> getItemsByInvoice(Integer invoiceId) {
        List<InvoiceItem> items = service.getByInvoice(invoiceId.longValue());
        return ResponseEntity.ok(items);
    }
}
