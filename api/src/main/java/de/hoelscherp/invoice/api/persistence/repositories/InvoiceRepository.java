package de.hoelscherp.invoice.api.persistence.repositories;

import de.hoelscherp.invoice.api.persistence.records.InvoiceRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InvoiceRepository extends JpaRepository<InvoiceRecord, Long> {

    List<InvoiceRecord> findByCustomerRecordId(Long customerId);

}

