package de.hoelscherp.invoice.api.service;

import de.hoelscherp.invoice.api.models.InvoiceItem;
import de.hoelscherp.invoice.api.persistence.records.InvoiceItemRecord;
import de.hoelscherp.invoice.api.persistence.records.InvoiceRecord;
import de.hoelscherp.invoice.api.persistence.repositories.InvoiceItemRepository;
import de.hoelscherp.invoice.api.persistence.repositories.InvoiceRepository;
import de.hoelscherp.invoice.api.util.InvoiceItemMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InvoiceItemService {

    private final InvoiceItemRepository itemRepository;
    private final InvoiceRepository invoiceRepository;

    public InvoiceItem create(Long invoiceId, InvoiceItem item) {
        InvoiceRecord invoiceRecord = invoiceRepository.findById(invoiceId)
                .orElseThrow(() -> new IllegalArgumentException("Invoice not found"));

        InvoiceItemRecord recordToSave = InvoiceItemMapper.toInvoiceItemRecord(item, invoiceRecord);

        InvoiceItemRecord saved = itemRepository.save(recordToSave);
        return InvoiceItemMapper.toInvoiceItem(saved);
    }

    public List<InvoiceItem> getByInvoice(Long invoiceId) {
        List<InvoiceItemRecord> records = itemRepository.findByInvoiceId(invoiceId);
        return records.stream()
                .map(InvoiceItemMapper::toInvoiceItem)
                .collect(Collectors.toList());
    }

    public InvoiceItem update(Long id, InvoiceItem item) {
        InvoiceItemRecord existing = itemRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("InvoiceItem not found"));

        InvoiceItemRecord updatedRecord = InvoiceItemMapper.toInvoiceItemRecord(item, existing.invoice())
                .toBuilder()
                .id(existing.id())
                .build();

        InvoiceItemRecord saved = itemRepository.save(updatedRecord);
        return InvoiceItemMapper.toInvoiceItem(saved);
    }

    public void delete(Long id) {
        if (!itemRepository.existsById(id)) {
            throw new IllegalArgumentException("InvoiceItem not found");
        }
        itemRepository.deleteById(id);
    }
}
