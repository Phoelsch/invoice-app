package de.hoelscherp.invoice.api.persistence.repositories;

import de.hoelscherp.invoice.api.persistence.records.InvoiceItemRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InvoiceItemRepository extends JpaRepository<InvoiceItemRecord, Long> {

    List<InvoiceItemRecord> findByInvoiceId(Long id);

}

