package de.hoelscherp.invoice.api.persistence.records;

import jakarta.persistence.*;
import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDate;

@Builder(toBuilder = true)
@Entity
@Table(name = "invoice_items")
public record InvoiceItemRecord(

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        Long id,

        @ManyToOne(optional = false, fetch = FetchType.LAZY)
        @JoinColumn(name = "invoice_id")
        InvoiceRecord invoice,

        @Column(name = "order_id")
        String orderId,

        String description,

        @Column(nullable = false)
        String type,

        @Column(name = "time_spent")
        Integer timeSpent,

        @Column(nullable = false, precision = 12, scale = 2)
        BigDecimal price,

        @Column(name = "service_date_start")
        LocalDate serviceDateStart,

        @Column(name = "service_date_end")
        LocalDate serviceDateEnd

) {}
