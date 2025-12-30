package de.hoelscherp.invoice.api.service;

import de.hoelscherp.invoice.api.models.Customer;
import de.hoelscherp.invoice.api.persistence.records.CustomerRecord;
import de.hoelscherp.invoice.api.persistence.repositories.CustomerRepository;
import de.hoelscherp.invoice.api.util.CustomerMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository repository;

    public Customer create(Customer customer) {
        CustomerRecord record = CustomerMapper.toCustomerRecord(customer);
        CustomerRecord saved = repository.save(record);
        return CustomerMapper.toCustomer(saved);
    }

    public Customer get(Long id) {
        CustomerRecord record = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Customer not found"));
        return CustomerMapper.toCustomer(record);
    }

    public List<Customer> getAll() {
        return repository.findAll()
                .stream()
                .map(CustomerMapper::toCustomer)
                .collect(Collectors.toList());
    }

    public Customer update(Long id, Customer customer) {
        CustomerRecord existing = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Customer not found"));

        CustomerRecord updatedRecord = CustomerMapper.toCustomerRecord(customer)
                .toBuilder()
                .id(existing.id())
                .build();

        CustomerRecord saved = repository.save(updatedRecord);
        return CustomerMapper.toCustomer(saved);
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new IllegalArgumentException("Customer not found");
        }
        repository.deleteById(id);
    }
}
