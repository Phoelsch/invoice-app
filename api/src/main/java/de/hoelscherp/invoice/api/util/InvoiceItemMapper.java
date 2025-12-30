package de.hoelscherp.invoice.api.util;

import de.hoelscherp.invoice.api.models.InvoiceItem;
import de.hoelscherp.invoice.api.persistence.records.InvoiceItemRecord;
import de.hoelscherp.invoice.api.persistence.records.InvoiceRecord;

import java.math.BigDecimal;

public class InvoiceItemMapper {

    public static InvoiceItemRecord toInvoiceItemRecord(InvoiceItem item, InvoiceRecord invoiceRecord) {
        return new InvoiceItemRecord(
                item.getId() != null ? item.getId().longValue() : null,
                invoiceRecord,
                item.getOrderId(),
                item.getDescription(),
                item.getType(),
                item.getTimeSpent(),
                item.getPrice() != null ? BigDecimal.valueOf(item.getPrice()) : null,
                item.getServiceDateStart(),
                item.getServiceDateEnd()
        );
    }

    public static InvoiceItem toInvoiceItem(InvoiceItemRecord record) {

        return new InvoiceItem()
                .id(record.id() != null ? record.id().intValue() : null)
                .orderId(record.orderId())
                .description(record.description())
                .type(record.type())
                .timeSpent(record.timeSpent())
                .price(record.price() != null ? record.price().doubleValue() : null)
                .serviceDateStart(record.serviceDateStart())
                .serviceDateEnd(record.serviceDateEnd());
    }
}
