package de.hoelscherp.invoice.api.service;

import de.hoelscherp.invoice.api.models.Invoice;
import de.hoelscherp.invoice.api.persistence.records.CustomerRecord;
import de.hoelscherp.invoice.api.persistence.records.InvoiceRecord;
import de.hoelscherp.invoice.api.persistence.repositories.CustomerRepository;
import de.hoelscherp.invoice.api.persistence.repositories.InvoiceRepository;
import de.hoelscherp.invoice.api.util.InvoiceMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final CustomerRepository customerRepository;

    public Invoice create(Long customerId, Invoice invoice) {
        CustomerRecord customerRecord = customerRepository.findById(customerId)
                .orElseThrow(() -> new IllegalArgumentException("Customer not found"));

        InvoiceRecord recordToSave = InvoiceMapper.toInvoiceRecord(invoice);
        recordToSave = recordToSave.toBuilder()
                .createDate(OffsetDateTime.now())
                .build();

        InvoiceRecord saved = invoiceRepository.save(recordToSave);
        return InvoiceMapper.toInvoice(saved);
    }

    public Invoice get(Long id) {
        InvoiceRecord record = invoiceRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invoice not found"));
        return InvoiceMapper.toInvoice(record);
    }

    public List<Invoice> getByCustomer(Long customerId) {
        List<InvoiceRecord> records = invoiceRepository.findByCustomerRecordId(customerId);
        return records.stream()
                .map(InvoiceMapper::toInvoice)
                .collect(Collectors.toList());
    }

    public Invoice update(Long id, Invoice invoice) {
        InvoiceRecord existing = invoiceRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invoice not found"));

        InvoiceRecord updatedRecord = InvoiceMapper.toInvoiceRecord(invoice)
                .toBuilder()
                .id(existing.id())
                .createDate(existing.createDate())
                .build();

        InvoiceRecord saved = invoiceRepository.save(updatedRecord);
        return InvoiceMapper.toInvoice(saved);
    }

    public void delete(Long id) {
        if (!invoiceRepository.existsById(id)) {
            throw new IllegalArgumentException("Invoice not found");
        }
        invoiceRepository.deleteById(id);
    }
}
