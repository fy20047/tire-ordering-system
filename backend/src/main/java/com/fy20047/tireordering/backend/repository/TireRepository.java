package com.fy20047.tireordering.backend.repository;

import com.fy20047.tireordering.backend.entity.Tire;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TireRepository extends JpaRepository<Tire, Long> {

    @Query("select t from Tire t where t.isActive = true order by t.brand, t.series, t.size")
    List<Tire> findActiveTires();

    @Query("""
            select t from Tire t
            where (:brand is null or lower(t.brand) like lower(concat('%', :brand, '%')))
              and (:series is null or lower(t.series) like lower(concat('%', :series, '%')))
              and (:size is null or lower(t.size) like lower(concat('%', :size, '%')))
              and (:active is null or t.isActive = :active)
            order by t.brand, t.series, t.size
            """)
    List<Tire> search(
            @Param("brand") String brand,
            @Param("series") String series,
            @Param("size") String size,
            @Param("active") Boolean active
    );
}
