package de.hoelscherp.invoice.api.util;

import de.hoelscherp.invoice.api.models.Customer;
import de.hoelscherp.invoice.api.persistence.records.CustomerRecord;

public class CustomerMapper {

    public static CustomerRecord toCustomerRecord(Customer customer) {
        return CustomerRecord.builder()
                .name(customer.getName())
                .email(customer.getEmail())
                .location(customer.getLocation())
                .street(customer.getStreet())
                .postalCode(customer.getPostalCode())
                .mainNumber(customer.getMainNumber())
                .contactPerson(customer.getContactPerson())
                .build();
    }

    public static Customer toCustomer(CustomerRecord customerRecord) {
        return Customer.builder()
                .name(customerRecord.name())
                .email(customerRecord.email())
                .location(customerRecord.location())
                .street(customerRecord.street())
                .postalCode(customerRecord.postalCode())
                .mainNumber(customerRecord.mainNumber())
                .contactPerson(customerRecord.contactPerson())
                .build();
    }
}
