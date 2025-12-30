package de.hoelscherp.invoice.api.persistence.records;

import jakarta.persistence.*;
import lombok.Builder;

@Builder(toBuilder = true)
@Entity
@Table(name = "customers")
public record CustomerRecord(

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        Long id,

        @Column(nullable = false)
        String name,

        @Column(nullable = false)
        String email,

        @Column(name = "contact_person")
        String contactPerson,

        String location,

        @Column(name = "postal_code")
        String postalCode,

        String street,

        @Column(name = "main_number")
        String mainNumber

) {}
