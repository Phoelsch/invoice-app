package de.hoelscherp.invoice.api.persistence.records;

import jakarta.persistence.*;
import lombok.Builder;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.List;

@Builder(toBuilder = true)
@Entity
@Table(
        name = "invoices",
        uniqueConstraints = @UniqueConstraint(columnNames = "invoice_number")
)
public record InvoiceRecord(

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        Long id,

        @ManyToOne(optional = false, fetch = FetchType.LAZY)
        @JoinColumn(name = "customer_id")
        CustomerRecord customerRecord,

        String description,

        @Column(name = "invoice_number", nullable = false)
        String invoiceNumber,

        @Column(name = "invoice_date")
        LocalDate invoiceDate,

        @Column(name = "service_date")
        LocalDate serviceDate,

        @Column(name = "payment_date")
        LocalDate paymentDate,

        @Column(name = "create_date", nullable = false)
        OffsetDateTime createDate,

        @Column(name = "finalized_date")
        OffsetDateTime finalizedDate,

        @OneToMany(
                mappedBy = "invoice",
                cascade = CascadeType.ALL,
                orphanRemoval = true,
                fetch = FetchType.LAZY
        )
        List<InvoiceItemRecord> items

) {}
