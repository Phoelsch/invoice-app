package de.hoelscherp.invoice.api.util;

import de.hoelscherp.invoice.api.models.Customer;
import de.hoelscherp.invoice.api.persistence.records.CustomerRecord;

public class CustomerMapper {

    public static CustomerRecord toCustomerRecord(Customer customer) {
        return CustomerRecord.builder()
                .id(customer.getId())
                .name(customer.getName())
                .email(customer.getEmail())
                .location(customer.getLocation())
                .street(customer.getStreet())
                .postalCode(customer.getPostalCode())
                .mainNumber(customer.getMainNumber())
                .contactPerson(customer.getContactPerson())
                .build();
    }

    public static Customer toCustomer(CustomerRecord record) {
        return Customer.builder()
                .id(record.getId() != null ? record.getId() : null)
                .name(record.getName())
                .email(record.getEmail())
                .location(record.getLocation())
                .street(record.getStreet())
                .postalCode(record.getPostalCode())
                .mainNumber(record.getMainNumber())
                .contactPerson(record.getContactPerson())
                .build();
    }
}
