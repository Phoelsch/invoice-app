package de.hoelscherp.invoice.api.api;

import de.hoelscherp.invoice.api.models.Customer;
import de.hoelscherp.invoice.api.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class CustomersApiImpl implements CustomersApi {

    private final CustomerService service;

    @Override
    public ResponseEntity<Customer> createCustomer(Customer customer) {
        Customer created = service.create(customer);
        return ResponseEntity.ok(created);
    }

    @Override
    public ResponseEntity<Void> deleteCustomer(Integer id) {
        service.delete(Long.valueOf(id));
        return ResponseEntity.noContent().build();
    }

    @Override
    public ResponseEntity<List<Customer>> getAllCustomers() {
        List<Customer> customers = service.getAll();
        return ResponseEntity.ok(customers);
    }

    @Override
    public ResponseEntity<Customer> getCustomer(Integer id) {
        Customer customer = service.get(Long.valueOf(id));
        return ResponseEntity.ok(customer);
    }

    @Override
    public ResponseEntity<Customer> updateCustomer(Integer id, Customer customer) {
        Customer updated = service.update(Long.valueOf(id), customer);
        return ResponseEntity.ok(updated);
    }
}
