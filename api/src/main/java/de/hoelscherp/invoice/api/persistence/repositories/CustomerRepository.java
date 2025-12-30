package de.hoelscherp.invoice.api.persistence.repositories;

import de.hoelscherp.invoice.api.persistence.records.CustomerRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<CustomerRecord, Long> {


}
