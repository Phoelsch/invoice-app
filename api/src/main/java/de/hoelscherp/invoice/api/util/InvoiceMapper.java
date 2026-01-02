package de.hoelscherp.invoice.api.util;

import de.hoelscherp.invoice.api.models.Customer;
import de.hoelscherp.invoice.api.models.Invoice;
import de.hoelscherp.invoice.api.models.InvoiceItem;
import de.hoelscherp.invoice.api.persistence.records.CustomerRecord;
import de.hoelscherp.invoice.api.persistence.records.InvoiceItemRecord;
import de.hoelscherp.invoice.api.persistence.records.InvoiceRecord;

import java.util.List;
import java.util.stream.Collectors;

public class InvoiceMapper {

    public static InvoiceRecord toInvoiceRecord(Invoice invoice) {
        CustomerRecord customerRecord = CustomerMapper.toCustomerRecord(invoice.getCustomer());

        List<InvoiceItemRecord> itemRecords = invoice.getItems() != null
                ? invoice.getItems().stream()
                .map(item -> InvoiceItemMapper.toInvoiceItemRecord(item, null))
                .collect(Collectors.toList())
                : List.of();

        return InvoiceRecord.builder()
                .id(invoice.getId() != null ? invoice.getId() : null)
                .customerRecord(customerRecord)
                .description(invoice.getDescription())
                .invoiceNumber(invoice.getInvoiceNumber())
                .invoiceDate(invoice.getInvoiceDate())
                .serviceDate(invoice.getServiceDate())
                .paymentDate(invoice.getPaymentDate())
                .createDate(invoice.getCreateDate())
                .finalizedDate(invoice.getFinalizedDate())
                .items(itemRecords)
                .build();
    }

    public static Invoice toInvoice(InvoiceRecord record) {
        Customer customer = CustomerMapper.toCustomer(record.customerRecord());

        List<InvoiceItem> items = record.items() != null
                ? record.items().stream()
                .map(InvoiceItemMapper::toInvoiceItem)
                .collect(Collectors.toList())
                : List.of();

        return Invoice.builder()
                .id(record.id() != null ? record.id() : null)
                .customer(customer)
                .description(record.description())
                .invoiceNumber(record.invoiceNumber())
                .invoiceDate(record.invoiceDate())
                .serviceDate(record.serviceDate())
                .paymentDate(record.paymentDate())
                .createDate(record.createDate())
                .finalizedDate(record.finalizedDate())
                .items(items)
                .build();
    }
}
